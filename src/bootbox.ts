import * as bootstrap from 'bootstrap';
import { Locale, Translations } from './interfaces/locale.ts';
import Options from './interfaces/Options.ts';
import Buttons, { Button } from './interfaces/button.ts';
import { InputGroup } from './interfaces/inputGroup.ts';
import Callback from './interfaces/callback.ts';
import { DEFAULT_LOCALES, DEFAULT_OPTIONS, DEFAULT_TEMPLATES, DEFAULT_VERSION } from './defaults.ts';
import { dateIsValid, timeIsValid, trigger } from './lib/utils.ts';
import { CustomProperties } from './types/customProperties.ts';

const VERSION = DEFAULT_VERSION;
const locales = DEFAULT_LOCALES;
const templates = DEFAULT_TEMPLATES;
const defaults = DEFAULT_OPTIONS;

// PUBLIC FUNCTIONS
// *************************************************************************************************************

/**
 * Return specific locale
 * @param {string} [languageCode]
 * @returns {(Locale)} a single locale object.
 */
function getLocale(languageCode: string): Locale {
	return locales[languageCode];
}

/**
   * Return all currently registered locales, or a specific locale if "name" is defined
   * @returns {(Object|Object[])} An array of the available locale objects.
   */
function getAllLocales(): Translations {
	return locales;
}

/**
		 * Register localized strings for the OK, CONFIRM, and CANCEL buttons
		 * @param {string} name - The key used to identify the new locale in the locales array
		 * @param {Object} values - An object containing the localized string for each of the OK, CANCEL, and CONFIRM properties of a locale
		 * @returns The updated bootbox object
		 */
function addLocale(name: string, values: any) {
    ['OK', 'CANCEL', 'CONFIRM'].forEach((v, _) => {
                if (!values[v]) {
                    throw new Error(`Please supply a translation for "${v}"`);
                }
            });

	locales[name] = {
		OK: values.OK,
		CANCEL: values.CANCEL,
		CONFIRM: values.CONFIRM
	};
};

/**
		* Remove a previously-registered locale
		* @param {string} name - The key identifying the locale to remove
		* @returns The updated bootbox object
		*/
function removeLocale (name: string) {
	if (name !== 'en') {
		delete locales[name];
	} else {
		throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
	}
};

/**
		 * Set the default locale
		 * @param {string} name - The key identifying the locale to set as the default locale for all future bootbox calls
		 * @returns The updated bootbox object
		 */
function setLocale (name:string) {
    if (name) {
        name = name.replace('-', '');
    }

	return setDefaults('locale', name);
};


/**
 * Override default value(s) of Bootbox.
 * @returns The updated bootbox object
 */
function setDefaults(...args: any[]) {
	let values = {} as any[];

	if (args.length === 2) {
		// Allow passing of single key/value...
		values[args[0]] = args[1];
	} else {
		// ... and as an object too
		values = args[0];
	}

	Object.assign(defaults, values);
};


/**
 * Hides all currently active Bootbox modals
 * @returns The current bootbox object
 */
function hideAll(): void {
	document.querySelectorAll<HTMLElement>('.bootbox').forEach(box => {
		const modalInstance = bootstrap.Modal.getInstance(box);
		if (modalInstance) {
			modalInstance.hide();
		}
	});
};


/**
 * Allows the base init() function to be overridden
 * @param {function} _$ - A function to be called when the bootbox instance is created
 * @returns The current bootbox object
 */
function initFn(_$:any): any {
	return initFn(_$ || bootstrap);
}

// CORE HELPER FUNCTIONS
// *************************************************************************************************************

/**
 * The core dialog helper function, which can be used to create any custom Bootstrap modal. 
 * @param {Object} options - An object used to configure the various properties which define a Bootbox dialog
 * @returns an object upon which Bootstrap's modal function has been called
 */
