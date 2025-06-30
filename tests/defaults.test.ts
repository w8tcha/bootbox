import {describe,beforeEach, afterEach, it, expect, vi} from  'vitest';
import * as bootbox from '../src/bootbox';

let dialog: HTMLElement | null;
let container: any;

describe('bootbox.setDefaults', () => {
  'use strict';

  describe('animate', () => {
    describe('when set to false', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          animate: false
        });
        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('does not add the fade class to the dialog', () => {
        expect(dialog?.classList.contains('fade')).to.be.false;
      });

      it('applies the correct class to the body', () => {
        expect(document.querySelector('body')?.classList).toContain('modal-open');
      });

      describe('when clicking the close button', () => {
        beforeEach(() => {
          dialog?.querySelector<HTMLElement>('.close')?.click();
        });

        it('removes the modal-open class from the body', () => {
          expect(document.querySelector('body')?.classList.contains('modal-open')).to.be.false;
        });
      });
    });

    describe('when set to true', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          animate: true
        });
        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the fade class to the dialog', () => {
        expect(dialog?.classList.contains('fade')).to.be.true;
      });
    });
  });

  describe('className', () => {
    describe('when passed as a string', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          className: 'my-class'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra class to the outer dialog', () => {
        expect(dialog?.classList.contains('bootbox')).to.be.true;
        expect(dialog?.classList.contains('my-class')).to.be.true;
      });
    });
  });

  describe('size', () => {
    describe('when set to extra-large', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'extra-large'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-xl');
      });
    });
    describe('when set to xl', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'xl'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-xl');
      });
    });

    describe('when set to extra-large', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'extra-large'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-xl');
      });
    });
    describe('when set to xl', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'xl'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-xl');
      });
    });

    describe('when set to large', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'large'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-lg');
      });
    });
    describe('when set to lg', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'lg'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the large class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-lg');
      });
    });

    describe('when set to small', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'small'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the small class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-sm');
      });
    });
    describe('when set to sm', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          size: 'sm'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the small class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-sm');
      });
    });
  });

  describe('centerVertical', () => {
    describe('when set to true', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          centerVertical: true
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the modal-dialog-centered class to the innerDialog', () => {
         expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-dialog-centered');
      });
    });
  });
  
  describe('scrollable', () => {
    describe('when set to true', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          scrollable: true
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the modal-dialog-scrollable class to the innerDialog', () => {
        expect(dialog?.querySelector<HTMLElement>(".modal-dialog")?.classList).toContain('modal-dialog-scrollable');
      });
    });
  });

  describe('when passed two arguments', () => {
    beforeEach(() => {
      bootbox.setDefaults('className', 'my-class');
      dialog = bootbox.dialog({
        message: 'test'
      });
    });

    it('applies the arguments as a key/value pair', () => {
      expect(dialog?.classList.contains('bootbox')).to.be.true;
      expect(dialog?.classList.contains('my-class')).to.be.true;
    });
  });

  describe('container', () => {
    describe('when not explicitly set', () => {
      beforeEach(() => {
        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('defaults to the body element', () => {
        expect((dialog?.parentNode as HTMLElement).tagName.toLowerCase() == 'body').to.be.true;
      });
    });

    describe('when explicitly set to body', () => {
      beforeEach(() => {
        bootbox.setDefaults({
          container: 'body'
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('sets the correct parent element', () => {
        expect((dialog?.parentNode as HTMLElement).tagName.toLowerCase() == 'body').to.be.true;
      });
    });

    describe('when set to another dom element', () => {

      beforeEach(() => {
		const template = document.createElement('template');
        template.innerHTML = '<div></div>'.trim();
		  
        container = template.content.children[0];
        bootbox.setDefaults({
          container: container
        });

        dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('sets the correct parent element', () => {
        expect(dialog?.parentNode == container).to.be.true;
      });
    });
  });
});
