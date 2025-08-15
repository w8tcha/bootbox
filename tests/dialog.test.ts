import {describe,beforeEach, it, expect, vi} from  'vitest';
import * as bootbox from '../src/bootbox';
import * as bootstrap from 'bootstrap';

  let dialog: HTMLElement | null;
  let create:any;
  let badCreate:any;
  let hidden: any;
  let callback: any;
  let e: any;

  let find: any;
  let exists: any;
  
describe('bootbox.dialog', () => {
  'use strict';
  beforeEach(() => {
    find = (s: string) : HTMLElement | null | undefined => dialog?.querySelector<HTMLElement>(s);
    
    exists = (selector: string) : boolean => find(selector) !== null;
  });
  describe('invalid usage tests', () => {
    describe('with no arguments', () => {
      beforeEach(() => {
         create = () => {
	         bootbox.dialog();
         };
      });
       it('throws an error', () => {
         expect(create).to.throw("Cannot read properties of undefined (reading 'message')");
      });
    });
     describe('with one argument', () => {
      describe('where the argument is not an object', () => {
        beforeEach(() => {
           create = () => {
	           bootbox.dialog('test');
           };
        });
         it('throws an error', () => {
           expect(create).to.throw(/"message" option must not be null or an empty string./);
        });
      });
      describe('where the argument has no message property', () => {
        beforeEach(() => {
           create = () => {
	           bootbox.dialog({
		           invalid: 'options'
	           });
           };
        });
         it('throws an error', () => {
           expect(create).to.throw('"message" option must not be null or an empty string.');
        });
      });
       describe('where the argument has a button with an invalid value', () => {
        beforeEach(() => {
           create = () => {
	           bootbox.dialog({
		           message: 'test',
		           buttons: {
			           ok: 'foo'
		           }
	           });
           };
        });
         it('throws an error', () => {
           expect(create).to.throw('button with key "ok" must be an object');
        });
      });
    });
  });
  describe('when creating a minimal dialog', () => {
    beforeEach(() => {
       dialog = bootbox.dialog({
        message: 'test'
      });
    });
    it('adds the bootbox class to the dialog', () => {
       expect(dialog?.classList.contains('bootbox')).to.be.true;
    });
    it('adds the bootstrap modal class to the dialog', () => {
       expect(dialog?.classList.contains('modal')).to.be.true;
    });
    it('adds the fade class to the dialog', () => {
       expect(dialog?.classList.contains('fade')).to.be.true;
    });
    it('shows the expected message', () => {
       expect(dialog?.querySelector('.bootbox-body')?.innerHTML).to.equal('test');
    });
    it('has a header', () => {
       expect(exists('.modal-header') ).to.be.not.null;
    });
    it('has a close button inside the header', () => {
       expect(exists('.modal-header .close') ).to.be.not.null;
    });
    it('does not have a footer', () => {
       expect(exists('.modal-footer')).not.to.be.ok;
    });
  });
  describe('when creating a dialog with a button', () => {

    beforeEach(() => {
    create = (button = {}) => {
      dialog = bootbox.dialog({
        message: 'test',
        buttons: {
          one: button
        }
      });
    };
    });
    describe('when the button has no callback', () => {
      beforeEach(() => {
        create({
          label: 'My Label'
        });
        const modalInstance = bootstrap.Modal.getInstance(dialog!);
                
         hidden = vi.spyOn(modalInstance, 'hide');
      });
      it('shows a footer', () => {
         expect(exists('.modal-footer') ).to.be.not.null;
      });
      it('shows one button', () => {
         expect(find('.btn')).not.null;
      });
      it('shows the correct button text', () => {
         expect(dialog?.querySelector('.btn')?.innerHTML).to.equal('My Label');
      });
      it('applies the correct button class', () => {
        expect(dialog?.querySelector<HTMLElement>('.btn')?.classList).toContain('btn-primary');
      });
      describe('when triggering the escape event', () => {
        beforeEach(() => {
           const Event = window.Event;
           dialog?.dispatchEvent(new Event('escape.close.bb'));
        });
         it('should not hide the modal', () => {
           expect(hidden).not.toHaveBeenCalled();
        });
      });
       describe('when clicking the close button', () => {
        beforeEach(() => {
           dialog?.querySelector<HTMLElement>('.close')?.click();
        });
         it('should hide the modal', () => {
           expect(hidden).toHaveBeenCalled();
        });
      });
    });
    describe('when the button has a label and callback', () => {
      beforeEach(() => {
        callback = vi.fn();
        create({
          label: 'Another Label',
          callback: callback
        });
       const modalInstance = bootstrap.Modal.getInstance(dialog!);
                
         hidden = vi.spyOn(modalInstance, 'hide');
      });
      it('shows a footer', () => {
         expect(exists('.modal-footer') ).to.be.not.null;
      });
      it('shows the correct button text', () => {
         expect(dialog?.querySelector<HTMLElement>('.btn')?.innerHTML).to.equal('Another Label');
      });
      describe('when dismissing the dialog by clicking OK', () => {
        beforeEach(() => {
           dialog?.querySelector<HTMLElement>('.btn-primary')?.click();
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
           const Event = window.Event;
					 dialog?.dispatchEvent(new Event('escape.close.bb'));
        });
        it('should not invoke the callback', () => {
           expect(callback).not.toHaveBeenCalled();
        });
         it('should not hide the modal', () => {
           expect(hidden).not.toHaveBeenCalled();
        });
      });
       describe('when clicking the close button', () => {
        beforeEach(() => {
           dialog?.querySelector<HTMLElement>('.close')?.click();
        });
        it('should not invoke the callback', () => {
           expect(callback).not.toHaveBeenCalled();
        });
         it('should hide the modal', () => {
           expect(hidden).toHaveBeenCalled();
        });
      });
    });
    describe('when the button has a custom class', () => {
      beforeEach(() => {
         create({
          label: 'Test Label',
          className: 'btn-custom'
        });
      });
      it('shows the correct button text', () => {
         expect(dialog?.querySelector<HTMLElement>('.btn')?.innerHTML).to.equal('Test Label');
      });
       it('adds the custom class to the button', () => {
        expect(dialog?.querySelector<HTMLElement>('.btn')?.classList).toContain('btn-custom');
      });
    });
     describe('when the button has no explicit label', () => {
      beforeEach(() => {
         create = buttons => {
	         dialog = bootbox.dialog({
		         message: 'test',
		         buttons: buttons
	         });
         };
      });
      describe('when its value is an object', () => {
        beforeEach(() => {
           create({
            'Short form': {
              className: 'btn-custom',
              callback() {
	              true;
              }
            }
          });
        });
        it('uses the key name as the button text', () => {
           expect(dialog?.querySelector<HTMLElement>('.btn')?.innerHTML).to.equal('Short form');
        });
         it('adds the custom class to the button', () => {
          expect(dialog?.querySelector<HTMLElement>('.btn')?.classList).toContain('btn-custom');
        });
      });
      describe('when its value is a function', () => {
        beforeEach(() => {
          callback = vi.fn();
           create({
            my_label: callback
          });
        });
        it('uses the key name as the button text', () => {
           expect(dialog?.querySelector<HTMLElement>('.btn')?.innerHTML).to.equal('my_label');
        });
         describe('when dismissing the dialog by clicking the button', () => {
          beforeEach(() => {
             dialog?.querySelector<HTMLElement>('.btn-primary')?.click();
          });
          it('should invoke the callback', () => {
             expect(callback).toHaveBeenCalled();
          });
           it('should pass the dialog as "this"', () => {
             expect(callback.mock.instances[0]).to.equal(dialog);
          });
        });
      });
       });
    });
  });
  describe('when creating a dialog with a title', () => {
    beforeEach(() => {
      dialog = bootbox.dialog({
        title: 'My Title',
        message: 'test'
      });
    });
    it('has a header', () => {
       expect(exists('.modal-header')).to.be.not.null;
    });
    it('shows the correct title text', () => {
       expect(dialog?.querySelector<HTMLElement>('.modal-title')?.innerHTML).to.equal('My Title');
    });
     it('has a close button inside the header', () => {
       expect(dialog?.querySelector('.modal-header .close')).to.be.not.null;
    });
  });
  describe('when creating a dialog with no close button', () => {
    beforeEach(() => {
       dialog = bootbox.dialog({
        message: 'No backdrop in sight',
        closeButton: false
      });
    });
     it('does not have a close button inside the body', () => {
       expect(exists('.modal-body .close')).not.to.be.ok;
    });
  });
  describe('when creating a dialog with an onEscape handler', () => {
    beforeEach(() => {
       e = (keyCode: any) => {
	       const keyUpEvent = new CustomEvent('keyup', {detail: { which: keyCode}});
	       const Event = window.Event;
         dialog?.dispatchEvent(keyUpEvent);
       };
    });
    describe('with a simple callback', () => {
      beforeEach(() => {
        callback = vi.fn();
        dialog = bootbox.dialog({
          message: 'Are you sure?',
          onEscape: callback
        });
        const modalInstance = bootstrap.Modal.getInstance(dialog);
                
         hidden = vi.spyOn(modalInstance, 'hide');
      });
       describe('when triggering the keyup event', () => {
        describe('when the key is not the escape key', () => {
          beforeEach(() => {
             e(15);
          });
           it('should not hide the modal', () => {
             expect(hidden).not.toHaveBeenCalled();
          });
        });
        describe('when the key is the escape key', () => {
          beforeEach(() => {
			  e(27);
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
    });
     describe('with a callback which returns false', () => {
      beforeEach(() => {
        callback = vi.fn().mockReturnValue(false);
        dialog = bootbox.dialog({
          message: 'Are you sure?',
          onEscape: callback
        });
        const modalInstance = bootstrap.Modal.getInstance(dialog);
                
        hidden = vi.spyOn(modalInstance, 'hide');
      });
      describe('when triggering the escape keyup event', () => {
        beforeEach(() => {
			  e(27);
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
       describe('when clicking the escape button', () => {
        beforeEach(() => {
           document.querySelector<HTMLElement>('.btn-close')?.click();
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
   describe('with size option', () => {
    describe('when the size option is set to large', () => {
      beforeEach(() => {
         dialog = bootbox.dialog({
          message: 'test',
          size: 'large'
        });
      });
       it('adds the large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-lg');
      });
    });
     describe('when the size option is set to small', () => {
      beforeEach(() => {
         dialog = bootbox.dialog({
          message: 'test',
          size: 'small'
        });
      });
       it('adds the large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-sm');
      });
    });
  });
