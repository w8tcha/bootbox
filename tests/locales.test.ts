import {describe,beforeEach, afterEach, it, expect, vi} from  'vitest';
import * as bootbox from '../src/bootbox';

let setLocale : any;
let labels: any;

describe('bootbox locales',
	() => {
		'use strict';
		beforeEach(() => {
			return setLocale = (locale: string) => {
				bootbox.setLocale(locale);
				var alert = bootbox.alert('foo')._element;
				var confirm = bootbox.confirm('foo', () => { return true; })._element;

				return labels = {
					ok: alert.querySelector<HTMLElement>('.btn:first-child')?.innerHTML,
					cancel: confirm.querySelector<HTMLElement>('.btn:first-child')?.innerHTML,
					confirm: confirm.querySelector<HTMLElement>('.btn:last-child')?.innerHTML
				};
			};
		});
		afterEach(() => {
			setLocale = null;
			labels = null;
		});
		describe('Invalid locale',
			() => {
				beforeEach(() => {
					return setLocale('xx');
				});
				it('shows the default OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the default CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Cancel');
					});
				return it('shows the default CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('OK');
					});
			});
		describe('Arabic',
			() => {
				beforeEach(() => {
					return setLocale('ar');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('موافق');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('الغاء');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('تأكيد');
					});
			});
		describe('Azerbaijani',
			() => {
				beforeEach(() => {
					return setLocale('az');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('İmtina et');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Təsdiq et');
					});
			});
		describe('English',
			() => {
				beforeEach(() => {
					return setLocale('en');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Cancel');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('OK');
					});
			});
		describe('French',
			() => {
				beforeEach(() => {
					return setLocale('fr');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Annuler');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Confirmer');
					});
			});
		describe('German',
			() => {
				beforeEach(() => {
					return setLocale('de');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Abbrechen');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Akzeptieren');
					});
			});
		describe('Spanish',
			() => {
				beforeEach(() => {
					return setLocale('es');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Cancelar');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Aceptar');
					});
			});
		describe('Basque',
			() => {
				beforeEach(() => {
					return setLocale('eu');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Ezeztatu');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Onartu');
					});
			});
		describe('Portuguese',
			() => {
				beforeEach(() => {
					return setLocale('pt');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Cancelar');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Confirmar');
					});
			});
		describe('Portuguese (Brasil)',
			() => {
				beforeEach(() => {
					return setLocale('pt-BR');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Cancelar');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Sim');
					});
			});
		describe('Dutch',
			() => {
				beforeEach(() => {
					return setLocale('nl');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Annuleren');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Accepteren');
					});
			});
		describe('Russian',
			() => {
				beforeEach(() => {
					return setLocale('ru');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Отмена');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Применить');
					});
			});
		describe('Indonesian',
			() => {
				beforeEach(() => {
					return setLocale('id');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Batal');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('OK');
					});
			});
		describe('Italian',
			() => {
				beforeEach(() => {
					return setLocale('it');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Annulla');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Conferma');
					});
			});
		describe('Polish',
			() => {
				beforeEach(() => {
					return setLocale('pl');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Anuluj');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Potwierdź');
					});
			});
		describe('Danish',
			() => {
				beforeEach(() => {
					return setLocale('da');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Annuller');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Accepter');
					});
			});
		describe('Chinese',
			() => {
				describe('Taiwan',
					() => {
						beforeEach(() => {
							return setLocale('zh-TW');
						});
						it('shows the correct OK translation',
							() => {
								return expect(labels.ok).to.equal('OK');
							});
						it('shows the correct CANCEL translation',
							() => {
								return expect(labels.cancel).to.equal('取消');
							});
						return it('shows the correct CONFIRM translation',
							() => {
								return expect(labels.confirm).to.equal('確認');
							});
					});
				describe('China',
					() => {
						beforeEach(() => {
							return setLocale('zh-CN');
						});
						it('shows the correct OK translation',
							() => {
								return expect(labels.ok).to.equal('OK');
							});
						it('shows the correct CANCEL translation',
							() => {
								return expect(labels.cancel).to.equal('取消');
							});
						return it('shows the correct CONFIRM translation',
							() => {
								return expect(labels.confirm).to.equal('确认');
							});
					});
			});
		describe('Norwegian',
			() => {
				beforeEach(() => {
					return setLocale('no');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Avbryt');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('OK');
					});
			});
		describe('Swedish',
			() => {
				beforeEach(() => {
					return setLocale('sv');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Avbryt');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('OK');
					});
			});
		describe('Latvian',
			() => {
				beforeEach(() => {
					return setLocale('lv');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('Labi');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Atcelt');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Apstiprināt');
					});
			});
		describe('Lithuanian',
			() => {
				beforeEach(() => {
					return setLocale('lt');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('Gerai');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Atšaukti');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Patvirtinti');
					});
			});
		describe('Turkish',
			() => {
				beforeEach(() => {
					return setLocale('tr');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('Tamam');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('İptal');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Onayla');
					});
			});
		describe('Hebrew',
			() => {
				beforeEach(() => {
					return setLocale('he');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('אישור');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('ביטול');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('אישור');
					});
			});
		describe('Greek',
			() => {
				beforeEach(() => {
					return setLocale('el');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('Εντάξει');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Ακύρωση');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Επιβεβαίωση');
					});
			});
		describe('Japanese',
			() => {
				beforeEach(() => {
					return setLocale('ja');
				});
				it('shows the correct OK translation',
					() => expect(labels.ok).to.equal('OK'));
				it('shows the correct CANCEL translation',
					() => expect(labels.cancel).to.equal('キャンセル'));
				return it('shows the correct CONFIRM translation',
					() => expect(labels.confirm).to.equal('OK'));
			});
		describe('Hungarian',
			() => {
				beforeEach(() => {
					return setLocale('hu');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Mégsem');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Megerősít');
					});
			});
		describe('Croatian',
			() => {
				beforeEach(() => {
					return setLocale('hr');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Odustani');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Potvrdi');
					});
			});
		describe('Bulgarian',
			() => {
				beforeEach(() => {
					return setLocale('bg-BG');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('Ок');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Отказ');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Потвърждавам');
					});
			});
		describe('Thai',
			() => {
				beforeEach(() => {
					return setLocale('th');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('ตกลง');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('ยกเลิก');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('ยืนยัน');
					});
			});
		describe('Persian',
			() => {
				beforeEach(() => {
					return setLocale('fa');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('قبول');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('لغو');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('تایید');
					});
			});
		describe('Ukrainian',
			() => {
				beforeEach(() => {
					return setLocale('uk');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Відміна');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Прийняти');
					});
			});
		describe('Albanian',
			() => {
				beforeEach(() => {
					return setLocale('sq');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Anulo');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Prano');
					});
			});
		describe('Slovenian',
			() => {
				beforeEach(() => {
					return setLocale('sl');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Prekliči');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Potrdi');
					});
			});
		describe('Slovak',
			() => {
				beforeEach(() => {
					return setLocale('sk');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Zrušiť');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Potvrdiť');
					});
			});
		describe('Tamil',
			() => {
				beforeEach(() => {
					return setLocale('ta');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('சரி');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('ரத்து செய்');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('உறுதி செய்');
					});
			});
		describe('Swahili',
			() => {
				beforeEach(() => {
					return setLocale('sw');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('Sawa');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Ghairi');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Thibitisha');
					});
			});
		describe('Georgian',
			() => {
				beforeEach(() => {
					return setLocale('ka');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('გაუქმება');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('დადასტურება');
					});
			});
		describe('Vietnamese',
			() => {
				beforeEach(() => {
					return setLocale('vi');
				});
				it('shows the correct OK translation',
					() => {
						return expect(labels.ok).to.equal('OK');
					});
				it('shows the correct CANCEL translation',
					() => {
						return expect(labels.cancel).to.equal('Hủy bỏ');
					});
				return it('shows the correct CONFIRM translation',
					() => {
						return expect(labels.confirm).to.equal('Xác nhận');
					});
			});
	});
