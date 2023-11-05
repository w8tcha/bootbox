describe('bootbox.setDefaults', function() {
  'use strict';
  beforeEach(function() {
    this.find = function(selector) {
      return this.dialog.querySelector(selector);
    };
  });

  describe('animate', function() {
    describe('when set to false', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          animate: false
        });
        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('does not add the fade class to the dialog', function() {
        expect(this.dialog.classList.contains('fade')).to.be.false;
      });

      it('applies the correct class to the body', function() {
        expect(document.querySelector('body').classList.contains('modal-open')).to.be.true;
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.querySelector('.close').click();
        });

        it('removes the modal-open class from the body', function() {
          expect(document.querySelector('body').classList.contains('modal-open')).to.be.false;
        });
      });
    });

    describe('when set to true', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          animate: true
        });
        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the fade class to the dialog', function() {
        expect(this.dialog.classList.contains('fade')).to.be.true;
      });
    });
  });

  describe('className', function() {
    describe('when passed as a string', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          className: 'my-class'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra class to the outer dialog', function() {
        expect(this.dialog.classList.contains('bootbox')).to.be.true;
        expect(this.dialog.classList.contains('my-class')).to.be.true;
      });
    });
  });

  describe('size', function() {
    describe('when set to extra-large', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'extra-large'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-xl')).to.be.true;
      });
    });
    describe('when set to xl', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'xl'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-xl')).to.be.true;
      });
    });

    describe('when set to extra-large', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'extra-large'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-xl')).to.be.true;
      });
    });
    describe('when set to xl', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'xl'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the extra-large class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-xl')).to.be.true;
      });
    });

    describe('when set to large', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'large'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the large class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-lg')).to.be.true;
      });
    });
    describe('when set to lg', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'lg'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the large class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-lg')).to.be.true;
      });
    });

    describe('when set to small', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'small'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the small class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-sm')).to.be.true;
      });
    });
    describe('when set to sm', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          size: 'sm'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the small class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-sm')).to.be.true;
      });
    });
  });

  describe('centerVertical', function() {
    describe('when set to true', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          centerVertical: true
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the modal-dialog-centered class to the innerDialog', function() {
	  expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-dialog-centered')).to.be.true;
      });
    });
  });
  
  describe('scrollable', function() {
    describe('when set to true', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          scrollable: true
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('adds the modal-dialog-scrollable class to the innerDialog', function() {
        expect(this.dialog.querySelector(".modal-dialog").classList.contains('modal-dialog-scrollable')).to.be.true;
      });
    });
  });

  describe('when passed two arguments', function() {
    beforeEach(function() {
      bootbox.setDefaults('className', 'my-class');
      this.dialog = bootbox.dialog({
        message: 'test'
      });
    });

    it('applies the arguments as a key/value pair', function() {
      expect(this.dialog.classList.contains('bootbox')).to.be.true;
      expect(this.dialog.classList.contains('my-class')).to.be.true;
    });
  });

  describe('container', function () {
    describe('when not explicitly set', function() {
      beforeEach(function() {
        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('defaults to the body element', function() {
        expect(this.dialog.parentNode.tagName.toLowerCase() == 'body').to.be.true;
      });
    });

    describe('when explicitly set to body', function() {
      beforeEach(function() {
        bootbox.setDefaults({
          container: 'body'
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('sets the correct parent element', function() {
        expect(this.dialog.parentNode.tagName.toLowerCase() == 'body').to.be.true;
      });
    });

    describe('when set to another dom element', function() {

      beforeEach(function() {
		const template = document.createElement('template');
        template.innerHTML = '<div></div>'.trim();
		  
        this.container = template.content.children[0];
        bootbox.setDefaults({
          container: this.container
        });

        this.dialog = bootbox.dialog({
          message: 'test'
        });
      });

      it('sets the correct parent element', function() {
        expect(this.dialog.parentNode == this.container).to.be.true;
      });
    });
  });
});
