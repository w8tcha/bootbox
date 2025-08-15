import {describe,beforeEach, it, expect, vi} from  'vitest';
import * as bootbox from '../src/bootbox';
import * as bootstrap from 'bootstrap';
import Options from '../src/interfaces/Options';

let options: Options;
let callback: any;
let hidden: any;
let create: any;
let shown: any;

let dialog: HTMLElement | null;
let button: HTMLElement | null | undefined;

 var find = (selector: string) : HTMLElement | null | undefined => dialog?.querySelector<HTMLElement>(selector);
        var text = (selector: string) => find(selector)?.textContent;
        var exists = (selector: string) : boolean => find(selector) !== null;

describe('bootbox.prompt', () => {
    'use strict';
    // basic tests
    describe('basic usage tests', () => {
        describe('with one argument', () => {
            describe('where the argument is not an object', () => {
                beforeEach(() => {
                    create = () => bootbox.prompt('What is your name?');
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt('What is your name?')).toThrowError('prompt requires a callback');
                });
            });


            describe('where the argument is an object', () => {
                beforeEach(() => {
                    options = {};
                    create = (_this => () => dialog = bootbox.prompt(options))(this);
                });

                describe('with a title property', () => {
                    beforeEach(() => options.title = 'What is your name?');

                    it('throws an error requiring a callback', () => {
                        expect(() => bootbox.prompt('What is your name?')).toThrowError('prompt requires a callback');
                    });

                    describe('and a callback property', () => {
                        describe('where the callback is not a function', () => {
                            beforeEach(() => options.callback = 'Not a function');
                            it('throws an error requiring a callback', () => {
                                expect(() => bootbox.prompt('What is your name?')).toThrowError('prompt requires a callback');
                            });
                        });
                    });
                });


                describe('with a callback function', () => {
                    beforeEach(() => {
                        options.callback = () => true;
                    });
                    it('throws an error requiring a title', () => {
                        expect(() => bootbox.prompt(options)).toThrowError('prompt requires a title');
                    });
                });


                describe('with a title and a callback', () => {
                    beforeEach(() => {
                        options = {
                            callback() {
                                return true;
                            },
                            title: 'What is your name?'
                        };

                        create = () => {
                            dialog = bootbox.prompt(options);
                        };
                    });

                    it('does not throw an error', () => {
                        expect(create).not.to.throw(Error);
                    });
                    it('creates a dialog object', () => {
                        expect(bootstrap.Modal.getInstance(dialog)).to.be.an('object');
                    });
                    it('applies the bootbox-prompt class to the dialog', () => {
                        expect(dialog?.classList).toContain('bootbox-prompt');
                    });
                    it('adds the correct button labels', () => {
                        expect(dialog?.querySelector('.btn:first-child')?.textContent).to.equal('Cancel');
                        expect(dialog?.querySelector('.btn:last-child')?.textContent).to.equal('OK');
                    });
                    it('adds the correct button classes', () => {
                        expect(dialog?.querySelector('.btn:first-child')?.classList).toContain('btn-secondary');
                        expect(dialog?.querySelector('.btn:first-child')?.classList).toContain('bootbox-cancel');

                        expect(dialog?.querySelector('.btn:last-child')?.classList).toContain('btn-primary');
                        expect(dialog?.querySelector('.btn:last-child')?.classList).toContain('bootbox-accept');
                    });
                });
            });
        });


        describe('with two arguments', () => {
            describe('where the second argument is not a function', () => {
                beforeEach(() => {
                    create = (_this => () => dialog = bootbox.prompt('What is your name?', 'callback here'))(this);
                });
                it('throws an error requiring a callback', () => {
                    expect(() => bootbox.prompt('What is your name?')).toThrowError('prompt requires a callback');
                });
            });

            describe('where the second argument is a function', () => {
                beforeEach(() => {
                    create = (_this => () => dialog = bootbox.prompt('What is your name?', () => {
                        return true;
                    }))(this);
                });

                it('does not throw an error', () => {
                    expect(create).not.to.throw(Error);
                });
                it('creates a dialog object', () => {
                    expect(bootstrap.Modal.getInstance(dialog)).to.be.an('object');
                });
                it('adds the correct button labels', () => {
                    expect(text('.btn:first-child')).to.equal('Cancel');
                    expect(text('.btn:last-child')).to.equal('OK');
                });
                it('adds the correct button classes', () => {
                    expect(dialog?.querySelector<HTMLElement>('.btn:first-child')?.classList).toContain('btn-secondary');
                    expect(dialog?.querySelector<HTMLElement>('.btn:first-child')?.classList).toContain('bootbox-cancel');

                    expect(dialog?.querySelector<HTMLElement>('.btn:last-child')?.classList).toContain('btn-primary');
                    expect(dialog?.querySelector<HTMLElement>('.btn:last-child')?.classList).toContain('bootbox-accept');
                });
                it('adds the expected dialog title', () => {
                    expect(text('.modal-title')).to.equal('What is your name?');
                });
                it('adds a close button', () => {
                    expect(dialog?.querySelector('.modal-header .close')).to.be.ok;
                });
                it('creates a form with a text input', () => {
                    expect(dialog?.querySelector('form input[type=text]')).to.be.ok;
                });
                it('with no default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('form input[type="text"]')?.value).to.equal('');
                });
                it('shows the dialog', () => {
                    var isVisible = bootstrap.Modal.getInstance(dialog)?._isShown;
                    expect(isVisible).to.be.true;
                });
            });
        });
    });

    // options
    describe('configuration options tests', () => {
        beforeEach(() => {
            options = {
                title: 'What is your name?',
                callback() {
                    return true;
                }
            };
            create = (_this => () => dialog = bootbox.prompt(options))(this);
        });

        // centerVertical option set to true
        describe('with `centerVertical` set to `true`', () => {
            beforeEach(() => {
                options.centerVertical = true;

                create();
            });
            it('adds the modal-dialog-centered class to the innerDialog of the prompt', () => {
                expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-dialog-centered');
            });
        });

        // centerVertical option set to false
        describe('with `centerVertical` set to `false`', () => {
            beforeEach(() => {
                options.centerVertical = false;

                create();
            });
            it('does not add the modal-dialog-centered class to the innerDialog of the prompt', () => {
                expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).not.toContain('modal-dialog-centered');
            });
        });

        // custom cancel button
        describe('with a custom cancel button', () => {
            beforeEach(() => {
                options.buttons = {
                    cancel: {
                        label: 'Custom cancel',
                        className: 'btn-danger',
                    }
                };
                create();
                button = dialog?.querySelector<HTMLElement>('.btn:first-child');
            });
            it('adds the correct cancel button', () => {
                expect(button?.textContent).to.equal('Custom cancel');
                expect(button?.classList).toContain('btn-danger');
            });
        });

        // custom confirm button
        describe('with a custom confirm button', () => {
            beforeEach(() => {
                options.buttons = {
                    confirm: {
                        label: 'Custom confirm',
                        className: 'btn-warning'
                    }
                };
                create();
                return button = dialog?.querySelector<HTMLElement>('.btn:first-child');
            });
            it('adds the correct confirm button', () => {
                expect(button?.textContent).to.equal('Custom confirm');
                expect(button?.classList).toContain('btn-warning');
            });
        });

        // unrecognised button key
        describe('with an unrecognised button key', () => {
            beforeEach(() => options.buttons = {
                prompt: {
                    label: 'Custom confirm',
                    className: 'btn-warning'
                }
            });
            it('throws an error', () => {
                expect(() => bootbox.prompt(options)).toThrowError('button key "prompt" is not allowed (options are cancel confirm)');
            });
        });

        // manual show
        describe('setting show to false', () => {
            beforeEach(() => {
                shown = vi.fn();
                options.show = false;
                options.onShow = shown;
                return create();
            });
            it('does not show the dialog', () => {
                expect(shown).not.toHaveBeenCalled();
            });
        });

        // invalid prompt type
        describe('invalid prompt type', () => {
            beforeEach(() => options.inputType = 'foobar');
            it('throws an error', () => {
                expect(() => bootbox.prompt(options)).toThrowError('Invalid prompt type');
            });
        });

        // text
        describe('setting inputType text', () => {
            beforeEach(() => options.inputType = 'text');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows text input ', () => {
                    expect(exists('input[type="text"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="text"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="text"]')?.classList).toContain('bootbox-input-text');
                });
            });

            describe('with default value', () => {
                beforeEach(() => {
                    options.value = 'John Smith';
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="text"]')?.value).to.equal('John Smith');
                });
            });

            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter your name';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('input[type="text"]')?.getAttribute('placeholder')).to.equal('enter your name');
                });
            });

            describe('with maxlength', () => {
                beforeEach(() => {
                    options.maxlength = 5;
                    return create();
                });
                it('has correct maxlength value', () => {
                    expect(find('input[type="text"]')?.getAttribute('maxlength')).to.equal('5');
                });
            });
        });

        // textarea
        describe('setting inputType textarea', () => {
            beforeEach(() => options.inputType = 'textarea');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows text input', () => {
                    expect(exists('textarea')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('textarea')?.classList).toContain('bootbox-input');
                    expect(find('textarea')?.classList).toContain('bootbox-input-textarea');
                });
            });

            describe('with default value', () => {
                beforeEach(() => {
                    options.value = 'Once upon a time...';
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLTextAreaElement>('textarea')?.value).to.equal('Once upon a time...');
                });
            });

            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter your favorite fairy tale';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('textarea')?.getAttribute('placeholder')).to.equal('enter your favorite fairy tale');
                });
            });

            describe('with rows', () => {
                beforeEach(() => {
                    options.rows = 6;
                    return create();
                });
                it('has correct rows value', () => {
                    expect(find('textarea')?.getAttribute('rows')).to.equal('6');
                });
            });
        });

        // email
        describe('setting inputType email', () => {
            beforeEach(() => options.inputType = 'email');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows email input', () => {
                    expect(exists('input[type="email"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="email"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="email"]')?.classList).toContain('bootbox-input-email');
                });
            });
            describe('with default value', () => {
                beforeEach(() => {
                    options.value = 'john@smith.com';
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="email"]')?.value).to.equal('john@smith.com');
                });
            });
            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter your email';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('input[type="email"]')?.getAttribute('placeholder')).to.equal('enter your email');
                });
            });
            describe('with pattern', () => {
                beforeEach(() => {
                    options.pattern = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";
                    return create();
                });
                it('has correct pattern value', () => {
                    expect(find('input[type="email"]')?.getAttribute('pattern')).to.equal("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/");
                });
            });
        });

        // password
        describe('setting inputType password', () => {
            beforeEach(() => options.inputType = 'password');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows password input', () => {
                    expect(exists('input[type="password"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="password"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="password"]')?.classList).toContain('bootbox-input-password');
                });
            });
            describe('with default value', () => {
                beforeEach(() => {
                    options.value = 'qwerty';
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="password"]')?.value).to.equal('qwerty');
                });
            });
            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter your password';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('input[type="password"]')?.getAttribute('placeholder')).to.equal('enter your password');
                });
            });
        });

        // select
        describe('setting inputType select', () => {
            describe('without options', () => {
                beforeEach(() => options.inputType = 'select');
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('prompt with "inputType" set to "select" requires at least one option');
                });
            });
            describe('with invalid options', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    return options.inputOptions = 'foo';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('Please pass an array of input options');
                });
            });
            describe('with empty options', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    return options.inputOptions = [];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('prompt with "inputType" set to "select" requires at least one option');
                });
            });
            describe('with options in the wrong format', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    return options.inputOptions = [
                        {
                            foo: 'bar'
                        }
                    ];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('each option needs a "value" property and a "text" property');
                });
            });
            describe('with a value but no text', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    return options.inputOptions = [
                        {
                            value: 'bar'
                        }
                    ];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('each option needs a "value" property and a "text" property');
                });
            });
            describe('with an invalid second options', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    return options.inputOptions = [
                        {
                            value: 'bar',
                            text: 'bar'
                        }, {
                            text: 'foo'
                        }
                    ];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('each option needs a "value" property and a "text" property');
                });
            });
            describe('with valid options', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    options.inputOptions = [
                        {
                            value: 1,
                            text: 'foo'
                        }, {
                            value: 2,
                            text: 'bar'
                        }, {
                            value: 3,
                            text: 'foobar'
                        }
                    ];
                    return create();
                });
                it('shows select input', () => {
                    expect(exists('select')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('select')?.classList).toContain('bootbox-input');
                    expect(find('select')?.classList).toContain('bootbox-input-select');
                });
                it('with three options', () => {
                    expect(dialog?.querySelectorAll('option').length).to.equal(3);
                });
            });
            describe('with zero as the first option', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    options.inputOptions = [
                        {
                            value: 0,
                            text: 'foo'
                        }
                    ];
                    return create();
                });
                it('shows the select input', () => {
                    expect(exists('select')).to.be.true;
                });
            });
            describe('with false as the first option', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    options.inputOptions = [
                        {
                            value: false,
                            text: 'foo'
                        }
                    ];
                    return create();
                });
                it('shows the select input', () => {
                    expect(exists('select')).to.be.true;
                });
            });
            describe('with option groups', () => {
                beforeEach(() => {
                    options.inputType = 'select';
                    options.inputOptions = [
                        {
                            value: 1,
                            group: 'foo',
                            text: 'foo'
                        }, {
                            value: 2,
                            group: 'bar',
                            text: 'bar'
                        }, {
                            value: 3,
                            group: 'foo',
                            text: 'foobar'
                        }, {
                            value: 4,
                            group: 'bar',
                            text: 'barfoo'
                        }
                    ];
                    return create();
                });
                it('shows select input', () => {
                    expect(exists('select')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('select')?.classList).toContain('bootbox-input');
                    expect(find('select')?.classList).toContain('bootbox-input-select');
                });
                it('with two option group', () => {
                    expect(dialog?.querySelectorAll('optgroup').length).to.equal(2);
                });
                it('with four options', () => {
                    expect(dialog?.querySelectorAll('option').length).to.equal(4);
                });
            });
        });

        // checkbox
        describe('setting inputType checkbox', () => {
            describe('without options', () => {
                beforeEach(() => options.inputType = 'checkbox');
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('prompt with "inputType" set to "checkbox" requires at least one option');
                });
            });
            describe('with options in the wrong format', () => {
                beforeEach(() => {
                    options.inputType = 'checkbox';
                    return options.inputOptions = [
                        {
                            foo: 'bar'
                        }
                    ];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('each option needs a "value" property and a "text" property');
                });
            });
            describe('with options', () => {
                beforeEach(() => {
                    options.inputType = 'checkbox';
                    options.inputOptions = [
                        {
                            value: 1,
                            text: 'foo'
                        }, {
                            value: 2,
                            text: 'bar'
                        }, {
                            value: 3,
                            text: 'foobar'
                        }
                    ];
                    return create();
                });
                it('shows checkbox input', () => {
                    expect(exists('input[type="checkbox"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="checkbox"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="checkbox"]')?.classList).toContain('bootbox-input-checkbox');
                });
                it('with three checkboxes', () => {
                    expect(dialog?.querySelectorAll('input[type="checkbox"]').length).to.equal(3);
                });
            });
        });

        // radio
        describe('setting inputType radio', () => {
            describe('without options', () => {
                beforeEach(() => options.inputType = 'radio');
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('prompt with "inputType" set to "radio" requires at least one option');
                });
            });
            describe('with options in the wrong format', () => {
                beforeEach(() => {
                    options.inputType = 'radio';
                    return options.inputOptions = [
                        {
                            foo: 'bar'
                        }
                    ];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('each option needs a "value" property and a "text" property');
                });
            });
            describe('with options', () => {
                beforeEach(() => {
                    options.inputType = 'radio';
                    options.inputOptions = [
                        {
                            value: 1,
                            text: 'foo'
                        }, {
                            value: 2,
                            text: 'bar'
                        }, {
                            value: 3,
                            text: 'foobar'
                        }
                    ];
                    return create();
                });
                it('shows radio input', () => {
                    expect(exists('input[type="radio"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="radio"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="radio"]')?.classList).toContain('bootbox-input-radio');
                });
                it('with three radios', () => {
                    expect(dialog?.querySelectorAll('input[type="radio"]').length).to.equal(3);
                });
            });
            describe('with an invalid value', () => {
                beforeEach(() => {
                    options.inputType = 'radio';
                    options.inputOptions = [
                        {
                            value: 1,
                            text: 'foo'
                        }, {
                            value: 2,
                            text: 'bar'
                        }, {
                            value: 3,
                            text: 'foobar'
                        }
                    ];
                    options.value = [2, 3];
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');
                });
            });
        });

        // date
        describe('setting inputType date', () => {
            beforeEach(() => options.inputType = 'date');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows date input ', () => {
                    expect(exists('input[type="date"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="date"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="date"]')?.classList).toContain('bootbox-input-date');
                });
            });
            describe('with default value', () => {
                beforeEach(() => {
                    options.value = '2005-08-17';// This must be an ISO-8601 date
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="date"]')?.value).to.equal('2005-08-17');
                });
            });
            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter the date';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('input[type="date"]')?.getAttribute('placeholder')).to.equal('enter the date');
                });
            });
            describe('with pattern', () => {
                beforeEach(() => {
                    options.pattern = '\d{1,2}/\d{1,2}/\d{4}';
                    return create();
                });
                it('has correct pattern value', () => {
                    expect(find('input[type="date"]')?.getAttribute('pattern')).to.equal('\d{1,2}/\d{1,2}/\d{4}');
                });
            });
        });

        // time
        describe('setting inputType time', () => {
            beforeEach(() => options.inputType = 'time');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows time input', () => {
                    expect(exists('input[type="time"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="time"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="time"]')?.classList).toContain('bootbox-input-time');
                });
            });
            describe('with default value', () => {
                beforeEach(() => {
                    options.value = '19:02';
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="time"]')?.value).to.equal('19:02');
                });
            });
            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter the time';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('input[type="time"]')?.getAttribute('placeholder')).to.equal('enter the time');
                });
            });
            describe('with pattern', () => {
                beforeEach(() => {
                    options.pattern = "(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)";
                    return create();
                });
                it('has correct pattern value', () => {
                    expect(find('input[type="time"]')?.getAttribute('pattern')).to.equal("(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)");
                });
            });
            describe('with min value', () => {
                beforeEach(() => {
                    options.min = '00:00:00';
                    return create();
                });
                it('has correct min value', () => {
                    expect(find('input[type="time"]')?.getAttribute('min')).to.equal('00:00:00');
                });
            });
            describe('with max value', () => {
                beforeEach(() => {
                    options.max = '23:59:59';
                    return create();
                });
                it('has correct max value', () => {
                    expect(find('input[type="time"]')?.getAttribute('max')).to.equal('23:59:59');
                });
            });
            describe('with step value', () => {
                beforeEach(() => {
                    options.step = '10';
                    return create();
                });
                it('has correct step value', () => {
                    expect(find('input[type="time"]')?.getAttribute('step')).to.equal('10');
                });
            });
            describe('with an invalid min value', () => {
                beforeEach(() => {
                    options.min = 'a';
                    options.max = '18:00:00';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"min" is not a valid time.');
                });
            });
            describe('with an invalid max value', () => {
                beforeEach(() => {
                    options.min = '08:00:00';
                    options.max = 'a';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"max" is not a valid time.');
                });
            });
            describe('with min value greater than max value', () => {
                beforeEach(() => {
                    options.min = '16:00:00';
                    options.max = '12:00:00';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"max" must be greater than or equal to "min".');
                });
            });
            describe('with an invalid step value', () => {
                beforeEach(() => {
                    options.step = 'a';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
                });
            });
        });

        // number
        describe('setting inputType number', () => {
            beforeEach(() => options.inputType = 'number');
            describe('without default value', () => {
                beforeEach(() => create());
                it('shows number input ', () => {
                    expect(exists('input[type="number"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="number"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="number"]')?.classList).toContain('bootbox-input-number');
                });
            });
            describe('with default value', () => {
                beforeEach(() => {
                    options.value = '300';
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="number"]')?.value).to.equal('300');
                });
            });
            describe('with placeholder', () => {
                beforeEach(() => {
                    options.placeholder = 'enter the number';
                    return create();
                });
                it('has correct placeholder value', () => {
                    expect(find('input[type="number"]')?.getAttribute('placeholder')).to.equal('enter the number');
                });
            });
            describe('with min int value', () => {
                beforeEach(() => {
                    options.min = 0;
                    return create();
                });
                it('has correct min value', () => {
                    expect(find('input[type="number"]')?.getAttribute('min')).to.equal('0');
                });
            });
            describe('with min decimal value', () => {
                beforeEach(() => {
                    options.min = -99.99;
                    return create();
                });
                it('has correct min value', () => {
                    expect(find('input[type="number"]')?.getAttribute('min')).to.equal('-99.99');
                });
            });
            describe('with max int value', () => {
                beforeEach(() => {
                    options.max = 100;
                    return create();
                });
                it('has correct max value', () => {
                    expect(find('input[type="number"]')?.getAttribute('max')).to.equal('100');
                });
            });
            describe('with max decimal value', () => {
                beforeEach(() => {
                    options.max = 99.99;
                    return create();
                });
                it('has correct max value', () => {
                    expect(find('input[type="number"]')?.getAttribute('max')).to.equal('99.99');
                });
            });
            describe('with step int value', () => {
                beforeEach(() => {
                    options.step = 10;
                    return create();
                });
                it('has correct step value', () => {
                    expect(find('input[type="number"]')?.getAttribute('step')).to.equal('10');
                });
            });
            describe('with step decimal value', () => {
                beforeEach(() => {
                    options.step = 0.01;
                    return create();
                });
                it('has correct step value', () => {
                    expect(find('input[type="number"]')?.getAttribute('step')).to.equal('0.01');
                });
            });
            describe('with an invalid min value', () => {
                beforeEach(() => {
                    options.min = 'a';
                    options.max = 50;
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"min" must be a valid number.');
                });
            });
            describe('with an invalid max value', () => {
                beforeEach(() => {
                    options.min = 0;
                    options.max = 'a';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"max" must be a valid number.');
                });
            });
            describe('with min value greater than max value', () => {
                beforeEach(() => {
                    options.min = 100;
                    options.max = 50;
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"max" must be greater than or equal to "min".');
                });
            });
            describe('with an invalid step value', () => {
                beforeEach(() => {
                    options.step = 'a';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
                });
            });
            describe('with an invalid negative step value', () => {
                beforeEach(() => {
                    options.step = -1;
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
                });
            });

        });


        // range
        describe('setting inputType range', () => {
            beforeEach(() => options.inputType = 'range');

            describe('without default value', () => {
                beforeEach(() => create());

                it('shows range input ', () => {
                    expect(exists('input[type="range"]')).to.be.true;
                });
                it('has proper class', () => {
                    expect(find('input[type="range"]')?.classList).toContain('bootbox-input');
                    expect(find('input[type="range"]')?.classList).toContain('bootbox-input-range');
                });
            });

            describe('with default value', () => {
                beforeEach(() => {
                    // Default max value of a range is 100, so anything less works as an initial value. 
                    // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#Specifying_the_minimum_and_maximum
                    options.value = 50;
                    return create();
                });
                it('has correct default value', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('input[type="range"]')?.value).to.equal('50');
                });
            });

            describe('with min value', () => {
                beforeEach(() => {
                    options.min = 0;
                    return create();
                });
                it('has correct min value', () => {
                    expect(find('input[type="range"]')?.getAttribute('min')).to.equal('0');
                });
            });

            describe('with max value', () => {
                beforeEach(() => {
                    options.max = 100;
                    return create();
                });
                it('has correct max value', () => {
                    expect(find('input[type="range"]')?.getAttribute('max')).to.equal('100');
                });
            });

            describe('with min and max value', () => {
                beforeEach(() => {
                    options.min = 10;
                    options.max = 100;
                    return create();
                });
                it('has correct min and max values', () => {
                    expect(find('input[type="range"]')?.getAttribute('min')).to.equal('10') && expect(find('input[type="range"]')?.getAttribute('max')).to.equal('100');
                });
            });

            describe('with min and max value equal', () => {
                beforeEach(() => {
                    options.min = 10;
                    options.max = 10;
                    return create();
                });
                it('has correct min and max values', () => {
                    expect(find('input[type="range"]')?.getAttribute('min')).to.equal('10') && expect(find('input[type="range"]')?.getAttribute('max')).to.equal('10');
                });
            });

            describe('with step value', () => {
                beforeEach(() => {
                    options.step = 10;
                    return create();
                });
                it('has correct step value', () => {
                    expect(find('input[type="range"]')?.getAttribute('step')).to.equal('10');
                });
            });

            describe('with an invalid min value', () => {
                beforeEach(() => {
                    options.min = 'a';
                    options.max = 50;
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"min" must be a valid number.');
                });
            });

            describe('with an invalid max value', () => {
                beforeEach(() => {
                    options.min = 0;
                    options.max = 'a';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"max" must be a valid number.');
                });
            });

            describe('with min value greater than max value', () => {
                beforeEach(() => {
                    options.min = 100;
                    options.max = 50;
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"max" must be greater than or equal to "min".');
                });
            });

            describe('with an invalid step value', () => {
                beforeEach(() => {
                    options.step = 'a';
                });
                it('throws an error', () => {
                    expect(() => bootbox.prompt(options)).toThrowError('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
                });
            });
        });
    });

    // callback tests
    describe('callback tests', () => {

        // simple callback
        describe('with a simple callback', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your name?',
                    callback: callback
                });
                const modalInstance = bootstrap.Modal.getInstance(dialog);
                hidden = vi.spyOn(modalInstance, 'hide');
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when submitting the form', () => {
                    beforeEach(() => {
                        // https://github.com/jsdom/jsdom/issues/3331
						const Event = window.Event;
                        dialog?.querySelector('.bootbox-form')?.dispatchEvent(new Event('submit'))
                    });
                    it('invokes the callback with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('');
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = 'Test input');
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('Test input');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when submitting the form', () => {
                    beforeEach(() => 
                        {
                            // https://github.com/jsdom/jsdom/issues/3331
							const Event = window.Event;
							dialog?.querySelector('.bootbox-form')?.dispatchEvent(new Event('submit'))
                        });
                    it('invokes the callback with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('Test input');
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
            });
            describe('when dismissing the dialog by clicking Cancel', () => {
                beforeEach(() => find('.bootbox-cancel')?.click());
                it('should invoke the callback', () => {
                    expect(callback).toHaveBeenCalled();
                });
                it('should pass the dialog as "this"', () => {
                    expect(callback.mock.instances[0]).to.equal(dialog);
                });
                it('with the correct value', () => {
                    expect(callback).toHaveBeenCalledWith(null);
                });
                it('should hide the modal', () => {
                    expect(hidden).toHaveBeenCalledWith();
                });
            });
            describe('when triggering the escape event', () => {
                beforeEach(() => {
                    // https://github.com/jsdom/jsdom/issues/3331
					const Event = window.Event;
					dialog?.dispatchEvent(new Event('escape.close.bb'))
                });
                it('should invoke the callback', () => {
                    expect(callback).toHaveBeenCalled();
                });
                it('should pass the dialog as "this"', () => {
                    expect(callback.mock.instances[0]).to.equal(dialog);
                });
                it('with the correct value', () => {
                    expect(callback).toHaveBeenCalledWith(null);
                });
                it('should hide the modal', () => {
                    expect(hidden).toHaveBeenCalledWith();
                });
            });
            describe('when dismissing the dialog by clicking the close button', () => {
                beforeEach(() => find('.close')?.click());
                it('should invoke the callback', () => {
                    expect(callback).toHaveBeenCalled();
                });
                it('should pass the dialog as "this"', () => {
                    expect(callback.mock.instances[0]).to.equal(dialog);
                });
                it('with the correct value', () => {
                    expect(callback).toHaveBeenCalledWith(null);
                });
                it('should hide the modal', () => {
                    expect(hidden).toHaveBeenCalledWith();
                });
            });
        });

        // callback which returns false
        describe('with a callback which returns false', () => {
            beforeEach(() => {
                callback = vi.fn().mockReturnValue(false);
                dialog = bootbox.prompt({
                    title: 'What is your name?',
                    callback: callback
                });
                const modalInstance = bootstrap.Modal.getInstance(dialog);

                hidden = vi.spyOn(modalInstance, 'hide');
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('');
                    });
                    it('should not hide the modal', () => {
                        expect(hidden).not.toHaveBeenCalled();
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = 'Test input');
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('Test input');
                    });
                    it('should not hide the modal', () => {
                        expect(hidden).not.toHaveBeenCalled();
                    });
                });
            });
            describe('when dismissing the dialog by clicking Cancel', () => {
                beforeEach(() => find('.bootbox-cancel')?.click());
                it('should invoke the callback', () => {
                    expect(callback).toHaveBeenCalled();
                });
                it('should pass the dialog as "this"', () => {
                    expect(callback.mock.instances[0]).to.equal(dialog);
                });
                it('with the correct value', () => {
                    expect(callback).toHaveBeenCalledWith(null);
                });
                it('should not hide the modal', () => {
                    expect(hidden).not.toHaveBeenCalled();
                });
            });
            describe('when triggering the escape event', () => {
                beforeEach(() => {
                    // https://github.com/jsdom/jsdom/issues/3331
					const Event = window.Event;
					dialog?.dispatchEvent(new Event('escape.close.bb'))
                });
                it('should invoke the callback', () => {
                    expect(callback).toHaveBeenCalled();
                });
                it('should pass the dialog as "this"', () => {
                    expect(callback.mock.instances[0]).to.equal(dialog);
                });
                it('with the correct value', () => {
                    expect(callback).toHaveBeenCalledWith(null);
                });
                it('should not hide the modal', () => {
                    expect(hidden).not.toHaveBeenCalled();
                });
            });
            describe('when dismissing the dialog by clicking the close button', () => {
                beforeEach(() => find('.close')?.click());
                it('should invoke the callback', () => {
                    expect(callback).toHaveBeenCalled();
                });
                it('should pass the dialog as "this"', () => {
                    expect(callback.mock.instances[0]).to.equal(dialog);
                });
                it('with the correct value', () => {
                    expect(callback).toHaveBeenCalledWith(null);
                });
                it('should not hide the modal', () => {
                    expect(hidden).not.toHaveBeenCalled();
                });
            });
        });

        // default value
        describe('with a default value', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your name?',
                    value: 'Bob',
                    callback: callback
                });
                const modalInstance = bootstrap.Modal.getInstance(dialog);
                hidden = vi.spyOn(modalInstance, 'hide');
            });
            it('populates the input with the default value', () => {
                expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.value).to.equal('Bob');
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('Bob');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => find('.bootbox-cancel')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = 'Alice');
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('Alice');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => find('.bootbox-cancel')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // placeholder
        describe('with a placeholder', () => {
            beforeEach(() => {
                callback = vi.fn();
                return dialog = bootbox.prompt({
                    title: 'What is your name?',
                    placeholder: 'e.g. Bob Smith',
                    callback() {
                        return true;
                    }
                });
            });
            it('populates the input with the placeholder attribute', () => {
                expect(dialog?.querySelector('.bootbox-input')?.getAttribute('placeholder')).to.equal('e.g. Bob Smith');
            });
        });

        // required value
        describe('with required: true and default input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your name?',
                    required: true,
                    callback: callback
                });
                //const modalInstance = bootstrap.Modal.getInstance(dialog);
                //return hidden = vi.spyOn(modalInstance, 'modal');
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = 'Alice';
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith('Alice');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // required & text
        describe('with required: true and `text` input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your name?',
                    required: true,
                    inputType: 'text',
                    callback: callback
                });

                //const modalInstance = bootstrap.Modal.getInstance(dialog);
                //return hidden = vi.spyOn(modalInstance, 'modal');
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = 'Alice';
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith('Alice');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // required & password
        describe('with required: true and `password` input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your password?',
                    required: true,
                    inputType: 'password',
                    callback: callback
                });
                //const modalInstance = bootstrap.Modal.getInstance(dialog);
                //return hidden = vi.spyOn(modalInstance, 'modal');
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = 'WeAreAllMadHere';
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith('WeAreAllMadHere');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // required & number
        describe('with required: true and `number` input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your favorite number?',
                    required: true,
                    inputType: 'number',
                    callback: callback
                });
                // const modalInstance = bootstrap.Modal.getInstance(dialog);
                //return hidden = vi.spyOn(modalInstance, 'modal');
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = "42";
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith('42');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // required & date
        describe('with required: true and `date` input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your date of birth?',
                    required: true,
                    inputType: 'date',
                    callback: callback
                });
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = '1970-01-01';
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith('1970-01-01');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // required & time
        describe('with required: true and `time` input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is the time right now?',
                    required: true,
                    inputType: 'time',
                    callback: callback
                });
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = '12:12';
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith('12:12');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // required & textarea
        describe('with required: true and `textarea` input type', () => {
            beforeEach(() => {
                callback = vi.fn();
                dialog = bootbox.prompt({
                    title: 'What is your favorite book, and why?',
                    required: true,
                    inputType: 'textarea',
                    callback: callback
                });
            });
            it('populates the input with the required property', () => {
                return expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input')?.required).to.equal(true);
            });
            describe('when entering no value in the text input', () => {
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    return it('should not invoke the callback', () => {
                        return expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('when entering a value in the text input', () => {
                beforeEach(() => {
                    return dialog!.querySelector<HTMLInputElement>('.bootbox-input')!.value = "I like Hitchhiker's Guide to the Galaxy. Because... it's the Hitchhicker's Guide to the Galaxy";
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        return find('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith("I like Hitchhiker's Guide to the Galaxy. Because... it's the Hitchhicker's Guide to the Galaxy");
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => {
                        return find('.bootbox-cancel')?.click();
                    });
                    it('should invoke the callback', () => {
                        return expect(callback).toHaveBeenCalled()
                    });
                    it('should pass the dialog as "this"', () => {
                        return expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    return it('with the correct value', () => {
                        return expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
        });

        // select
        describe('with inputType select', () => {
            describe('without a default value', () => {
                beforeEach(() => {
                    callback = vi.fn();
                    dialog = bootbox.prompt({
                        title: 'What is your IDE?',
                        callback: callback,
                        inputType: 'select',
                        inputOptions: [
                            {
                                value: '',
                                text: 'Choose one'
                            }, {
                                value: 1,
                                text: 'Vim'
                            }, {
                                value: 2,
                                text: 'Sublime Text'
                            }, {
                                value: 3,
                                text: 'WebStorm/PhpStorm'
                            }, {
                                value: 4,
                                text: 'Komodo IDE'
                            }
                        ]
                    });
                    const modalInstance = bootstrap.Modal.getInstance(dialog);

                    hidden = vi.spyOn(modalInstance, 'hide');
                });
                it('has correct number values in list', () => {
                    expect(dialog?.querySelectorAll('.bootbox-input-select option').length).to.equal(5);
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => find('.bootbox-cancel')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('with a default value', () => {
                beforeEach(() => {
                    callback = vi.fn();
                    dialog = bootbox.prompt({
                        title: 'What is your IDE?',
                        callback: callback,
                        value: 1,
                        inputType: 'select',
                        inputOptions: [
                            {
                                value: '',
                                text: 'Choose one'
                            }, {
                                value: 1,
                                text: 'Vim'
                            }, {
                                value: 2,
                                text: 'Sublime Text'
                            }, {
                                value: 3,
                                text: 'WebStorm/PhpStorm'
                            }, {
                                value: 4,
                                text: 'Komodo IDE'
                            }
                        ]
                    });
                    const modalInstance = bootstrap.Modal.getInstance(dialog);

                    hidden = vi.spyOn(modalInstance, 'hide');
                });
                it('specified option is selected', () => {
                    expect(dialog?.querySelector<HTMLInputElement>('.bootbox-input-select')?.value).to.equal('1');
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('1');
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => find('.bootbox-cancel')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith(null);
                    });
                });
                describe('when changing the selected option and dismissing the dialog by clicking OK', () => {
                    beforeEach(() => {
                        dialog!.querySelector<HTMLInputElement>('.bootbox-input-select')!.value = "3";
                        return dialog?.querySelector<HTMLElement>('.bootbox-accept')?.click();
                    });
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('3');
                    });
                });
            });
        });

        // email
        describe('with inputType email', () => {
            describe('without a default value', () => {
                beforeEach(() => {
                    callback = vi.fn();
                    dialog = bootbox.prompt({
                        title: 'What is your email?',
                        inputType: 'email',
                        callback: callback
                    });
                    const modalInstance = bootstrap.Modal.getInstance(dialog);

                    hidden = vi.spyOn(modalInstance, 'hide');
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should pass the dialog as "this"', () => {
                        expect(callback.mock.instances[0]).to.equal(dialog);
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when submitting the form', () => {
                    beforeEach(() => {
                        // https://github.com/jsdom/jsdom/issues/3331
						const Event = window.Event;
						dialog?.querySelector('.bootbox-form')?.dispatchEvent(new Event('submit'))}
                    );
                    it('invokes the callback with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when entering a value in the email input', () => {
                    beforeEach(() => dialog!.querySelector<HTMLInputElement>('.bootbox-input-email')!.value = 'john@smith.com');
                    describe('when dismissing the dialog by clicking OK', () => {
                        beforeEach(() => find('.bootbox-accept')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('should pass the dialog as "this"', () => {
                            expect(callback.mock.instances[0]).to.equal(dialog);
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith('john@smith.com');
                        });
                    });
                    describe('when dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => find('.bootbox-cancel')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                });
            });
            describe('with a default value', () => {
                beforeEach(() => {
                    callback = vi.fn();
                    dialog = bootbox.prompt({
                        title: 'What is your email?',
                        inputType: 'email',
                        value: 'john@smith.com',
                        callback: callback
                    });
                    const modalInstance = bootstrap.Modal.getInstance(dialog);

                    hidden = vi.spyOn(modalInstance, 'hide');
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('john@smith.com');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when submitting the form', () => {
                    beforeEach(() => {
                        // https://github.com/jsdom/jsdom/issues/3331
						const Event = window.Event;
						dialog?.querySelector('.bootbox-form')?.dispatchEvent(new Event('submit'))
                    });
                    it('invokes the callback with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith('john@smith.com');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when changing a value in the email input', () => {
                    beforeEach(() => dialog!.querySelector<HTMLInputElement>('.bootbox-input-email')!.value = 'smith@john.com');
                    describe('when dismissing the dialog by clicking OK', () => {
                        beforeEach(() => find('.bootbox-accept')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith('smith@john.com');
                        });
                    });
                    describe('when dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => find('.bootbox-cancel')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                });
            });
        });

        // checkbox
        describe('with input type checkbox', () => {
            describe('without a default value', () => {
                beforeEach(() => {
                    callback = vi.fn();
                    dialog = bootbox.prompt({
                        title: 'What is your IDE?',
                        inputType: 'checkbox',
                        inputOptions: [
                            {
                                value: 1,
                                text: 'Vim'
                            }, {
                                value: 2,
                                text: 'Sublime Text'
                            }, {
                                value: 3,
                                text: 'WebStorm/PhpStorm'
                            }, {
                                value: 4,
                                text: 'Komodo IDE'
                            }
                        ],
                        callback: callback
                    });
                    const modalInstance = bootstrap.Modal.getInstance(dialog);

                    hidden = vi.spyOn(modalInstance, 'hide');
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should set the `was-validated` class', () => {
                        return expect(find('.bootbox-form')?.classList).toContain('was-validated');
                    });
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('with an undefined value', () => {
                        expect(callback).toHaveBeenCalledWith([]);
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => find('.bootbox-cancel')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('with default value', () => {
                describe('one value checked', () => {
                    beforeEach(() => {
                        callback = vi.fn();
                        dialog = bootbox.prompt({
                            title: 'What is your IDE?',
                            callback: callback,
                            value: 2,
                            inputType: 'checkbox',
                            inputOptions: [
                                {
                                    value: 1,
                                    text: 'Vim'
                                }, {
                                    value: 2,
                                    text: 'Sublime Text'
                                }, {
                                    value: 3,
                                    text: 'WebStorm/PhpStorm'
                                }, {
                                    value: 4,
                                    text: 'Komodo IDE'
                                }
                            ]
                        });
                        const modalInstance = bootstrap.Modal.getInstance(dialog);

                        hidden = vi.spyOn(modalInstance, 'hide');
                    });
                    it('specified checkbox is checked', () => {
                        expect(dialog?.querySelector<HTMLInputElement>('input[type="checkbox"]:checked')?.value).to.equal('2');
                    });
                    describe('when dismissing the dialog by clicking OK', () => {
                        beforeEach(() => find('.bootbox-accept')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(['2']);
                        });
                    });
                    describe('when dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => find('.bootbox-cancel')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                    describe('when changing the checked option and dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => {
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"]:checked')!.checked = false;
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"][value="3"]')!.checked = true;
                            return find('.bootbox-cancel')?.click();
                        });
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                    describe('when changing the selected option and dismissing the dialog by clicking OK', () => {
                        beforeEach(() => {
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"]:checked')!.checked = false;
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"][value="3"]')!.checked = true;
                            return find('.bootbox-accept')?.click();
                        });
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(['3']);
                        });
                    });
                });
                describe('multiple value checked', () => {
                    beforeEach(() => {
                        callback = vi.fn();
                        dialog = bootbox.prompt({
                            title: 'What is your IDE?',
                            callback: callback,
                            value: [2, 3],
                            inputType: 'checkbox',
                            inputOptions: [
                                {
                                    value: 1,
                                    text: 'Vim'
                                }, {
                                    value: 2,
                                    text: 'Sublime Text'
                                }, {
                                    value: 3,
                                    text: 'WebStorm/PhpStorm'
                                }, {
                                    value: 4,
                                    text: 'Komodo IDE'
                                }
                            ]
                        });
                        const modalInstance = bootstrap.Modal.getInstance(dialog);

                        hidden = vi.spyOn(modalInstance, 'hide');
                    });
                    it('specified checkboxes are checked', () => {
                        var checked = [];
                        dialog?.querySelectorAll('input[type="checkbox"]:checked').forEach(box => {

                            checked.push(box.value)
                        });

                        expect(checked).to.deep.equal(['2', '3']);
                    });
                    describe('when dismissing the dialog by clicking OK', () => {
                        beforeEach(() => find('.bootbox-accept')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(['2', '3']);
                        });
                    });
                    describe('when dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => find('.bootbox-cancel')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                    describe('when changing the checked options and dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => {
                            dialog?.querySelectorAll('input[type="checkbox"]:checked').forEach(box => { box.checked = false; });
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"][value="1"')!.checked = true;
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"][value="4"]')!.checked = true;
                            return find('.bootbox-cancel')?.click();
                        });
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                    describe('when changing the checked options and dismissing the dialog by clicking OK', () => {
                        beforeEach(() => {
                            dialog?.querySelectorAll('input[type="checkbox"]:checked').forEach(box => { box.checked = false; });
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"][value="1"]')!.checked = true;
                            dialog!.querySelector<HTMLInputElement>('input[type="checkbox"][value="4"]')!.checked = true;
                            return find('.bootbox-accept')?.click();
                        });
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(['1', '4']);
                        });
                    });
                });
            });
        });

        // radio
        describe('with input type radio', () => {
            describe('without a default value', () => {
                beforeEach(() => {
                    callback = vi.fn();
                    dialog = bootbox.prompt({
                        title: 'What is your IDE?',
                        inputType: 'radio',
                        inputOptions: [
                            {
                                value: 1,
                                text: 'Vim'
                            }, {
                                value: 2,
                                text: 'Sublime Text'
                            }, {
                                value: 3,
                                text: 'WebStorm/PhpStorm'
                            }, {
                                value: 4,
                                text: 'Komodo IDE'
                            }
                        ],
                        callback: callback
                    });
                    const modalInstance = bootstrap.Modal.getInstance(dialog);

                    hidden = vi.spyOn(modalInstance, 'hide');
                });
                describe('when dismissing the dialog by clicking OK', () => {
                    beforeEach(() => find('.bootbox-accept')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('with the first option value', () => {
                        expect(callback).toHaveBeenCalledWith('1');
                    });
                    it('should hide the modal', () => {
                        expect(hidden).toHaveBeenCalledWith();
                    });
                });
                describe('when dismissing the dialog by clicking Cancel', () => {
                    beforeEach(() => find('.bootbox-cancel')?.click());
                    it('should invoke the callback', () => {
                        expect(callback).toHaveBeenCalled();
                    });
                    it('with the correct value', () => {
                        expect(callback).toHaveBeenCalledWith(null);
                    });
                });
            });
            describe('with default value', () => {
                describe('one value checked', () => {
                    beforeEach(() => {
                        callback = vi.fn();
                        dialog = bootbox.prompt({
                            title: 'What is your IDE?',
                            callback: callback,
                            value: 2,
                            inputType: 'radio',
                            inputOptions: [
                                {
                                    value: 1,
                                    text: 'Vim'
                                }, {
                                    value: 2,
                                    text: 'Sublime Text'
                                }, {
                                    value: 3,
                                    text: 'WebStorm/PhpStorm'
                                }, {
                                    value: 4,
                                    text: 'Komodo IDE'
                                }
                            ]
                        });
                        const modalInstance = bootstrap.Modal.getInstance(dialog);

                        hidden = vi.spyOn(modalInstance, 'hide');
                    });
                    it('specified radio is checked', () => {
                        expect(dialog?.querySelector<HTMLInputElement>('input:checked')?.value).to.equal('2');
                    });
                    describe('when dismissing the dialog by clicking OK', () => {
                        beforeEach(() => find('.bootbox-accept')?.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith('2');
                        });
                    });
                    describe('when dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => dialog!.querySelector<HTMLElement>('.bootbox-cancel')!.click());
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                    describe('when changing the checked option and dismissing the dialog by clicking Cancel', () => {
                        beforeEach(() => {
                            dialog!.querySelector<HTMLInputElement>('input[type="radio"][value="3"]')!.checked = true;
                            return dialog!.querySelector<HTMLElement>('.bootbox-cancel')!.click();
                        });
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith(null);
                        });
                    });
                    describe('when changing the selected option and dismissing the dialog by clicking OK', () => {
                        beforeEach(() => {
                            dialog!.querySelector<HTMLInputElement>('input[type="radio"][value="3"]')!.checked = true;
                            return dialog?.querySelector<HTMLElement>('.bootbox-accept')?.click();
                        });
                        it('should invoke the callback', () => {
                            expect(callback).toHaveBeenCalled();
                        });
                        it('with the correct value', () => {
                            expect(callback).toHaveBeenCalledWith('3');
                        });
                    });
                });
            });
        });
    });
});
