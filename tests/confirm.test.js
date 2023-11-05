// Generated by CoffeeScript 1.7.1
describe('bootbox.confirm', function() {
  'use strict';
  describe('basic usage tests', function() {
    describe('with one argument', function() {

      describe('where the argument is not an object', function() {
        beforeEach(function() {
          return this.create = function() {
            return bootbox.confirm('Are you sure?');
          };
        });
        return it('throws an error', function() {
          return expect(this.create).throw('confirm requires a callback');
        });
      });


      describe('where the argument is an object', function() {
        beforeEach(function() {
          this.options = {};
          return this.create = (function(_this) {
            return function() {
              return _this.dialog = bootbox.confirm(_this.options);
            };
          })(this);
        });


        describe('with a message property', function() {
          beforeEach(function() {
            return this.options.message = 'Are you sure?';
          });
          return it('throws an error requiring a callback', function() {
            return expect(this.create).throw(/confirm requires a callback/);
          });
        });


        describe('with a callback property', function() {
          describe('where the callback is not a function', function() {
            beforeEach(function() {
              return this.options.callback = 'Are you sure?';
            });
            return it('throws an error requiring a callback', function() {
              return expect(this.create).throw(/confirm requires a callback/);
            });
          });
          
          describe('where the callback is a function', function() {
            beforeEach(function() {
              return this.options.callback = function() {
                return true;
              };
            });
            return it('throws an error requiring a message', function() {
              return expect(this.create).to.throw(/"message" option must not be null or an empty string./);
            });
          });
        });

        
        describe('with a message and a callback', function() {
          beforeEach(function() {
            var _this = this;
            this.options = {
              callback: function() {
                return true;
              },
              message: 'Are you sure?'
            };
        
            return this.create = function() {
              _this.dialog = bootbox.confirm(_this.options);
            };
          });

          it('does not throw an error', function() {
            return expect(this.create).not.throw(Error);
          });
          it('creates a dialog object', function() {
            return expect(bootstrap.Modal.getInstance(this.dialog)).to.be.an('object');
          });
          it('adds the correct button labels', function() {
            expect(this.dialog.querySelector('.btn:first-child').textContent).to.equal('Cancel');
            return expect(this.dialog.querySelector('.btn:last-child').textContent).to.equal('OK');
          });
          return it('adds the correct button classes', function() {
            expect(this.dialog.querySelector('.btn:first-child').classList.contains('btn-default')).to.be.true;
            expect(this.dialog.querySelector('.btn:first-child').classList.contains('btn-secondary')).to.true;
            expect(this.dialog.querySelector('.btn:first-child').classList.contains('bootbox-cancel')).to.true;

            expect(this.dialog.querySelector('.btn:last-child').classList.contains('btn-primary')).to.true;
            return expect(this.dialog.querySelector('.btn:last-child').classList.contains('bootbox-accept')).to.true;
          });
        });
      });
    });


    describe('with two arguments', function() {
      describe('where the second argument is not a function', function() {
        beforeEach(function() {
          return this.create = (function(_this) {
            return function() {
              return _this.dialog = bootbox.confirm('Are you sure?', 'callback here');
            };
          })(this);
        });
        return it('throws an error requiring a callback', function() {
          return expect(this.create).throw(/confirm requires a callback/);
        });
      });
      
      describe('where the second argument is a function', function() {
        beforeEach(function() {
          return this.create = (function(_this) {
            return function() {
              return _this.dialog = bootbox.confirm('Are you sure?', function() {
                return true;
              });
            };
          })(this);
        });
        it('does not throw an error', function() {
          return expect(this.create).not.throw(Error);
        });
        it('creates a dialog object', function() {
          return expect(bootstrap.Modal.getInstance(this.dialog)).to.be.an('object');
        });
        it('applies the bootbox-confirm class to the dialog', function() {
          return expect(this.dialog.classList.contains('bootbox-confirm')).to.true;
        });
        it('adds the correct button labels', function() {
          expect(this.dialog.querySelector('.btn:first-child').textContent).to.equal('Cancel');
          return expect(this.dialog.querySelector('.btn:last-child').textContent).to.equal('OK');
        });
        it('adds the correct button classes', function() {
          expect(this.dialog.querySelector('.btn:first-child').classList.contains('btn-default')).to.true;
          expect(this.dialog.querySelector('.btn:first-child').classList.contains('btn-secondary')).to.true;
          expect(this.dialog.querySelector('.btn:first-child').classList.contains('bootbox-cancel')).to.true;

          expect(this.dialog.querySelector('.btn:last-child').classList.contains('btn-primary')).to.true;
          return expect(this.dialog.querySelector('.btn:last-child').classList.contains('bootbox-accept')).to.true;
        });
        return it('shows the dialog', function() {
			var isVisible = !!(this.dialog.offsetWidth || this.dialog.offsetHeight || this.dialog.getClientRects().length);
          return expect(isVisible).to.true;
        });
      });

    });
  });


  describe('configuration options tests', function() {
    beforeEach(function() {
      this.options = {
        message: 'Are you sure?',
        callback: function() {
          return true;
        }
      };
      return this.create = (function(_this) {
        return function() {
          return _this.dialog = bootbox.confirm(_this.options);
        };
      })(this);
    });

    describe('with a custom cancel button', function() {
      beforeEach(function() {
        this.options.buttons = {
          cancel: {
            label: 'Custom cancel',
            className: 'btn-danger'
          }
        };
        this.create();
        return this.button = this.dialog.querySelector('.btn:first-child');
      });
      return it('adds the correct cancel button', function() {
        expect(this.button.textContent).to.equal('Custom cancel');
        return expect(this.button.classList.contains('btn-danger')).to.true;
      });
    });

    describe('with a custom confirm button', function() {
      beforeEach(function() {
        this.options.buttons = {
          confirm: {
            label: 'Custom confirm',
            className: 'btn-warning'
          }
        };
        this.create();
        return this.button = this.dialog.querySelector('.btn:last-child');
      });
      return it('adds the correct confirm button', function() {
        expect(this.button.textContent).to.equal('Custom confirm');
        return expect(this.button.classList.contains('btn-warning')).to.true;
      });
    });

    describe('with an unrecognised button key', function() {
      beforeEach(function() {
        return this.options.buttons = {
          'Bad key': {
            label: 'Custom confirm',
            className: 'btn-warning'
          }
        };
      });
      return it('throws an error', function() {
        return expect(this.create).throw('button key "Bad key" is not allowed (options are cancel confirm)');
      });
    });
  });


  describe('callback tests', function() {
    describe('with a simple callback', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.confirm({
          message: 'Are you sure?',
          callback: this.callback
        });
        return this.hidden = sinon.spy(bootstrap.Modal.getInstance(this.dialog), "hide");
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          return this.dialog.querySelector('.bootbox-accept').click();
        });
        it('should invoke the callback', function() {
          return expect(this.callback).to.have.been.called;
        });
        it('should pass the dialog as "this"', function() {
          return expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });
        it('with the correct value', function() {
          return expect(this.callback).to.have.been.calledWithExactly(true);
        });
        return it('should hide the modal', function() {
          return expect(this.hidden).to.have.been.calledWithExactly();
        });
      });

      describe('when dismissing the dialog by clicking Cancel', function() {
        beforeEach(function() {
          return this.dialog.querySelector('.bootbox-cancel').click();
        });
        it('should invoke the callback', function() {
          return expect(this.callback).to.have.been.called;
        });
        it('should pass the dialog as "this"', function() {
          return expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });
        it('with the correct value', function() {
          return expect(this.callback).to.have.been.calledWithExactly(false);
        });
        return it('should hide the modal', function() {
          return expect(this.hidden).to.have.been.calledWithExactly();
        });
      });
      
      describe('when triggering the escape event', function() {
        beforeEach(function() {
          return this.dialog.dispatchEvent(new Event('escape.close.bb'));
        });
        it('should invoke the callback', function() {
          return expect(this.callback).to.have.been.called;
        });
        it('should pass the dialog as "this"', function() {
          return expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });
        it('with the correct value', function() {
          return expect(this.callback).to.have.been.calledWithExactly(false);
        });
        return it('should hide the modal', function() {
          return expect(this.hidden).to.have.been.calledWithExactly();
        });
      });
    });
    
    
    describe('with a callback which returns false', function() {
      beforeEach(function() {
        this.callback = sinon.stub();
        this.callback.returns(false);
        this.dialog = bootbox.confirm({
          message: 'Are you sure?',
          callback: this.callback
        });
        return this.hidden = sinon.spy(bootstrap.Modal.getInstance(this.dialog), "hide");;
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          return this.dialog.querySelector('.bootbox-accept').click();
        });
        it('should invoke the callback', function() {
          return expect(this.callback).to.have.been.called;
        });
        it('should pass the dialog as "this"', function() {
          return expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });
        it('with the correct value', function() {
          return expect(this.callback).to.have.been.calledWithExactly(true);
        });
        return it('should not hide the modal', function() {
          return expect(this.hidden).not.to.have.been.called;
        });
      });
      
      describe('when dismissing the dialog by clicking Cancel', function() {
        beforeEach(function() {
          return this.dialog.querySelector('.bootbox-cancel').click();
        });
        it('should invoke the callback', function() {
          return expect(this.callback).to.have.been.called;
        });
        it('should pass the dialog as "this"', function() {
          return expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });
        it('with the correct value', function() {
          return expect(this.callback).to.have.been.calledWithExactly(false);
        });
        return it('should not hide the modal', function() {
          return expect(this.hidden).not.to.have.been.called;
        });
      });
      
      describe('when triggering the escape event', function() {
        beforeEach(function() {
          return this.dialog.dispatchEvent(new Event('escape.close.bb'));
        });
        it('should invoke the callback', function() {
          return expect(this.callback).to.have.been.called;
        });
        it('should pass the dialog as "this"', function() {
          return expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });
        it('with the correct value', function() {
          return expect(this.callback).to.have.been.calledWithExactly(false);
        });
        return it('should not hide the modal', function() {
          return expect(this.hidden).not.to.have.been.called;
        });
      });

    });
  });
});
