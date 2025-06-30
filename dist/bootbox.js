/*! @preserve
 * bootbox.js
 * version: 6.0.4
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
import * as C from "bootstrap";
const q = {
  OK: "موافق",
  CANCEL: "الغاء",
  CONFIRM: "تأكيد"
}, T = {
  OK: "OK",
  CANCEL: "İmtina et",
  CONFIRM: "Təsdiq et"
}, j = {
  OK: "Ок",
  CANCEL: "Отказ",
  CONFIRM: "Потвърждавам"
}, B = {
  OK: "OK",
  CANCEL: "Zrušit",
  CONFIRM: "Potvrdit"
}, P = {
  OK: "OK",
  CANCEL: "Annuller",
  CONFIRM: "Accepter"
}, H = {
  OK: "OK",
  CANCEL: "Abbrechen",
  CONFIRM: "Akzeptieren"
}, z = {
  OK: "Εντάξει",
  CANCEL: "Ακύρωση",
  CONFIRM: "Επιβεβαίωση"
}, D = {
  OK: "OK",
  CANCEL: "Cancel",
  CONFIRM: "OK"
}, _ = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Aceptar"
}, $ = {
  OK: "OK",
  CANCEL: "Katkesta",
  CONFIRM: "OK"
}, V = {
  OK: "OK",
  CANCEL: "Ezeztatu",
  CONFIRM: "Onartu"
}, U = {
  OK: "قبول",
  CANCEL: "لغو",
  CONFIRM: "تایید"
}, G = {
  OK: "OK",
  CANCEL: "Peruuta",
  CONFIRM: "OK"
}, W = {
  OK: "OK",
  CANCEL: "Annuler",
  CONFIRM: "Confirmer"
}, Z = {
  OK: "אישור",
  CANCEL: "ביטול",
  CONFIRM: "אישור"
}, J = {
  OK: "OK",
  CANCEL: "Odustani",
  CONFIRM: "Potvrdi"
}, X = {
  OK: "OK",
  CANCEL: "Mégsem",
  CONFIRM: "Megerősít"
}, Q = {
  OK: "OK",
  CANCEL: "Batal",
  CONFIRM: "OK"
}, Y = {
  OK: "OK",
  CANCEL: "Annulla",
  CONFIRM: "Conferma"
}, ee = {
  OK: "OK",
  CANCEL: "キャンセル",
  CONFIRM: "OK"
}, te = {
  OK: "OK",
  CANCEL: "გაუქმება",
  CONFIRM: "დადასტურება"
}, oe = {
  OK: "OK",
  CANCEL: "취소",
  CONFIRM: "확인"
}, re = {
  OK: "Gerai",
  CANCEL: "Atšaukti",
  CONFIRM: "Patvirtinti"
}, ae = {
  OK: "Labi",
  CANCEL: "Atcelt",
  CONFIRM: "Apstiprināt"
}, ne = {
  OK: "OK",
  CANCEL: "Annuleren",
  CONFIRM: "Accepteren"
}, le = {
  OK: "OK",
  CANCEL: "Avbryt",
  CONFIRM: "OK"
}, ie = {
  OK: "OK",
  CANCEL: "Anuluj",
  CONFIRM: "Potwierdź"
}, se = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Confirmar"
}, ce = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Sim"
}, ue = {
  OK: "OK",
  CANCEL: "Отмена",
  CONFIRM: "Применить"
}, de = {
  OK: "OK",
  CANCEL: "Zrušiť",
  CONFIRM: "Potvrdiť"
}, fe = {
  OK: "OK",
  CANCEL: "Prekliči",
  CONFIRM: "Potrdi"
}, be = {
  OK: "OK",
  CANCEL: "Anulo",
  CONFIRM: "Prano"
}, pe = {
  OK: "OK",
  CANCEL: "Avbryt",
  CONFIRM: "OK"
}, me = {
  OK: "Sawa",
  CANCEL: "Ghairi",
  CONFIRM: "Thibitisha"
}, Oe = {
  OK: "சரி",
  CANCEL: "ரத்து செய்",
  CONFIRM: "உறுதி செய்"
}, he = {
  OK: "ตกลง",
  CANCEL: "ยกเลิก",
  CONFIRM: "ยืนยัน"
}, Ce = {
  OK: "Tamam",
  CANCEL: "İptal",
  CONFIRM: "Onayla"
}, ve = {
  OK: "OK",
  CANCEL: "Відміна",
  CONFIRM: "Прийняти"
}, we = {
  OK: "OK",
  CANCEL: "Hủy bỏ",
  CONFIRM: "Xác nhận"
}, ye = {
  OK: "OK",
  CANCEL: "取消",
  CONFIRM: "确认"
}, Ee = {
  OK: "OK",
  CANCEL: "取消",
  CONFIRM: "確認"
}, ge = {
  ar: q,
  az: T,
  bgBG: j,
  cs: B,
  da: P,
  de: H,
  el: z,
  en: D,
  es: _,
  et: $,
  eu: V,
  fa: U,
  fi: G,
  fr: W,
  he: Z,
  hr: J,
  hu: X,
  id: Q,
  it: Y,
  ja: ee,
  ka: te,
  ko: oe,
  lt: re,
  lv: ae,
  nl: ne,
  no: le,
  pl: ie,
  pt: se,
  ptBR: ce,
  ru: ue,
  sk: de,
  sl: fe,
  sq: be,
  sv: pe,
  sw: me,
  ta: Oe,
  th: he,
  tr: Ce,
  uk: ve,
  vi: we,
  zhCN: ye,
  zhTW: Ee
}, Ne = {
  dialog: '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
  header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
  footer: '<div class="modal-footer"></div>',
  closeButton: '<button type="button" class="bootbox-close-button close btn-close" aria-hidden="true" aria-label="Close"></button>',
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
}, Ae = {
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
function x(e) {
  return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(e);
}
function K(e) {
  return /(\d{4})-(\d{2})-(\d{2})/.test(e);
}
function A(e, t) {
  if (typeof t == "string" && typeof e[t] == "function")
    e[t]();
  else {
    const r = typeof t == "string" ? new Event(t, { bubbles: !0 }) : t;
    e.dispatchEvent(r);
  }
}
const qe = "6.0.4", v = ge, m = Ne, h = Ae;
function Te(e) {
  return v[e];
}
function je(e, t) {
  ["OK", "CANCEL", "CONFIRM"].forEach((r, o) => {
    if (!t[r])
      throw new Error(`Please supply a translation for "${r}"`);
  }), v[e] = {
    OK: t.OK,
    CANCEL: t.CANCEL,
    CONFIRM: t.CONFIRM
  };
}
function Be(e) {
  if (e !== "en")
    delete v[e];
  else
    throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
}
function Pe(e) {
  return e && (e = e.replace("-", "")), Le("locale", e);
}
function Le(...e) {
  let t = {};
  e.length === 2 ? t[e[0]] = e[1] : t = e[0], Object.assign(h, t);
}
function He() {
  document.querySelectorAll(".bootbox").forEach((e) => {
    const t = C.Modal.getInstance(e);
    t && t.hide();
  });
}
function ke(e) {
  return ke();
}
function L(e) {
  if (C.Modal === void 0)
    throw new Error(
      '"bootstrap.Modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/5.3/getting-started/introduction/ for more details.'
    );
  e = Fe(e);
  let t = b(m.dialog), r = t.querySelector(".modal-dialog"), o = t.querySelector(".modal-body"), n = b(m.header), a = b(m.footer), i = e.buttons;
  e.messageForm ? o.querySelector(".bootbox-body").append(e.messageForm) : typeof e.message == "string" ? o.querySelector(".bootbox-body").innerHTML = e.message : o.querySelector(".bootbox-body").append(e.message);
  let c = {};
  if (typeof e.onEscape == "function" && (c.onEscape = e.onEscape), S(e.buttons) > 0) {
    for (const [l, d] of Object.entries(i)) {
      let p = b(m.button);
      p.dataset.bbHandler = l;
      var w = d.className.split(" ");
      switch (w.forEach((g) => {
        p.classList.add(g);
      }), l) {
        case "ok":
        case "confirm":
          p.classList.add("bootbox-accept");
          break;
        case "cancel":
          p.classList.add("bootbox-cancel");
          break;
      }
      p.innerHTML = d.label, d.id && p.setAttribute("id", d.id), d.disabled === !0 && (p.disabled = !0), a.append(p), typeof d.callback == "function" && (c[l] = d.callback);
    }
    o.after(a);
  }
  if (e.animate === !0 && t.classList.add("fade"), e.className && e.className.split(" ").forEach((l) => {
    t.classList.add(l);
  }), e.id && t.setAttribute("id", e.id), e.size)
    switch (e.size) {
      case "small":
      case "sm":
        r.classList.add("modal-sm");
        break;
      case "large":
      case "lg":
        r.classList.add("modal-lg");
        break;
      case "extra-large":
      case "xl":
        r.classList.add("modal-xl");
        break;
    }
  if (e.scrollable && r.classList.add("modal-dialog-scrollable"), e.title || e.closeButton) {
    if (e.title ? n.querySelector(".modal-title").innerHTML = e.title : n.classList.add("border-0"), e.closeButton) {
      let l = b(m.closeButton);
      n.append(l);
    }
    o.before(n);
  }
  if (e.centerVertical && r.classList.add("modal-dialog-centered"), e.reusable || (t.addEventListener(
    "hide.bs.modal",
    (l) => {
      l.target === t && (t.removeEventListener("escape.close.bb", () => {
      }), t.removeEventListener("click", () => {
      }));
    },
    { once: !0 }
  ), t.addEventListener(
    "hidden.bs.modal",
    (l) => {
      l.target === t && t.remove();
    },
    { once: !0 }
  )), e.onHide)
    if (typeof e.onHide == "function")
      t.addEventListener("hide.bs.modal", e.onHide);
    else
      throw new Error('Argument supplied to "onHide" must be a function');
  if (e.onHidden)
    if (typeof e.onHidden == "function")
      t.addEventListener("hidden.bs.modal", e.onHidden);
    else
      throw new Error('Argument supplied to "onHidden" must be a function');
  if (e.onShow)
    if (typeof e.onShow == "function")
      y(t, "show.bs.modal", e.onShow);
    else
      throw new Error('Argument supplied to "onShow" must be a function');
  if (t.addEventListener("shown.bs.modal", F), e.onShown)
    if (typeof e.onShown == "function")
      y(t, "shown.bs.modal", e.onShown);
    else
      throw new Error('Argument supplied to "onShown" must be a function');
  if (e.backdrop === !0) {
    let l = !1;
    y(
      t,
      "mousedown",
      (d) => {
        d.stopPropagation(), l = !0;
      },
      ".modal-content"
    ), y(t, "click.dismiss.bs.modal", (d) => {
      l || d.target !== d.currentTarget || A(t, "escape.close.bb");
    });
  }
  t.addEventListener(
    "escape.close.bb",
    (l) => {
      c.onEscape && N(l, t, c.onEscape);
    }
  ), t.addEventListener(
    "click",
    (l) => {
      if (l.target.nodeName.toLowerCase() === "button" && !l.target.classList.contains("disabled")) {
        const d = l.target.dataset.bbHandler;
        d !== void 0 && N(l, t, c[d]);
      }
    }
  ), document.addEventListener(
    "click",
    (l) => {
      l.target.closest(".bootbox-close-button") && N(l, t, c.onEscape);
    }
  ), t.addEventListener(
    "keyup",
    (l) => {
      l.which === 27 && A(t, "escape.close.bb");
    }
  ), typeof e.container == "object" ? e.container.append(t) : document.querySelector(e.container)?.append(t);
  const O = new C.Modal(
    t,
    {
      backdrop: e.backdrop,
      keyboard: !1
      //show: false
    }
  );
  return e.show && (e.relatedTarget ? O.show(e.relatedTarget) : O.show()), t;
}
function ze() {
  const e = k("alert", ["ok"], ["message", "callback"], arguments);
  if (e.callback && typeof e.callback != "function")
    throw new Error('alert requires the "callback" property to be a function when provided');
  return e.buttons.ok.callback = e.onEscape = function() {
    return typeof e.callback == "function" ? e.callback.call(this) : !0;
  }, L(e);
}
function De() {
  let e;
  if (e = k("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), typeof e.callback != "function")
    throw new Error("confirm requires a callback");
  let t = e.buttons.cancel, r = e.buttons.confirm;
  return r || (e.buttons.confirm = E("confirm", e.locale), r = e.buttons.confirm), t || (e.buttons.cancel = E("cancel", e.locale), t = e.buttons.cancel), t.callback = e.onEscape = function() {
    return e.callback?.call(this, null);
  }, r.callback = function() {
    return e.callback?.call(this, !0);
  }, e.buttons.cancel = t, e.buttons.confirm = r, L(e);
}
function _e() {
  let e, t, r, o, n, a;
  r = b(m.form), e = k("prompt", ["cancel", "confirm"], ["title", "callback"], arguments), e.value || (e.value = h.value), e.inputType || (e.inputType = h.inputType), n = e.show === void 0 ? h.show : e.show, e.show = !1;
  var i = e.buttons.cancel;
  i || (e.buttons.cancel = E("cancel", e.locale), i = e.buttons.cancel), i.callback = e.onEscape = function() {
    return e.callback?.call(this, null);
  }, e.buttons.cancel = i;
  var c = e.buttons.confirm;
  if (c || (e.buttons.confirm = E("confirm", e.locale), c = e.buttons.confirm), c.callback = function() {
    let s;
    if (e.inputType === "checkbox") {
      const u = Array.from(o.querySelectorAll('input[type="checkbox"]:checked'));
      if (s = Array.from(u).map((f) => f.value), e.required === !0 && u.length === 0)
        return !1;
    } else e.inputType === "radio" ? s = o.querySelector('input[type="radio"]:checked').value : s = o.value;
    return e.callback?.call(this, s);
  }, e.buttons.confirm = c, !e.title)
    throw new Error("prompt requires a title");
  if (typeof e.callback != "function")
    throw new Error("prompt requires a callback");
  var w = m.inputs;
  if (!w[e.inputType])
    throw new Error("Invalid prompt type");
  switch (o = b(w[e.inputType]), e.inputType) {
    case "text":
    case "textarea":
    case "email":
    case "password":
      o.value = e.value.toString(), e.placeholder && o.setAttribute("placeholder", e.placeholder), e.pattern && o.setAttribute("pattern", e.pattern), e.maxlength && o.setAttribute("maxlength", e.maxlength.toString()), e.required && (o.required = !0), e.rows && !isNaN(parseInt(e.rows.toString())) && e.inputType === "textarea" && o.setAttribute("rows", e.rows.toString());
      break;
    case "date":
    case "time":
    case "number":
    case "range":
      if (o.value = e.value.toString(), e.placeholder && o.setAttribute("placeholder", e.placeholder), e.pattern ? o.setAttribute("pattern", e.pattern) : e.inputType === "date" ? o.setAttribute("pattern", "d{4}-d{2}-d{2}") : e.inputType === "time" && o.setAttribute("pattern", "d{2}:d{2}"), e.required && (o.required = !0), e.step)
        if (typeof e.step == "string" && (e.step === "any" || parseFloat(e.step) > 0))
          o.setAttribute("step", e.step);
        else if (typeof e.step == "number" && !isNaN(e.step) && e.step > 0)
          o.setAttribute("step", e.step.toString());
        else
          throw new Error(
            '"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.'
          );
      Se(e.inputType, e.min, e.max) && (e.min !== void 0 && o.setAttribute("min", e.min.toString()), e.max !== void 0 && o.setAttribute("max", e.max.toString()));
      break;
    case "select":
      var O = {};
      if (a = e.inputOptions || [], !Array.isArray(a))
        throw new Error("Please pass an array of input options");
      if (!a.length)
        throw new Error('prompt with "inputType" set to "select" requires at least one option');
      e.required && (o.required = !0), e.multiple && (o.multiple = !0);
      for (const [, s] of Object.entries(a)) {
        let u = o;
        if (s.value === void 0 || s.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        if (s.group) {
          if (!O[s.group]) {
            var l = b("<optgroup />");
            l.setAttribute("label", s.group), O[s.group] = {
              Content: l
            };
          }
          u = O[s.group].Content;
        }
        let f = b(m.option);
        f.setAttribute("value", s.value), f.textContent = s.text, u.append(f);
      }
      for (const [s, u] of Object.entries(O))
        o.append(u.Content);
      o.value = e.value.toString();
      break;
    case "checkbox":
      var d = Array.isArray(e.value) ? e.value : [e.value];
      if (a = e.inputOptions || [], !a.length)
        throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
      o = b('<div class="bootbox-checkbox-list"></div>');
      for (const [s, u] of Object.entries(a)) {
        if (u.value === void 0 || u.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        let f = b(m.inputs[e.inputType]);
        f.querySelector("input")?.setAttribute("value", u.value), f.querySelector("label")?.append(`
${u.text}`);
        for (const [Re, R] of Object.entries(d))
          R === u.value && f.querySelector("input")?.setAttribute("checked", "true");
        o.append(f);
      }
      break;
    case "radio":
      if (e.value !== void 0 && Array.isArray(e.value))
        throw new Error(
          'prompt with "inputType" set to "radio" requires a single, non-array value for "value"'
        );
      if (a = e.inputOptions || [], !a.length)
        throw new Error('prompt with "inputType" set to "radio" requires at least one option');
      o = b('<div class="bootbox-radiobutton-list"></div>');
      var p = !0;
      for (const [s, u] of Object.entries(a)) {
        if (u.value === void 0 || u.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        let f = b(m.inputs[e.inputType]);
        f.querySelector("input")?.setAttribute("value", u.value), f.querySelector("label")?.append(`
${u.text}`), e.value !== void 0 && u.value === e.value && (f.querySelector("input").checked = !0, p = !1), o.append(f);
      }
      p && o.querySelector('input[type="radio"]')?.setAttribute("checked", "true");
      break;
  }
  if (r.append(o), r.addEventListener(
    "submit",
    (s) => {
      s.preventDefault(), s.stopPropagation(), t.querySelector(".bootbox-accept")?.click();
    }
  ), e.message && e.message.trim() !== "") {
    let s = b(m.promptMessage).innerHTML = e.message;
    r.prepend(s), e.messageForm = r;
  } else
    e.messageForm = r;
  t = L(e), t.removeEventListener("shown.bs.modal", F), t.addEventListener(
    "shown.bs.modal",
    () => {
      o.focus();
    }
  );
  const g = new C.Modal(t);
  return n === !0 && g.show(), t;
}
function M(...e) {
  const t = {};
  let r = !1, o = 0;
  const n = e.length;
  Object.prototype.toString.call(e[0]) === "[object Boolean]" && (r = e[0], o++);
  const a = (i) => {
    for (const c in i)
      Object.prototype.hasOwnProperty.call(i, c) && (r && Object.prototype.toString.call(i[c]) === "[object Object]" ? t[c] = M(!0, t[c], i[c]) : t[c] = i[c]);
  };
  for (; o < n; o++) {
    const i = e[o];
    a(i);
  }
  return t;
}
function xe(e, t) {
  const r = e.length;
  let o = {};
  if (r < 1 || r > 2)
    throw new Error("Invalid argument length");
  return r === 2 || typeof e[0] == "string" ? (o[t[0]] = e[0], o[t[1]] = e[1]) : o = e[0], o;
}
function Ke(e, t, r) {
  return M(
    {},
    // Ensure the target is an empty, unreferenced object
    e,
    // Base options object
    xe(t, r)
    // Map array to object if necessary
  );
}
function k(e, t, r, o) {
  let n;
  o && o[0] && (n = o[0].locale || h.locale, (o[0].swapButtonOrder || h.swapButtonOrder) && (t = t.reverse()));
  const a = {
    className: `bootbox-${e}`,
    buttons: Ie(t, n),
    show: !0,
    closeButton: !0,
    animate: !0,
    locale: "en",
    swapButtonOrder: !1,
    scrollable: !1,
    reusable: !1,
    centerVertical: !1
  };
  return Me(
    // Merge the generated base properties with user supplied arguments
    Ke(
      a,
      o,
      // If args.length > 1, properties specify how each arg maps to an object key
      r
    ),
    t
  );
}
function Me(e, t) {
  const r = {};
  for (const [o, n] of Object.entries(t))
    r[n] = !0;
  for (const [o] of Object.entries(e.buttons))
    if (r[o] === void 0)
      throw new Error(`button key "${o}" is not allowed (options are ${t.join(" ")})`);
  return e;
}
function Ie(e, t) {
  const r = {};
  for (let o = 0, n = e.length; o < n; o++) {
    const a = e[o], i = a.toLowerCase(), c = a.toUpperCase();
    r[i] = {
      label: I(c, t),
      className: ""
    };
  }
  return r;
}
function E(e, t) {
  return {
    label: I(e.toUpperCase(), t),
    className: ""
  };
}
function I(e, t) {
  const r = v[t];
  return r ? r[e] : v.en[e];
}
function Fe(e) {
  let t, r;
  if (!e.message && !e.messageForm)
    throw new Error('"message" option must not be null or an empty string.');
  e = Object.assign({}, h, e), e.backdrop ? e.backdrop = typeof e.backdrop == "string" && e.backdrop.toLowerCase() === "static" ? "static" : !0 : e.backdrop = e.backdrop === !1 || e.backdrop === 0 ? !1 : "static", e.buttons || (e.buttons = {}), t = e.buttons, r = S(t);
  let o = 0;
  for (let [n, a] of Object.entries(t)) {
    if (typeof a == "function" && (a = t[n] = {
      callback: a,
      label: "",
      className: ""
    }), Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/, "$1").toLowerCase() !== "object")
      throw new Error(`button with key "${n}" must be an object`);
    if (a.label || (a.label = n), !a.className) {
      let i = !1;
      e.swapButtonOrder ? i = o === 0 : i = o === r - 1, r <= 2 && i ? a.className = "btn-primary" : a.className = "btn-secondary";
    }
    o++;
  }
  return e;
}
function F(e) {
  const t = e?.data?.dialog?.querySelector(".bootbox-accept");
  t && A(t, "focus");
}
function S(e) {
  return Object.keys(e).length;
}
function N(e, t, r) {
  e.stopPropagation(), e.preventDefault(), !(typeof r == "function" && r.call(t, e) === !1) && t && C.Modal.getInstance(t)?.hide();
}
function Se(e, t, r) {
  let o = !1, n = !0, a = !0;
  if (e === "date")
    t !== void 0 && !(n = K(t)) ? console.warn('Invalid "min" date format for input type "date".') : r !== void 0 && !(a = K(r)) && console.warn('Invalid "max" date format for input type "date".');
  else if (e === "time") {
    if (t !== void 0 && !(n = x(t)))
      throw new Error('"min" is not a valid time.');
    if (r !== void 0 && !(a = x(r)))
      throw new Error('"max" is not a valid time.');
  } else {
    if (t !== void 0 && isNaN(Number(t)))
      throw n = !1, new Error('"min" must be a valid number.');
    if (r !== void 0 && isNaN(Number(r)))
      throw a = !1, new Error('"max" must be a valid number.');
  }
  if (n && a) {
    if (typeof t == "number" && typeof r == "number" && r < t)
      throw new Error('"max" must be greater than or equal to "min".');
    o = !0;
  }
  return o;
}
function b(e) {
  const t = document.createElement("template");
  return t.innerHTML = e.trim(), t.content.children[0];
}
function y(e, t, r, o) {
  if (o) {
    const n = (a) => {
      if (!a.target) return;
      const i = a.target.closest(o);
      i && r.call(i, a);
    };
    return e.addEventListener(t, n), n;
  } else {
    const n = (a) => {
      r.call(e, a);
    };
    return e.addEventListener(t, n), n;
  }
}
export {
  qe as VERSION,
  je as addLocale,
  ze as alert,
  De as confirm,
  L as dialog,
  Te as getLocale,
  He as hideAll,
  ke as init,
  _e as prompt,
  Be as removeLocale,
  Le as setDefaults,
  Pe as setLocale
};
//# sourceMappingURL=bootbox.js.map
