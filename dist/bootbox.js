/*! @preserve
 * bootbox.js
 * version: 6.0.4
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
import * as v from "bootstrap";
const D = {
  OK: "موافق",
  CANCEL: "الغاء",
  CONFIRM: "تأكيد"
}, _ = {
  OK: "OK",
  CANCEL: "İmtina et",
  CONFIRM: "Təsdiq et"
}, $ = {
  OK: "Ок",
  CANCEL: "Отказ",
  CONFIRM: "Потвърждавам"
}, V = {
  OK: "OK",
  CANCEL: "Zrušit",
  CONFIRM: "Potvrdit"
}, U = {
  OK: "OK",
  CANCEL: "Annuller",
  CONFIRM: "Accepter"
}, G = {
  OK: "OK",
  CANCEL: "Abbrechen",
  CONFIRM: "Akzeptieren"
}, W = {
  OK: "Εντάξει",
  CANCEL: "Ακύρωση",
  CONFIRM: "Επιβεβαίωση"
}, Z = {
  OK: "OK",
  CANCEL: "Cancel",
  CONFIRM: "OK"
}, J = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Aceptar"
}, X = {
  OK: "OK",
  CANCEL: "Katkesta",
  CONFIRM: "OK"
}, Q = {
  OK: "OK",
  CANCEL: "Ezeztatu",
  CONFIRM: "Onartu"
}, Y = {
  OK: "قبول",
  CANCEL: "لغو",
  CONFIRM: "تایید"
}, ee = {
  OK: "OK",
  CANCEL: "Peruuta",
  CONFIRM: "OK"
}, te = {
  OK: "OK",
  CANCEL: "Annuler",
  CONFIRM: "Confirmer"
}, oe = {
  OK: "אישור",
  CANCEL: "ביטול",
  CONFIRM: "אישור"
}, re = {
  OK: "OK",
  CANCEL: "Odustani",
  CONFIRM: "Potvrdi"
}, ae = {
  OK: "OK",
  CANCEL: "Mégsem",
  CONFIRM: "Megerősít"
}, ne = {
  OK: "OK",
  CANCEL: "Batal",
  CONFIRM: "OK"
}, le = {
  OK: "OK",
  CANCEL: "Annulla",
  CONFIRM: "Conferma"
}, ie = {
  OK: "OK",
  CANCEL: "キャンセル",
  CONFIRM: "OK"
}, se = {
  OK: "OK",
  CANCEL: "გაუქმება",
  CONFIRM: "დადასტურება"
}, ce = {
  OK: "OK",
  CANCEL: "취소",
  CONFIRM: "확인"
}, ue = {
  OK: "Gerai",
  CANCEL: "Atšaukti",
  CONFIRM: "Patvirtinti"
}, de = {
  OK: "Labi",
  CANCEL: "Atcelt",
  CONFIRM: "Apstiprināt"
}, fe = {
  OK: "OK",
  CANCEL: "Annuleren",
  CONFIRM: "Accepteren"
}, be = {
  OK: "OK",
  CANCEL: "Avbryt",
  CONFIRM: "OK"
}, pe = {
  OK: "OK",
  CANCEL: "Anuluj",
  CONFIRM: "Potwierdź"
}, me = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Confirmar"
}, Oe = {
  OK: "OK",
  CANCEL: "Cancelar",
  CONFIRM: "Sim"
}, he = {
  OK: "OK",
  CANCEL: "Отмена",
  CONFIRM: "Применить"
}, Ce = {
  OK: "OK",
  CANCEL: "Zrušiť",
  CONFIRM: "Potvrdiť"
}, ve = {
  OK: "OK",
  CANCEL: "Prekliči",
  CONFIRM: "Potrdi"
}, we = {
  OK: "OK",
  CANCEL: "Anulo",
  CONFIRM: "Prano"
}, ye = {
  OK: "OK",
  CANCEL: "Avbryt",
  CONFIRM: "OK"
}, Ee = {
  OK: "Sawa",
  CANCEL: "Ghairi",
  CONFIRM: "Thibitisha"
}, ge = {
  OK: "சரி",
  CANCEL: "ரத்து செய்",
  CONFIRM: "உறுதி செய்"
}, Ne = {
  OK: "ตกลง",
  CANCEL: "ยกเลิก",
  CONFIRM: "ยืนยัน"
}, Ae = {
  OK: "Tamam",
  CANCEL: "İptal",
  CONFIRM: "Onayla"
}, Le = {
  OK: "OK",
  CANCEL: "Відміна",
  CONFIRM: "Прийняти"
}, ke = {
  OK: "OK",
  CANCEL: "Hủy bỏ",
  CONFIRM: "Xác nhận"
}, xe = {
  OK: "OK",
  CANCEL: "取消",
  CONFIRM: "确认"
}, Ke = {
  OK: "OK",
  CANCEL: "取消",
  CONFIRM: "確認"
}, Me = {
  ar: D,
  az: _,
  bgBG: $,
  cs: V,
  da: U,
  de: G,
  el: W,
  en: Z,
  es: J,
  et: X,
  eu: Q,
  fa: Y,
  fi: ee,
  fr: te,
  he: oe,
  hr: re,
  hu: ae,
  id: ne,
  it: le,
  ja: ie,
  ka: se,
  ko: ce,
  lt: ue,
  lv: de,
  nl: fe,
  no: be,
  pl: pe,
  pt: me,
  ptBR: Oe,
  ru: he,
  sk: Ce,
  sl: ve,
  sq: we,
  sv: ye,
  sw: Ee,
  ta: ge,
  th: Ne,
  tr: Ae,
  uk: Le,
  vi: ke,
  zhCN: xe,
  zhTW: Ke
}, Ie = {
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
}, Fe = {
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
function q(e) {
  return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(e);
}
function T(e) {
  return /(\d{4})-(\d{2})-(\d{2})/.test(e);
}
function L(e, t) {
  if (typeof t == "string" && typeof e[t] == "function")
    e[t]();
  else {
    const r = typeof t == "string" ? new Event(t, { bubbles: !0 }) : t;
    e.dispatchEvent(r);
  }
}
const ze = "6.0.4", w = Me, p = Ie, h = Fe;
function De(e) {
  return w[e];
}
function _e(e, t) {
  ["OK", "CANCEL", "CONFIRM"].forEach((r, o) => {
    if (!t[r])
      throw new Error(`Please supply a translation for "${r}"`);
  }), w[e] = {
    OK: t.OK,
    CANCEL: t.CANCEL,
    CONFIRM: t.CONFIRM
  };
}
function $e(e) {
  if (e !== "en")
    delete w[e];
  else
    throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
}
function Ve(e) {
  return e && (e = e.replace("-", "")), Se("locale", e);
}
function Se(...e) {
  let t = {};
  e.length === 2 ? t[e[0]] = e[1] : t = e[0], Object.assign(h, t);
}
function Ue() {
  document.querySelectorAll(".bootbox").forEach((e) => {
    const t = v.Modal.getInstance(e);
    t && t.hide();
  });
}
function Re(e) {
  return Re();
}
function k(e) {
  var C;
  if (v.Modal === void 0)
    throw new Error(
      '"bootstrap.Modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/5.3/getting-started/introduction/ for more details.'
    );
  e = Pe(e);
  let t = b(p.dialog), r = t.querySelector(".modal-dialog"), o = t.querySelector(".modal-body"), n = b(p.header), a = b(p.footer), s = e.buttons;
  e.messageForm ? o.querySelector(".bootbox-body").append(e.messageForm) : typeof e.message == "string" ? o.querySelector(".bootbox-body").innerHTML = e.message : o.querySelector(".bootbox-body").append(e.message);
  let u = {};
  if (typeof e.onEscape == "function" && (u.onEscape = e.onEscape), H(e.buttons) > 0) {
    for (const [l, d] of Object.entries(s)) {
      let m = b(p.button);
      m.dataset.bbHandler = l;
      var y = d.className.split(" ");
      switch (y.forEach((E) => {
        m.classList.add(E);
      }), l) {
        case "ok":
        case "confirm":
          m.classList.add("bootbox-accept");
          break;
        case "cancel":
          m.classList.add("bootbox-cancel");
          break;
      }
      m.innerHTML = d.label, d.id && m.setAttribute("id", d.id), d.disabled === !0 && (m.disabled = !0), a.append(m), typeof d.callback == "function" && (u[l] = d.callback);
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
      let l = b(p.closeButton);
      n.append(l);
    }
    o.before(n);
  }
  if (e.centerVertical && r.classList.add("modal-dialog-centered"), e.reusable || (t.addEventListener(
    "hide.bs.modal",
    function(l) {
      l.target === t && (t.removeEventListener("escape.close.bb", function() {
      }), t.removeEventListener("click", function() {
      }));
    },
    { once: !0 }
  ), t.addEventListener(
    "hidden.bs.modal",
    function(l) {
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
      g(t, "show.bs.modal", e.onShow);
    else
      throw new Error('Argument supplied to "onShow" must be a function');
  if (t.addEventListener("shown.bs.modal", P), e.onShown)
    if (typeof e.onShown == "function")
      g(t, "shown.bs.modal", e.onShown);
    else
      throw new Error('Argument supplied to "onShown" must be a function');
  if (e.backdrop === !0) {
    let l = !1;
    g(
      t,
      "mousedown",
      function(d) {
        d.stopPropagation(), l = !0;
      },
      ".modal-content"
    ), g(t, "click.dismiss.bs.modal", function(d) {
      l || d.target !== d.currentTarget || L(t, "escape.close.bb");
    });
  }
  t.addEventListener(
    "escape.close.bb",
    function(l) {
      u.onEscape && A(l, t, u.onEscape);
    }
  ), t.addEventListener(
    "click",
    (l) => {
      if (l.target.nodeName.toLowerCase() === "button" && !l.target.classList.contains("disabled")) {
        const d = l.target.dataset.bbHandler;
        d !== void 0 && A(l, t, u[d]);
      }
    }
  ), document.addEventListener(
    "click",
    (l) => {
      l.target.closest(".bootbox-close-button") && A(l, t, u.onEscape);
    }
  ), t.addEventListener(
    "keyup",
    function(l) {
      l.which === 27 && L(t, "escape.close.bb");
    }
  ), typeof e.container == "object" ? e.container.append(t) : (C = document.querySelector(e.container)) == null || C.append(t);
  const O = new v.Modal(
    t,
    {
      backdrop: e.backdrop,
      keyboard: !1
      //show: false
    }
  );
  return e.show && (e.relatedTarget ? O.show(e.relatedTarget) : O.show()), t;
}
function Ge() {
  let e = x("alert", ["ok"], ["message", "callback"], arguments);
  if (e.callback && typeof e.callback != "function")
    throw new Error('alert requires the "callback" property to be a function when provided');
  return e.buttons.ok.callback = e.onEscape = function() {
    return typeof e.callback == "function" ? e.callback.call(this) : !0;
  }, k(e);
}
function We() {
  let e;
  if (e = x("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), typeof e.callback != "function")
    throw new Error("confirm requires a callback");
  var t = e.buttons.cancel, r = e.buttons.confirm;
  return r || (e.buttons.confirm = N("confirm", e.locale), r = e.buttons.confirm), t || (e.buttons.cancel = N("cancel", e.locale), t = e.buttons.cancel), t.callback = e.onEscape = function() {
    var o;
    return (o = e.callback) == null ? void 0 : o.call(this, null);
  }, r.callback = function() {
    var o;
    return (o = e.callback) == null ? void 0 : o.call(this, !0);
  }, e.buttons.cancel = t, e.buttons.confirm = r, k(e);
}
function Ze() {
  var E, K, M, I, F, S;
  let e, t, r, o, n, a;
  r = b(p.form), e = x("prompt", ["cancel", "confirm"], ["title", "callback"], arguments), e.value || (e.value = h.value), e.inputType || (e.inputType = h.inputType), n = e.show === void 0 ? h.show : e.show, e.show = !1;
  var s = e.buttons.cancel;
  s || (e.buttons.cancel = N("cancel", e.locale), s = e.buttons.cancel), s.callback = e.onEscape = function() {
    var i;
    return (i = e.callback) == null ? void 0 : i.call(this, null);
  }, e.buttons.cancel = s;
  var u = e.buttons.confirm;
  if (u || (e.buttons.confirm = N("confirm", e.locale), u = e.buttons.confirm), u.callback = function() {
    var c;
    let i;
    if (e.inputType === "checkbox") {
      const f = Array.from(o.querySelectorAll('input[type="checkbox"]:checked'));
      if (i = Array.from(f).map(function(R) {
        return R.value;
      }), e.required === !0 && f.length === 0)
        return !1;
    } else e.inputType === "radio" ? i = o.querySelector('input[type="radio"]:checked').value : i = o.value;
    return (c = e.callback) == null ? void 0 : c.call(this, i);
  }, e.buttons.confirm = u, !e.title)
    throw new Error("prompt requires a title");
  if (typeof e.callback != "function")
    throw new Error("prompt requires a callback");
  var y = p.inputs;
  if (!y[e.inputType])
    throw new Error("Invalid prompt type");
  switch (o = b(y[e.inputType]), e.inputType) {
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
      He(e.inputType, e.min, e.max) && (e.min !== void 0 && o.setAttribute("min", e.min.toString()), e.max !== void 0 && o.setAttribute("max", e.max.toString()));
      break;
    case "select":
      var O = {};
      if (a = e.inputOptions || [], !Array.isArray(a))
        throw new Error("Please pass an array of input options");
      if (!a.length)
        throw new Error('prompt with "inputType" set to "select" requires at least one option');
      e.required && (o.required = !0), e.multiple && (o.multiple = !0);
      for (const [, i] of Object.entries(a)) {
        let c = o;
        if (i.value === void 0 || i.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        if (i.group) {
          if (!O[i.group]) {
            var C = b("<optgroup />");
            C.setAttribute("label", i.group), O[i.group] = {
              Content: C
            };
          }
          c = O[i.group].Content;
        }
        let f = b(p.option);
        f.setAttribute("value", i.value), f.textContent = i.text, c.append(f);
      }
      for (const [i, c] of Object.entries(O))
        o.append(c.Content);
      o.value = e.value.toString();
      break;
    case "checkbox":
      var l = Array.isArray(e.value) ? e.value : [e.value];
      if (a = e.inputOptions || [], !a.length)
        throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
      o = b('<div class="bootbox-checkbox-list"></div>');
      for (const [i, c] of Object.entries(a)) {
        if (c.value === void 0 || c.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        let f = b(p.inputs[e.inputType]);
        (E = f.querySelector("input")) == null || E.setAttribute("value", c.value), (K = f.querySelector("label")) == null || K.append(`
${c.text}`);
        for (const [R, z] of Object.entries(l))
          z === c.value && ((M = f.querySelector("input")) == null || M.setAttribute("checked", "true"));
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
      var d = !0;
      for (const [i, c] of Object.entries(a)) {
        if (c.value === void 0 || c.text === void 0)
          throw new Error('each option needs a "value" property and a "text" property');
        let f = b(p.inputs[e.inputType]);
        (I = f.querySelector("input")) == null || I.setAttribute("value", c.value), (F = f.querySelector("label")) == null || F.append(`
${c.text}`), e.value !== void 0 && c.value === e.value && (f.querySelector("input").checked = !0, d = !1), o.append(f);
      }
      d && ((S = o.querySelector('input[type="radio"]')) == null || S.setAttribute("checked", "true"));
      break;
  }
  if (r.append(o), r.addEventListener(
    "submit",
    function(i) {
      var c;
      i.preventDefault(), i.stopPropagation(), (c = t.querySelector(".bootbox-accept")) == null || c.click();
    }
  ), e.message && e.message.trim() !== "") {
    let i = b(p.promptMessage).innerHTML = e.message;
    r.prepend(i), e.messageForm = r;
  } else
    e.messageForm = r;
  t = k(e), t.removeEventListener("shown.bs.modal", P), t.addEventListener(
    "shown.bs.modal",
    function() {
      o.focus();
    }
  );
  const m = new v.Modal(t);
  return n === !0 && m.show(), t;
}
function j(...e) {
  const t = {};
  let r = !1, o = 0;
  const n = e.length;
  Object.prototype.toString.call(e[0]) === "[object Boolean]" && (r = e[0], o++);
  const a = (s) => {
    for (const u in s)
      Object.prototype.hasOwnProperty.call(s, u) && (r && Object.prototype.toString.call(s[u]) === "[object Object]" ? t[u] = j(!0, t[u], s[u]) : t[u] = s[u]);
  };
  for (; o < n; o++) {
    const s = e[o];
    a(s);
  }
  return t;
}
function qe(e, t) {
  const r = e.length;
  let o = {};
  if (r < 1 || r > 2)
    throw new Error("Invalid argument length");
  return r === 2 || typeof e[0] == "string" ? (o[t[0]] = e[0], o[t[1]] = e[1]) : o = e[0], o;
}
function Te(e, t, r) {
  return j(
    {},
    // Ensure the target is an empty, unreferenced object
    e,
    // Base options object
    qe(t, r)
    // Map array to object if necessary
  );
}
function x(e, t, r, o) {
  let n;
  o && o[0] && (n = o[0].locale || h.locale, (o[0].swapButtonOrder || h.swapButtonOrder) && (t = t.reverse()));
  const a = {
    className: `bootbox-${e}`,
    buttons: Be(t, n),
    show: !0,
    closeButton: !0,
    animate: !0,
    locale: "en",
    swapButtonOrder: !1,
    scrollable: !1,
    reusable: !1,
    centerVertical: !1
  };
  return je(
    // Merge the generated base properties with user supplied arguments
    Te(
      a,
      o,
      // If args.length > 1, properties specify how each arg maps to an object key
      r
    ),
    t
  );
}
function je(e, t) {
  const r = {};
  for (const [o, n] of Object.entries(t))
    r[n] = !0;
  for (const [o] of Object.entries(e.buttons))
    if (r[o] === void 0)
      throw new Error(`button key "${o}" is not allowed (options are ${t.join(" ")})`);
  return e;
}
function Be(e, t) {
  const r = {};
  for (let o = 0, n = e.length; o < n; o++) {
    const a = e[o], s = a.toLowerCase(), u = a.toUpperCase();
    r[s] = {
      label: B(u, t),
      className: ""
    };
  }
  return r;
}
function N(e, t) {
  var r = {
    label: B(e.toUpperCase(), t),
    className: ""
  };
  return r;
}
function B(e, t) {
  const r = w[t];
  return r ? r[e] : w.en[e];
}
function Pe(e) {
  let t, r;
  if (!e.message && !e.messageForm)
    throw new Error('"message" option must not be null or an empty string.');
  e = Object.assign({}, h, e), e.backdrop ? e.backdrop = typeof e.backdrop == "string" && e.backdrop.toLowerCase() === "static" ? "static" : !0 : e.backdrop = e.backdrop === !1 || e.backdrop === 0 ? !1 : "static", e.buttons || (e.buttons = {}), t = e.buttons, r = H(t);
  var o = 0;
  for (var [n, a] of Object.entries(t)) {
    if (typeof a == "function" && (a = t[n] = {
      callback: a,
      label: "",
      className: ""
    }), Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/, "$1").toLowerCase() !== "object")
      throw new Error(`button with key "${n}" must be an object`);
    if (a.label || (a.label = n), !a.className) {
      let s = !1;
      e.swapButtonOrder ? s = o === 0 : s = o === r - 1, r <= 2 && s ? a.className = "btn-primary" : a.className = "btn-secondary";
    }
    o++;
  }
  return e;
}
function P(e) {
  var r, o;
  const t = (o = (r = e == null ? void 0 : e.data) == null ? void 0 : r.dialog) == null ? void 0 : o.querySelector(".bootbox-accept");
  t && L(t, "focus");
}
function H(e) {
  return Object.keys(e).length;
}
function A(e, t, r) {
  var n;
  e.stopPropagation(), e.preventDefault(), !(typeof r == "function" && r.call(t, e) === !1) && t && ((n = v.Modal.getInstance(t)) == null || n.hide());
}
function He(e, t, r) {
  let o = !1, n = !0, a = !0;
  if (e === "date")
    t !== void 0 && !(n = T(t)) ? console.warn('Invalid "min" date format for input type "date".') : r !== void 0 && !(a = T(r)) && console.warn('Invalid "max" date format for input type "date".');
  else if (e === "time") {
    if (t !== void 0 && !(n = q(t)))
      throw new Error('"min" is not a valid time.');
    if (r !== void 0 && !(a = q(r)))
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
function g(e, t, r, o) {
  if (o) {
    const n = (a) => {
      if (!a.target) return;
      const s = a.target.closest(o);
      s && r.call(s, a);
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
  ze as VERSION,
  _e as addLocale,
  Ge as alert,
  We as confirm,
  k as dialog,
  De as getLocale,
  Ue as hideAll,
  Re as init,
  Ze as prompt,
  $e as removeLocale,
  Se as setDefaults,
  Ve as setLocale
};
//# sourceMappingURL=bootbox.js.map
