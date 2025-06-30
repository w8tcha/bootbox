import {describe,beforeEach, afterEach, it, expect, vi} from  'vitest';
import * as bootbox from '../src/bootbox';
import * as bootstrap from 'bootstrap';
import Options from '../src/interfaces/Options';

let dialog: HTMLElement | null;
let button: HTMLElement | null;

let create: any;
let options: Options;

let callback: any;
let hidden: any;

const find = (selector: string): HTMLElement | null => dialog!.querySelector<HTMLElement>(selector);

const text = (selector: string) : string | null | undefined => find(selector)?.textContent;

describe('bootbox.alert', () => {
	describe('basic usage tests', () => {
		describe('with no arguments', () => {
			let create;

			beforeEach(() => {
				create = () => {
					bootbox.alert();
				};
			});

			it('throws an error regarding argument length', () => {
				expect(create).to.throw(/argument length/);
			});
		});
    
		describe('with one argument', () => {
	      
			describe('where the argument is a string', () => {
				beforeEach(() => {
					dialog = bootbox.alert('Hello world!');
				});

				afterEach((event) => {
					//dialog = bootbox.disp;
					bootbox.hideAll();
				});

				it('applies the bootbox-alert class to the dialog', () => {
					expect(dialog?.classList).toContain('bootbox-alert');
				});
				
				it('shows the expected body copy', () => {
					expect(text('.bootbox-body')).to.equal('Hello world!');
				});
				
				it('shows an OK button', () => {
					expect(text('.modal-footer button')).to.equal('OK');
				});
			
				it('applies the primary class to the button', () => {

					var button = document.querySelector<HTMLButtonElement>('.modal-footer button');
					expect(button?.classList).toContain('btn-primary');

				});
			
				it('applies the bootbox-accept class to the button', () => new Promise(done => {
					expect(find('.modal-footer button')?.classList.contains('bootbox-accept')).to.be.true;

					done(dialog);
				}));
				
				it('shows a close button inside the header', () => {
					expect(text('.modal-header button')).to.equal('');
				});
				
				it('applies the close class to the close button', () => {
					expect(find('.modal-header button')?.classList.contains('btn-close')).to.be.true;
					expect(find('.modal-header button')?.classList.contains('close')).to.be.true;
				});

				it('applies the correct aria-hidden attribute to the close button', () => {
					expect(find('button.close')?.getAttribute('aria-hidden')).to.equal('true');
				});

				it('applies the correct class to the body', () => {
					expect(document.querySelector('body')?.classList.contains('modal-open')).to.be.true;
				});
			});
		});
    
		describe('with two arguments', () => {
			describe('where the second argument is not a function', () => {
				beforeEach(() => {
					create = () => {
						bootbox.alert('Hello world!', 'not a callback');
					};
				});

				it('throws an error requiring a callback', () => {
					expect(create).to.throw(/alert requires the "callback" property to be a function when provided/);
				});
			});

			describe('where the second argument is a function', () => {
				beforeEach(() => {
					create = () => {
						dialog = bootbox.alert('Hello world!', () => {});
					};
				});

				it('does not throw an error', () => {
					expect(create).not.to.throw(Error);
				});
			});
		});

		describe('with three arguments', () => {
			beforeEach(() => {
				create = () => {
					bootbox.alert(1, 2, 3);
				};
			});

			it('throws an error regarding argument length', () => {
				expect(create).to.throw(/argument length/);
			});
		});

	});

	describe('configuration options tests', () => {
		beforeEach(() => {
			options = {
				message: 'Hello world',
				callback() {}
			};

			create = function() {
				dialog = bootbox.alert(options);
			};
		});

			describe('with a custom ok button', () => {
				beforeEach(() => {
					options.buttons = {
						ok: {
							label: 'Custom OK',
							className: 'btn-danger'
						}
					};

					create();

					button = dialog?.querySelector('.btn:first-child')!;
				});

				it('adds the correct ok button', () => {
					expect(button?.textContent).to.equal('Custom OK');
					expect(button?.classList.contains('btn-danger')).to.be.true;
					expect(button?.classList.contains('bootbox-accept')).to.be.true;
				});
			});

			describe('with an unrecognised button key', () => {
				beforeEach(() => {
					options.buttons = {
						'Another key': {
							label: 'Custom OK',
							className: 'btn-danger'
						}
					};
				});

				it('throws an error', () => {
					expect(create).to.throw('button key "Another key" is not allowed (options are ok)');
				});
			});

			describe('with a custom title', () => {
				beforeEach(() => {
					options.title = 'Hello?';
					create();
				});

				it('shows the correct title', () => {
					expect(text('.modal-title')).to.equal('Hello?');
				});
			});
		});
	});

	describe('callback tests', () => {

		describe('with no callback', () => {
			beforeEach(() => {
				dialog = bootbox.alert({
					message:'Hello!'
				});

				const modalInstance = bootstrap.Modal.getInstance(dialog);
				hidden = vi.spyOn(modalInstance, 'hide');
			});

			describe('when dismissing the dialog by clicking OK', () => {
				beforeEach(() => {
					dialog?.querySelector<HTMLElement>('.bootbox-accept')?.click();
				});

				it('should hide the modal', () => {
					expect(hidden).toHaveBeenCalledWith();
				});
			});

			describe('when clicking the close button', () => {
				beforeEach(() => {
					dialog?.querySelector<HTMLElement>('.close')?.click();
				});

				it('should hide the modal', () => {
					expect(hidden).toHaveBeenCalledWith();
				});
			});

			describe('when triggering the escape event', () => {
				beforeEach(() => {
					dialog?.dispatchEvent(new Event('escape.close.bb'));
				});

				it('should hide the modal', () => {
					expect(hidden).toHaveBeenCalledWith();
				});
			});
		});

		describe('with a simple callback', () => {
			beforeEach(() => {
				callback = vi.fn();

				dialog = bootbox.alert({
					message:'Hello!',
					callback: callback
				});

				const modalInstance = bootstrap.Modal.getInstance(dialog);
				hidden = vi.spyOn(modalInstance, 'hide');
			});

			describe('when dismissing the dialog by clicking OK', () => {
				beforeEach(() => {
					dialog?.querySelector<HTMLElement>('.bootbox-accept')?.click();
				});

				it('should invoke the callback', () => {
					expect(callback).toHaveBeenCalled();
				});

				it('should pass the dialog as "this"', () => {
					expect(callback.mock.instances[0]).to.equal(dialog);
				});

				it('should hide the modal', () => {
					expect(hidden).toHaveBeenCalledWith();
				});
			});

			describe('when clicking the close button', () => {
				beforeEach(() => {
					dialog?.querySelector<HTMLElement>('.close')?.click();
				});

				it('should invoke the callback', () => {
					expect(callback).toHaveBeenCalled();
				});

				it('should pass the dialog as "this"', () => {
					expect(callback.mock.instances[0]).to.equal(dialog);
				});

				it('should hide the modal', () => {
					expect(hidden).toHaveBeenCalledWith();
				});
			});

			describe('when triggering the escape event', () => {
				beforeEach(() => {
					dialog?.dispatchEvent(new Event('escape.close.bb'));
				});

				it('should invoke the callback', () => {
					expect(callback).toHaveBeenCalled();
				});

				it('should pass the dialog as "this"', () => {
					expect(callback.mock.instances[0]).to.equal(dialog);
				});

				it('should hide the modal', () => {
					expect(hidden).toHaveBeenCalledWith();
				});
			});
		});

		describe('with a callback which returns false', () => {
			beforeEach(() => {
				callback = vi.fn().mockReturnValue(false);

				dialog = bootbox.alert({
					message:'Hello!',
					callback: callback
				});

				const modalInstance = bootstrap.Modal.getInstance(dialog);
				hidden = vi.spyOn(modalInstance, 'hide');
			});

			describe('when dismissing the dialog by clicking OK', () => {
				beforeEach(() => {
					dialog?.querySelector<HTMLElement>('.bootbox-accept')?.click();
				});

				it('should invoke the callback', () => {
					expect(callback).toHaveBeenCalled();
				});

				it('should pass the dialog as "this"', () => {
					expect(callback.mock.instances[0]).to.equal(dialog);
				});

				it('should not hide the modal', () => {
					expect(hidden).not.toHaveBeenCalled();
				});
			});

			describe('when clicking the close button', () => {
				beforeEach(() => {
					dialog?.querySelector<HTMLElement>('.close')?.click();
				});

				it('should invoke the callback', () => {
					expect(callback).toHaveBeenCalled();
				});

				it('should pass the dialog as "this"', () => {
					expect(callback.mock.instances[0]).to.equal(dialog);
				});

				it('should not hide the modal', () => {
					expect(hidden).not.toHaveBeenCalled();
				});
			});

			describe('when triggering the escape event', () => {
				beforeEach(() => {
					dialog?.dispatchEvent(new Event('escape.close.bb'));
				});

				it('should invoke the callback', () => {
					expect(callback).toHaveBeenCalled();
				});

				it('should pass the dialog as "this"', () => {
					expect(callback.mock.instances[0]).to.equal(dialog);
				});

				it('should not hide the modal', () => {
					expect(hidden).not.toHaveBeenCalled();
				});
			});
		});
	});
