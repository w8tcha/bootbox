/*! @preserve
 * bootbox.js
 * version: 6.0.8
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
import * as e from "bootstrap";
//#region src/locales/ar.ts
var t = {
	OK: "موافق",
	CANCEL: "الغاء",
	CONFIRM: "تأكيد"
}, n = {
	OK: "OK",
	CANCEL: "İmtina et",
	CONFIRM: "Təsdiq et"
}, r = {
	OK: "Ок",
	CANCEL: "Отказ",
	CONFIRM: "Потвърждавам"
}, i = {
	OK: "OK",
	CANCEL: "Zrušit",
	CONFIRM: "Potvrdit"
}, a = {
	OK: "OK",
	CANCEL: "Annuller",
	CONFIRM: "Accepter"
}, o = {
	OK: "OK",
	CANCEL: "Abbrechen",
	CONFIRM: "Akzeptieren"
}, s = {
	OK: "Εντάξει",
	CANCEL: "Ακύρωση",
	CONFIRM: "Επιβεβαίωση"
}, c = {
	OK: "OK",
	CANCEL: "Cancel",
	CONFIRM: "OK"
}, l = {
	OK: "OK",
	CANCEL: "Cancelar",
	CONFIRM: "Aceptar"
}, u = {
	OK: "OK",
	CANCEL: "Katkesta",
	CONFIRM: "OK"
}, d = {
	OK: "OK",
	CANCEL: "Ezeztatu",
	CONFIRM: "Onartu"
}, f = {
	OK: "قبول",
	CANCEL: "لغو",
	CONFIRM: "تایید"
}, p = {
	OK: "OK",
	CANCEL: "Peruuta",
	CONFIRM: "OK"
}, m = {
	OK: "OK",
	CANCEL: "Annuler",
	CONFIRM: "Confirmer"
}, h = {
	OK: "אישור",
	CANCEL: "ביטול",
	CONFIRM: "אישור"
}, g = {
	OK: "OK",
	CANCEL: "Odustani",
	CONFIRM: "Potvrdi"
}, _ = {
	OK: "OK",
	CANCEL: "Mégsem",
	CONFIRM: "Megerősít"
}, ee = {
	OK: "OK",
	CANCEL: "Batal",
	CONFIRM: "OK"
}, te = {
	OK: "OK",
	CANCEL: "Annulla",
	CONFIRM: "Conferma"
}, ne = {
	OK: "OK",
	CANCEL: "キャンセル",
	CONFIRM: "OK"
}, re = {
	OK: "OK",
	CANCEL: "გაუქმება",
	CONFIRM: "დადასტურება"
}, ie = {
	OK: "OK",
	CANCEL: "취소",
	CONFIRM: "확인"
}, ae = {
	OK: "Gerai",
	CANCEL: "Atšaukti",
	CONFIRM: "Patvirtinti"
}, oe = {
	OK: "Labi",
	CANCEL: "Atcelt",
	CONFIRM: "Apstiprināt"
}, v = {
	OK: "OK",
	CANCEL: "Annuleren",
	CONFIRM: "Accepteren"
}, se = {
	OK: "OK",
	CANCEL: "Avbryt",
	CONFIRM: "OK"
}, y = {
	OK: "OK",
	CANCEL: "Anuluj",
	CONFIRM: "Potwierdź"
}, b = {
	OK: "OK",
	CANCEL: "Cancelar",
	CONFIRM: "Confirmar"
}, x = {
	OK: "OK",
	CANCEL: "Cancelar",
	CONFIRM: "Sim"
}, S = {
	OK: "OK",
	CANCEL: "Отмена",
	CONFIRM: "Применить"
}, ce = {
	OK: "OK",
	CANCEL: "Zrušiť",
	CONFIRM: "Potvrdiť"
}, le = {
	OK: "OK",
	CANCEL: "Prekliči",
	CONFIRM: "Potrdi"
}, ue = {
	OK: "OK",
	CANCEL: "Anulo",
	CONFIRM: "Prano"
}, de = {
	OK: "OK",
	CANCEL: "Avbryt",
	CONFIRM: "OK"
}, fe = {
	OK: "Sawa",
	CANCEL: "Ghairi",
	CONFIRM: "Thibitisha"
}, C = {
	OK: "சரி",
	CANCEL: "ரத்து செய்",
	CONFIRM: "உறுதி செய்"
}, w = {
	OK: "ตกลง",
	CANCEL: "ยกเลิก",
	CONFIRM: "ยืนยัน"
}, T = {
	OK: "Tamam",
	CANCEL: "İptal",
	CONFIRM: "Onayla"
}, E = {
	OK: "OK",
	CANCEL: "Відміна",
	CONFIRM: "Прийняти"
}, D = {
	OK: "OK",
	CANCEL: "Hủy bỏ",
	CONFIRM: "Xác nhận"
}, O = {
	OK: "OK",
	CANCEL: "取消",
	CONFIRM: "确认"
}, k = {
	OK: "OK",
	CANCEL: "取消",
	CONFIRM: "確認"
}, A = "6.0.6", j = {
	ar: t,
	az: n,
	bgBG: r,
	cs: i,
	da: a,
	de: o,
	el: s,
	en: c,
	es: l,
	et: u,
	eu: d,
	fa: f,
	fi: p,
	fr: m,
	he: h,
	hr: g,
	hu: _,
	id: ee,
	it: te,
	ja: ne,
	ka: re,
	ko: ie,
	lt: ae,
	lv: oe,
	nl: v,
	no: se,
	pl: y,
	pt: b,
	ptBR: x,
	ru: S,
	sk: ce,
	sl: le,
	sq: ue,
	sv: de,
	sw: fe,
	ta: C,
	th: w,
	tr: T,
	uk: E,
	vi: D,
	zhCN: O,
	zhTW: k
}, M = {
	dialog: "<div class=\"bootbox modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-body\"><div class=\"bootbox-body\"></div></div></div></div></div>",
	header: "<div class=\"modal-header\"><h5 class=\"modal-title\"></h5></div>",
	footer: "<div class=\"modal-footer\"></div>",
	closeButton: "<button type=\"button\" class=\"bootbox-close-button close btn-close\" aria-label=\"Close\"></button>",
	form: "<form class=\"bootbox-form\"></form>",
	button: "<button type=\"button\" class=\"btn\"></button>",
	option: "<option value=\"\"></option>",
	promptMessage: "<div class=\"bootbox-prompt-message\"></div>",
	inputs: {
		text: "<input class=\"bootbox-input bootbox-input-text form-control\" autocomplete=\"off\" type=\"text\" />",
		textarea: "<textarea class=\"bootbox-input bootbox-input-textarea form-control\"></textarea>",
		email: "<input class=\"bootbox-input bootbox-input-email form-control\" autocomplete=\"off\" type=\"email\" />",
		select: "<select class=\"bootbox-input bootbox-input-select form-select\"></select>",
		checkbox: "<div class=\"form-check checkbox\"><label class=\"form-check-label\"><input class=\"form-check-input bootbox-input bootbox-input-checkbox\" type=\"checkbox\" /></label></div>",
		radio: "<div class=\"form-check radio\"><label class=\"form-check-label\"><input class=\"form-check-input bootbox-input bootbox-input-radio\" type=\"radio\" name=\"bootbox-radio\" /></label></div>",
		date: "<input class=\"bootbox-input bootbox-input-date form-control\" autocomplete=\"off\" type=\"date\" />",
		time: "<input class=\"bootbox-input bootbox-input-time form-control\" autocomplete=\"off\" type=\"time\" />",
		number: "<input class=\"bootbox-input bootbox-input-number form-control\" autocomplete=\"off\" type=\"number\" />",
		password: "<input class=\"bootbox-input bootbox-input-password form-control\" autocomplete=\"off\" type=\"password\" />",
		range: "<input class=\"bootbox-input bootbox-input-range form-control-range\" autocomplete=\"off\" type=\"range\" />"
	}
}, N = {
	locale: "en",
	backdrop: "static",
	animate: !0,
	className: null,
	closeButton: !0,
	show: !0,
	container: "body",
	value: "",
	inputType: "text",
	errorMessage: null,
	swapButtonOrder: !1,
	centerVertical: !1,
	multiple: !1,
	scrollable: !1,
	reusable: !1,
	relatedTarget: null,
	size: null,
	id: null
};
//#endregion
//#region src/lib/utils.ts
function P(e) {
	return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(e);
}
function F(e) {
	return /(\d{4})-(\d{2})-(\d{2})/.test(e);
}
function I(e, t) {
	if (typeof t == "string" && typeof e[t] == "function") e[t]();
	else {
		let n = typeof t == "string" ? new Event(t, { bubbles: !0 }) : t;
		e.dispatchEvent(n);
	}
}
//#endregion
//#region src/bootbox.ts
var L = A, R = j, z = M, B = N;
function V(e) {
	return R[H(e)];
}
function pe() {
	return R;
}
function me(e, t) {
	[
		"OK",
		"CANCEL",
		"CONFIRM"
	].forEach((e, n) => {
		if (!t[e]) throw Error(`Please supply a translation for "${e}"`);
	}), R[e] = {
		OK: t.OK,
		CANCEL: t.CANCEL,
		CONFIRM: t.CONFIRM
	};
}
function he(e) {
	if (e !== "en") delete R[e];
	else throw Error("\"en\" is used as the default and fallback locale and cannot be removed.");
}
function ge(e) {
	return e &&= H(e), U("locale", e);
}
function H(e) {
	return e.replace(/[-_]/g, "");
}
function U(...e) {
	let t = {};
	e.length === 2 ? t[e[0]] = e[1] : t = e[0], Object.assign(B, t);
}
function _e() {
	document.querySelectorAll(".bootbox").forEach((t) => {
		let n = e.Modal.getInstance(t);
		n && n.hide();
	});
}
function ve(t) {
	return t || e;
}
function W(t) {
	if (e.Modal === void 0) throw Error("\"bootstrap.Modal\" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/5.3/getting-started/introduction/ for more details.");
	t = Ee(t);
	let n = Q(z.dialog), r = n.querySelector(".modal-dialog"), i = n.querySelector(".modal-body"), a = Q(z.header), o = Q(z.footer), s = t.buttons;
	t.messageForm ? i.querySelector(".bootbox-body").append(t.messageForm) : typeof t.message == "string" ? i.querySelector(".bootbox-body").innerHTML = t.message : i.querySelector(".bootbox-body").append(t.message);
	let c = {};
	if (typeof t.onEscape == "function" && (c.onEscape = t.onEscape), X(t.buttons) > 0) {
		for (let [e, t] of Object.entries(s)) {
			let n = Q(z.button);
			switch (n.dataset.bbHandler = e, t.className.split(" ").forEach((e) => {
				n.classList.add(e);
			}), e) {
				case "ok":
				case "confirm":
					n.classList.add("bootbox-accept");
					break;
				case "cancel": n.classList.add("bootbox-cancel");
			}
			n.innerHTML = t.label, t.id && n.setAttribute("id", t.id), t.disabled === !0 && (n.disabled = !0), o.append(n), typeof t.callback == "function" && (c[e] = t.callback);
		}
		i.after(o);
	}
	if (t.animate === !0 && n.classList.add("fade"), t.className && t.className.split(" ").forEach((e) => {
		n.classList.add(e);
	}), t.id && n.setAttribute("id", t.id), t.size) switch (t.size) {
		case "small":
		case "sm":
			r.classList.add("modal-sm");
			break;
		case "large":
		case "lg":
			r.classList.add("modal-lg");
			break;
		case "extra-large":
		case "xl": r.classList.add("modal-xl");
	}
	if (t.scrollable && r.classList.add("modal-dialog-scrollable"), t.title || t.closeButton) {
		if (t.title ? a.querySelector(".modal-title").innerHTML = t.title : a.classList.add("border-0"), t.closeButton) {
			let e = Q(z.closeButton);
			a.append(e);
		}
		i.before(a);
	}
	if (t.centerVertical && r.classList.add("modal-dialog-centered"), t.reusable || n.addEventListener("hidden.bs.modal", (e) => {
		e.target === n && n.remove();
	}, { once: !0 }), t.onHide) if (typeof t.onHide == "function") n.addEventListener("hide.bs.modal", t.onHide);
	else throw Error("Argument supplied to \"onHide\" must be a function");
	if (t.onHidden) if (typeof t.onHidden == "function") n.addEventListener("hidden.bs.modal", t.onHidden);
	else throw Error("Argument supplied to \"onHidden\" must be a function");
	if (t.onShow) if (typeof t.onShow == "function") $(n, "show.bs.modal", t.onShow);
	else throw Error("Argument supplied to \"onShow\" must be a function");
	if (n.addEventListener("shown.bs.modal", Y), t.onShown) if (typeof t.onShown == "function") $(n, "shown.bs.modal", t.onShown);
	else throw Error("Argument supplied to \"onShown\" must be a function");
	if (t.backdrop === !0) {
		let e = !1;
		$(n, "mousedown", (t) => {
			t.stopPropagation(), e = !0;
		}, ".modal-content"), $(n, "click", (t) => {
			e || t.target !== t.currentTarget || I(n, "escape.close.bb");
		});
	}
	n.addEventListener("escape.close.bb", (e) => {
		c.onEscape && Z(e, n, c.onEscape);
	}), n.addEventListener("click", (e) => {
		if (e.target.closest(".bootbox-close-button")) {
			Z(e, n, c.onEscape);
			return;
		}
		if (e.target.nodeName.toLowerCase() === "button" && !e.target.classList.contains("disabled")) {
			let t = e.target.dataset.bbHandler;
			t !== void 0 && Z(e, n, c[t]);
		}
	}), n.addEventListener("keyup", (e) => {
		(e.which === 27 || e.detail.which === 27) && I(n, "escape.close.bb");
	}), typeof t.container == "object" ? t.container.append(n) : document.querySelector(t.container)?.append(n);
	let l = new e.Modal(n, {
		backdrop: t.backdrop !== !1 && "static",
		keyboard: !1
	});
	return t.show && (t.relatedTarget ? l.show(t.relatedTarget) : l.show()), {
		_element: n,
		_modal: l,
		_options: t
	};
}
function ye(...e) {
	let t = K("alert", ["ok"], ["message", "callback"], e);
	if (t.callback && typeof t.callback != "function") throw Error("alert requires the \"callback\" property to be a function when provided");
	return t.buttons.ok.callback = t.onEscape = function() {
		return typeof t.callback != "function" || t.callback.call(this);
	}, W(t);
}
function be(...e) {
	let t;
	if (t = K("confirm", ["cancel", "confirm"], ["message", "callback"], e), typeof t.callback != "function") throw Error("confirm requires a callback");
	let n = t.buttons.cancel, r = t.buttons.confirm;
	return r ||= (t.buttons.confirm = q("confirm", t.locale), t.buttons.confirm), n ||= (t.buttons.cancel = q("cancel", t.locale), t.buttons.cancel), n.callback = t.onEscape = function() {
		return t.callback?.call(this, null);
	}, r.callback = function() {
		return t.callback?.call(this, !0);
	}, t.buttons.cancel = n, t.buttons.confirm = r, W(t);
}
function xe(...e) {
	let t, n, r, i, a, o;
	r = Q(z.form), t = K("prompt", ["cancel", "confirm"], ["title", "callback"], e), t.value || (t.value = B.value), t.inputType || (t.inputType = B.inputType), a = t.show === void 0 ? B.show : t.show, t.show = !1;
	var s = t.buttons.cancel;
	s ||= (t.buttons.cancel = q("cancel", t.locale), t.buttons.cancel), s.callback = t.onEscape = function() {
		return t.callback?.call(this, null);
	}, t.buttons.cancel = s;
	var c = t.buttons.confirm;
	if (c ||= (t.buttons.confirm = q("confirm", t.locale), t.buttons.confirm), c.callback = function() {
		let e;
		if (r.classList.add("was-validated"), t.inputType === "checkbox") {
			let n = Array.from(i.querySelectorAll("input[type=\"checkbox\"]:checked"));
			if (e = Array.from(n).map((e) => e.value), t.required === !0 && n.length === 0) return !1;
		} else if (t.inputType === "radio") e = i.querySelector("input[type=\"radio\"]:checked").value;
		else {
			let n = i;
			if (n.setCustomValidity(""), n.checkValidity && !n.checkValidity()) return t.errorMessage && n.setCustomValidity(t.errorMessage), n.reportValidity && n.reportValidity(), !1;
			e = t.inputType === "select" && t.multiple === !0 ? Array.from(i.querySelectorAll("option:checked")).map((e) => e.value) : n.value;
		}
		return t.callback?.call(this, e);
	}, t.buttons.confirm = c, !t.title) throw Error("prompt requires a title");
	if (typeof t.callback != "function") throw Error("prompt requires a callback");
	var l = z.inputs;
	if (!l[t.inputType]) throw Error("Invalid prompt type");
	switch (i = Q(l[t.inputType]), t.inputType !== "textarea" && i.addEventListener("keydown", function(e) {
		e.key === "Enter" && (e.preventDefault(), I(n.querySelector(".bootbox-accept"), "click"));
	}), t.inputType) {
		case "text":
		case "textarea":
		case "email":
		case "password":
			i.value = t.value.toString(), t.placeholder && i.setAttribute("placeholder", t.placeholder), t.pattern && i.setAttribute("pattern", t.pattern), t.maxlength && i.setAttribute("maxlength", t.maxlength.toString()), t.required && (i.required = !0), t.inputType === "textarea" && t.rows && !isNaN(parseInt(t.rows.toString())) && i.setAttribute("rows", t.rows.toString());
			break;
		case "date":
		case "time":
		case "number":
		case "range":
			if (i.value = t.value.toString(), t.placeholder && i.setAttribute("placeholder", t.placeholder), t.pattern ? i.setAttribute("pattern", t.pattern) : t.inputType === "date" ? i.setAttribute("pattern", "\\d{4}-\\d{2}-\\d{2}") : t.inputType === "time" && i.setAttribute("pattern", "\\d{2}:\\d{2}"), t.required && (i.required = !0), t.step) if (typeof t.step == "string" && (t.step === "any" || parseFloat(t.step) > 0)) i.setAttribute("step", t.step);
			else if (typeof t.step == "number" && !isNaN(t.step) && t.step > 0) i.setAttribute("step", t.step.toString());
			else throw Error("\"step\" must be a valid positive number or the value \"any\". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.");
			De(t.inputType, t.min, t.max) && (t.min !== void 0 && i.setAttribute("min", t.min.toString()), t.max !== void 0 && i.setAttribute("max", t.max.toString()));
			break;
		case "select":
			var u = {};
			if (o = t.inputOptions || [], !Array.isArray(o)) throw Error("Please pass an array of input options");
			if (!o.length) throw Error("prompt with \"inputType\" set to \"select\" requires at least one option");
			t.required && (i.required = !0), t.multiple && (i.multiple = !0);
			for (let [, e] of Object.entries(o)) {
				let t = i;
				if (e.value === void 0 || e.text === void 0) throw Error("each option needs a \"value\" property and a \"text\" property");
				if (e.group) {
					if (!u[e.group]) {
						var d = Q("<optgroup />");
						d.setAttribute("label", e.group), u[e.group] = { Content: d };
					}
					t = u[e.group].Content;
				}
				let n = Q(z.option);
				n.setAttribute("value", e.value), n.textContent = e.text, t.append(n);
			}
			for (let [e, t] of Object.entries(u)) i.append(t.Content);
			i.value = t.value.toString();
			break;
		case "checkbox":
			var f = Array.isArray(t.value) ? t.value : [t.value];
			if (o = t.inputOptions || [], !o.length) throw Error("prompt with \"inputType\" set to \"checkbox\" requires at least one option");
			i = Q("<div class=\"bootbox-checkbox-list\"></div>");
			for (let [e, n] of Object.entries(o)) {
				if (n.value === void 0 || n.text === void 0) throw Error("each option needs a \"value\" property and a \"text\" property");
				let e = Q(z.inputs[t.inputType]);
				e.querySelector("input")?.setAttribute("value", n.value), e.querySelector("label")?.append(`\n${n.text}`);
				for (let [t, r] of Object.entries(f)) r === n.value && e.querySelector("input")?.setAttribute("checked", "true");
				i.append(e);
			}
			break;
		case "radio":
			if (t.value !== void 0 && Array.isArray(t.value)) throw Error("prompt with \"inputType\" set to \"radio\" requires a single, non-array value for \"value\"");
			if (o = t.inputOptions || [], !o.length) throw Error("prompt with \"inputType\" set to \"radio\" requires at least one option");
			i = Q("<div class=\"bootbox-radiobutton-list\"></div>");
			var p = !0;
			for (let [e, n] of Object.entries(o)) {
				if (n.value === void 0 || n.text === void 0) throw Error("each option needs a \"value\" property and a \"text\" property");
				let e = Q(z.inputs[t.inputType]);
				e.querySelector("input")?.setAttribute("value", n.value), e.querySelector("label")?.append(`\n${n.text}`), t.value !== void 0 && n.value === t.value && (e.querySelector("input").checked = !0, p = !1), i.append(e);
			}
			p && i.querySelector("input[type=\"radio\"]")?.setAttribute("checked", "true");
	}
	if (r.append(i), r.addEventListener("submit", (e) => {
		e.preventDefault(), e.stopPropagation(), r.classList.remove("was-validated"), n.querySelector(".bootbox-accept")?.click();
	}), t.message && t.message.trim() !== "") {
		let e = Q(z.promptMessage).innerHTML = t.message;
		r.prepend(e), t.messageForm = r;
	} else t.messageForm = r;
	let m = W(t);
	n = m._element, n.removeEventListener("shown.bs.modal", Y), n.addEventListener("shown.bs.modal", () => {
		i.focus();
	});
	let h = m._modal;
	return a === !0 && h.show(), m;
}
function G(...e) {
	let t = {}, n = !1, r = 0, i = e.length;
	Object.prototype.toString.call(e[0]) === "[object Boolean]" && (n = e[0], r++);
	let a = (e) => {
		for (let r in e) Object.prototype.hasOwnProperty.call(e, r) && (n && Object.prototype.toString.call(e[r]) === "[object Object]" ? t[r] = G(!0, t[r], e[r]) : t[r] = e[r]);
	};
	for (; r < i; r++) {
		let t = e[r];
		a(t);
	}
	return t;
}
function Se(e, t) {
	let n = e.length, r = {};
	if (n < 1 || n > 2) throw Error("Invalid argument length");
	return n === 2 || typeof e[0] == "string" ? (r[t[0]] = e[0], r[t[1]] = e[1]) : r = e[0], r;
}
function Ce(e, t, n) {
	return G({}, e, Se(t, n));
}
function K(e, t, n, r) {
	let i;
	return r && r[0] && (i = r[0].locale || B.locale, (r[0].swapButtonOrder || B.swapButtonOrder) && (t = t.reverse())), we(Ce({
		className: `bootbox-${e}`,
		buttons: Te(t, i),
		show: !0,
		closeButton: !0,
		animate: !0,
		locale: "en",
		swapButtonOrder: !1,
		scrollable: !1,
		reusable: !1,
		centerVertical: !1
	}, r, n), t);
}
function we(e, t) {
	let n = {};
	for (let [e, r] of Object.entries(t)) n[r] = !0;
	for (let [r] of Object.entries(e.buttons)) if (n[r] === void 0) throw Error(`button key "${r}" is not allowed (options are ${t.join(" ")})`);
	return e;
}
function Te(e, t) {
	let n = {};
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r], a = i.toLowerCase();
		n[a] = {
			label: J(i.toUpperCase(), t),
			className: ""
		};
	}
	return n;
}
function q(e, t) {
	return {
		label: J(e.toUpperCase(), t),
		className: ""
	};
}
function J(e, t) {
	let n = R[t];
	return n ? n[e] : R.en[e];
}
function Ee(e) {
	let t, n;
	if (!e.message && !e.messageForm) throw Error("\"message\" option must not be null or an empty string.");
	e = Object.assign({}, B, e), e.backdrop ? e.backdrop = typeof e.backdrop == "string" && e.backdrop.toLowerCase() === "static" ? "static" : !0 : e.backdrop = e.backdrop === !1 || e.backdrop === 0 ? !1 : "static", e.buttons || (e.buttons = {}), t = e.buttons, n = X(t);
	let r = 0;
	for (let [i, a] of Object.entries(t)) {
		if (typeof a == "function" && (a = t[i] = {
			callback: a,
			label: "",
			className: ""
		}), Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/, "$1").toLowerCase() !== "object") throw Error(`button with key "${i}" must be an object`);
		if (a.label || (a.label = i), !a.className) {
			let t = !1;
			t = e.swapButtonOrder ? r === 0 : r === n - 1, n <= 2 && t ? a.className = "btn-primary" : a.className = "btn-secondary";
		}
		r++;
	}
	return e;
}
function Y(e) {
	let t = e?.data?.dialog?.querySelector(".bootbox-accept");
	t && I(t, "focus");
}
function X(e) {
	return Object.keys(e).length;
}
function Z(t, n, r) {
	t.stopPropagation(), t.preventDefault(), (typeof r != "function" || r.call(n, t) !== !1) && n && e.Modal.getInstance(n)?.hide();
}
function De(e, t, n) {
	let r = !1, i = !0, a = !0;
	if (e === "date") t !== void 0 && !(i = F(t)) ? console.warn("Invalid \"min\" date format for input type \"date\".") : n !== void 0 && !(a = F(n)) && console.warn("Invalid \"max\" date format for input type \"date\".");
	else if (e === "time") {
		if (t !== void 0 && !(i = P(t))) throw Error("\"min\" is not a valid time.");
		if (n !== void 0 && !(a = P(n))) throw Error("\"max\" is not a valid time.");
	} else {
		if (t !== void 0 && isNaN(Number(t))) throw i = !1, Error("\"min\" must be a valid number.");
		if (n !== void 0 && isNaN(Number(n))) throw a = !1, Error("\"max\" must be a valid number.");
	}
	if (i && a) {
		if (typeof t == "number" && typeof n == "number" && n < t || typeof t == "string" && typeof n == "string" && n < t) throw Error("\"max\" must be greater than or equal to \"min\".");
		r = !0;
	}
	return r;
}
function Q(e) {
	let t = document.createElement("template");
	return t.innerHTML = e.trim(), t.content.children[0];
}
function $(e, t, n, r) {
	if (r) {
		let i = (e) => {
			if (!e.target) return;
			let t = e.target.closest(r);
			t && n.call(t, e);
		};
		return e.addEventListener(t, i), i;
	}
	{
		let r = (t) => {
			n.call(e, t);
		};
		return e.addEventListener(t, r), r;
	}
}
//#endregion
export { L as VERSION, me as addLocale, ye as alert, be as confirm, W as dialog, pe as getAllLocales, V as getLocale, _e as hideAll, ve as init, xe as prompt, he as removeLocale, U as setDefaults, ge as setLocale };

//# sourceMappingURL=bootbox.js.map