function dialog (options: Options) {
    if (bootstrap.Modal === undefined) {
        throw new Error(
            '"bootstrap.Modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/5.3/getting-started/introduction/ for more details.'
        );
    }

    options = sanitize(options);

    let dialog = generateElement(templates.dialog);
    let innerDialog = dialog.querySelector<HTMLElement>('.modal-dialog')!;
    let body = dialog.querySelector<HTMLElement>('.modal-body')!;
    let header = generateElement(templates.header);
    let footer = generateElement(templates.footer);
    let buttons = options.buttons;

    if (options.messageForm)
    {
        body.querySelector<HTMLElement>('.bootbox-body')!.append(options.messageForm);
    }
    else
    {
        if (typeof options.message === 'string') {
            body.querySelector<HTMLElement>('.bootbox-body')!.innerHTML = options.message;
        } else {
            body.querySelector<HTMLElement>('.bootbox-body')!.append(options.message!);
        }
    }

    let callbacks: Callback = {};
    
    if (typeof options.onEscape === 'function') {
         callbacks['onEscape'] = options.onEscape;
    }   


    // Only attempt to create buttons if at least one has been defined in the options object
    if (getKeyLength(options.buttons) > 0) {

        for (const [key, b] of Object.entries(buttons!)) {
            let button = generateElement(templates.button) as HTMLButtonElement;
            button.dataset.bbHandler = key;

            var classNames = b.className.split(' ');
            classNames.forEach((name: string) => { button.classList.add(name); });

            switch (key) {
                case 'ok':
                case 'confirm':
                    button.classList.add('bootbox-accept');
                    break;

                case 'cancel':
                    button.classList.add('bootbox-cancel');
                    break;
            }

            button.innerHTML = b.label;

            if (b.id) {
                button.setAttribute('id', b.id);
            }

            if (b.disabled === true) {
                button.disabled = true;
            }

            footer.append(button);
             
            if (typeof b.callback === 'function') {
                callbacks[key] = b.callback;
            }
        }

        body.after(footer);
    }

    if (options.animate === true) {
        dialog.classList.add('fade');
    }

    if (options.className) {
        options.className.split(' ').forEach((name: string) => { dialog.classList.add(name); });
    }

    if (options.id) {
        dialog.setAttribute('id',options.id);
    }

    if (options.size) {
        switch (options.size) {
            case 'small':
            case 'sm':
                innerDialog.classList.add('modal-sm');
                break;

            case 'large':
            case 'lg':
                innerDialog.classList.add('modal-lg');
                break;

            case 'extra-large':
            case 'xl':
                innerDialog.classList.add('modal-xl');
                break;
        }
    }

    if (options.scrollable) {
        innerDialog.classList.add('modal-dialog-scrollable');
    }

    if (options.title || options.closeButton) {
        if (options.title) {
            header.querySelector<HTMLElement>('.modal-title')!.innerHTML = options.title;
        } else {
            header.classList.add('border-0');
        }

        if (options.closeButton) {
            let closeButton = generateElement(templates.closeButton);
           header.append(closeButton);
        }

        body.before(header);
    }

    if (options.centerVertical) {
        innerDialog.classList.add('modal-dialog-centered');
    }

    // Bootstrap event listeners; these handle extra setup & teardown required after the underlying modal has performed certain actions.

    if (!options.reusable) {
        // make sure we unbind any listeners once the dialog has definitively been dismissed
        dialog.addEventListener('hide.bs.modal',
            e => {
	            if (e.target === dialog) {
		            dialog.removeEventListener('escape.close.bb', () => {});
		            dialog.removeEventListener('click', () => {});
	            }
            },
            { once: true });

        dialog.addEventListener('hidden.bs.modal',
            e => {
                if (e.target === dialog) {
                    // Ensure we don't accidentally intercept hidden events triggered by children of the current dialog. 
		            // We shouldn't need to handle this anymore, now that Bootstrap namespaces its events, but still worth doing.
		            dialog.remove();
	            }
            },
            { once: true });
    }

    if (options.onHide) {
        if (typeof options.onHide === 'function') {
            dialog.addEventListener('hide.bs.modal', options.onHide);
        } else {
            throw new Error('Argument supplied to "onHide" must be a function');
        }
    }

    if (options.onHidden) {
        if (typeof options.onHidden === 'function') {
            dialog.addEventListener('hidden.bs.modal', options.onHidden);
        } else {
            throw new Error('Argument supplied to "onHidden" must be a function');
        }
    }

    if (options.onShow) {
        if (typeof options.onShow === 'function') {
            addEventListener(dialog, 'show.bs.modal', options.onShow);
        } else {
            throw new Error('Argument supplied to "onShow" must be a function');
        }
    }

    dialog.addEventListener('shown.bs.modal', focusPrimaryButton);

    if (options.onShown) {
        if (typeof options.onShown === 'function') {
            addEventListener(dialog, 'shown.bs.modal', options.onShown);
        } else {
            throw new Error('Argument supplied to "onShown" must be a function');
        }
    }

    // Bootbox event listeners; used to decouple some behaviours from their respective triggers

    if (options.backdrop === true) {
        let startedOnBody = false;

        // Prevents the event from propagating to the backdrop, when something inside the dialog is clicked
        addEventListener(dialog,
            'mousedown',
            e => {
	            e.stopPropagation();

	            startedOnBody = true;
            }, '.modal-content');

        // A boolean true/false according to the Bootstrap docs should show a dialog the user can dismiss by clicking on the background.
        // We always only ever pass static/false to the actual $.modal function because with "true" we can't trap this event (the .modal-backdrop swallows it).
        // However, we still want to sort-of respect true and invoke the escape mechanism instead
        addEventListener(dialog, 'click.dismiss.bs.modal', e => {
	        if (startedOnBody || e.target !== e.currentTarget) {
		        return;
	        }
	        trigger(dialog, 'escape.close.bb');
        });
    }

    dialog.addEventListener('escape.close.bb',
        e => {
	        // The if() statement looks redundant but it isn't; without it, if we *didn't* have an onEscape handler then processCallback would automatically dismiss the dialog
	        if (callbacks.onEscape) {
		        processCallback(e, dialog, callbacks.onEscape);
	        }
        });

    dialog.addEventListener('click',
        (e: any) => {
            if (e.target.nodeName.toLowerCase() === 'button' && !e.target.classList.contains('disabled')) {
                const callbackKey = e.target.dataset.bbHandler;

                if (callbackKey !== undefined) {

                    // Only process callbacks for buttons we recognize:
                    processCallback(e, dialog, callbacks[callbackKey]);
                }
            }
        });


    document.addEventListener('click',
        (e: any) => {
            if (e.target.closest('.bootbox-close-button')) {
                processCallback(e, dialog, callbacks.onEscape);
            }
        });

    dialog.addEventListener('keyup',
        (e: any) => {
	        if (e.which === 27 || e.detail.which === 27) {
		        trigger(dialog, 'escape.close.bb');
	        }
        });

    /*
    The remainder of this method simply deals with adding our dialog element to the DOM, augmenting it with 
    Bootstrap's modal functionality and then giving the resulting object back to our caller
    */

    if (typeof options.container === 'object') {
        options.container.append(dialog);
    } else {
        document.querySelector(options.container!)?.append(dialog);
    }

    const modal = new bootstrap.Modal(dialog,
        {
            backdrop: options.backdrop,
            keyboard: false,
            //show: false
        });

    if (options.show) {
        if (options.relatedTarget) {
            modal.show(options.relatedTarget);
        }
        else{
            modal.show();
        }
    }

    return dialog;
};

