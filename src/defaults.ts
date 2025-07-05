import BootboxDefaults from "./interfaces/bootboxDefaults";
import { Translations } from "./interfaces/locale.ts";
import { Templates } from "./interfaces/templates";

// locales
import ar from './locales/ar.ts'; 
import az from './locales/az.ts'; 
import bgBG from './locales/bg_BG.ts'; 
import cs from './locales/cs.ts'; 
import da from './locales/da.ts'; 
import de from './locales/de.ts'; 
import el from './locales/el.ts'; 
import en from './locales/en.ts'; 
import es from './locales/es.ts'; 
import et from './locales/et.ts'; 
import eu from './locales/eu.ts'; 
import fa from './locales/fa.ts'; 
import fi from './locales/fi.ts'; 
import fr from './locales/fr.ts'; 
import he from './locales/he.ts'; 
import hr from './locales/hr.ts'; 
import hu from './locales/hu.ts'; 
import id from './locales/id.ts'; 
import it from './locales/it.ts'; 
import ja from './locales/ja.ts'; 
import ka from './locales/ka.ts'; 
import ko from './locales/ko.ts'; 
import lt from './locales/lt.ts'; 
import lv from './locales/lv.ts'; 
import nl from './locales/nl.ts'; 
import no from './locales/no.ts'; 
import pl from './locales/pl.ts'; 
import pt from './locales/pt.ts'; 
import ptBR from './locales/pt_BR.ts'; 
import ru from './locales/ru.ts'; 
import sk from './locales/sk.ts'; 
import sl from './locales/sl.ts'; 
import sq from './locales/sq.ts'; 
import sv from './locales/sv.ts'; 
import sw from './locales/sw.ts'; 
import ta from './locales/ta.ts'; 
import th from './locales/th.ts'; 
import tr from './locales/tr.ts'; 
import uk from './locales/uk.ts'; 
import vi from './locales/vi.ts'; 
import zhCN from './locales/zh_CN.ts'; 
import zhTW from './locales/zh_TW.ts';

export const DEFAULT_LOCALES: Translations = {
	ar,
	az,
	bgBG,
	cs,
	da,
	de,
	el,
	en,
	es,
	et,
	eu,
	fa,
	fi,
	fr,
	he,
	hr,
	hu,
	id,
	it,
	ja,
	ka,
	ko,
	lt,
	lv,
	nl,
	no,
	pl,
	pt,
	ptBR,
	ru,
	sk,
	sl,
	sq,
	sv,
	sw,
	ta,
	th,
	tr,
	uk,
	vi,
	zhCN,
	zhTW,
} as const;


export const DEFAULT_TEMPLATES: Templates = {
	dialog:
		'<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
	header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
	footer: '<div class="modal-footer"></div>',
	closeButton:
		'<button type="button" class="bootbox-close-button close btn-close" aria-label="Close"></button>',
	form: '<form class="bootbox-form"></form>',
	button: '<button type="button" class="btn"></button>',
	option: '<option value=""></option>',
	promptMessage: '<div class="bootbox-prompt-message"></div>',
	inputs: {
		text: '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
		textarea: '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
		email:
			'<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
		select: '<select class="bootbox-input bootbox-input-select form-select"></select>',
		checkbox:
			'<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
		radio:
			'<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
		date: '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
		time: '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
		number:
			'<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
		password:
			'<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
		range:
			'<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
	}
} as const;

export const DEFAULT_OPTIONS: BootboxDefaults = {
    locale: 'en',
    backdrop: 'static',
    animate: true,
    className: null,
    closeButton: true,
    show: true,
    container: 'body',
    value: '',
    inputType: 'text',
    errorMessage: null,
    swapButtonOrder: false,
    centerVertical: false,
    multiple: false,
    scrollable: false,
    reusable: false,
    relatedTarget: null,
    size: null,
    id: null
} as const;