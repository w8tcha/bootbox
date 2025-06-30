import {describe,beforeEach, afterEach, it, expect, vi} from  'vitest';
import * as bootbox from '../src/bootbox';
import Options from '../src/interfaces/Options';

describe('Bootbox',
	() => {
		let dialog: HTMLElement | null;

		let removed: any;
		let e: any;
		let callback: any;
		let labels: any;

		describe('event listeners',
			() => {
				describe('hidden.bs.modal',
					() => {
						beforeEach(() => {
							dialog = bootbox.alert('hi');

							removed = vi.spyOn(dialog, 'remove').mockImplementation(() => {});

							e = target => {

								dialog?.dispatchEvent(
									new CustomEvent('hidden.bs.modal', { detail: { target: target } }));
							};
						});

						afterEach(() => {
							removed.mockRestore();
						});

						/*describe('when triggered with the wrong target', () => {
						  beforeEach(() => {
						    e({an: 'object'});
						  });

						  it('does not remove the dialog', () => {
						    expect(removed).not.toHaveBeenCalled();
						  });
						});*/

						describe('when triggered with the correct target',
							() => {
								beforeEach(() => {
									e(dialog);
								});

								it('removes the dialog',
									() => {
										expect(removed).toHaveBeenCalled();
									});
							});
					});
			});

		describe('onHide option',
			() => {
				describe('hide.bs.modal',
					() => {
						beforeEach(() => {
							callback = vi.fn();
							dialog = bootbox.alert({
								message: 'hi',
								onHide: callback
							});

							e = target => {
								dialog.dispatchEvent(new Event('hide.bs.modal',
									{
										target: target
									}));
							};
						});

						describe('when triggered with the correct target',
							() => {
								beforeEach(() => {
									e(dialog);
								});

								it('has triggered onHide function',
									() => {
										expect(callback).toHaveBeenCalled();
									});
							});
					});
			});

		describe('onHidden option',
			() => {
				describe('hidden.bs.modal',
					() => {
						beforeEach(() => {
							callback = vi.fn();
							dialog = bootbox.alert({
								message: 'hi',
								onHidden: callback
							});

							e = target => {
								dialog.dispatchEvent(new Event('hidden.bs.modal',
									{
										target: target
									}));
							};
						});

						describe('when triggered with the correct target',
							() => {
								beforeEach(() => {
									e(dialog);
								});

								it('has triggered onHidden function',
									() => {
										expect(callback).toHaveBeenCalled();
									});
							});
					});
			});

		describe('onShow option',
			() => {
				describe('show.bs.modal',
					() => {
						beforeEach(() => {
							callback = vi.fn();
							dialog = bootbox.alert({
								message: 'hi',
								onShow: callback
							});
						});

						describe('when triggered with the correct target',
							() => {
								it('has triggered onShow function',
									() => {
										expect(callback).toHaveBeenCalled();
									});
							});
					});
			});

		describe('relatedTarget option',
			() => {
				describe('show.bs.modal',
					() => {
						var options: Options;

						beforeEach(() => {
							callback = vi.fn();
							options = {
								message: 'hi',
								onShow: callback
							};
						});

						describe('when triggered with no related target',
							() => {
								it('has passed no related target to the callback',
									() => {
										bootbox.dialog(options);
										expect(callback.mock.calls[0][0].relatedTarget).to.equal(undefined);
									});
							});

						describe('when triggered with a valid related target',
							() => {
								it('has passed the valid related target to the callback',
									() => {

										const template = document.createElement('template');
										template.innerHTML = '<button id="trigger"></button>'.trim();

										options.relatedTarget = template.content.children[0] as HTMLElement;
										bootbox.dialog(options);
										expect(callback.mock.calls[0][0].relatedTarget.id).to.equal('trigger');
									});
							});
					});
			});

		describe('adding and removing locales',
			() => {

				describe('bootbox.addLocale',
					() => {
						describe('with invalid values',
							() => {
								it('throws the expected error',
									() => {
										expect(() => bootbox.addLocale('xy', { OK: 'BTN1' }))
											.toThrowError('Please supply a translation for "CANCEL"');
									});
							});

						describe('with valid values',
							() => {
								beforeEach(() => {
									bootbox.addLocale('xy',
										{
											OK: 'BTN1',
											CANCEL: 'BTN2',
											CONFIRM: 'BTN3'
										});
									bootbox.setLocale('xy');

									var d1 = bootbox.alert('foo');
									var d2 = bootbox.confirm('foo', () => { return true; });
									labels = {
										ok: d1.querySelector<HTMLElement>('.btn:first-child')?.textContent,
										cancel: d2.querySelector<HTMLElement>('.btn:first-child')?.textContent,
										confirm: d2.querySelector<HTMLElement>('.btn:last-child')?.textContent
									};
								});

								it('shows the expected OK translation',
									() => {
										expect(labels.ok).to.equal('BTN1');
									});
								it('shows the expected CANCEL translation',
									() => {
										expect(labels.cancel).to.equal('BTN2');
									});
								it('shows the expected PROMPT translation',
									() => {
										expect(labels.confirm).to.equal('BTN3');
									});
							});
					});

				describe('bootbox.removeLocale',
					() => {
						beforeEach(() => {
							bootbox.removeLocale('xy');

							var d1 = bootbox.alert('foo');
							var d2 = bootbox.confirm('foo', () => { return true; });
							labels = {
								ok: d1.querySelector<HTMLElement>('.btn:first-child')?.textContent,
								cancel: d2.querySelector<HTMLElement>('.btn:first-child')?.textContent,
								confirm: d2.querySelector<HTMLElement>('.btn:last-child')?.textContent
							};
						});

						it('falls back to the default OK translation',
							() => {
								expect(labels.ok).to.equal('OK');
							});
						it('falls back to the default CANCEL translation',
							() => {
								expect(labels.cancel).to.equal('Cancel');
							});
						it('falls back to the default PROMPT translation',
							() => {
								expect(labels.confirm).to.equal('OK');
							});
					});
			});

		describe('backdrop variations',
			() => {
				beforeEach(() => {
					e = target => {
						const dismissEvent = new CustomEvent('click.dismiss.bs.modal', { detail: { target: target } });

						dialog?.dispatchEvent(dismissEvent);
					};
				});

				describe('with the default value',
					() => {
						beforeEach(() => {
							callback = vi.fn();
							dialog = bootbox.alert('hi', callback);
						});

						describe('When triggering the backdrop click dismiss event',
							() => {
								beforeEach(() => {
									e({ an: 'object' });
								});

								it('does not invoke the callback',
									() => {
										expect(callback).not.toHaveBeenCalled();
									});
							});
					});

				describe('when set to false',
					() => {
						beforeEach(() => {
							callback = vi.fn();
							dialog = bootbox.alert({
								message: 'hi',
								callback: callback,
								backdrop: false
							});
						});

						describe('When triggering the backdrop click dismiss event',
							() => {
								describe('With the wrong target',
									() => {
										beforeEach(() => {
											e({ an: 'object' });
										});

										it('does not invoke the callback',
											() => {
												expect(callback).not.toHaveBeenCalled();
											});
									});

								describe('With the correct target',
									() => {
										beforeEach(() => {
											e(dialog);
										});

										it('invokes the callback',
											() => {
												expect(callback).not.toHaveBeenCalled();
											});
									});
							});
					});

				describe('when set to true',
					() => {
						beforeEach(() => {
							callback = vi.fn();
							dialog = bootbox.alert({
								message: 'hi',
								callback: callback,
								backdrop: true
							});
						});

						describe('When triggering the backdrop click dismiss event',
							() => {
								/*describe('With the wrong target', () => {
								   beforeEach(() => {
								     e({an: 'object'});
								   });

								   it('does not invoke the callback', () => {
								     expect(callback).not.toHaveBeenCalled();
								   });
								 });*/

								describe('With the correct target',
									() => {
										beforeEach(() => {
											e(dialog?.querySelector(".modal-dialog"));
										});

										it('invokes the callback',
											() => {
												expect(callback).toHaveBeenCalled();
											});

										it('should pass the dialog as "this"',
											() => {
												expect(callback.mock.instances[0]).to.equal(dialog);
											});
									});
							});
					});
			});

		describe('resuable: true dialog',
			() => {
				describe('hidden.bs.modal',
					() => {
						beforeEach(() => {
							dialog = bootbox.alert({ message: 'hi', reusable: true });

							removed = vi.spyOn(dialog, 'remove').mockImplementation(() => {});

							e = target => {
								const hiddenEvent = new CustomEvent('hidden.bs.modal', { detail: { target: target } });
								dialog?.dispatchEvent(hiddenEvent);
							};
						});

						afterEach(() => {
							removed.mockRestore();
						});

						describe('when triggered with `reusable: true`',
							() => {
								beforeEach(() => {
									e({ an: 'object' });
								});

								it('does not remove the dialog',
									() => {
										expect(removed).not.toHaveBeenCalled();
									});
							});
					});
			});

		describe('resuable: false dialog',
			() => {
				describe('hidden.bs.modal',
					() => {
						beforeEach(() => {
							dialog = bootbox.alert({ message: 'hi', reusable: false });

							removed = vi.spyOn(dialog, 'remove').mockImplementation(() => {});

							e = target => {
								dialog?.dispatchEvent(new Event('hidden.bs.modal',
									{
										target: target
									}));
							};
						});

						afterEach(() => {
							removed.mockRestore();
						});

						describe('when triggered with `reusable: false`',
							() => {
								beforeEach(() => {
									e(dialog);
								});

								it('removes the dialog',
									() => {
										expect(removed).toHaveBeenCalled();
									});
							});
					});
			});

		describe('reusable not set dialog',
			() => {
				describe('hidden.bs.modal',
					() => {
						beforeEach(() => {
							dialog = bootbox.alert({ message: 'hi' });

							removed = vi.spyOn(dialog, 'remove').mockImplementation(() => {});

							e = target => {
								dialog?.dispatchEvent(new Event('hidden.bs.modal',
									{
										target: target
									}));
							};
						});

						afterEach(() => {
							removed.mockRestore();
						});

						describe('when triggered with `reusable` not set',
							() => {
								beforeEach(() => {
									e(dialog);
								});

								it('removes the dialog',
									() => {
										expect(removed).toHaveBeenCalled();
									});
							});
					});
			});
	});