/**
        * Helper function to simulate the native alert() behavior. **NOTE**: This is non-blocking, so any code that must happen after the alert is dismissed should be placed within the callback function for this alert.
        * @returns  An object upon which Bootstrap's modal function has been called
        */
function alert(...args: any[]) {
	const options = mergeDialogOptions('alert', ['ok'], ['message', 'callback'], args);

	if (options.callback && typeof options.callback !== 'function') {
		throw new Error('alert requires the "callback" property to be a function when provided');
	}

	options.buttons!.ok.callback = options.onEscape = function () {
		if (typeof options.callback === 'function') {
			return options.callback.call(this);
		}
		return true;
	};

	return dialog(options);
}

/**
 * Helper function to simulate the native confirm() behavior. **NOTE**: This is non-blocking, so any code that must happen after the confirm is dismissed should be placed within the callback function for this confirm.
* @returns an object upon which Bootstrap's modal function has been called
*/
function confirm (...args: any[]) {
    let options: Options;

    options = mergeDialogOptions('confirm', ['cancel', 'confirm'], ['message', 'callback'], args);

    // confirm specific validation; they don't make sense without a callback so make sure it's present
    if (typeof options.callback !== 'function') {
        throw new Error('confirm requires a callback');
    }

    // Overrides; undo anything the user tried to set they shouldn't have
    let cancel = options.buttons!['cancel'];
    let confirm = options.buttons!['confirm'];

    if (!confirm)
    {
        options.buttons!['confirm'] = createButton('confirm', options.locale!);
        confirm = options.buttons!['confirm'];
    }

    if (!cancel)
    {
        options.buttons!['cancel'] = createButton('cancel', options.locale!);
        cancel = options.buttons!['cancel'];
    }

    cancel.callback = options.onEscape = function () {
        return options.callback?.call(this, null);
    };

    confirm.callback = function () {
        return options.callback?.call(this, true);
    };

    options.buttons!['cancel'] = cancel;
    options.buttons!['confirm'] = confirm;
   
    return dialog(options);
};


