
import {Example} from'./example.ts';
import * as bootbox from '@w8tcha/bootbox';

function createElement(html: string): HTMLCollection {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.children;
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    let locales = Object.keys(bootbox.getAllLocales());
    for (let i = 0; i < locales.length; i++) {

      let option = document.createElement('option');

      option.value = locales[i];
      option.innerHTML = locales[i];

      document.getElementById('choose-locale')!.append(option);
    }

    const example = new Example({ selector: "#bb-growl" });

    document.querySelectorAll<HTMLElement>('.example-button').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

      let key = button.dataset.bbExampleKey?.trim()!;
      if (key != "") {
        switch (key) {

          /* Alerts */

          case 'alert-default':
            bootbox.alert("This is the default alert!");
            example.show('Default alert');
            break;

          case 'alert-html-callback':
            let template = document.getElementById('alert-message-template');
            bootbox.alert(template, function () {
              example.show('This was logged in the callback!');
            });
            break;

          case 'alert-callback':
            bootbox.alert("This is an alert with a callback!", function () {
              example.show('This was logged in the callback!');
            });
            break;

          case 'alert-options':
            bootbox.alert({
              message: "This is an alert with a callback!",
              callback: function () {
                example.show('This was logged in the callback!');
              }
            });
            break;

          case 'alert-small':
            bootbox.alert({
              message: "This is the small alert!",
              size: 'small'
            });
            example.show('Small alert shown');
            break;

          case 'alert-large':
            bootbox.alert({
              message: "This is the large alert!",
              size: 'large'
            });
            example.show('Large alert shown');
            break;

          case 'alert-extra-large':
            bootbox.alert({
              message: "This is the extra-large alert!",
              size: 'extra-large'
            });
            example.show('Extra-large alert shown');
            break;

          case 'alert-custom-class':
            bootbox.alert({
              message: "This is an alert with an additional class!",
              className: 'animate__rubberBand animate__animated'
            });
            example.show('Custom class alert shown');
            break;

          case 'alert-overlay-click':
            bootbox.alert({
              message: "This alert can be dismissed by clicking on the background!",
              backdrop: true
            });
            example.show('Dismissable background alert shown');
            break;

          case 'alert-locale':
            bootbox.alert({
              message: "This alert uses the Arabic locale!",
              locale: 'ar'
            });
            example.show('Arabic locale alert shown');
            break;


          /* Confirms */

          case 'confirm-default':
            bootbox.confirm("This is the default confirm.", function (result: any) {
              example.show('This was logged in the callback: ' + result);
            });
            break;

          case 'confirm-options':
            bootbox.confirm({
              message: "This is a confirm with custom button text and color! Do you like it?",
              buttons: {
                confirm: {
                  label: 'Yes',
                  className: 'btn-success'
                },
                cancel: {
                  label: 'No',
                  className: 'btn-danger'
                }
              },
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'confirm-button-text':
            bootbox.confirm({
              title: "Destroy planet?",
              message: "Do you want to activate the Deathstar now? This cannot be undone.",
              buttons: {
                cancel: {
                  label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                  label: '<i class="fa fa-check"></i> Confirm'
                }
              },
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'confirm-locale':
            let confirmLocale = (document.getElementById('choose-locale')! as HTMLInputElement).value;
            bootbox.confirm({
              message: "This confirm uses the selected locale, <b>" + confirmLocale + "</b>. Were the labels what you expected?",
              locale: confirmLocale,
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;


          /* Prompts */

          case 'prompt-default':
            bootbox.prompt("This is the default prompt!", function (result: any) {
              example.show('This was logged in the callback: ' + result);
            });
            break;

          case 'prompt-centerVertical':
            bootbox.prompt({
              title: "This is a prompt, vertically centered!", 
              centerVertical: true,
              callback: function(result: any){ 
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-custom-locale':
            let customLocale = {
              OK: 'I Suppose',
              CONFIRM: 'Go Ahead',
              CANCEL: 'Maybe Not'
            };

            bootbox.addLocale('custom', customLocale);

            bootbox.prompt({
              title: "This is a prompt with a custom locale! What do you think?",
              locale: 'custom',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-checkbox':
            bootbox.prompt({
              title: "This is a prompt with a set of checkbox inputs!",
              inputType: 'checkbox',
              inputOptions: [
                {
                  text: 'Choice One',
                  value: '1',
                },
                {
                  text: 'Choice Two',
                  value: '2',
                },
                {
                  text: 'Choice Three',
                  value: '3',
                }
              ],
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-radio':
            bootbox.prompt({
              title: "This is a prompt with a set of radio inputs!",
              message: 'Please select an option below:',
              inputType: 'radio',
              inputOptions: [
                {
                  text: 'Choice One',
                  value: '1',
                },
                {
                  text: 'Choice Two',
                  value: '2',
                },
                {
                  text: 'Choice Three',
                  value: '3',
                }
              ],
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-date':
            bootbox.prompt({
              title: "This is a prompt with a date input!",
              inputType: 'date',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-email':
            bootbox.prompt({
              title: "This is a prompt with an email input!",
              inputType: 'email',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-number':
            bootbox.prompt({
              title: "This is a prompt with a number input!",
              inputType: 'number',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-password':
            bootbox.prompt({
              title: "This is a prompt with a password input!",
              inputType: 'password',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-select':
            bootbox.prompt({
              title: "This is a prompt with select!",
              inputType: 'select',
              inputOptions: [
                {
                  text: 'Choose one...',
                  value: '',
                },
                {
                  text: 'Choice One',
                  value: '1',
                },
                {
                  text: 'Choice Two',
                  value: '2',
                },
                {
                  text: 'Choice Three',
                  value: '3',
                }
              ],
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-select-multiple':
            bootbox.prompt({
              title: "This is a prompt with a multi-select!",
              inputType: 'select',
              multiple: true,
              value: ['1','3'],
              inputOptions: [
              {
                  text: 'Choose one...',
                  value: '',
              },
              {
                  text: 'Choice One',
                  value: '1',
              },
              {
                  text: 'Choice Two',
                  value: '2',
              },
              {
                  text: 'Choice Three',
                  value: '3',
              }
              ],
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-textarea':
            bootbox.prompt({
              title: "This is a prompt with a textarea!",
              inputType: 'textarea',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-time':
            bootbox.prompt({
              title: "This is a prompt with a time input!",
              inputType: 'time',
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;

          case 'prompt-range':
            bootbox.prompt({
              title: "This is a prompt with a range input!",
              inputType: 'range',
              min: 0,
              max: 100,
              step: 5,
              value: 35,
              callback: function (result: any) {
                example.show('This was logged in the callback: ' + result);
              }
            });
            break;


          /* Custom dialogs */

          case 'custom-dialog-as-overlay':
            let timeout = 3000; // 3 seconds
            let dialogAsOverlay = bootbox.dialog({
              message: '<p class="text-center mb-0"><i class="fas fa-spin fa-cog"></i> Please wait while we do something...</p>',
              closeButton: false
            });

            setTimeout(function () {
              dialogAsOverlay._modal.hide();
            }, timeout);

            break;

          case 'custom-dialog-init':
            let dialogWithInit = bootbox.dialog({
              title: 'A custom dialog with init',
              message: '<p><i class="fas fa-spin fa-spinner"></i> Loading...</p>'
            });

            dialogWithInit._element.addEventListener('shown.bs.modal', _ => {
              dialogWithInit._element.querySelector('.bootbox-body')!.innerHTML ='I was loaded after the dialog was shown!';
            });

            break;

          case 'custom-dialog-with-buttons':
            let dialogWithButtons = bootbox.dialog({
              title: 'A custom dialog with buttons and callbacks',
              message: "<p>This dialog has buttons. Each button has it's own callback function.</p>",
              size: 'large',
              buttons: {
                cancel: {
                  label: "I'm a cancel button!",
                  className: 'btn-danger',
                  callback: function () {
                    example.show('Custom cancel clicked');
                  }
                },
                noclose: {
                  label: "I don't close the modal!",
                  className: 'btn-warning',
                  callback: function () {
                    example.show('Custom button clicked');
                    return false;
                  }
                },
                ok: {
                  label: "I'm an OK button!",
                  className: 'btn-info',
                  callback: function () {
                    example.show('Custom OK clicked');
                  }
                }
              }
            });

            break;
        }
      }

      });
    });
  }
  catch (ex: any) {
    console.log(ex.message);
  }
});