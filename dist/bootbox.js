/*! @preserve
 * bootbox.js
 * version: 6.0.7
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
import * as E from "bootstrap";
const j = {
  OK: "موافق",
  CANCEL: "الغاء",
  CONFIRM: "تأكيد"
}, B = {
  OK: "OK",
  CANCEL: "İmtina et",
  CONFIRM: "Təsdiq et"
}, P = {
  OK: "Ок",
  CANCEL: "Отказ",
  CONFIRM: "Потвърждавам"
}, H = {
  OK: "OK",
  CANCEL: "Zrušit",
  CONFIRM: "Potvrdit"
}, _ = {
  OK: "OK",
  CANCEL: "Annuller",
  CONFIRM: "Accepter"
}, V = {
  OK: "OK",
  CANCEL: "Abbrechen",
  CONFIRM: "Akzeptieren"
}, D = {
  OK: "Εντάξει",
  CANCEL: "Ακύρωση",
  CONFIRM: "Επιβεβαίωση"
}, z = {
  OK: "OK",
  CANCEL: "Cancel",
  CONFIRM: "OK"
}, $ = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Aceptar"
}, U = {
  OK: "OK",
  CANCEL: "Katkesta",
  CONFIRM: "OK"
}, G = {
  OK: "OK",
  CANCEL: "Ezeztatu",
  CONFIRM: "Onartu"
}, W = {
  OK: "قبول",
  CANCEL: "لغو",
  CONFIRM: "تایید"
}, Z = {
  OK: "OK",
  CANCEL: "Peruuta",
  CONFIRM: "OK"
}, J = {
  OK: "OK",
  CANCEL: "Annuler",
  CONFIRM: "Confirmer"
}, X = {
  OK: "אישור",
  CANCEL: "ביטול",
  CONFIRM: "אישור"
}, Q = {
  OK: "OK",
  CANCEL: "Odustani",
  CONFIRM: "Potvrdi"
}, Y = {
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
}, oe = {
  OK: "OK",
  CANCEL: "キャンセル",
  CONFIRM: "OK"
}, re = {
  OK: "OK",
  CANCEL: "გაუქმება",
  CONFIRM: "დადასტურება"
}, ae = {
  OK: "OK",
  CANCEL: "취소",
  CONFIRM: "확인"
}, ne = {
  OK: "Gerai",
  CANCEL: "Atšaukti",
  CONFIRM: "Patvirtinti"
}, le = {
  OK: "Labi",
  CANCEL: "Atcelt",
  CONFIRM: "Apstiprināt"
}, ie = {
  OK: "OK",
  CANCEL: "Annuleren",
  CONFIRM: "Accepteren"
}, se = {
  OK: "OK",
  CANCEL: "Avbryt",
  CONFIRM: "OK"
}, ce = {
  OK: "OK",
  CANCEL: "Anuluj",
  CONFIRM: "Potwierdź"
}, ue = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Confirmar"
}, de = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Sim"
}, fe = {
  OK: "OK",
  CANCEL: "Отмена",
  CONFIRM: "Применить"
}, be = {
  OK: "OK",
  CANCEL: "Zrušiť",
  CONFIRM: "Potvrdiť"
}, pe = {
  OK: "OK",
  CANCEL: "Prekliči",
  CONFIRM: "Potrdi"
}, me = {
  OK: "OK",
  CANCEL: "Anulo",
  CONFIRM: "Prano"
}, Oe = {
  OK: "OK",
  CANCEL: "Avbryt",
  CONFIRM: "OK"
}, he = {
  OK: "Sawa",
  CANCEL: "Ghairi",
  CONFIRM: "Thibitisha"
}, Ce = {
  OK: "சரி",
  CANCEL: "ரத்து செய்",
  CONFIRM: "உறுதி செய்"
}, ve = {
  OK: "ตกลง",
  CANCEL: "ยกเลิก",
  CONFIRM: "ยืนยัน"
}, ye = {
  OK: "Tamam",
  CANCEL: "İptal",
  CONFIRM: "Onayla"
}, we = {
  OK: "OK",
  CANCEL: "Відміна",
  CONFIRM: "Прийняти"
}, Ee = {
  OK: "OK",
  CANCEL: "Hủy bỏ",
  CONFIRM: "Xác nhận"
}, ge = {
  OK: "OK",
  CANCEL: "取消",
  CONFIRM: "确认"
}, Ne = {
  OK: "OK",
  CANCEL: "取消",
  CONFIRM: "確認"
}, Ae = "6.0.6", Le = {
  ar: j,
  az: B,
  bgBG: P,
  cs: H,
  da: _,
  de: V,
  el: D,
  en: z,
  es: $,
  et: U,
  eu: G,
  fa: W,
  fi: Z,
  fr: J,
  he: X,
  hr: Q,
  hu: Y,
  id: ee,
  it: te,
  ja: oe,
  ka: re,
  ko: ae,
  lt: ne,
  lv: le,
  nl: ie,
  no: se,
  pl: ce,
  pt: ue,
  ptBR: de,
  ru: fe,
  sk: be,
  sl: pe,
  sq: me,
  sv: Oe,
  sw: he,
  ta: Ce,
  th: ve,
  tr: ye,
  uk: we,
  vi: Ee,
  zhCN: ge,
  zhTW: Ne
}, ke = {
  dialog: '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
  header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
  footer: '<div class="modal-footer"></div>',
  closeButton: '<button type="button" class="bootbox-close-button close btn-close" aria-label="Close"></button>',
  form: '<form class="bootbox-form"></form>',
  button: '<button type="button" class="btn"></button>',
  option: '<option value=""></option>',
  promptMessage: '<div class="bootbox-prompt-message"></div>',
  inputs: {
    text: '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
    textarea: '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
    email: '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
    select: '<select class="bootbox-input bootbox-input-select form-select"></select>',
    checkbox: '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
    radio: '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
    date: '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
    time: '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
    number: '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
    password: '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
    range: '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
  }
}, xe = {
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
function K(t) {
  return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(t);
}
function M(t) {
  return /(\d{4})-(\d{2})-(\d{2})/.test(t);
}
function g(t, e) {
  if (typeof e == "string" && typeof t[e] == "function")
    t[e]();
  else {
    const o = typeof e == "string" ? new Event(e, { bubbles: !0 }) : e;
    t.dispatchEvent(o);
  }
}
const Be = Ae, v = Le, p = ke, O = xe;
function Pe(t) {
  return v[t];
}
function He() {
  return v;
}
function _e(t, e) {
  ["OK", "CANCEL", "CONFIRM"].forEach((o, a) => {
    if (!e[o])
      throw new Error(`Please supply a translation for "${o}"`);
  }), v[t] = {
    OK: e.OK,
    CANCEL: e.CANCEL,
    CONFIRM: e.CONFIRM
  };
}
function Ve(t) {
  if (t !== "en")
    delete v[t];
  else
    throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
}
function De(t) {
  return t && (t = t.replace("-", "")), Ke("locale", t);
}
function Ke(...t) {
  let e = {};
  t.length === 2 ? e[t[0]] = t[1] : e = t[0], Object.assign(O, e);
}
function ze() {
  document.querySelectorAll(".bootbox").forEach((t) => {
    const e = E.Modal.getInstance(t);
    e && e.hide();
  });
}
function Me(t) {
  return Me();
}
function L(t) {
  if (E.Modal === void 0)
    throw new Error(
      '"bootstrap.Modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/5.3/getting-started/introduction/ for more details.'
    );
  t = qe(t);
  let e = b(p.dialog), o = e.querySelector(".modal-dialog"), a = e.querySelector(".modal-body"), r = b(p.header), n = b(p.footer), i = t.buttons;
  t.messageForm ? a.querySelector(".bootbox-body").append(t.messageForm) : typeof t.message == "string" ? a.querySelector(".bootbox-body").innerHTML = t.message : a.querySelector(".bootbox-body").append(t.message);
  let u = {};
  if (typeof t.onEscape == "function" && (u.onEscape = t.onEscape), R(t.buttons) > 0) {
    for (const [l, d] of Object.entries(i)) {
      let m = b(p.button);
      m.dataset.bbHandler = l;
      var h = d.className.split(" ");
      switch (h.forEach((y) => {
        m.classList.add(y);
      }), l) {
        case "ok":
        case "confirm":
          m.classList.add("bootbox-accept");
          break;
        case "cancel":
          m.classList.add("bootbox-cancel");
          break;
      }
      m.innerHTML = d.label, d.id && m.setAttribute("id", d.id), d.disabled === !0 && (m.disabled = !0), n.append(m), typeof d.callback == "function" && (u[l] = d.callback);
    }
    a.after(n);
  }
  if (t.animate === !0 && e.classList.add("fade"), t.className && t.className.split(" ").forEach((l) => {
    e.classList.add(l);
  }), t.id && e.setAttribute("id", t.id), t.size)
    switch (t.size) {
      case "small":
      case "sm":
        o.classList.add("modal-sm");
        break;
      case "large":
      case "lg":
        o.classList.add("modal-lg");
        break;
      case "extra-large":
      case "xl":
        o.classList.add("modal-xl");
        break;
    }
  if (t.scrollable && o.classList.add("modal-dialog-scrollable"), t.title || t.closeButton) {
    if (t.title ? r.querySelector(".modal-title").innerHTML = t.title : r.classList.add("border-0"), t.closeButton) {
      let l = b(p.closeButton);
      r.append(l);
    }
    a.before(r);
  }
  if (t.centerVertical && o.classList.add("modal-dialog-centered"), t.reusable || (e.addEventListener(
    "hide.bs.modal",
    (l) => {
      l.target === e && (e.removeEventListener("escape.close.bb", () => {
      }), e.removeEventListener("click", () => {
      }));
    },
    { once: !0 }
  ), e.addEventListener(
    "hidden.bs.modal",
    (l) => {
      l.target === e && e.remove();
    },
    { once: !0 }
  )), t.onHide)
    if (typeof t.onHide == "function")
      e.addEventListener("hide.bs.modal", t.onHide);
    else
      throw new Error('Argument supplied to "onHide" must be a function');
  if (t.onHidden)
    if (typeof t.onHidden == "function")
      e.addEventListener("hidden.bs.modal", t.onHidden);
    else
      throw new Error('Argument supplied to "onHidden" must be a function');
  if (t.onShow)
    if (typeof t.onShow == "function")
      w(e, "show.bs.modal", t.onShow);
    else
      throw new Error('Argument supplied to "onShow" must be a function');
  if (e.addEventListener("shown.bs.modal", S), t.onShown)
    if (typeof t.onShown == "function")
      w(e, "shown.bs.modal", t.onShown);
    else
      throw new Error('Argument supplied to "onShown" must be a function');
  if (t.backdrop === !0) {
    let l = !1;
    w(
      e,
      "mousedown",
      (d) => {
        d.stopPropagation(), l = !0;
      },
      ".modal-content"
    ), w(e, "click.dismiss.bs.modal", (d) => {
      l || d.target !== d.currentTarget || g(e, "escape.close.bb");
    });
  }
  e.addEventListener(
    "escape.close.bb",
    (l) => {
      u.onEscape && A(l, e, u.onEscape);
    }
  ), e.addEventListener(
    "click",
    (l) => {
      if (l.target.nodeName.toLowerCase() === "button" && !l.target.classList.contains("disabled")) {
        const d = l.target.dataset.bbHandler;
        d !== void 0 && A(l, e, u[d]);
      }
    }
  ), document.addEventListener(
    "click",
    (l) => {
      l.target.closest(".bootbox-close-button") && A(l, e, u.onEscape);
    }
  ), e.addEventListener(
    "keyup",
    (l) => {
      (l.which === 27 || l.detail.which === 27) && g(e, "escape.close.bb");
    }
  ), typeof t.container == "object" ? t.container.append(e) : document.querySelector(t.container)?.append(e);
  const C = new E.Modal(
    e,
    {
      backdrop: t.backdrop,
      keyboard: !1
      //show: false
    }
  );
  return t.show && (t.relatedTarget ? C.show(t.relatedTarget) : C.show()), { _element: e, _modal: C, _options: t };
}
function $e(...t) {
  const e = k("alert", ["ok"], ["message", "callback"], t);
  if (e.callback && typeof e.callback != "function")
    throw new Error('alert requires the "callback" property to be a function when provided');
  return e.buttons.ok.callback = e.onEscape = function() {
    return typeof e.callback == "function" ? e.callback.call(this) : !0;
  }, L(e);
}
function Ue(...t) {
  let e;
  if (e = k("confirm", ["cancel", "confirm"], ["message", "callback"], t), typeof e.callback != "function")
    throw new Error("confirm requires a callback");
  let o = e.buttons.cancel, a = e.buttons.confirm;
  return a || (e.buttons.confirm = N("confirm", e.locale), a = e.buttons.confirm), o || (e.buttons.cancel = N("cancel", e.locale), o = e.buttons.cancel), o.callback = e.onEscape = function() {
    return e.callback?.call(this, null);
  }, a.callback = function() {
    return e.callback?.call(this, !0);
  }, e.buttons.cancel = o, e.buttons.confirm = a, L(e);
}
function Ge(...t) {
  let e, o, a, r, n, i;
  a = b(p.form), e = k("prompt", ["cancel", "confirm"], ["title", "callback"], t), e.value || (e.value = O.value), e.inputType || (e.inputType = O.inputType), n = e.show === void 0 ? O.show : e.show, e.show = !1;
  var u = e.buttons.cancel;
  u || (e.buttons.cancel = N("cancel", e.locale), u = e.buttons.cancel), u.callback = e.onEscape = function() {
    return e.callback?.call(this, null);
  }, e.buttons.cancel = u;
  var h = e.buttons.confirm;
  if (h || (e.buttons.confirm = N("confirm", e.locale), h = e.buttons.confirm), h.callback = function() {
    let c;
    if (a.classList.add("was-validated"), e.inputType === "checkbox") {
      const s = Array.from(r.querySelectorAll('input[type="checkbox"]:checked'));
      if (c = Array.from(s).map((f) => f.value), e.required === !0 && s.length === 0)
        return !1;
    } else if (e.inputType === "radio")
      c = r.querySelector('input[type="radio"]:checked').value;
    else {
      let s = r;
      if (s.setCustomValidity(""), s.checkValidity && !s.checkValidity())
        return e.errorMessage && s.setCustomValidity(e.errorMessage), s.reportValidity && s.reportValidity(), !1;
      e.inputType === "select" && e.multiple === !0 ? c = Array.from(r.querySelectorAll("option:checked")).map((f) => f.value) : c = s.value;
    }
    return e.callback?.call(this, c);
  }, e.buttons.confirm = h, !e.title)
    throw new Error("prompt requires a title");
  if (typeof e.callback != "function")
    throw new Error("prompt requires a callback");
  var C = p.inputs;
  if (!C[e.inputType])
    throw new Error("Invalid prompt type");
  switch (r = b(C[e.inputType]), e.inputType !== "textarea" && r.addEventListener("keydown", function(c) {
    if (c.key === "Enter") {
      c.preventDefault();
      var s = o.querySelector(".bootbox-accept");
      g(s, "click");
    }
  }), e.inputType) {
    case "text":
    case "textarea":
    case "email":
    case "password":
      r.value = e.value.toString(), e.placeholder && r.setAttribute("placeholder", e.placeholder), e.pattern && r.setAttribute("pattern", e.pattern), e.maxlength && r.setAttribute("maxlength", e.maxlength.toString()), e.required && (r.required = !0), e.inputType === "textarea" && e.rows && !isNaN(parseInt(e.rows.toString())) && r.setAttribute("rows", e.rows.toString());
      break;
    case "date":
    case "time":
    case "number":
    case "range":
      if (r.value = e.value.toString(), e.placeholder && r.setAttribute("placeholder", e.placeholder), e.pattern ? r.setAttribute("pattern", e.pattern) : e.inputType === "date" ? r.setAttribute("pattern", "d{4}-d{2}-d{2}") : e.inputType === "time" && r.setAttribute("pattern", "d{2}:d{2}"), e.required && (r.required = !0), e.step)
        if (typeof e.step == "string" && (e.step === "any" || parseFloat(e.step) > 0))
          r.setAttribute("step", e.step);
        else if (typeof e.step == "number" && !isNaN(e.step) && e.step > 0)
          r.setAttribute("step", e.step.toString());
        else
          throw new Error(
            '"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.'
          );
      Te(e.inputType, e.min, e.max) && (e.min !== void 0 && r.setAttribute("min", e.min.toString()), e.max !== void 0 && r.setAttribute("max", e.max.toString()));
      break;
    case "select":
      var l = {};
      if (i = e.inputOptions || [], !Array.isArray(i))
        throw new Error("Please pass an array of input options");
      if (!i.length)
        throw new Error('prompt with "inputType" set to "select" requires at least one option');
      e.required && (r.required = !0), e.multiple && (r.multiple = !0);
      for (const [, c] of Object.entries(i)) {
        let s = r;
        if (c.value === void 0 || c.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        if (c.group) {
          if (!l[c.group]) {
            var d = b("<optgroup />");
            d.setAttribute("label", c.group), l[c.group] = {
              Content: d
            };
          }
          s = l[c.group].Content;
        }
        let f = b(p.option);
        f.setAttribute("value", c.value), f.textContent = c.text, s.append(f);
      }
      for (const [c, s] of Object.entries(l))
        r.append(s.Content);
      r.value = e.value.toString();
      break;
    case "checkbox":
      var m = Array.isArray(e.value) ? e.value : [e.value];
      if (i = e.inputOptions || [], !i.length)
        throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
      r = b('<div class="bootbox-checkbox-list"></div>');
      for (const [c, s] of Object.entries(i)) {
        if (s.value === void 0 || s.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        let f = b(p.inputs[e.inputType]);
        f.querySelector("input")?.setAttribute("value", s.value), f.querySelector("label")?.append(`
${s.text}`);
        for (const [je, T] of Object.entries(m))
          T === s.value && f.querySelector("input")?.setAttribute("checked", "true");
        r.append(f);
      }
      break;
    case "radio":
      if (e.value !== void 0 && Array.isArray(e.value))
        throw new Error(
          'prompt with "inputType" set to "radio" requires a single, non-array value for "value"'
        );
      if (i = e.inputOptions || [], !i.length)
        throw new Error('prompt with "inputType" set to "radio" requires at least one option');
      r = b('<div class="bootbox-radiobutton-list"></div>');
      var y = !0;
      for (const [c, s] of Object.entries(i)) {
        if (s.value === void 0 || s.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        let f = b(p.inputs[e.inputType]);
        f.querySelector("input")?.setAttribute("value", s.value), f.querySelector("label")?.append(`
${s.text}`), e.value !== void 0 && s.value === e.value && (f.querySelector("input").checked = !0, y = !1), r.append(f);
      }
      y && r.querySelector('input[type="radio"]')?.setAttribute("checked", "true");
      break;
  }
  if (a.append(r), a.addEventListener(
    "submit",
    (c) => {
      c.preventDefault(), c.stopPropagation(), a.classList.remove("was-validated"), o.querySelector(".bootbox-accept")?.click();
    }
  ), e.message && e.message.trim() !== "") {
    let c = b(p.promptMessage).innerHTML = e.message;
    a.prepend(c), e.messageForm = a;
  } else
    e.messageForm = a;
  const x = L(e);
  o = x._element, o.removeEventListener("shown.bs.modal", S), o.addEventListener(
    "shown.bs.modal",
    () => {
      r.focus();
    }
  );
  const q = x._modal;
  return n === !0 && q.show(), o;
}
function I(...t) {
  const e = {};
  let o = !1, a = 0;
  const r = t.length;
  Object.prototype.toString.call(t[0]) === "[object Boolean]" && (o = t[0], a++);
  const n = (i) => {
    for (const u in i)
      Object.prototype.hasOwnProperty.call(i, u) && (o && Object.prototype.toString.call(i[u]) === "[object Object]" ? e[u] = I(!0, e[u], i[u]) : e[u] = i[u]);
  };
  for (; a < r; a++) {
    const i = t[a];
    n(i);
  }
  return e;
}
function Ie(t, e) {
  const o = t.length;
  let a = {};
  if (o < 1 || o > 2)
    throw new Error("Invalid argument length");
  return o === 2 || typeof t[0] == "string" ? (a[e[0]] = t[0], a[e[1]] = t[1]) : a = t[0], a;
}
function Fe(t, e, o) {
  return I(
    {},
    // Ensure the target is an empty, unreferenced object
    t,
    // Base options object
    Ie(e, o)
    // Map array to object if necessary
  );
}
function k(t, e, o, a) {
  let r;
  a && a[0] && (r = a[0].locale || O.locale, (a[0].swapButtonOrder || O.swapButtonOrder) && (e = e.reverse()));
  const n = {
    className: `bootbox-${t}`,
    buttons: Re(e, r),
    show: !0,
    closeButton: !0,
    animate: !0,
    locale: "en",
    swapButtonOrder: !1,
    scrollable: !1,
    reusable: !1,
    centerVertical: !1
  };
  return Se(
    // Merge the generated base properties with user supplied arguments
    Fe(
      n,
      a,
      // If args.length > 1, properties specify how each arg maps to an object key
      o
    ),
    e
  );
}
function Se(t, e) {
  const o = {};
  for (const [a, r] of Object.entries(e))
    o[r] = !0;
  for (const [a] of Object.entries(t.buttons))
    if (o[a] === void 0)
      throw new Error(`button key "${a}" is not allowed (options are ${e.join(" ")})`);
  return t;
}
function Re(t, e) {
  const o = {};
  for (let a = 0, r = t.length; a < r; a++) {
    const n = t[a], i = n.toLowerCase(), u = n.toUpperCase();
    o[i] = {
      label: F(u, e),
      className: ""
    };
  }
  return o;
}
function N(t, e) {
  return {
    label: F(t.toUpperCase(), e),
    className: ""
  };
}
function F(t, e) {
  const o = v[e];
  return o ? o[t] : v.en[t];
}
function qe(t) {
  let e, o;
  if (!t.message && !t.messageForm)
    throw new Error('"message" option must not be null or an empty string.');
  t = Object.assign({}, O, t), t.backdrop ? t.backdrop = typeof t.backdrop == "string" && t.backdrop.toLowerCase() === "static" ? "static" : !0 : t.backdrop = t.backdrop === !1 || t.backdrop === 0 ? !1 : "static", t.buttons || (t.buttons = {}), e = t.buttons, o = R(e);
  let a = 0;
  for (let [r, n] of Object.entries(e)) {
    if (typeof n == "function" && (n = e[r] = {
      callback: n,
      label: "",
      className: ""
    }), Object.prototype.toString.call(n).replace(/^\[object (.+)\]$/, "$1").toLowerCase() !== "object")
      throw new Error(`button with key "${r}" must be an object`);
    if (n.label || (n.label = r), !n.className) {
      let i = !1;
      t.swapButtonOrder ? i = a === 0 : i = a === o - 1, o <= 2 && i ? n.className = "btn-primary" : n.className = "btn-secondary";
    }
    a++;
  }
  return t;
}
function S(t) {
  const e = t?.data?.dialog?.querySelector(".bootbox-accept");
  e && g(e, "focus");
}
function R(t) {
  return Object.keys(t).length;
}
function A(t, e, o) {
  t.stopPropagation(), t.preventDefault(), !(typeof o == "function" && o.call(e, t) === !1) && e && E.Modal.getInstance(e)?.hide();
}
function Te(t, e, o) {
  let a = !1, r = !0, n = !0;
  if (t === "date")
    e !== void 0 && !(r = M(e)) ? console.warn('Invalid "min" date format for input type "date".') : o !== void 0 && !(n = M(o)) && console.warn('Invalid "max" date format for input type "date".');
  else if (t === "time") {
    if (e !== void 0 && !(r = K(e)))
      throw new Error('"min" is not a valid time.');
    if (o !== void 0 && !(n = K(o)))
      throw new Error('"max" is not a valid time.');
  } else {
    if (e !== void 0 && isNaN(Number(e)))
      throw r = !1, new Error('"min" must be a valid number.');
    if (o !== void 0 && isNaN(Number(o)))
      throw n = !1, new Error('"max" must be a valid number.');
  }
  if (r && n) {
    if (typeof e == "number" && typeof o == "number" && o < e)
      throw new Error('"max" must be greater than or equal to "min".');
    if (typeof e == "string" && typeof o == "string" && o < e)
      throw new Error('"max" must be greater than or equal to "min".');
    a = !0;
  }
  return a;
}
function b(t) {
  const e = document.createElement("template");
  return e.innerHTML = t.trim(), e.content.children[0];
}
function w(t, e, o, a) {
  if (a) {
    const r = (n) => {
      if (!n.target) return;
      const i = n.target.closest(a);
      i && o.call(i, n);
    };
    return t.addEventListener(e, r), r;
  } else {
    const r = (n) => {
      o.call(t, n);
    };
    return t.addEventListener(e, r), r;
  }
}
export {
  Be as VERSION,
  _e as addLocale,
  $e as alert,
  Ue as confirm,
  L as dialog,
  He as getAllLocales,
  Pe as getLocale,
  ze as hideAll,
  Me as init,
  Ge as prompt,
  Ve as removeLocale,
  Ke as setDefaults,
  De as setLocale
};
//# sourceMappingURL=bootbox.js.map