/**
 * Helper function to simulate the native prompt() behavior. **NOTE**: This is non-blocking, so any code that must happen after the prompt is dismissed should be placed within the callback function for this prompt.
 * @returns an object upon which Bootstrap's modal function has been called
 */
function prompt(...args: any[]) {
	let options: Options;
	let promptDialog: HTMLElement;
	let form: HTMLElement;
	let input: HTMLElement;
	let shouldShow: boolean;
	let inputOptions;

	// We have to create our form first, otherwise its value is undefined when gearing up our options.
	// @TODO this could be solved by allowing message to be a function instead...
	form = generateElement(templates.form);

	// prompt defaults are more complex than others in that users can override more defaults
	options = mergeDialogOptions('prompt', ['cancel', 'confirm'], ['title', 'callback'], args);

	if (!options.value) {
		options.value = defaults.value;
	}

	if (!options.inputType) {
		options.inputType = defaults.inputType;
	}

	// Capture the user's 'show' value; we always set this to false before spawning the dialog to give us a chance to attach some handlers to it, but we need to make sure we respect a preference not to show it
	shouldShow = (options.show === undefined) ? defaults.show : options.show;

	// This is required prior to calling the dialog builder below - we need to add an event handler just before the prompt is shown
	options.show = false;

	// Handles the 'cancel' action
	var cancel = options.buttons!['cancel'];

	if (!cancel) {
		options.buttons!['cancel'] = createButton('cancel', options.locale!);
		cancel = options.buttons!['cancel'];
	}

	cancel.callback = options.onEscape = function() {
		return options.callback?.call(this, null);
	};

	options.buttons!['cancel'] = cancel;

	// Prompt submitted - extract the prompt value. This requires a bit of work, given the different input types available.
	var confirm = options.buttons!['confirm'];

	if (!confirm) {
		options.buttons!['confirm'] = createButton('confirm', options.locale!);
		confirm = options.buttons!['confirm'];
	}

	confirm.callback = function() {
		let value;

		form.classList.add('was-validated');

		if (options.inputType === 'checkbox') {
			const checkedInputs =
				Array.from(input.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked'));

			value = Array.from(checkedInputs).map(e => e.value);

			if (options.required === true && checkedInputs.length === 0) {
				// prevents button callback from being called if no checkboxes have been checked
				return false;
			}
		} else if (options.inputType === 'radio') {
			value = input.querySelector<HTMLInputElement>('input[type="radio"]:checked')!.value;
		} else {
			let el = input as HTMLInputElement;

			// this must be done every time; otherwise, input is reported invalid even if value is valid
			el.setCustomValidity('');

			// trigger built-in validation if checkValidity() function is defined
			if (el.checkValidity && !el.checkValidity()) {
				// If a custom error message was provided, add it now
				if (options.errorMessage) {
					el.setCustomValidity(options.errorMessage);
				}

				// trigger built-in validation message if reportValidity() function is defined
				if (el.reportValidity) {
					el.reportValidity();
				}

				// prevents button callback from being called
				return false;
			} else {
				if (options.inputType === 'select' && options.multiple === true) {
					value = Array.from(input.querySelectorAll<HTMLInputElement>('option:checked'))
						.map(option => option.value);
				} else {
					value = el.value;
				}
			}
		}

		return options.callback?.call(this, value);
	};

	options.buttons!['confirm'] = confirm;

	// prompt-specific validation
	if (!options.title) {
		throw new Error('prompt requires a title');
	}

	if (typeof options.callback !== 'function') {
		throw new Error('prompt requires a callback');
	}

	var inputs = templates.inputs as any;

	if (!inputs[options.inputType]) {
		throw new Error('Invalid prompt type');
	}

	// Create the input based on the supplied type
	input = generateElement(inputs[options.inputType]);

	if (options.inputType !== 'textarea') {
      input.addEventListener('keydown', function(ev: KeyboardEvent) {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          var acceptButton = promptDialog.querySelector<HTMLElement>('.bootbox-accept')!;

		  trigger(acceptButton, 'click');
        }
      });
    }

	switch (options.inputType) {
	case 'text':
	case 'textarea':
	case 'email':
	case 'password':
		(input as HTMLInputElement).value = options.value.toString();

		if (options.placeholder) {
			input.setAttribute('placeholder', options.placeholder);
		}

		if (options.pattern) {
			input.setAttribute('pattern', options.pattern);
		}

		if (options.maxlength) {
			input.setAttribute('maxlength', options.maxlength.toString());
		}

		if (options.required) {
			(input as HTMLInputElement).required = true;
		}

		if (options.inputType === 'textarea') {
			if (options.rows && !isNaN(parseInt(options.rows.toString()))) {
				input.setAttribute('rows', options.rows.toString());
			}
		}
		break;

	case 'date':
	case 'time':
	case 'number':
	case 'range':
		(input as HTMLInputElement).value = options.value.toString();

		if (options.placeholder) {
			input.setAttribute('placeholder', options.placeholder);
		}

		if (options.pattern) {
			input.setAttribute('pattern', options.pattern);
		} else {
			if (options.inputType === 'date') {
				// Add the ISO-8601 short date format as a fallback for browsers without native type="date" support
				input.setAttribute('pattern', '\d{4}-\d{2}-\d{2}');
			} else if (options.inputType === 'time') {
				// Add an HH:MM pattern as a fallback for browsers without native type="time" support
				input.setAttribute('pattern', '\d{2}:\d{2}');
			}
		}

		if (options.required) {
			(input as HTMLInputElement).required = true;
		}


		if (options.step) {
			if (typeof options.step === 'string' && (options.step === 'any' || parseFloat(options.step) > 0)) {
				input.setAttribute('step', options.step);
			} else if (typeof options.step === 'number' && (!isNaN(options.step) && options.step > 0)) {
				input.setAttribute('step', options.step.toString());
			} else {
				throw new Error(
					'"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
			}
		}

		if (minAndMaxAreValid(options.inputType, options.min, options.max)) {
			if (options.min !== undefined) {
				input.setAttribute('min', options.min.toString());
			}
			if (options.max !== undefined) {
				input.setAttribute('max', options.max.toString());
			}
		}
		break;

	case 'select':
		var groups: InputGroup = {};
		inputOptions = options.inputOptions || [];

		if (!Array.isArray(inputOptions)) {
			throw new Error('Please pass an array of input options');
		}

		if (!inputOptions.length) {
			throw new Error('prompt with "inputType" set to "select" requires at least one option');
		}

		if (options.required) {
			(input as HTMLInputElement).required = true;
		}

		if (options.multiple) {
			(input as HTMLInputElement).multiple = true;
		}

		for (const [, option] of Object.entries(inputOptions)) {
			// Assume the element to attach to is the input...
			let elem = input;

			if (option.value === undefined || option.text === undefined) {
				throw new Error('each option needs a "value" property and a "text" property');
			}

			// ... but override that element if this option sits in a group

			if (option.group) {

				// Initialise group if necessary
				if (!groups[option.group]) {
					var groupElement = generateElement('<optgroup />');
					groupElement.setAttribute('label', option.group);

					groups[option.group] = {
						Content: groupElement
					};
				}

				elem = groups[option.group].Content;
			}

			let o = generateElement(templates.option);

			o.setAttribute('value', option.value);
			o.textContent = option.text;


			elem.append(o);
		}

		for (const [_, group] of Object.entries(groups)) {
			input.append(group.Content);
		}

		// Safe to set a select's value as per a normal input
		(input as HTMLInputElement).value = options.value.toString();
		break;

	case 'checkbox':
		var checkboxValues = Array.isArray(options.value) ? options.value : [options.value];
		inputOptions = options.inputOptions || [];

		if (!inputOptions.length) {
			throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
		}

		// Checkboxes have to nest within a containing element, so they break the rules a bit and we end up re-assigning our 'input' element to this container instead
		input = generateElement('<div class="bootbox-checkbox-list"></div>');

		for (const [_, option] of Object.entries(inputOptions)) {
			if (option.value === undefined || option.text === undefined) {
				throw new Error('each option needs a "value" property and a "text" property');
			}

			let checkbox = generateElement(templates.inputs[options.inputType]);

			checkbox.querySelector<HTMLInputElement>('input')?.setAttribute('value', option.value);
			checkbox.querySelector<HTMLLabelElement>('label')?.append(`\n${option.text}`);

			// We've ensured values is an array, so we can always iterate over it
			for (const [_, value] of Object.entries(checkboxValues)) {
				if (value === option.value) {
					checkbox.querySelector<HTMLInputElement>('input')?.setAttribute('checked', 'true');
				}
			}

			input.append(checkbox);
		}
		break;

	case 'radio':
		// Make sure that value is not an array (only a single radio can ever be checked)
		if (options.value !== undefined && Array.isArray(options.value)) {
			throw new Error(
				'prompt with "inputType" set to "radio" requires a single, non-array value for "value"');
		}

		inputOptions = options.inputOptions || [];

		if (!inputOptions.length) {
			throw new Error('prompt with "inputType" set to "radio" requires at least one option');
		}

		// Radiobuttons have to nest within a containing element, so they break the rules a bit and we end up re-assigning our 'input' element to this container instead
		input = generateElement('<div class="bootbox-radiobutton-list"></div>');

		// Radiobuttons should always have an initial checked input checked in a "group".
		// If value is undefined or doesn't match an input option, select the first radiobutton
		var checkFirstRadio = true;

		for (const [_, option] of Object.entries(inputOptions)) {
			if (option.value === undefined || option.text === undefined) {
				throw new Error('each option needs a "value" property and a "text" property');
			}

			let radio = generateElement(templates.inputs[options.inputType]);

			radio.querySelector<HTMLInputElement>('input')?.setAttribute('value', option.value);
			radio.querySelector<HTMLLabelElement>('label')?.append(`\n${option.text}`);

			if (options.value !== undefined) {
				if (option.value === options.value) {
					radio.querySelector<HTMLInputElement>('input')!.checked = true;
					checkFirstRadio = false;
				}
			}

			input.append(radio);
		}

		if (checkFirstRadio) {
			input.querySelector<HTMLElement>('input[type="radio"]')?.setAttribute('checked', 'true');
		}
		break;
	}

	// Now place it in our form
	form.append(input);

	form.addEventListener('submit',
		e => {
			e.preventDefault();
			// Fix for SammyJS (or similar JS routing library) hijacking the form post.
			e.stopPropagation();

			form.classList.remove('was-validated');

			// @TODO can we actually click *the* button object instead?
			// e.g. buttons.confirm.click() or similar
			promptDialog.querySelector<HTMLElement>('.bootbox-accept')?.click();
		});

	if (options.message && options.message.trim() !== '') {
		// Add the form to whatever content the user may have added.
		let message = generateElement(templates.promptMessage).innerHTML = options.message;
		form.prepend(message);
		options.messageForm = form;
	} else {
		options.messageForm = form;
	}

	// Generate the dialog
	promptDialog = dialog(options);

	// Clear the existing handler focusing the submit button...
	promptDialog.removeEventListener('shown.bs.modal', focusPrimaryButton);

	// ...and replace it with one focusing our input, if possible
	promptDialog.addEventListener('shown.bs.modal',
		() => {
			// Need the closure here since input isn't can object otherwise
			input.focus();
		});

	const modal = new bootstrap.Modal(promptDialog);

	if (shouldShow === true) {
		modal.show();
	}

	return promptDialog;
};

// INTERNAL FUNCTIONS
// *************************************************************************************************************
function extend(...args: any[]): any {
	// Variables
	const extended: CustomProperties = {};
	let deep = false;
	let i = 0;
	const length = args.length;

	// Check if a deep merge
	if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
		deep = args[0];
		i++;
	}

	// Merge the object into the extended object
	const merge = (obj: CustomProperties): void => {
		for (const prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				// If deep merge and property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					extended[prop] = extend(true, extended[prop], obj[prop]);
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	// Loop through each object and conduct a merge
	for (; i < length; i++) {
		const obj = args[i];
		merge(obj);
	}

	return extended;
}

// *************************************************************************************************************

// Map a flexible set of arguments into a single returned object.
// If args.length is already one just return it, otherwise use the properties argument to map the unnamed args to object properties.
// So in the latter case:
//
//    mapArguments(["foo", $.noop], ["message", "callback"])
//  
//  results in
//
//    { message: "foo", callback: $.noop }
//
function mapArguments(args: any[], properties: string[]): CustomProperties {
	const argsLength = args.length;
	let options: CustomProperties = {};

	if (argsLength < 1 || argsLength > 2) {
		throw new Error('Invalid argument length');
	}

	if (argsLength === 2 || typeof args[0] === 'string') {
		options[properties[0]] = args[0];
		options[properties[1]] = args[1];
	} else {
		options = args[0];
	}

	return options;
}


// Merge a set of default dialog options with user supplied arguments
function mergeArguments(
    defaults: Options,
    args: any,
    properties: string[]
): Options {
    return extend(
        {}, // Ensure the target is an empty, unreferenced object
        defaults, // Base options object
        mapArguments(args, properties) // Map array to object if necessary
    );
}


// This entry-level method makes heavy use of composition to take a simple range of inputs and return valid options suitable for passing to bootbox.dialog
function mergeDialogOptions(className: string, labels: string[], properties: string[], args: any) {
    let locale;
    if (args && args[0]) {
        locale = args[0].locale || defaults.locale;
        const swapButtons = args[0].swapButtonOrder || defaults.swapButtonOrder;

        if (swapButtons) {
            labels = labels.reverse();
        }
    }

    // Build up a base set of dialog properties
    const baseOptions : Options = {
        className: `bootbox-${className}`,
        buttons: createLabels(labels, locale),
        show: true,
        closeButton: true,
        animate: true,
        locale: 'en',
        swapButtonOrder: false,
        scrollable: false,
        reusable: false,
        centerVertical: false
    };

    // Ensure the buttons properties generated, *after* merging with user args are still valid against the supplied labels
    return validateButtons(
        // Merge the generated base properties with user supplied arguments
        mergeArguments(
            baseOptions,
            args,
            // If args.length > 1, properties specify how each arg maps to an object key
            properties
        ),
        labels
    );
}


// Checks each button object to see if key is valid. 
// This function will only be called by the alert, confirm, and prompt helpers. 
function validateButtons(options: Options, buttons: string[]): Options {
    const allowedButtons: Record<string, boolean> = {};

    for (const [_, value] of Object.entries(buttons)) {
        allowedButtons[value] = true;
    }

    for (const [key] of Object.entries(options.buttons!)) {
        if (allowedButtons[key] === undefined) {
            throw new Error(`button key "${key}" is not allowed (options are ${buttons.join(' ')})`);
        }
    }

    return options;
}


// From a given list of arguments, return a suitable object of button labels.
// All this does is normalise the given labels and translate them where possible.
// e.g. "ok", "confirm" -> { ok: "OK", cancel: "Annuleren" }
function createLabels(labels: string[], locale: string) : Buttons {
    const buttons: Buttons = {};

    for (let i = 0, j = labels.length; i < j; i++) {
        const argument = labels[i];
        const key = argument.toLowerCase();
        const value = argument.toUpperCase();

       buttons[key] = {
                    label: getText(value, locale),
                    className: ''
                };
    }

    return buttons;
}

function createButton(label: string, locale: string) : Button {
	const button: Button = {
		label: getText(label.toUpperCase(), locale),
		className: ''
	};

	return button;
}

// Get localized text from a locale. Defaults to 'en' locale if no locale provided or a non-registered locale is requested
function getText(key: string, locale: string) : string  {
    const labels = locales[locale];

    return labels ? labels[key as keyof Locale] : locales.en[key as keyof Locale];
}

// Filter and tidy up any user supplied parameters to this dialog.
// Also looks for any shorthands used and ensures that the options which are returned are all normalized properly
function sanitize(options: Options) : Options {
    let buttons;
    let total;

    if (!options.message && !options.messageForm) {
        throw new Error('"message" option must not be null or an empty string.');
    }

    // Make sure any supplied options take precedence over defaults
    options = Object.assign({}, defaults, options);

    // Make sure backdrop is either true, false, or 'static'
    if (!options.backdrop) {
        options.backdrop = (options.backdrop === false || options.backdrop === 0) ? false : 'static';
    } else {
        options.backdrop = typeof options.backdrop === 'string' && options.backdrop.toLowerCase() === 'static' ? 'static' : true;
    }

    // No buttons is still a valid dialog but it's cleaner to always have a buttons object to iterate over, even if it's empty
    if (!options.buttons) {
        options.buttons = {};
    }

    buttons = options.buttons;

    total = getKeyLength(buttons);

    let index = 0;

    for (let [key, button] of Object.entries(buttons)) {
        if (typeof button === 'function') {
            // Short form, assume value is our callback. Since button isn't an object it isn't a reference either so re-assign it
            button = buttons[key] = {
                callback: button,
                label: '',
                className: ''
            };
        }

        // Before any further checks, make sure button is the correct type
        if (Object.prototype.toString
            .call(button)
            .replace(/^\[object (.+)\]$/, '$1')
            .toLowerCase() !==
            'object') {
            throw new Error(`button with key "${key}" must be an object`);
        }

        if (!button.label) {
            // The lack of an explicit label means we'll assume the key is good enough
            button.label = key;
        }

        if (!button.className) {
            let isPrimary = false;
            if (options.swapButtonOrder) {
                isPrimary = index === 0;
            } else {
                isPrimary = index === total - 1;
            }

            if (total <= 2 && isPrimary) {
                // always add a primary to the main option in a one or two-button dialog
                button.className = 'btn-primary';
            } else {
                // adding both classes allows us to target both BS3 and BS4+ without needing to check the version
                button.className = 'btn-secondary';
            }
        }

        index++;
    }

    return options;
}

function focusPrimaryButton(e: any) {
    const button = e?.data?.dialog?.querySelector('.bootbox-accept') as HTMLElement;
    if (button) {
        trigger(button, 'focus');
    }
}

// Returns a count of the properties defined on the object
        function getKeyLength(obj: any) {
            return Object.keys(obj).length;
        }


//  Handle the invoked dialog callback
function processCallback(e: Event,
	dialog: HTMLElement | null,
	callback?: (e: Event) => boolean | void) {
    e.stopPropagation();
    e.preventDefault();

    // By default we assume a callback will get rid of the dialog, although it is given the opportunity to override this
    // If the callback can be invoked and it *explicitly returns false*, then we'll set a flag to keep the dialog active...
    const preserveDialog = typeof callback === 'function' && callback.call(dialog, e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog && dialog) {
        bootstrap.Modal.getInstance(dialog)?.hide();
    }
}

// Validate `min` and `max` values based on the current `inputType` value
function minAndMaxAreValid(
	type: string,
	min?: string | number,
	max?: string | number
): boolean {
	let result = false;
	let minValid = true;
	let maxValid = true;

	if (type === 'date') {
		if (min !== undefined && !(minValid = dateIsValid(min as string))) {
			console.warn('Invalid "min" date format for input type "date".');
		} else if (max !== undefined && !(maxValid = dateIsValid(max as string))) {
			console.warn('Invalid "max" date format for input type "date".');
		}
	} else if (type === 'time') {
		if (min !== undefined && !(minValid = timeIsValid(min as string))) {
			throw new Error('"min" is not a valid time.');
		} else if (max !== undefined && !(maxValid = timeIsValid(max as string))) {
			throw new Error('"max" is not a valid time.');
		}
	} else {
		if (min !== undefined && isNaN(Number(min))) {
			minValid = false;
			throw new Error('"min" must be a valid number.');
		}

		if (max !== undefined && isNaN(Number(max))) {
			maxValid = false;
			throw new Error('"max" must be a valid number.');
		}
	}

	if (minValid && maxValid) {
        if (typeof min === 'number' && typeof max === 'number' && max < min) {
			throw new Error('"max" must be greater than or equal to "min".');    
		}
        else if (typeof min === 'string' && typeof max === 'string' && max < min) {
			throw new Error('"max" must be greater than or equal to "min".');    
		}  else {
			result = true;
		}
	}

	return result;
}

// helper Class
function generateElement(html: string): HTMLElement {
	const template = document.createElement('template');
	template.innerHTML = html.trim();
	return template.content.children[0] as HTMLElement;
}
function addEventListener(el: HTMLElement, eventName: string, eventHandler: (this: HTMLElement, e: Event) => void, selector?: string): (e: Event) => void {
	if (selector) {
		const wrappedHandler = (e: Event) => {
			if (!e.target) return;
			const targetEl = (e.target as HTMLElement).closest(selector) as HTMLElement;
			if (targetEl) {
				eventHandler.call(targetEl, e);
			}
		};
		el.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	} else {
		const wrappedHandler = (e: Event) => {
			eventHandler.call(el, e);
		};
		el.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	}
}

export {
	VERSION,
	getAllLocales,
	getLocale,
	addLocale,
	removeLocale,
	setLocale,
	setDefaults,
    hideAll,
    dialog,
    alert,
    confirm,
	prompt,
	initFn as init
};