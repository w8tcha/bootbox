describe('bootbox.alert', function() {
  'use strict';
  var self;
  var _this = this;
  _this.bootstrapVersion = function() {
    let fullVersion = bootstrap.Modal.VERSION;
    let i = fullVersion.indexOf('.');
    return fullVersion.substring(0, i);
  };

  beforeEach(function() {
    self = this;

    this.text = function(selector) {
		
      return this.find(selector).textContent;
    };

    this.find = function(selector) {
		return this.dialog.querySelector(selector);
    };
  });

  describe('basic usage tests', function() {
    describe('with no arguments', function() {
      beforeEach(function() {
        this.create = function() {
          bootbox.alert();
        };
      });

      it('throws an error regarding argument length', function() {
        expect(this.create).to.throw(/argument length/);
      });
    });

    describe('with one argument', function() {
      describe('where the argument is a string', function() {
        beforeEach(function() {
          this.dialog = bootbox.alert('Hello world!');
        });

        it('applies the bootbox-alert class to the dialog', function() {
          expect(this.dialog.classList.contains('bootbox-alert')).to.be.true;
        });

        it('shows the expected body copy', function() {
          expect(this.text('.bootbox-body')).to.equal('Hello world!');
        });

        it('shows an OK button', function() {
          expect(this.text('.modal-footer button:first-child')).to.equal('OK');
        });

        it('applies the primary class to the button', function() {
          expect(this.find('.modal-footer button:first-child').classList.contains('btn-primary')).to.be.true;
        });
        
        it('applies the bootbox-accept class to the button', function() {
          expect(this.find('.modal-footer button:first-child').classList.contains('bootbox-accept')).to.be.true;
        });

        it('shows a close button inside the header', function() {
          if(_this.bootstrapVersion() >= 5) {
            expect(this.text('.modal-header button')).to.equal('');
          }
          else {
            expect(this.text('.modal-header button')).to.equal('×');
          }
        });

        it('applies the close class to the close button', function() {
          if(_this.bootstrapVersion() >= 5) {
            expect(this.find('.modal-header button').classList.contains('btn-close')).to.be.true;
          }
          expect(this.find('.modal-header button').classList.contains('close')).to.be.true;
        });

        it('applies the correct aria-hidden attribute to the close button', function() {
          expect(this.find('button.close').getAttribute('aria-hidden')).to.equal('true');
        });

        it('applies the correct class to the body', function() {
          expect(document.querySelector('body').classList.contains('modal-open')).to.be.true;
        });
      });
    });

    describe('with two arguments', function() {
      describe('where the second argument is not a function', function() {
        beforeEach(function() {
          this.create = function() {
            bootbox.alert('Hello world!', 'not a callback');
          };
        });

        it('throws an error requiring a callback', function() {
          expect(this.create).to.throw(/alert requires the "callback" property to be a function when provided/);
        });
      });

      describe('where the second argument is a function', function() {
        beforeEach(function() {
          this.create = function() {
            self.dialog = bootbox.alert('Hello world!', function() {});
          };
        });

        it('does not throw an error', function() {
          expect(this.create).not.to.throw(Error);
        });
      });
    });

    describe('with three arguments', function() {
      beforeEach(function() {
        this.create = function() {
          bootbox.alert(1, 2, 3);
        };
      });

      it('throws an error regarding argument length', function() {
        expect(this.create).to.throw(/argument length/);
      });
    });

  });

  describe('configuration options tests', function() {
    beforeEach(function() {
      this.options = {
        message: 'Hello world',
        callback: function() {}
      };

      this.create = function() {
        self.dialog = bootbox.alert(this.options);
      };

      describe('with a custom ok button', function() {
        beforeEach(function() {
          this.options.buttons = {
            ok: {
              label: 'Custom OK',
              className: 'btn-danger'
            }
          };

          this.create();

          this.button = this.dialog.querySelector('.btn:first-child');
        });

        it('adds the correct ok button', function() {
          expect(this.button.textContent).to.equal('Custom OK');
          expect(this.button.classList.contains('btn-danger')).to.be.true;
          expect(this.button.classList.contains('bootbox-accept')).to.be.true;
        });
      });

      describe('with an unrecognised button key', function() {
        beforeEach(function() {
          this.options.buttons = {
            'Another key': {
              label: 'Custom OK',
              className: 'btn-danger'
            }
          };
        });

        it('throws an error', function() {
          expect(this.create).to.throw('button key "Another key" is not allowed (options are ok)');
        });
      });

      describe('with a custom title', function() {
        beforeEach(function() {
          this.options.title = 'Hello?';
          this.create();
        });

        it('shows the correct title', function() {
          expect(this.text('.modal-title')).to.equal('Hello?');
        });
      });
    });
  });

  describe('callback tests', function() {

    describe('with no callback', function() {
      beforeEach(function() {
        this.dialog = bootbox.alert({
          message:'Hello!'
        });

        this.hidden = sinon.spy(bootstrap.Modal.getInstance(this.dialog), "hide");
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          this.dialog.querySelector('.bootbox-accept').click();
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly();
        });
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.querySelector('.close').click();
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly();
        });
      });

      describe('when triggering the escape event', function() {
        beforeEach(function() {
          this.dialog.dispatchEvent(new Event('escape.close.bb'));
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly();
        });
      });
    });

    describe('with a simple callback', function() {
      beforeEach(function() {
        this.callback = sinon.spy();

        this.dialog = bootbox.alert({
          message:'Hello!',
          callback: this.callback
        });

        this.hidden = sinon.spy(bootstrap.Modal.getInstance(this.dialog), "hide");
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          this.dialog.querySelector('.bootbox-accept').click();
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly();
        });
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.querySelector('.close').click();
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly();
        });
      });

      describe('when triggering the escape event', function() {
        beforeEach(function() {
          this.dialog.dispatchEvent(new Event('escape.close.bb'));
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly();
        });
      });
    });

    describe('with a callback which returns false', function() {
      beforeEach(function() {
        this.callback = sinon.stub();
        this.callback.returns(false);

        this.dialog = bootbox.alert({
          message:'Hello!',
          callback: this.callback
        });

        this.hidden = sinon.spy(bootstrap.Modal.getInstance(this.dialog), "hide");
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          this.dialog.querySelector('.bootbox-accept').click();
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should not hide the modal', function() {
          expect(this.hidden).not.to.have.been.called;
        });
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.querySelector('.close').click();
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should not hide the modal', function() {
          expect(this.hidden).not.to.have.been.called;
        });
      });

      describe('when triggering the escape event', function() {
        beforeEach(function() {
          this.dialog.dispatchEvent(new Event('escape.close.bb'));
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should not hide the modal', function() {
          expect(this.hidden).not.to.have.been.called;
        });
      });
    });
  });
});
