(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === "childList")
        for (const i of r.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const r = {};
    return (
      o.integrity && (r.integrity = o.integrity),
      o.referrerPolicy && (r.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const r = n(o);
    fetch(o.href, r);
  }
})();
function Es(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let o = 0; o < s.length; o++) n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const se = {},
  Vt = [],
  Fe = () => {},
  zr = () => !1,
  Xr = /^on[^a-z]/,
  Tn = (e) => Xr.test(e),
  Ss = (e) => e.startsWith("onUpdate:"),
  me = Object.assign,
  Bs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Jr = Object.prototype.hasOwnProperty,
  Y = (e, t) => Jr.call(e, t),
  H = Array.isArray,
  $t = (e) => Wn(e) === "[object Map]",
  jo = (e) => Wn(e) === "[object Set]",
  k = (e) => typeof e == "function",
  pe = (e) => typeof e == "string",
  Mn = (e) => typeof e == "symbol",
  re = (e) => e !== null && typeof e == "object",
  Uo = (e) => (re(e) || k(e)) && k(e.then) && k(e.catch),
  qo = Object.prototype.toString,
  Wn = (e) => qo.call(e),
  Zr = (e) => Wn(e).slice(8, -1),
  Ko = (e) => Wn(e) === "[object Object]",
  As = (e) =>
    pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  xn = Es(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Pn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Qr = /-(\w)/g,
  Ue = Pn((e) => e.replace(Qr, (t, n) => (n ? n.toUpperCase() : ""))),
  Gr = /\B([A-Z])/g,
  Ft = Pn((e) => e.replace(Gr, "-$1").toLowerCase()),
  Ln = Pn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  es = Pn((e) => (e ? `on${Ln(e)}` : "")),
  wt = (e, t) => !Object.is(e, t),
  In = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Sn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  cs = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let no;
const as = () =>
  no ||
  (no =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function nt(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        o = pe(s) ? si(s) : nt(s);
      if (o) for (const r in o) t[r] = o[r];
    }
    return t;
  } else if (pe(e) || re(e)) return e;
}
const ei = /;(?![^(]*\))/g,
  ti = /:([^]+)/,
  ni = /\/\*[^]*?\*\//g;
function si(e) {
  const t = {};
  return (
    e
      .replace(ni, "")
      .split(ei)
      .forEach((n) => {
        if (n) {
          const s = n.split(ti);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Ve(e) {
  let t = "";
  if (pe(e)) t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ve(e[n]);
      s && (t += s + " ");
    }
  else if (re(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const oi =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ri = Es(oi);
function Yo(e) {
  return !!e || e === "";
}
const de = (e) =>
    pe(e)
      ? e
      : e == null
      ? ""
      : H(e) || (re(e) && (e.toString === qo || !k(e.toString)))
      ? JSON.stringify(e, zo, 2)
      : String(e),
  zo = (e, t) =>
    t && t.__v_isRef
      ? zo(e, t.value)
      : $t(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, o]) => ((n[`${s} =>`] = o), n),
            {}
          ),
        }
      : jo(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : re(t) && !H(t) && !Ko(t)
      ? String(t)
      : t;
let Ae;
class Xo {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ae),
      !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ae;
      try {
        return (Ae = this), t();
      } finally {
        Ae = n;
      }
    }
  }
  on() {
    Ae = this;
  }
  off() {
    Ae = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Jo(e) {
  return new Xo(e);
}
function ii(e, t = Ae) {
  t && t.active && t.effects.push(e);
}
function Vs() {
  return Ae;
}
function Zo(e) {
  Ae && Ae.cleanups.push(e);
}
const $s = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Qo = (e) => (e.w & it) > 0,
  Go = (e) => (e.n & it) > 0,
  li = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= it;
  },
  ci = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const o = t[s];
        Qo(o) && !Go(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~it),
          (o.n &= ~it);
      }
      t.length = n;
    }
  },
  Bn = new WeakMap();
let Kt = 0,
  it = 1;
const us = 30;
let Pe;
const bt = Symbol(""),
  fs = Symbol("");
class Os {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      ii(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Pe,
      n = st;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Pe),
        (Pe = this),
        (st = !0),
        (it = 1 << ++Kt),
        Kt <= us ? li(this) : so(this),
        this.fn()
      );
    } finally {
      Kt <= us && ci(this),
        (it = 1 << --Kt),
        (Pe = this.parent),
        (st = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Pe === this
      ? (this.deferStop = !0)
      : this.active &&
        (so(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function so(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let st = !0;
const er = [];
function Ht() {
  er.push(st), (st = !1);
}
function Rt() {
  const e = er.pop();
  st = e === void 0 ? !0 : e;
}
function Ie(e, t, n) {
  if (st && Pe) {
    let s = Bn.get(e);
    s || Bn.set(e, (s = new Map()));
    let o = s.get(n);
    o || s.set(n, (o = $s())), tr(o);
  }
}
function tr(e, t) {
  let n = !1;
  Kt <= us ? Go(e) || ((e.n |= it), (n = !Qo(e))) : (n = !e.has(Pe)),
    n && (e.add(Pe), Pe.deps.push(e));
}
function Je(e, t, n, s, o, r) {
  const i = Bn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && H(e)) {
    const c = Number(s);
    i.forEach((a, d) => {
      (d === "length" || (!Mn(d) && d >= c)) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        H(e)
          ? As(n) && l.push(i.get("length"))
          : (l.push(i.get(bt)), $t(e) && l.push(i.get(fs)));
        break;
      case "delete":
        H(e) || (l.push(i.get(bt)), $t(e) && l.push(i.get(fs)));
        break;
      case "set":
        $t(e) && l.push(i.get(bt));
        break;
    }
  if (l.length === 1) l[0] && ds(l[0]);
  else {
    const c = [];
    for (const a of l) a && c.push(...a);
    ds($s(c));
  }
}
function ds(e, t) {
  const n = H(e) ? e : [...e];
  for (const s of n) s.computed && oo(s);
  for (const s of n) s.computed || oo(s);
}
function oo(e, t) {
  (e !== Pe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function ai(e, t) {
  var n;
  return (n = Bn.get(e)) == null ? void 0 : n.get(t);
}
const ui = Es("__proto__,__v_isRef,__isVue"),
  nr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Mn)
  ),
  ro = fi();
function fi() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = z(this);
        for (let r = 0, i = this.length; r < i; r++) Ie(s, "get", r + "");
        const o = s[t](...n);
        return o === -1 || o === !1 ? s[t](...n.map(z)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ht();
        const s = z(this)[t].apply(this, n);
        return Rt(), s;
      };
    }),
    e
  );
}
function di(e) {
  const t = z(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class sr {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, s) {
    const o = this._isReadonly,
      r = this._shallow;
    if (n === "__v_isReactive") return !o;
    if (n === "__v_isReadonly") return o;
    if (n === "__v_isShallow") return r;
    if (n === "__v_raw" && s === (o ? (r ? Ei : lr) : r ? ir : rr).get(t))
      return t;
    const i = H(t);
    if (!o) {
      if (i && Y(ro, n)) return Reflect.get(ro, n, s);
      if (n === "hasOwnProperty") return di;
    }
    const l = Reflect.get(t, n, s);
    return (Mn(n) ? nr.has(n) : ui(n)) || (o || Ie(t, "get", n), r)
      ? l
      : le(l)
      ? i && As(n)
        ? l
        : l.value
      : re(l)
      ? o
        ? Hn(l)
        : lt(l)
      : l;
  }
}
class or extends sr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    if (Tt(r) && le(r) && !le(s)) return !1;
    if (
      !this._shallow &&
      (!An(s) && !Tt(s) && ((r = z(r)), (s = z(s))), !H(t) && le(r) && !le(s))
    )
      return (r.value = s), !0;
    const i = H(t) && As(n) ? Number(n) < t.length : Y(t, n),
      l = Reflect.set(t, n, s, o);
    return (
      t === z(o) && (i ? wt(s, r) && Je(t, "set", n, s) : Je(t, "add", n, s)), l
    );
  }
  deleteProperty(t, n) {
    const s = Y(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && s && Je(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Mn(n) || !nr.has(n)) && Ie(t, "has", n), s;
  }
  ownKeys(t) {
    return Ie(t, "iterate", H(t) ? "length" : bt), Reflect.ownKeys(t);
  }
}
class pi extends sr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const hi = new or(),
  gi = new pi(),
  mi = new or(!0),
  Ts = (e) => e,
  Fn = (e) => Reflect.getPrototypeOf(e);
function gn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = z(e),
    r = z(t);
  n || (wt(t, r) && Ie(o, "get", t), Ie(o, "get", r));
  const { has: i } = Fn(o),
    l = s ? Ts : n ? Ps : en;
  if (i.call(o, t)) return l(e.get(t));
  if (i.call(o, r)) return l(e.get(r));
  e !== o && e.get(t);
}
function mn(e, t = !1) {
  const n = this.__v_raw,
    s = z(n),
    o = z(e);
  return (
    t || (wt(e, o) && Ie(s, "has", e), Ie(s, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function _n(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ie(z(e), "iterate", bt), Reflect.get(e, "size", e)
  );
}
function io(e) {
  e = z(e);
  const t = z(this);
  return Fn(t).has.call(t, e) || (t.add(e), Je(t, "add", e, e)), this;
}
function lo(e, t) {
  t = z(t);
  const n = z(this),
    { has: s, get: o } = Fn(n);
  let r = s.call(n, e);
  r || ((e = z(e)), (r = s.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), r ? wt(t, i) && Je(n, "set", e, t) : Je(n, "add", e, t), this
  );
}
function co(e) {
  const t = z(this),
    { has: n, get: s } = Fn(t);
  let o = n.call(t, e);
  o || ((e = z(e)), (o = n.call(t, e))), s && s.call(t, e);
  const r = t.delete(e);
  return o && Je(t, "delete", e, void 0), r;
}
function ao() {
  const e = z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Je(e, "clear", void 0, void 0), n;
}
function vn(e, t) {
  return function (s, o) {
    const r = this,
      i = r.__v_raw,
      l = z(i),
      c = t ? Ts : e ? Ps : en;
    return (
      !e && Ie(l, "iterate", bt), i.forEach((a, d) => s.call(o, c(a), c(d), r))
    );
  };
}
function bn(e, t, n) {
  return function (...s) {
    const o = this.__v_raw,
      r = z(o),
      i = $t(r),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      a = o[e](...s),
      d = n ? Ts : t ? Ps : en;
    return (
      !t && Ie(r, "iterate", c ? fs : bt),
      {
        next() {
          const { value: p, done: h } = a.next();
          return h
            ? { value: p, done: h }
            : { value: l ? [d(p[0]), d(p[1])] : d(p), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ge(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function _i() {
  const e = {
      get(r) {
        return gn(this, r);
      },
      get size() {
        return _n(this);
      },
      has: mn,
      add: io,
      set: lo,
      delete: co,
      clear: ao,
      forEach: vn(!1, !1),
    },
    t = {
      get(r) {
        return gn(this, r, !1, !0);
      },
      get size() {
        return _n(this);
      },
      has: mn,
      add: io,
      set: lo,
      delete: co,
      clear: ao,
      forEach: vn(!1, !0),
    },
    n = {
      get(r) {
        return gn(this, r, !0);
      },
      get size() {
        return _n(this, !0);
      },
      has(r) {
        return mn.call(this, r, !0);
      },
      add: Ge("add"),
      set: Ge("set"),
      delete: Ge("delete"),
      clear: Ge("clear"),
      forEach: vn(!0, !1),
    },
    s = {
      get(r) {
        return gn(this, r, !0, !0);
      },
      get size() {
        return _n(this, !0);
      },
      has(r) {
        return mn.call(this, r, !0);
      },
      add: Ge("add"),
      set: Ge("set"),
      delete: Ge("delete"),
      clear: Ge("clear"),
      forEach: vn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      (e[r] = bn(r, !1, !1)),
        (n[r] = bn(r, !0, !1)),
        (t[r] = bn(r, !1, !0)),
        (s[r] = bn(r, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [vi, bi, yi, wi] = _i();
function Ms(e, t) {
  const n = t ? (e ? wi : yi) : e ? bi : vi;
  return (s, o, r) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? s
      : Reflect.get(Y(n, o) && o in s ? n : s, o, r);
}
const Ci = { get: Ms(!1, !1) },
  xi = { get: Ms(!1, !0) },
  Ii = { get: Ms(!0, !1) },
  rr = new WeakMap(),
  ir = new WeakMap(),
  lr = new WeakMap(),
  Ei = new WeakMap();
function Si(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Bi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Si(Zr(e));
}
function lt(e) {
  return Tt(e) ? e : Ws(e, !1, hi, Ci, rr);
}
function Ai(e) {
  return Ws(e, !1, mi, xi, ir);
}
function Hn(e) {
  return Ws(e, !0, gi, Ii, lr);
}
function Ws(e, t, n, s, o) {
  if (!re(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = o.get(e);
  if (r) return r;
  const i = Bi(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return o.set(e, l), l;
}
function ot(e) {
  return Tt(e) ? ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Tt(e) {
  return !!(e && e.__v_isReadonly);
}
function An(e) {
  return !!(e && e.__v_isShallow);
}
function cr(e) {
  return ot(e) || Tt(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function Rn(e) {
  return Sn(e, "__v_skip", !0), e;
}
const en = (e) => (re(e) ? lt(e) : e),
  Ps = (e) => (re(e) ? Hn(e) : e);
function ar(e) {
  st && Pe && ((e = z(e)), tr(e.dep || (e.dep = $s())));
}
function ur(e, t) {
  e = z(e);
  const n = e.dep;
  n && ds(n);
}
function le(e) {
  return !!(e && e.__v_isRef === !0);
}
function T(e) {
  return Vi(e, !1);
}
function Vi(e, t) {
  return le(e) ? e : new $i(e, t);
}
class $i {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : en(t));
  }
  get value() {
    return ar(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || An(t) || Tt(t);
    (t = n ? t : z(t)),
      wt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : en(t)), ur(this));
  }
}
function I(e) {
  return le(e) ? e.value : e;
}
function we(e) {
  return k(e) ? e() : I(e);
}
const Oi = {
  get: (e, t, n) => I(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return le(o) && !le(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function fr(e) {
  return ot(e) ? e : new Proxy(e, Oi);
}
function Ti(e) {
  const t = H(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Wi(e, n);
  return t;
}
class Mi {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return ai(z(this._object), this._key);
  }
}
function Wi(e, t, n) {
  const s = e[t];
  return le(s) ? s : new Mi(e, t, n);
}
class Pi {
  constructor(t, n, s, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Os(t, () => {
        this._dirty || ((this._dirty = !0), ur(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = z(this);
    return (
      ar(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Li(e, t, n = !1) {
  let s, o;
  const r = k(e);
  return (
    r ? ((s = e), (o = Fe)) : ((s = e.get), (o = e.set)),
    new Pi(s, o, r || !o, n)
  );
}
function rt(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    Nn(r, t, n);
  }
  return o;
}
function He(e, t, n, s) {
  if (k(e)) {
    const r = rt(e, t, n, s);
    return (
      r &&
        Uo(r) &&
        r.catch((i) => {
          Nn(i, t, n);
        }),
      r
    );
  }
  const o = [];
  for (let r = 0; r < e.length; r++) o.push(He(e[r], t, n, s));
  return o;
}
function Nn(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy,
      l = n;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, i, l) === !1) return;
      }
      r = r.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      rt(c, null, 10, [e, i, l]);
      return;
    }
  }
  Fi(e, n, o, s);
}
function Fi(e, t, n, s = !0) {
  console.error(e);
}
let tn = !1,
  ps = !1;
const be = [];
let je = 0;
const Ot = [];
let Xe = null,
  gt = 0;
const dr = Promise.resolve();
let Ls = null;
function Fs(e) {
  const t = Ls || dr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Hi(e) {
  let t = je + 1,
    n = be.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      o = be[s],
      r = nn(o);
    r < e || (r === e && o.pre) ? (t = s + 1) : (n = s);
  }
  return t;
}
function Hs(e) {
  (!be.length || !be.includes(e, tn && e.allowRecurse ? je + 1 : je)) &&
    (e.id == null ? be.push(e) : be.splice(Hi(e.id), 0, e), pr());
}
function pr() {
  !tn && !ps && ((ps = !0), (Ls = dr.then(gr)));
}
function Ri(e) {
  const t = be.indexOf(e);
  t > je && be.splice(t, 1);
}
function Ni(e) {
  H(e)
    ? Ot.push(...e)
    : (!Xe || !Xe.includes(e, e.allowRecurse ? gt + 1 : gt)) && Ot.push(e),
    pr();
}
function uo(e, t = tn ? je + 1 : 0) {
  for (; t < be.length; t++) {
    const n = be[t];
    n && n.pre && (be.splice(t, 1), t--, n());
  }
}
function hr(e) {
  if (Ot.length) {
    const t = [...new Set(Ot)];
    if (((Ot.length = 0), Xe)) {
      Xe.push(...t);
      return;
    }
    for (Xe = t, Xe.sort((n, s) => nn(n) - nn(s)), gt = 0; gt < Xe.length; gt++)
      Xe[gt]();
    (Xe = null), (gt = 0);
  }
}
const nn = (e) => (e.id == null ? 1 / 0 : e.id),
  Di = (e, t) => {
    const n = nn(e) - nn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function gr(e) {
  (ps = !1), (tn = !0), be.sort(Di);
  const t = Fe;
  try {
    for (je = 0; je < be.length; je++) {
      const n = be[je];
      n && n.active !== !1 && rt(n, null, 14);
    }
  } finally {
    (je = 0),
      (be.length = 0),
      hr(),
      (tn = !1),
      (Ls = null),
      (be.length || Ot.length) && gr();
  }
}
function ki(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || se;
  let o = n;
  const r = t.startsWith("update:"),
    i = r && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: p, trim: h } = s[d] || se;
    h && (o = n.map((w) => (pe(w) ? w.trim() : w))), p && (o = n.map(cs));
  }
  let l,
    c = s[(l = es(t))] || s[(l = es(Ue(t)))];
  !c && r && (c = s[(l = es(Ft(t)))]), c && He(c, e, 6, o);
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), He(a, e, 6, o);
  }
}
function mr(e, t, n = !1) {
  const s = t.emitsCache,
    o = s.get(e);
  if (o !== void 0) return o;
  const r = e.emits;
  let i = {},
    l = !1;
  if (!k(e)) {
    const c = (a) => {
      const d = mr(a, t, !0);
      d && ((l = !0), me(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !r && !l
    ? (re(e) && s.set(e, null), null)
    : (H(r) ? r.forEach((c) => (i[c] = null)) : me(i, r),
      re(e) && s.set(e, i),
      i);
}
function Dn(e, t) {
  return !e || !Tn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Ft(t)) || Y(e, t));
}
let ge = null,
  kn = null;
function Vn(e) {
  const t = ge;
  return (ge = e), (kn = (e && e.type.__scopeId) || null), t;
}
function Ct(e) {
  kn = e;
}
function xt() {
  kn = null;
}
function oe(e, t = ge, n) {
  if (!t || e._n) return e;
  const s = (...o) => {
    s._d && wo(-1);
    const r = Vn(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Vn(r), s._d && wo(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function ts(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: r,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: a,
    render: d,
    renderCache: p,
    data: h,
    setupState: w,
    ctx: A,
    inheritAttrs: E,
  } = e;
  let V, F;
  const R = Vn(e);
  try {
    if (n.shapeFlag & 4) {
      const M = o || s;
      (V = ke(d.call(M, M, p, r, w, h, A))), (F = c);
    } else {
      const M = t;
      (V = ke(
        M.length > 1 ? M(r, { attrs: c, slots: l, emit: a }) : M(r, null)
      )),
        (F = t.props ? c : ji(c));
    }
  } catch (M) {
    (Zt.length = 0), Nn(M, e, 1), (V = O(ct));
  }
  let L = V;
  if (F && E !== !1) {
    const M = Object.keys(F),
      { shapeFlag: Q } = L;
    M.length && Q & 7 && (i && M.some(Ss) && (F = Ui(F, i)), (L = Mt(L, F)));
  }
  return (
    n.dirs && ((L = Mt(L)), (L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (L.transition = n.transition),
    (V = L),
    Vn(R),
    V
  );
}
const ji = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Tn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ui = (e, t) => {
    const n = {};
    for (const s in e) (!Ss(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function qi(e, t, n) {
  const { props: s, children: o, component: r } = e,
    { props: i, children: l, patchFlag: c } = t,
    a = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? fo(s, i, a) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const h = d[p];
        if (i[h] !== s[h] && !Dn(a, h)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? fo(s, i, a)
        : !0
      : !!i;
  return !1;
}
function fo(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !Dn(n, r)) return !0;
  }
  return !1;
}
function Ki({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Yi = "components",
  zi = "directives",
  Xi = Symbol.for("v-ndc");
function Nt(e) {
  return Ji(zi, e);
}
function Ji(e, t, n = !0, s = !1) {
  const o = ge || fe;
  if (o) {
    const r = o.type;
    if (e === Yi) {
      const l = jl(r, !1);
      if (l && (l === t || l === Ue(t) || l === Ln(Ue(t)))) return r;
    }
    const i = po(o[e] || r[e], t) || po(o.appContext[e], t);
    return !i && s ? r : i;
  }
}
function po(e, t) {
  return e && (e[t] || e[Ue(t)] || e[Ln(Ue(t))]);
}
const Zi = (e) => e.__isSuspense;
function Qi(e, t) {
  t && t.pendingBranch
    ? H(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Ni(e);
}
function Gi(e, t) {
  return Rs(e, null, t);
}
const yn = {};
function Oe(e, t, n) {
  return Rs(e, t, n);
}
function Rs(
  e,
  t,
  { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = se
) {
  var l;
  const c = Vs() === ((l = fe) == null ? void 0 : l.scope) ? fe : null;
  let a,
    d = !1,
    p = !1;
  if (
    (le(e)
      ? ((a = () => e.value), (d = An(e)))
      : ot(e)
      ? ((a = () => e), (s = !0))
      : H(e)
      ? ((p = !0),
        (d = e.some((M) => ot(M) || An(M))),
        (a = () =>
          e.map((M) => {
            if (le(M)) return M.value;
            if (ot(M)) return _t(M);
            if (k(M)) return rt(M, c, 2);
          })))
      : k(e)
      ? t
        ? (a = () => rt(e, c, 2))
        : (a = () => {
            if (!(c && c.isUnmounted)) return h && h(), He(e, c, 3, [w]);
          })
      : (a = Fe),
    t && s)
  ) {
    const M = a;
    a = () => _t(M());
  }
  let h,
    w = (M) => {
      h = R.onStop = () => {
        rt(M, c, 4);
      };
    },
    A;
  if (ln)
    if (
      ((w = Fe),
      t ? n && He(t, c, 3, [a(), p ? [] : void 0, w]) : a(),
      o === "sync")
    ) {
      const M = Kl();
      A = M.__watcherHandles || (M.__watcherHandles = []);
    } else return Fe;
  let E = p ? new Array(e.length).fill(yn) : yn;
  const V = () => {
    if (R.active)
      if (t) {
        const M = R.run();
        (s || d || (p ? M.some((Q, q) => wt(Q, E[q])) : wt(M, E))) &&
          (h && h(),
          He(t, c, 3, [M, E === yn ? void 0 : p && E[0] === yn ? [] : E, w]),
          (E = M));
      } else R.run();
  };
  V.allowRecurse = !!t;
  let F;
  o === "sync"
    ? (F = V)
    : o === "post"
    ? (F = () => Ce(V, c && c.suspense))
    : ((V.pre = !0), c && (V.id = c.uid), (F = () => Hs(V)));
  const R = new Os(a, F);
  t
    ? n
      ? V()
      : (E = R.run())
    : o === "post"
    ? Ce(R.run.bind(R), c && c.suspense)
    : R.run();
  const L = () => {
    R.stop(), c && c.scope && Bs(c.scope.effects, R);
  };
  return A && A.push(L), L;
}
function el(e, t, n) {
  const s = this.proxy,
    o = pe(e) ? (e.includes(".") ? _r(s, e) : () => s[e]) : e.bind(s, s);
  let r;
  k(t) ? (r = t) : ((r = t.handler), (n = t));
  const i = fe;
  Pt(this);
  const l = Rs(o, r.bind(s), n);
  return i ? Pt(i) : yt(), l;
}
function _r(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++) s = s[n[o]];
    return s;
  };
}
function _t(e, t) {
  if (!re(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), le(e))) _t(e.value, t);
  else if (H(e)) for (let n = 0; n < e.length; n++) _t(e[n], t);
  else if (jo(e) || $t(e))
    e.forEach((n) => {
      _t(n, t);
    });
  else if (Ko(e)) for (const n in e) _t(e[n], t);
  return e;
}
function Ke(e, t) {
  const n = ge;
  if (n === null) return e;
  const s = Kn(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, l, c, a = se] = t[r];
    i &&
      (k(i) && (i = { mounted: i, updated: i }),
      i.deep && _t(l),
      o.push({
        dir: i,
        instance: s,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: a,
      }));
  }
  return e;
}
function ft(e, t, n, s) {
  const o = e.dirs,
    r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[s];
    c && (Ht(), He(c, n, 8, [e.el, l, e, t]), Rt());
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function ce(e, t) {
  return k(e) ? (() => me({ name: e.name }, t, { setup: e }))() : e;
}
const zt = (e) => !!e.type.__asyncLoader,
  vr = (e) => e.type.__isKeepAlive;
function tl(e, t) {
  br(e, "a", t);
}
function nl(e, t) {
  br(e, "da", t);
}
function br(e, t, n = fe) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((jn(t, s, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      vr(o.parent.vnode) && sl(s, t, n, o), (o = o.parent);
  }
}
function sl(e, t, n, s) {
  const o = jn(t, e, s, !0);
  yr(() => {
    Bs(s[t], o);
  }, n);
}
function jn(e, t, n = fe, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Ht(), Pt(n);
          const l = He(t, n, e, i);
          return yt(), Rt(), l;
        });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const Qe =
    (e) =>
    (t, n = fe) =>
      (!ln || e === "sp") && jn(e, (...s) => t(...s), n),
  ol = Qe("bm"),
  Ns = Qe("m"),
  rl = Qe("bu"),
  il = Qe("u"),
  ll = Qe("bum"),
  yr = Qe("um"),
  cl = Qe("sp"),
  al = Qe("rtg"),
  ul = Qe("rtc");
function fl(e, t = fe) {
  jn("ec", e, t);
}
function Ds(e, t, n, s) {
  let o;
  const r = n && n[s];
  if (H(e) || pe(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (re(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const a = i[l];
        o[l] = t(e[a], a, l, r && r[l]);
      }
    }
  else o = [];
  return n && (n[s] = o), o;
}
function sn(e, t, n = {}, s, o) {
  if (ge.isCE || (ge.parent && zt(ge.parent) && ge.parent.isCE))
    return t !== "default" && (n.name = t), O("slot", n, s && s());
  let r = e[t];
  r && r._c && (r._d = !1), U();
  const i = r && wr(r(n)),
    l = qe(
      xe,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    r && r._c && (r._d = !0),
    l
  );
}
function wr(e) {
  return e.some((t) =>
    Or(t) ? !(t.type === ct || (t.type === xe && !wr(t.children))) : !0
  )
    ? e
    : null;
}
const hs = (e) => (e ? (Mr(e) ? Kn(e) || e.proxy : hs(e.parent)) : null),
  Xt = me(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => hs(e.parent),
    $root: (e) => hs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ks(e),
    $forceUpdate: (e) => e.f || (e.f = () => Hs(e.update)),
    $nextTick: (e) => e.n || (e.n = Fs.bind(e.proxy)),
    $watch: (e) => el.bind(e),
  }),
  ns = (e, t) => e !== se && !e.__isScriptSetup && Y(e, t),
  dl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: o,
        props: r,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let a;
      if (t[0] !== "$") {
        const w = i[t];
        if (w !== void 0)
          switch (w) {
            case 1:
              return s[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return r[t];
          }
        else {
          if (ns(s, t)) return (i[t] = 1), s[t];
          if (o !== se && Y(o, t)) return (i[t] = 2), o[t];
          if ((a = e.propsOptions[0]) && Y(a, t)) return (i[t] = 3), r[t];
          if (n !== se && Y(n, t)) return (i[t] = 4), n[t];
          gs && (i[t] = 0);
        }
      }
      const d = Xt[t];
      let p, h;
      if (d) return t === "$attrs" && Ie(e, "get", t), d(e);
      if ((p = l.__cssModules) && (p = p[t])) return p;
      if (n !== se && Y(n, t)) return (i[t] = 4), n[t];
      if (((h = c.config.globalProperties), Y(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: o, ctx: r } = e;
      return ns(o, t)
        ? ((o[t] = n), !0)
        : s !== se && Y(s, t)
        ? ((s[t] = n), !0)
        : Y(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: o,
          propsOptions: r,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== se && Y(e, i)) ||
        ns(t, i) ||
        ((l = r[0]) && Y(l, i)) ||
        Y(s, i) ||
        Y(Xt, i) ||
        Y(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Y(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function un(e, t, n) {
  const s = qs();
  if (n && n.local) {
    const o = T(e[t]);
    return (
      Oe(
        () => e[t],
        (r) => (o.value = r)
      ),
      Oe(o, (r) => {
        r !== e[t] && s.emit(`update:${t}`, r);
      }),
      o
    );
  } else
    return {
      __v_isRef: !0,
      get value() {
        return e[t];
      },
      set value(o) {
        s.emit(`update:${t}`, o);
      },
    };
}
function $n(e) {
  return H(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function fn(e, t) {
  return !e || !t ? e || t : H(e) && H(t) ? e.concat(t) : me({}, $n(e), $n(t));
}
let gs = !0;
function pl(e) {
  const t = ks(e),
    n = e.proxy,
    s = e.ctx;
  (gs = !1), t.beforeCreate && ho(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    created: d,
    beforeMount: p,
    mounted: h,
    beforeUpdate: w,
    updated: A,
    activated: E,
    deactivated: V,
    beforeDestroy: F,
    beforeUnmount: R,
    destroyed: L,
    unmounted: M,
    render: Q,
    renderTracked: q,
    renderTriggered: ae,
    errorCaptured: N,
    serverPrefetch: $,
    expose: K,
    inheritAttrs: J,
    components: Ee,
    directives: Ye,
    filters: Se,
  } = t;
  if ((a && hl(a, s, null), i))
    for (const ie in i) {
      const G = i[ie];
      k(G) && (s[ie] = G.bind(n));
    }
  if (o) {
    const ie = o.call(n, n);
    re(ie) && (e.data = lt(ie));
  }
  if (((gs = !0), r))
    for (const ie in r) {
      const G = r[ie],
        at = k(G) ? G.bind(n, n) : k(G.get) ? G.get.bind(n, n) : Fe,
        pn = !k(G) && k(G.set) ? G.set.bind(n) : Fe,
        ut = te({ get: at, set: pn });
      Object.defineProperty(s, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => ut.value,
        set: (Re) => (ut.value = Re),
      });
    }
  if (l) for (const ie in l) Cr(l[ie], s, n, ie);
  if (c) {
    const ie = k(c) ? c.call(n) : c;
    Reflect.ownKeys(ie).forEach((G) => {
      yl(G, ie[G]);
    });
  }
  d && ho(d, e, "c");
  function X(ie, G) {
    H(G) ? G.forEach((at) => ie(at.bind(n))) : G && ie(G.bind(n));
  }
  if (
    (X(ol, p),
    X(Ns, h),
    X(rl, w),
    X(il, A),
    X(tl, E),
    X(nl, V),
    X(fl, N),
    X(ul, q),
    X(al, ae),
    X(ll, R),
    X(yr, M),
    X(cl, $),
    H(K))
  )
    if (K.length) {
      const ie = e.exposed || (e.exposed = {});
      K.forEach((G) => {
        Object.defineProperty(ie, G, {
          get: () => n[G],
          set: (at) => (n[G] = at),
        });
      });
    } else e.exposed || (e.exposed = {});
  Q && e.render === Fe && (e.render = Q),
    J != null && (e.inheritAttrs = J),
    Ee && (e.components = Ee),
    Ye && (e.directives = Ye);
}
function hl(e, t, n = Fe) {
  H(e) && (e = ms(e));
  for (const s in e) {
    const o = e[s];
    let r;
    re(o)
      ? "default" in o
        ? (r = Jt(o.from || s, o.default, !0))
        : (r = Jt(o.from || s))
      : (r = Jt(o)),
      le(r)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: (i) => (r.value = i),
          })
        : (t[s] = r);
  }
}
function ho(e, t, n) {
  He(H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Cr(e, t, n, s) {
  const o = s.includes(".") ? _r(n, s) : () => n[s];
  if (pe(e)) {
    const r = t[e];
    k(r) && Oe(o, r);
  } else if (k(e)) Oe(o, e.bind(n));
  else if (re(e))
    if (H(e)) e.forEach((r) => Cr(r, t, n, s));
    else {
      const r = k(e.handler) ? e.handler.bind(n) : t[e.handler];
      k(r) && Oe(o, r, e);
    }
}
function ks(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: o,
      optionsCache: r,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = r.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !o.length && !n && !s
      ? (c = t)
      : ((c = {}), o.length && o.forEach((a) => On(c, a, i, !0)), On(c, t, i)),
    re(t) && r.set(t, c),
    c
  );
}
function On(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && On(e, r, n, !0), o && o.forEach((i) => On(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = gl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const gl = {
  data: go,
  props: mo,
  emits: mo,
  methods: Yt,
  computed: Yt,
  beforeCreate: ye,
  created: ye,
  beforeMount: ye,
  mounted: ye,
  beforeUpdate: ye,
  updated: ye,
  beforeDestroy: ye,
  beforeUnmount: ye,
  destroyed: ye,
  unmounted: ye,
  activated: ye,
  deactivated: ye,
  errorCaptured: ye,
  serverPrefetch: ye,
  components: Yt,
  directives: Yt,
  watch: _l,
  provide: go,
  inject: ml,
};
function go(e, t) {
  return t
    ? e
      ? function () {
          return me(
            k(e) ? e.call(this, this) : e,
            k(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function ml(e, t) {
  return Yt(ms(e), ms(t));
}
function ms(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Yt(e, t) {
  return e ? me(Object.create(null), e, t) : t;
}
function mo(e, t) {
  return e
    ? H(e) && H(t)
      ? [...new Set([...e, ...t])]
      : me(Object.create(null), $n(e), $n(t ?? {}))
    : t;
}
function _l(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = me(Object.create(null), e);
  for (const s in t) n[s] = ye(e[s], t[s]);
  return n;
}
function xr() {
  return {
    app: null,
    config: {
      isNativeTag: zr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let vl = 0;
function bl(e, t) {
  return function (s, o = null) {
    k(s) || (s = me({}, s)), o != null && !re(o) && (o = null);
    const r = xr(),
      i = new WeakSet();
    let l = !1;
    const c = (r.app = {
      _uid: vl++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Yl,
      get config() {
        return r.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          i.has(a) ||
            (a && k(a.install)
              ? (i.add(a), a.install(c, ...d))
              : k(a) && (i.add(a), a(c, ...d))),
          c
        );
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), c;
      },
      component(a, d) {
        return d ? ((r.components[a] = d), c) : r.components[a];
      },
      directive(a, d) {
        return d ? ((r.directives[a] = d), c) : r.directives[a];
      },
      mount(a, d, p) {
        if (!l) {
          const h = O(s, o);
          return (
            (h.appContext = r),
            d && t ? t(h, a) : e(h, a, p),
            (l = !0),
            (c._container = a),
            (a.__vue_app__ = c),
            Kn(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(a, d) {
        return (r.provides[a] = d), c;
      },
      runWithContext(a) {
        on = c;
        try {
          return a();
        } finally {
          on = null;
        }
      },
    });
    return c;
  };
}
let on = null;
function yl(e, t) {
  if (fe) {
    let n = fe.provides;
    const s = fe.parent && fe.parent.provides;
    s === n && (n = fe.provides = Object.create(s)), (n[e] = t);
  }
}
function Jt(e, t, n = !1) {
  const s = fe || ge;
  if (s || on) {
    const o = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : on._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && k(t) ? t.call(s && s.proxy) : t;
  }
}
function wl() {
  return !!(fe || ge || on);
}
function Cl(e, t, n, s = !1) {
  const o = {},
    r = {};
  Sn(r, qn, 1), (e.propsDefaults = Object.create(null)), Ir(e, t, o, r);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = s ? o : Ai(o)) : e.type.props ? (e.props = o) : (e.props = r),
    (e.attrs = r);
}
function xl(e, t, n, s) {
  const {
      props: o,
      attrs: r,
      vnode: { patchFlag: i },
    } = e,
    l = z(o),
    [c] = e.propsOptions;
  let a = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        let h = d[p];
        if (Dn(e.emitsOptions, h)) continue;
        const w = t[h];
        if (c)
          if (Y(r, h)) w !== r[h] && ((r[h] = w), (a = !0));
          else {
            const A = Ue(h);
            o[A] = _s(c, l, A, w, e, !1);
          }
        else w !== r[h] && ((r[h] = w), (a = !0));
      }
    }
  } else {
    Ir(e, t, o, r) && (a = !0);
    let d;
    for (const p in l)
      (!t || (!Y(t, p) && ((d = Ft(p)) === p || !Y(t, d)))) &&
        (c
          ? n &&
            (n[p] !== void 0 || n[d] !== void 0) &&
            (o[p] = _s(c, l, p, void 0, e, !0))
          : delete o[p]);
    if (r !== l) for (const p in r) (!t || !Y(t, p)) && (delete r[p], (a = !0));
  }
  a && Je(e, "set", "$attrs");
}
function Ir(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (xn(c)) continue;
      const a = t[c];
      let d;
      o && Y(o, (d = Ue(c)))
        ? !r || !r.includes(d)
          ? (n[d] = a)
          : ((l || (l = {}))[d] = a)
        : Dn(e.emitsOptions, c) ||
          ((!(c in s) || a !== s[c]) && ((s[c] = a), (i = !0)));
    }
  if (r) {
    const c = z(n),
      a = l || se;
    for (let d = 0; d < r.length; d++) {
      const p = r[d];
      n[p] = _s(o, c, p, a[p], e, !Y(a, p));
    }
  }
  return i;
}
function _s(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = Y(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && k(c)) {
        const { propsDefaults: a } = o;
        n in a ? (s = a[n]) : (Pt(o), (s = a[n] = c.call(null, t)), yt());
      } else s = c;
    }
    i[0] &&
      (r && !l ? (s = !1) : i[1] && (s === "" || s === Ft(n)) && (s = !0));
  }
  return s;
}
function Er(e, t, n = !1) {
  const s = t.propsCache,
    o = s.get(e);
  if (o) return o;
  const r = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!k(e)) {
    const d = (p) => {
      c = !0;
      const [h, w] = Er(p, t, !0);
      me(i, h), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!r && !c) return re(e) && s.set(e, Vt), Vt;
  if (H(r))
    for (let d = 0; d < r.length; d++) {
      const p = Ue(r[d]);
      _o(p) && (i[p] = se);
    }
  else if (r)
    for (const d in r) {
      const p = Ue(d);
      if (_o(p)) {
        const h = r[d],
          w = (i[p] = H(h) || k(h) ? { type: h } : me({}, h));
        if (w) {
          const A = yo(Boolean, w.type),
            E = yo(String, w.type);
          (w[0] = A > -1),
            (w[1] = E < 0 || A < E),
            (A > -1 || Y(w, "default")) && l.push(p);
        }
      }
    }
  const a = [i, l];
  return re(e) && s.set(e, a), a;
}
function _o(e) {
  return e[0] !== "$";
}
function vo(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function bo(e, t) {
  return vo(e) === vo(t);
}
function yo(e, t) {
  return H(t) ? t.findIndex((n) => bo(n, e)) : k(t) && bo(t, e) ? 0 : -1;
}
const Sr = (e) => e[0] === "_" || e === "$stable",
  js = (e) => (H(e) ? e.map(ke) : [ke(e)]),
  Il = (e, t, n) => {
    if (t._n) return t;
    const s = oe((...o) => js(t(...o)), n);
    return (s._c = !1), s;
  },
  Br = (e, t, n) => {
    const s = e._ctx;
    for (const o in e) {
      if (Sr(o)) continue;
      const r = e[o];
      if (k(r)) t[o] = Il(o, r, s);
      else if (r != null) {
        const i = js(r);
        t[o] = () => i;
      }
    }
  },
  Ar = (e, t) => {
    const n = js(t);
    e.slots.default = () => n;
  },
  El = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = z(t)), Sn(t, "_", n)) : Br(t, (e.slots = {}));
    } else (e.slots = {}), t && Ar(e, t);
    Sn(e.slots, qn, 1);
  },
  Sl = (e, t, n) => {
    const { vnode: s, slots: o } = e;
    let r = !0,
      i = se;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (r = !1)
          : (me(o, t), !n && l === 1 && delete o._)
        : ((r = !t.$stable), Br(t, o)),
        (i = t);
    } else t && (Ar(e, t), (i = { default: 1 }));
    if (r) for (const l in o) !Sr(l) && i[l] == null && delete o[l];
  };
function vs(e, t, n, s, o = !1) {
  if (H(e)) {
    e.forEach((h, w) => vs(h, t && (H(t) ? t[w] : t), n, s, o));
    return;
  }
  if (zt(s) && !o) return;
  const r = s.shapeFlag & 4 ? Kn(s.component) || s.component.proxy : s.el,
    i = o ? null : r,
    { i: l, r: c } = e,
    a = t && t.r,
    d = l.refs === se ? (l.refs = {}) : l.refs,
    p = l.setupState;
  if (
    (a != null &&
      a !== c &&
      (pe(a)
        ? ((d[a] = null), Y(p, a) && (p[a] = null))
        : le(a) && (a.value = null)),
    k(c))
  )
    rt(c, l, 12, [i, d]);
  else {
    const h = pe(c),
      w = le(c);
    if (h || w) {
      const A = () => {
        if (e.f) {
          const E = h ? (Y(p, c) ? p[c] : d[c]) : c.value;
          o
            ? H(E) && Bs(E, r)
            : H(E)
            ? E.includes(r) || E.push(r)
            : h
            ? ((d[c] = [r]), Y(p, c) && (p[c] = d[c]))
            : ((c.value = [r]), e.k && (d[e.k] = c.value));
        } else
          h
            ? ((d[c] = i), Y(p, c) && (p[c] = i))
            : w && ((c.value = i), e.k && (d[e.k] = i));
      };
      i ? ((A.id = -1), Ce(A, n)) : A();
    }
  }
}
const Ce = Qi;
function Bl(e) {
  return Al(e);
}
function Al(e, t) {
  const n = as();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: o,
      patchProp: r,
      createElement: i,
      createText: l,
      createComment: c,
      setText: a,
      setElementText: d,
      parentNode: p,
      nextSibling: h,
      setScopeId: w = Fe,
      insertStaticContent: A,
    } = e,
    E = (
      u,
      f,
      g,
      m = null,
      _ = null,
      y = null,
      x = !1,
      b = null,
      C = !!f.dynamicChildren
    ) => {
      if (u === f) return;
      u && !Ut(u, f) && ((m = hn(u)), Re(u, _, y, !0), (u = null)),
        f.patchFlag === -2 && ((C = !1), (f.dynamicChildren = null));
      const { type: v, ref: W, shapeFlag: B } = f;
      switch (v) {
        case Un:
          V(u, f, g, m);
          break;
        case ct:
          F(u, f, g, m);
          break;
        case ss:
          u == null && R(f, g, m, x);
          break;
        case xe:
          Ee(u, f, g, m, _, y, x, b, C);
          break;
        default:
          B & 1
            ? Q(u, f, g, m, _, y, x, b, C)
            : B & 6
            ? Ye(u, f, g, m, _, y, x, b, C)
            : (B & 64 || B & 128) && v.process(u, f, g, m, _, y, x, b, C, It);
      }
      W != null && _ && vs(W, u && u.ref, y, f || u, !f);
    },
    V = (u, f, g, m) => {
      if (u == null) s((f.el = l(f.children)), g, m);
      else {
        const _ = (f.el = u.el);
        f.children !== u.children && a(_, f.children);
      }
    },
    F = (u, f, g, m) => {
      u == null ? s((f.el = c(f.children || "")), g, m) : (f.el = u.el);
    },
    R = (u, f, g, m) => {
      [u.el, u.anchor] = A(u.children, f, g, m, u.el, u.anchor);
    },
    L = ({ el: u, anchor: f }, g, m) => {
      let _;
      for (; u && u !== f; ) (_ = h(u)), s(u, g, m), (u = _);
      s(f, g, m);
    },
    M = ({ el: u, anchor: f }) => {
      let g;
      for (; u && u !== f; ) (g = h(u)), o(u), (u = g);
      o(f);
    },
    Q = (u, f, g, m, _, y, x, b, C) => {
      (x = x || f.type === "svg"),
        u == null ? q(f, g, m, _, y, x, b, C) : $(u, f, _, y, x, b, C);
    },
    q = (u, f, g, m, _, y, x, b) => {
      let C, v;
      const { type: W, props: B, shapeFlag: P, transition: D, dirs: j } = u;
      if (
        ((C = u.el = i(u.type, y, B && B.is, B)),
        P & 8
          ? d(C, u.children)
          : P & 16 &&
            N(u.children, C, null, m, _, y && W !== "foreignObject", x, b),
        j && ft(u, null, m, "created"),
        ae(C, u, u.scopeId, x, m),
        B)
      ) {
        for (const Z in B)
          Z !== "value" &&
            !xn(Z) &&
            r(C, Z, null, B[Z], y, u.children, m, _, ze);
        "value" in B && r(C, "value", null, B.value),
          (v = B.onVnodeBeforeMount) && De(v, m, u);
      }
      j && ft(u, null, m, "beforeMount");
      const ee = Vl(_, D);
      ee && D.beforeEnter(C),
        s(C, f, g),
        ((v = B && B.onVnodeMounted) || ee || j) &&
          Ce(() => {
            v && De(v, m, u), ee && D.enter(C), j && ft(u, null, m, "mounted");
          }, _);
    },
    ae = (u, f, g, m, _) => {
      if ((g && w(u, g), m)) for (let y = 0; y < m.length; y++) w(u, m[y]);
      if (_) {
        let y = _.subTree;
        if (f === y) {
          const x = _.vnode;
          ae(u, x, x.scopeId, x.slotScopeIds, _.parent);
        }
      }
    },
    N = (u, f, g, m, _, y, x, b, C = 0) => {
      for (let v = C; v < u.length; v++) {
        const W = (u[v] = b ? tt(u[v]) : ke(u[v]));
        E(null, W, f, g, m, _, y, x, b);
      }
    },
    $ = (u, f, g, m, _, y, x) => {
      const b = (f.el = u.el);
      let { patchFlag: C, dynamicChildren: v, dirs: W } = f;
      C |= u.patchFlag & 16;
      const B = u.props || se,
        P = f.props || se;
      let D;
      g && dt(g, !1),
        (D = P.onVnodeBeforeUpdate) && De(D, g, f, u),
        W && ft(f, u, g, "beforeUpdate"),
        g && dt(g, !0);
      const j = _ && f.type !== "foreignObject";
      if (
        (v
          ? K(u.dynamicChildren, v, b, g, m, j, y)
          : x || G(u, f, b, null, g, m, j, y, !1),
        C > 0)
      ) {
        if (C & 16) J(b, f, B, P, g, m, _);
        else if (
          (C & 2 && B.class !== P.class && r(b, "class", null, P.class, _),
          C & 4 && r(b, "style", B.style, P.style, _),
          C & 8)
        ) {
          const ee = f.dynamicProps;
          for (let Z = 0; Z < ee.length; Z++) {
            const ue = ee[Z],
              Me = B[ue],
              Et = P[ue];
            (Et !== Me || ue === "value") &&
              r(b, ue, Me, Et, _, u.children, g, m, ze);
          }
        }
        C & 1 && u.children !== f.children && d(b, f.children);
      } else !x && v == null && J(b, f, B, P, g, m, _);
      ((D = P.onVnodeUpdated) || W) &&
        Ce(() => {
          D && De(D, g, f, u), W && ft(f, u, g, "updated");
        }, m);
    },
    K = (u, f, g, m, _, y, x) => {
      for (let b = 0; b < f.length; b++) {
        const C = u[b],
          v = f[b],
          W =
            C.el && (C.type === xe || !Ut(C, v) || C.shapeFlag & 70)
              ? p(C.el)
              : g;
        E(C, v, W, null, m, _, y, x, !0);
      }
    },
    J = (u, f, g, m, _, y, x) => {
      if (g !== m) {
        if (g !== se)
          for (const b in g)
            !xn(b) && !(b in m) && r(u, b, g[b], null, x, f.children, _, y, ze);
        for (const b in m) {
          if (xn(b)) continue;
          const C = m[b],
            v = g[b];
          C !== v && b !== "value" && r(u, b, v, C, x, f.children, _, y, ze);
        }
        "value" in m && r(u, "value", g.value, m.value);
      }
    },
    Ee = (u, f, g, m, _, y, x, b, C) => {
      const v = (f.el = u ? u.el : l("")),
        W = (f.anchor = u ? u.anchor : l(""));
      let { patchFlag: B, dynamicChildren: P, slotScopeIds: D } = f;
      D && (b = b ? b.concat(D) : D),
        u == null
          ? (s(v, g, m), s(W, g, m), N(f.children, g, W, _, y, x, b, C))
          : B > 0 && B & 64 && P && u.dynamicChildren
          ? (K(u.dynamicChildren, P, g, _, y, x, b),
            (f.key != null || (_ && f === _.subTree)) && Vr(u, f, !0))
          : G(u, f, g, W, _, y, x, b, C);
    },
    Ye = (u, f, g, m, _, y, x, b, C) => {
      (f.slotScopeIds = b),
        u == null
          ? f.shapeFlag & 512
            ? _.ctx.activate(f, g, m, x, C)
            : Se(f, g, m, _, y, x, C)
          : Te(u, f, C);
    },
    Se = (u, f, g, m, _, y, x) => {
      const b = (u.component = Hl(u, m, _));
      if ((vr(u) && (b.ctx.renderer = It), Rl(b), b.asyncDep)) {
        if ((_ && _.registerDep(b, X), !u.el)) {
          const C = (b.subTree = O(ct));
          F(null, C, f, g);
        }
        return;
      }
      X(b, u, f, g, _, y, x);
    },
    Te = (u, f, g) => {
      const m = (f.component = u.component);
      if (qi(u, f, g))
        if (m.asyncDep && !m.asyncResolved) {
          ie(m, f, g);
          return;
        } else (m.next = f), Ri(m.update), m.update();
      else (f.el = u.el), (m.vnode = f);
    },
    X = (u, f, g, m, _, y, x) => {
      const b = () => {
          if (u.isMounted) {
            let { next: W, bu: B, u: P, parent: D, vnode: j } = u,
              ee = W,
              Z;
            dt(u, !1),
              W ? ((W.el = j.el), ie(u, W, x)) : (W = j),
              B && In(B),
              (Z = W.props && W.props.onVnodeBeforeUpdate) && De(Z, D, W, j),
              dt(u, !0);
            const ue = ts(u),
              Me = u.subTree;
            (u.subTree = ue),
              E(Me, ue, p(Me.el), hn(Me), u, _, y),
              (W.el = ue.el),
              ee === null && Ki(u, ue.el),
              P && Ce(P, _),
              (Z = W.props && W.props.onVnodeUpdated) &&
                Ce(() => De(Z, D, W, j), _);
          } else {
            let W;
            const { el: B, props: P } = f,
              { bm: D, m: j, parent: ee } = u,
              Z = zt(f);
            if (
              (dt(u, !1),
              D && In(D),
              !Z && (W = P && P.onVnodeBeforeMount) && De(W, ee, f),
              dt(u, !0),
              B && Gn)
            ) {
              const ue = () => {
                (u.subTree = ts(u)), Gn(B, u.subTree, u, _, null);
              };
              Z
                ? f.type.__asyncLoader().then(() => !u.isUnmounted && ue())
                : ue();
            } else {
              const ue = (u.subTree = ts(u));
              E(null, ue, g, m, u, _, y), (f.el = ue.el);
            }
            if ((j && Ce(j, _), !Z && (W = P && P.onVnodeMounted))) {
              const ue = f;
              Ce(() => De(W, ee, ue), _);
            }
            (f.shapeFlag & 256 ||
              (ee && zt(ee.vnode) && ee.vnode.shapeFlag & 256)) &&
              u.a &&
              Ce(u.a, _),
              (u.isMounted = !0),
              (f = g = m = null);
          }
        },
        C = (u.effect = new Os(b, () => Hs(v), u.scope)),
        v = (u.update = () => C.run());
      (v.id = u.uid), dt(u, !0), v();
    },
    ie = (u, f, g) => {
      f.component = u;
      const m = u.vnode.props;
      (u.vnode = f),
        (u.next = null),
        xl(u, f.props, m, g),
        Sl(u, f.children, g),
        Ht(),
        uo(),
        Rt();
    },
    G = (u, f, g, m, _, y, x, b, C = !1) => {
      const v = u && u.children,
        W = u ? u.shapeFlag : 0,
        B = f.children,
        { patchFlag: P, shapeFlag: D } = f;
      if (P > 0) {
        if (P & 128) {
          pn(v, B, g, m, _, y, x, b, C);
          return;
        } else if (P & 256) {
          at(v, B, g, m, _, y, x, b, C);
          return;
        }
      }
      D & 8
        ? (W & 16 && ze(v, _, y), B !== v && d(g, B))
        : W & 16
        ? D & 16
          ? pn(v, B, g, m, _, y, x, b, C)
          : ze(v, _, y, !0)
        : (W & 8 && d(g, ""), D & 16 && N(B, g, m, _, y, x, b, C));
    },
    at = (u, f, g, m, _, y, x, b, C) => {
      (u = u || Vt), (f = f || Vt);
      const v = u.length,
        W = f.length,
        B = Math.min(v, W);
      let P;
      for (P = 0; P < B; P++) {
        const D = (f[P] = C ? tt(f[P]) : ke(f[P]));
        E(u[P], D, g, null, _, y, x, b, C);
      }
      v > W ? ze(u, _, y, !0, !1, B) : N(f, g, m, _, y, x, b, C, B);
    },
    pn = (u, f, g, m, _, y, x, b, C) => {
      let v = 0;
      const W = f.length;
      let B = u.length - 1,
        P = W - 1;
      for (; v <= B && v <= P; ) {
        const D = u[v],
          j = (f[v] = C ? tt(f[v]) : ke(f[v]));
        if (Ut(D, j)) E(D, j, g, null, _, y, x, b, C);
        else break;
        v++;
      }
      for (; v <= B && v <= P; ) {
        const D = u[B],
          j = (f[P] = C ? tt(f[P]) : ke(f[P]));
        if (Ut(D, j)) E(D, j, g, null, _, y, x, b, C);
        else break;
        B--, P--;
      }
      if (v > B) {
        if (v <= P) {
          const D = P + 1,
            j = D < W ? f[D].el : m;
          for (; v <= P; )
            E(null, (f[v] = C ? tt(f[v]) : ke(f[v])), g, j, _, y, x, b, C), v++;
        }
      } else if (v > P) for (; v <= B; ) Re(u[v], _, y, !0), v++;
      else {
        const D = v,
          j = v,
          ee = new Map();
        for (v = j; v <= P; v++) {
          const Be = (f[v] = C ? tt(f[v]) : ke(f[v]));
          Be.key != null && ee.set(Be.key, v);
        }
        let Z,
          ue = 0;
        const Me = P - j + 1;
        let Et = !1,
          Gs = 0;
        const jt = new Array(Me);
        for (v = 0; v < Me; v++) jt[v] = 0;
        for (v = D; v <= B; v++) {
          const Be = u[v];
          if (ue >= Me) {
            Re(Be, _, y, !0);
            continue;
          }
          let Ne;
          if (Be.key != null) Ne = ee.get(Be.key);
          else
            for (Z = j; Z <= P; Z++)
              if (jt[Z - j] === 0 && Ut(Be, f[Z])) {
                Ne = Z;
                break;
              }
          Ne === void 0
            ? Re(Be, _, y, !0)
            : ((jt[Ne - j] = v + 1),
              Ne >= Gs ? (Gs = Ne) : (Et = !0),
              E(Be, f[Ne], g, null, _, y, x, b, C),
              ue++);
        }
        const eo = Et ? $l(jt) : Vt;
        for (Z = eo.length - 1, v = Me - 1; v >= 0; v--) {
          const Be = j + v,
            Ne = f[Be],
            to = Be + 1 < W ? f[Be + 1].el : m;
          jt[v] === 0
            ? E(null, Ne, g, to, _, y, x, b, C)
            : Et && (Z < 0 || v !== eo[Z] ? ut(Ne, g, to, 2) : Z--);
        }
      }
    },
    ut = (u, f, g, m, _ = null) => {
      const { el: y, type: x, transition: b, children: C, shapeFlag: v } = u;
      if (v & 6) {
        ut(u.component.subTree, f, g, m);
        return;
      }
      if (v & 128) {
        u.suspense.move(f, g, m);
        return;
      }
      if (v & 64) {
        x.move(u, f, g, It);
        return;
      }
      if (x === xe) {
        s(y, f, g);
        for (let B = 0; B < C.length; B++) ut(C[B], f, g, m);
        s(u.anchor, f, g);
        return;
      }
      if (x === ss) {
        L(u, f, g);
        return;
      }
      if (m !== 2 && v & 1 && b)
        if (m === 0) b.beforeEnter(y), s(y, f, g), Ce(() => b.enter(y), _);
        else {
          const { leave: B, delayLeave: P, afterLeave: D } = b,
            j = () => s(y, f, g),
            ee = () => {
              B(y, () => {
                j(), D && D();
              });
            };
          P ? P(y, j, ee) : ee();
        }
      else s(y, f, g);
    },
    Re = (u, f, g, m = !1, _ = !1) => {
      const {
        type: y,
        props: x,
        ref: b,
        children: C,
        dynamicChildren: v,
        shapeFlag: W,
        patchFlag: B,
        dirs: P,
      } = u;
      if ((b != null && vs(b, null, g, u, !0), W & 256)) {
        f.ctx.deactivate(u);
        return;
      }
      const D = W & 1 && P,
        j = !zt(u);
      let ee;
      if ((j && (ee = x && x.onVnodeBeforeUnmount) && De(ee, f, u), W & 6))
        Yr(u.component, g, m);
      else {
        if (W & 128) {
          u.suspense.unmount(g, m);
          return;
        }
        D && ft(u, null, f, "beforeUnmount"),
          W & 64
            ? u.type.remove(u, f, g, _, It, m)
            : v && (y !== xe || (B > 0 && B & 64))
            ? ze(v, f, g, !1, !0)
            : ((y === xe && B & 384) || (!_ && W & 16)) && ze(C, f, g),
          m && Zs(u);
      }
      ((j && (ee = x && x.onVnodeUnmounted)) || D) &&
        Ce(() => {
          ee && De(ee, f, u), D && ft(u, null, f, "unmounted");
        }, g);
    },
    Zs = (u) => {
      const { type: f, el: g, anchor: m, transition: _ } = u;
      if (f === xe) {
        Kr(g, m);
        return;
      }
      if (f === ss) {
        M(u);
        return;
      }
      const y = () => {
        o(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (u.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: x, delayLeave: b } = _,
          C = () => x(g, y);
        b ? b(u.el, y, C) : C();
      } else y();
    },
    Kr = (u, f) => {
      let g;
      for (; u !== f; ) (g = h(u)), o(u), (u = g);
      o(f);
    },
    Yr = (u, f, g) => {
      const { bum: m, scope: _, update: y, subTree: x, um: b } = u;
      m && In(m),
        _.stop(),
        y && ((y.active = !1), Re(x, u, f, g)),
        b && Ce(b, f),
        Ce(() => {
          u.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    ze = (u, f, g, m = !1, _ = !1, y = 0) => {
      for (let x = y; x < u.length; x++) Re(u[x], f, g, m, _);
    },
    hn = (u) =>
      u.shapeFlag & 6
        ? hn(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : h(u.anchor || u.el),
    Qs = (u, f, g) => {
      u == null
        ? f._vnode && Re(f._vnode, null, null, !0)
        : E(f._vnode || null, u, f, null, null, null, g),
        uo(),
        hr(),
        (f._vnode = u);
    },
    It = {
      p: E,
      um: Re,
      m: ut,
      r: Zs,
      mt: Se,
      mc: N,
      pc: G,
      pbc: K,
      n: hn,
      o: e,
    };
  let Qn, Gn;
  return (
    t && ([Qn, Gn] = t(It)), { render: Qs, hydrate: Qn, createApp: bl(Qs, Qn) }
  );
}
function dt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Vl(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Vr(e, t, n = !1) {
  const s = e.children,
    o = t.children;
  if (H(s) && H(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[r] = tt(o[r])), (l.el = i.el)),
        n || Vr(i, l)),
        l.type === Un && (l.el = i.el);
    }
}
function $l(e) {
  const t = e.slice(),
    n = [0];
  let s, o, r, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((o = n[n.length - 1]), e[o] < a)) {
        (t[s] = o), n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        (l = (r + i) >> 1), e[n[l]] < a ? (r = l + 1) : (i = l);
      a < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s));
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; ) (n[r] = i), (i = t[i]);
  return n;
}
const Ol = (e) => e.__isTeleport,
  xe = Symbol.for("v-fgt"),
  Un = Symbol.for("v-txt"),
  ct = Symbol.for("v-cmt"),
  ss = Symbol.for("v-stc"),
  Zt = [];
let Le = null;
function U(e = !1) {
  Zt.push((Le = e ? null : []));
}
function Tl() {
  Zt.pop(), (Le = Zt[Zt.length - 1] || null);
}
let rn = 1;
function wo(e) {
  rn += e;
}
function $r(e) {
  return (
    (e.dynamicChildren = rn > 0 ? Le || Vt : null),
    Tl(),
    rn > 0 && Le && Le.push(e),
    e
  );
}
function ne(e, t, n, s, o, r) {
  return $r(S(e, t, n, s, o, r, !0));
}
function qe(e, t, n, s, o) {
  return $r(O(e, t, n, s, o, !0));
}
function Or(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ut(e, t) {
  return e.type === t.type && e.key === t.key;
}
const qn = "__vInternal",
  Tr = ({ key: e }) => e ?? null,
  En = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? pe(e) || le(e) || k(e)
        ? { i: ge, r: e, k: t, f: !!n }
        : e
      : null
  );
function S(
  e,
  t = null,
  n = null,
  s = 0,
  o = null,
  r = e === xe ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Tr(t),
    ref: t && En(t),
    scopeId: kn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ge,
  };
  return (
    l
      ? (Us(c, n), r & 128 && e.normalize(c))
      : n && (c.shapeFlag |= pe(n) ? 8 : 16),
    rn > 0 &&
      !i &&
      Le &&
      (c.patchFlag > 0 || r & 6) &&
      c.patchFlag !== 32 &&
      Le.push(c),
    c
  );
}
const O = Ml;
function Ml(e, t = null, n = null, s = 0, o = null, r = !1) {
  if (((!e || e === Xi) && (e = ct), Or(e))) {
    const l = Mt(e, t, !0);
    return (
      n && Us(l, n),
      rn > 0 &&
        !r &&
        Le &&
        (l.shapeFlag & 6 ? (Le[Le.indexOf(e)] = l) : Le.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Ul(e) && (e = e.__vccOpts), t)) {
    t = Wl(t);
    let { class: l, style: c } = t;
    l && !pe(l) && (t.class = Ve(l)),
      re(c) && (cr(c) && !H(c) && (c = me({}, c)), (t.style = nt(c)));
  }
  const i = pe(e) ? 1 : Zi(e) ? 128 : Ol(e) ? 64 : re(e) ? 4 : k(e) ? 2 : 0;
  return S(e, t, n, s, o, i, r, !0);
}
function Wl(e) {
  return e ? (cr(e) || qn in e ? me({}, e) : e) : null;
}
function Mt(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: i } = e,
    l = t ? Pl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Tr(l),
    ref:
      t && t.ref ? (n && o ? (H(o) ? o.concat(En(t)) : [o, En(t)]) : En(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== xe ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Mt(e.ssContent),
    ssFallback: e.ssFallback && Mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function ve(e = " ", t = 0) {
  return O(Un, null, e, t);
}
function Wt(e = "", t = !1) {
  return t ? (U(), qe(ct, null, e)) : O(ct, null, e);
}
function ke(e) {
  return e == null || typeof e == "boolean"
    ? O(ct)
    : H(e)
    ? O(xe, null, e.slice())
    : typeof e == "object"
    ? tt(e)
    : O(Un, null, String(e));
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Mt(e);
}
function Us(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (H(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Us(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(qn in t)
        ? (t._ctx = ge)
        : o === 3 &&
          ge &&
          (ge.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    k(t)
      ? ((t = { default: t, _ctx: ge }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [ve(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Pl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Ve([t.class, s.class]));
      else if (o === "style") t.style = nt([t.style, s.style]);
      else if (Tn(o)) {
        const r = t[o],
          i = s[o];
        i &&
          r !== i &&
          !(H(r) && r.includes(i)) &&
          (t[o] = r ? [].concat(r, i) : i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function De(e, t, n, s = null) {
  He(e, t, 7, [n, s]);
}
const Ll = xr();
let Fl = 0;
function Hl(e, t, n) {
  const s = e.type,
    o = (t ? t.appContext : e.appContext) || Ll,
    r = {
      uid: Fl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Xo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Er(s, o),
      emitsOptions: mr(s, o),
      emit: null,
      emitted: null,
      propsDefaults: se,
      inheritAttrs: s.inheritAttrs,
      ctx: se,
      data: se,
      props: se,
      attrs: se,
      slots: se,
      refs: se,
      setupState: se,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = ki.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let fe = null;
const qs = () => fe || ge;
let Ks,
  St,
  Co = "__VUE_INSTANCE_SETTERS__";
(St = as()[Co]) || (St = as()[Co] = []),
  St.push((e) => (fe = e)),
  (Ks = (e) => {
    St.length > 1 ? St.forEach((t) => t(e)) : St[0](e);
  });
const Pt = (e) => {
    Ks(e), e.scope.on();
  },
  yt = () => {
    fe && fe.scope.off(), Ks(null);
  };
function Mr(e) {
  return e.vnode.shapeFlag & 4;
}
let ln = !1;
function Rl(e, t = !1) {
  ln = t;
  const { props: n, children: s } = e.vnode,
    o = Mr(e);
  Cl(e, n, o, t), El(e, s);
  const r = o ? Nl(e, t) : void 0;
  return (ln = !1), r;
}
function Nl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Rn(new Proxy(e.ctx, dl)));
  const { setup: s } = n;
  if (s) {
    const o = (e.setupContext = s.length > 1 ? kl(e) : null);
    Pt(e), Ht();
    const r = rt(s, e, 0, [e.props, o]);
    if ((Rt(), yt(), Uo(r))) {
      if ((r.then(yt, yt), t))
        return r
          .then((i) => {
            xo(e, i, t);
          })
          .catch((i) => {
            Nn(i, e, 0);
          });
      e.asyncDep = r;
    } else xo(e, r, t);
  } else Wr(e, t);
}
function xo(e, t, n) {
  k(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : re(t) && (e.setupState = fr(t)),
    Wr(e, n);
}
let Io;
function Wr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Io && !s.render) {
      const o = s.template || ks(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          a = me(me({ isCustomElement: r, delimiters: l }, i), c);
        s.render = Io(o, a);
      }
    }
    e.render = s.render || Fe;
  }
  {
    Pt(e), Ht();
    try {
      pl(e);
    } finally {
      Rt(), yt();
    }
  }
}
function Dl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ie(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function kl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Dl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Kn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(fr(Rn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Xt) return Xt[n](e);
        },
        has(t, n) {
          return n in t || n in Xt;
        },
      }))
    );
}
function jl(e, t = !0) {
  return k(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ul(e) {
  return k(e) && "__vccOpts" in e;
}
const te = (e, t) => Li(e, t, ln),
  ql = Symbol.for("v-scx"),
  Kl = () => Jt(ql),
  Yl = "3.3.8",
  zl = "http://www.w3.org/2000/svg",
  mt = typeof document < "u" ? document : null,
  Eo = mt && mt.createElement("template"),
  Xl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const o = t
        ? mt.createElementNS(zl, e)
        : mt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          o.setAttribute("multiple", s.multiple),
        o
      );
    },
    createText: (e) => mt.createTextNode(e),
    createComment: (e) => mt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => mt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, o, r) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === r || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === r || !(o = o.nextSibling));

        );
      else {
        Eo.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Eo.content;
        if (s) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Jl = Symbol("_vtc");
function Zl(e, t, n) {
  const s = e[Jl];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
const Ql = Symbol("_vod");
function Gl(e, t, n) {
  const s = e.style,
    o = pe(n);
  if (n && !o) {
    if (t && !pe(t)) for (const r in t) n[r] == null && bs(s, r, "");
    for (const r in n) bs(s, r, n[r]);
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      Ql in e && (s.display = r);
  }
}
const So = /\s*!important$/;
function bs(e, t, n) {
  if (H(n)) n.forEach((s) => bs(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = ec(e, t);
    So.test(n)
      ? e.setProperty(Ft(s), n.replace(So, ""), "important")
      : (e[s] = n);
  }
}
const Bo = ["Webkit", "Moz", "ms"],
  os = {};
function ec(e, t) {
  const n = os[t];
  if (n) return n;
  let s = Ue(t);
  if (s !== "filter" && s in e) return (os[t] = s);
  s = Ln(s);
  for (let o = 0; o < Bo.length; o++) {
    const r = Bo[o] + s;
    if (r in e) return (os[t] = r);
  }
  return t;
}
const Ao = "http://www.w3.org/1999/xlink";
function tc(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ao, t.slice(6, t.length))
      : e.setAttributeNS(Ao, t, n);
  else {
    const r = ri(t);
    n == null || (r && !Yo(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? "" : n);
  }
}
function nc(e, t, n, s, o, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, o, r), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const a = l === "OPTION" ? e.getAttribute("value") : e.value,
      d = n ?? "";
    a !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = Yo(n))
      : n == null && a === "string"
      ? ((n = ""), (c = !0))
      : a === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function At(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function sc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Vo = Symbol("_vei");
function oc(e, t, n, s, o = null) {
  const r = e[Vo] || (e[Vo] = {}),
    i = r[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = rc(t);
    if (s) {
      const a = (r[t] = cc(s, o));
      At(e, l, a, c);
    } else i && (sc(e, l, i, c), (r[t] = void 0));
  }
}
const $o = /(?:Once|Passive|Capture)$/;
function rc(e) {
  let t;
  if ($o.test(e)) {
    t = {};
    let s;
    for (; (s = e.match($o)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Ft(e.slice(2)), t];
}
let rs = 0;
const ic = Promise.resolve(),
  lc = () => rs || (ic.then(() => (rs = 0)), (rs = Date.now()));
function cc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    He(ac(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = lc()), n;
}
function ac(e, t) {
  if (H(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (o) => !o._stopped && s && s(o))
    );
  } else return t;
}
const Oo = /^on[a-z]/,
  uc = (e, t, n, s, o = !1, r, i, l, c) => {
    t === "class"
      ? Zl(e, s, o)
      : t === "style"
      ? Gl(e, n, s)
      : Tn(t)
      ? Ss(t) || oc(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : fc(e, t, s, o)
        )
      ? nc(e, t, s, r, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        tc(e, t, s, o));
  };
function fc(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Oo.test(t) && k(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Oo.test(t) && pe(n))
    ? !1
    : t in e;
}
const To = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return H(t) ? (n) => In(t, n) : t;
};
function dc(e) {
  e.target.composing = !0;
}
function Mo(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const is = Symbol("_assign"),
  Yn = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
      e[is] = To(o);
      const r = s || (o.props && o.props.type === "number");
      At(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), r && (l = cs(l)), e[is](l);
      }),
        n &&
          At(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (At(e, "compositionstart", dc),
          At(e, "compositionend", Mo),
          At(e, "change", Mo));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: o } },
      r
    ) {
      if (
        ((e[is] = To(r)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (s && e.value.trim() === t) ||
              ((o || e.type === "number") && cs(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  pc = me({ patchProp: uc }, Xl);
let Wo;
function hc() {
  return Wo || (Wo = Bl(pc));
}
const gc = (...e) => {
  const t = hc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const o = mc(s);
      if (!o) return;
      const r = t._component;
      !k(r) && !r.render && !r.template && (r.template = o.innerHTML),
        (o.innerHTML = "");
      const i = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function mc(e) {
  return pe(e) ? document.querySelector(e) : e;
}
var _c = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let Pr;
const zn = (e) => (Pr = e),
  Lr = Symbol();
function ys(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var Qt;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(Qt || (Qt = {}));
function vc() {
  const e = Jo(!0),
    t = e.run(() => T({}));
  let n = [],
    s = [];
  const o = Rn({
    install(r) {
      zn(o),
        (o._a = r),
        r.provide(Lr, o),
        (r.config.globalProperties.$pinia = o),
        s.forEach((i) => n.push(i)),
        (s = []);
    },
    use(r) {
      return !this._a && !_c ? s.push(r) : n.push(r), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return o;
}
const Fr = () => {};
function Po(e, t, n, s = Fr) {
  e.push(t);
  const o = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !n && Vs() && Zo(o), o;
}
function Bt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const bc = (e) => e();
function ws(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, s) => e.set(s, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n],
      o = e[n];
    ys(o) && ys(s) && e.hasOwnProperty(n) && !le(s) && !ot(s)
      ? (e[n] = ws(o, s))
      : (e[n] = s);
  }
  return e;
}
const yc = Symbol();
function wc(e) {
  return !ys(e) || !e.hasOwnProperty(yc);
}
const { assign: et } = Object;
function Cc(e) {
  return !!(le(e) && e.effect);
}
function xc(e, t, n, s) {
  const { state: o, actions: r, getters: i } = t,
    l = n.state.value[e];
  let c;
  function a() {
    l || (n.state.value[e] = o ? o() : {});
    const d = Ti(n.state.value[e]);
    return et(
      d,
      r,
      Object.keys(i || {}).reduce(
        (p, h) => (
          (p[h] = Rn(
            te(() => {
              zn(n);
              const w = n._s.get(e);
              return i[h].call(w, w);
            })
          )),
          p
        ),
        {}
      )
    );
  }
  return (c = Hr(e, a, t, n, s, !0)), c;
}
function Hr(e, t, n = {}, s, o, r) {
  let i;
  const l = et({ actions: {} }, n),
    c = { deep: !0 };
  let a,
    d,
    p = [],
    h = [],
    w;
  const A = s.state.value[e];
  !r && !A && (s.state.value[e] = {}), T({});
  let E;
  function V(N) {
    let $;
    (a = d = !1),
      typeof N == "function"
        ? (N(s.state.value[e]),
          ($ = { type: Qt.patchFunction, storeId: e, events: w }))
        : (ws(s.state.value[e], N),
          ($ = { type: Qt.patchObject, payload: N, storeId: e, events: w }));
    const K = (E = Symbol());
    Fs().then(() => {
      E === K && (a = !0);
    }),
      (d = !0),
      Bt(p, $, s.state.value[e]);
  }
  const F = r
    ? function () {
        const { state: $ } = n,
          K = $ ? $() : {};
        this.$patch((J) => {
          et(J, K);
        });
      }
    : Fr;
  function R() {
    i.stop(), (p = []), (h = []), s._s.delete(e);
  }
  function L(N, $) {
    return function () {
      zn(s);
      const K = Array.from(arguments),
        J = [],
        Ee = [];
      function Ye(X) {
        J.push(X);
      }
      function Se(X) {
        Ee.push(X);
      }
      Bt(h, { args: K, name: N, store: Q, after: Ye, onError: Se });
      let Te;
      try {
        Te = $.apply(this && this.$id === e ? this : Q, K);
      } catch (X) {
        throw (Bt(Ee, X), X);
      }
      return Te instanceof Promise
        ? Te.then((X) => (Bt(J, X), X)).catch(
            (X) => (Bt(Ee, X), Promise.reject(X))
          )
        : (Bt(J, Te), Te);
    };
  }
  const M = {
      _p: s,
      $id: e,
      $onAction: Po.bind(null, h),
      $patch: V,
      $reset: F,
      $subscribe(N, $ = {}) {
        const K = Po(p, N, $.detached, () => J()),
          J = i.run(() =>
            Oe(
              () => s.state.value[e],
              (Ee) => {
                ($.flush === "sync" ? d : a) &&
                  N({ storeId: e, type: Qt.direct, events: w }, Ee);
              },
              et({}, c, $)
            )
          );
        return K;
      },
      $dispose: R,
    },
    Q = lt(M);
  s._s.set(e, Q);
  const ae = ((s._a && s._a.runWithContext) || bc)(() =>
    s._e.run(() => (i = Jo()).run(t))
  );
  for (const N in ae) {
    const $ = ae[N];
    if ((le($) && !Cc($)) || ot($))
      r ||
        (A && wc($) && (le($) ? ($.value = A[N]) : ws($, A[N])),
        (s.state.value[e][N] = $));
    else if (typeof $ == "function") {
      const K = L(N, $);
      (ae[N] = K), (l.actions[N] = $);
    }
  }
  return (
    et(Q, ae),
    et(z(Q), ae),
    Object.defineProperty(Q, "$state", {
      get: () => s.state.value[e],
      set: (N) => {
        V(($) => {
          et($, N);
        });
      },
    }),
    s._p.forEach((N) => {
      et(
        Q,
        i.run(() => N({ store: Q, app: s._a, pinia: s, options: l }))
      );
    }),
    A && r && n.hydrate && n.hydrate(Q.$state, A),
    (a = !0),
    (d = !0),
    Q
  );
}
function dn(e, t, n) {
  let s, o;
  const r = typeof t == "function";
  typeof e == "string" ? ((s = e), (o = r ? n : t)) : ((o = e), (s = e.id));
  function i(l, c) {
    const a = wl();
    return (
      (l = l || (a ? Jt(Lr, null) : null)),
      l && zn(l),
      (l = Pr),
      l._s.has(s) || (r ? Hr(s, t, o, l) : xc(s, o, l)),
      l._s.get(s)
    );
  }
  return (i.$id = s), i;
}
const Rr = {
    directive: "wave",
    color: "currentColor",
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    duration: 0.4,
    dissolveDuration: 0.15,
    easing: "ease-out",
    cancellationPeriod: 75,
    trigger: "auto",
    tagName: "div",
  },
  Ic = (e) => "config" in e && "globalProperties" in e.config,
  Ec = (e) => {
    let t;
    return (
      e === "vue2" ? (t = !1) : e === "vue3" ? (t = !0) : (t = Ic(e)),
      t
        ? { mounted: "mounted", updated: "updated" }
        : { mounted: "inserted", updated: "componentUpdated" }
    );
  },
  Nr = (e) => typeof e == "string" && e !== "auto",
  Lo = (e, t) => {
    e.dataset.vWaveBoundary = Nr(t) ? t : "true";
  },
  Sc = (
    {
      borderTopLeftRadius: e,
      borderTopRightRadius: t,
      borderBottomLeftRadius: n,
      borderBottomRightRadius: s,
    },
    o
  ) => {
    const r = document.createElement(o);
    return (
      (r.style.top = "0"),
      (r.style.left = "0"),
      (r.style.width = "100%"),
      (r.style.height = "100%"),
      (r.style.display = "block"),
      (r.style.position = "absolute"),
      (r.style.borderRadius = `${e} ${t} ${s} ${n}`),
      (r.style.overflow = "hidden"),
      (r.style.pointerEvents = "none"),
      (r.style.webkitMaskImage = "-webkit-radial-gradient(white, black)"),
      r
    );
  },
  Bc = (e, t, n, s) => {
    const o = document.createElement("div");
    return (
      (o.style.position = "absolute"),
      (o.style.width = `${n}px`),
      (o.style.height = `${n}px`),
      (o.style.top = `${t}px`),
      (o.style.left = `${e}px`),
      (o.style.background = s.color),
      (o.style.borderRadius = "50%"),
      (o.style.opacity = `${s.initialOpacity}`),
      (o.style.transform = "translate(-50%,-50%) scale(0)"),
      (o.style.transition = `transform ${s.duration}s ${s.easing}, opacity ${s.duration}s ${s.easing}`),
      o
    );
  };
function wn(e, t, n, s) {
  const o = e - n,
    r = t - s;
  return Math.sqrt(o * o + r * r);
}
function Ac(e, t, { width: n, height: s }) {
  const o = wn(e, t, 0, 0),
    r = wn(e, t, n, 0),
    i = wn(e, t, 0, s),
    l = wn(e, t, n, s);
  return Math.max(o, r, i, l);
}
const Vc = ({ x: e, y: t }, { top: n, left: s }) => ({ x: e - s, y: t - n }),
  Ys = "vWaveCountInternal";
function $c(e) {
  const t = zs(e);
  Dr(e, t + 1);
}
function Oc(e) {
  const t = zs(e);
  Dr(e, t - 1);
}
function Dr(e, t) {
  e.dataset[Ys] = t.toString();
}
function zs(e) {
  var t;
  return parseInt((t = e.dataset[Ys]) !== null && t !== void 0 ? t : "0", 10);
}
function Tc(e) {
  delete e.dataset[Ys];
}
const ls = (e, t, n) => {
    const s = t.getBoundingClientRect(),
      o = window.getComputedStyle(t),
      { x: r, y: i } = Vc(e, s),
      l = 2.05 * Ac(r, i, s),
      c = Sc(o, n.tagName),
      a = Bc(r, i, l, n);
    $c(t);
    let d = "";
    o.position === "static" &&
      (t.style.position && (d = t.style.position),
      (t.style.position = "relative")),
      c.appendChild(a),
      t.appendChild(c);
    let p = !1;
    const h = (V) => {
        typeof V < "u" &&
          (document.removeEventListener("pointerup", h),
          document.removeEventListener("pointercancel", h)),
          p ? w() : (p = !0);
      },
      w = () => {
        (a.style.transition = `opacity ${n.dissolveDuration}s linear`),
          (a.style.opacity = "0"),
          setTimeout(() => {
            c.remove(), Oc(t), zs(t) === 0 && (Tc(t), (t.style.position = d));
          }, n.dissolveDuration * 1e3);
      };
    document.addEventListener("pointerup", h),
      document.addEventListener("pointercancel", h);
    const A = setTimeout(() => {
        document.removeEventListener("pointercancel", E),
          requestAnimationFrame(() => {
            (a.style.transform = "translate(-50%,-50%) scale(1)"),
              (a.style.opacity = `${n.finalOpacity}`),
              setTimeout(() => h(), n.duration * 1e3);
          });
      }, n.cancellationPeriod),
      E = () => {
        clearTimeout(A),
          c.remove(),
          document.removeEventListener("pointerup", h),
          document.removeEventListener("pointercancel", h),
          document.removeEventListener("pointercancel", E);
      };
    document.addEventListener("pointercancel", E);
  },
  qt = new WeakMap(),
  Fo = (e = {}, t = "vue3") => {
    const n = Object.assign(Object.assign({}, Rr), e),
      s = Ec(t),
      o = (l) => {
        const c = l.currentTarget.dataset.vWaveTrigger;
        document
          .querySelectorAll(`[data-v-wave-boundary="${c}"]`)
          .forEach((d) =>
            ls(l, d, Object.assign(Object.assign({}, n), qt.get(d)))
          );
      },
      r = {
        [s.mounted](l, { value: c = {} }) {
          var a;
          qt.set(l, c),
            Lo(
              l,
              (a = c && c.trigger) !== null && a !== void 0 ? a : n.trigger
            ),
            l.addEventListener("pointerdown", (d) => {
              if (qt.get(l) === !1) return;
              const p = Object.assign(Object.assign({}, n), qt.get(l));
              if (p.trigger === !1) return ls(d, l, p);
              if (Nr(p.trigger)) return;
              const h = l.querySelector('[data-v-wave-trigger="true"]');
              (!h && p.trigger === !0) ||
                (h && !d.composedPath().includes(h)) ||
                ls(d, l, p);
            });
        },
        [s.updated](l, { value: c = {} }) {
          var a;
          qt.set(l, c),
            Lo(
              l,
              (a = c && c.trigger) !== null && a !== void 0 ? a : n.trigger
            );
        },
      },
      i = {
        [s.mounted](l, { arg: c = "true" }) {
          (l.dataset.vWaveTrigger = c),
            c !== "true" && l.addEventListener("pointerdown", o);
        },
        [s.updated](l, { arg: c = "true" }) {
          (l.dataset.vWaveTrigger = c),
            c === "true"
              ? l.removeEventListener("pointerdown", o)
              : l.addEventListener("pointerdown", o);
        },
      };
    return { wave: r, vWave: r, waveTrigger: i, vWaveTrigger: i };
  },
  Mc = {
    install(e, t = {}) {
      if (this.installed) return;
      this.installed = !0;
      const n = Object.assign(Object.assign({}, Rr), t),
        { vWave: s, vWaveTrigger: o } = Fo(n, e);
      e.directive(n.directive, s), e.directive(`${n.directive}-trigger`, o);
    },
    installed: !1,
    createLocalWaveDirective: Fo,
  },
  kr = dn("wallpaperOffset", () => {
    const e = T(!0),
      t = T(4),
      n = T(4),
      s = te(() => 1 / (we(t) - 1)),
      o = te(() => 1 / (we(n) - 1)),
      r = T(0.5),
      i = T(0.5),
      l = T(0),
      c = T(0),
      a = te(() => (we(e) ? we(l) : we(r))),
      d = te(() => (we(e) ? we(c) : we(i)));
    return (
      Oe([s, o], ([p, h]) => {
        Bridge.setWallpaperOffsetSteps(p, h);
      }),
      Oe([a, d], ([p, h]) => {
        Bridge.setWallpaperOffsets(p, h);
      }),
      {
        usePageScroll: e,
        pagesX: t,
        pagesY: n,
        stepsX: s,
        stepsY: o,
        manualOffsetX: r,
        manualOffsetY: i,
        pageScrollOffsetX: l,
        pageScrollOffsetY: c,
        offsetX: a,
        offsetY: d,
      }
    );
  });
function jr(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
var Cs = ((e) => (
  (e[(e.Idle = 0)] = "Idle"),
  (e[(e.InProgress = 1)] = "InProgress"),
  (e[(e.Error = 2)] = "Error"),
  e
))(Cs || {});
const Wc = dn("apps", () => {
    const e = Xn(),
      t = T(new Map()),
      n = T(2),
      s = T("");
    async function o() {
      if (n.value !== 1) {
        (n.value = 1), (s.value = "");
        try {
          const l = await (await fetch(Bridge.getAppsURL())).json(),
            c = new Map();
          for (const a of l.apps) c.set(a.packageName, r(a));
          (t.value = c), (n.value = 0);
        } catch (i) {
          console.error(i), (n.value = 2), (s.value = `${i}`);
        }
      }
    }
    function r(i) {
      return { ...i, labelSimplified: jr(i.label) };
    }
    return (
      o(),
      e.addEventListener((i, l) => {
        i === "appInstalled" || i === "appChanged"
          ? t.value.set(l.packageName, r(l))
          : i === "appRemoved" && t.value.delete(l.packageName);
      }),
      { apps: t, requestAppsAsync: o, requestStatus: n, requestErrorMessage: s }
    );
  }),
  Xs = dn("toggles", () => {
    const e = Xn(),
      t = T(Bridge.getBridgeButtonVisibility()),
      n = T(Bridge.getDrawSystemWallpaperBehindWebViewEnabled()),
      s = T(Bridge.getOverscrollEffects()),
      o = T(Bridge.getSystemNightMode()),
      r = T(Bridge.getBridgeTheme()),
      i = T(Bridge.getStatusBarAppearance()),
      l = T(Bridge.getNavigationBarAppearance()),
      c = T(Bridge.getCanLockScreen());
    return (
      e.addEventListener((a, d) => {
        a === "bridgeButtonVisibilityChanged"
          ? (t.value = d.newValue)
          : a === "drawSystemWallpaperBehindWebViewChanged"
          ? (n.value = d.newValue)
          : a === "overscrollEffectsChanged"
          ? (s.value = d.newValue)
          : a === "systemNightModeChanged"
          ? (o.value = d.newValue)
          : a === "bridgeThemeChanged"
          ? (r.value = d.newValue)
          : a === "statusBarAppearanceChanged"
          ? (i.value = d.newValue)
          : a === "navigationBarAppearanceChanged"
          ? (l.value = d.newValue)
          : a === "canLockScreenChanged" && (c.value = d.newValue);
      }),
      {
        bridgeButtonVisibility: te({
          get: () => we(t),
          set: (a) => Bridge.requestSetBridgeButtonVisibility(a),
        }),
        drawSystemWallpaperBehindWebView: te({
          get: () => we(n),
          set: (a) =>
            Bridge.requestSetDrawSystemWallpaperBehindWebViewEnabled(a),
        }),
        overscrollEffects: te({
          get: () => we(s),
          set: (a) => Bridge.requestSetOverscrollEffects(a),
        }),
        systemNightMode: te({
          get: () => we(o),
          set: (a) => {
            a !== "unknown" &&
              a !== "error" &&
              Bridge.requestSetSystemNightMode(a);
          },
        }),
        bridgeTheme: te({
          get: () => we(r),
          set: (a) => Bridge.requestSetBridgeTheme(a),
        }),
        statusBarAppearance: te({
          get: () => we(i),
          set: (a) => Bridge.requestSetStatusBarAppearance(a),
        }),
        navigationBarAppearance: te({
          get: () => we(l),
          set: (a) => Bridge.requestSetNavigationBarAppearance(a),
        }),
        canLockScreen: Hn(c),
      }
    );
  }),
  Xn = dn("bridgeEvent", () => {
    const e = T([]);
    function t() {
      e.value = [];
    }
    const n = T(new Set());
    function s(r) {
      n.value.add(r);
    }
    function o(r) {
      n.value.delete(r);
    }
    return (
      (window.onBridgeEvent = function (...r) {
        e.value.push({ time: new Date(), event: r });
        for (const i of n.value) i(...r);
      }),
      {
        clearHistory: t,
        eventHistory: e,
        addEventListener: s,
        removeEventListener: o,
      }
    );
  });
function _e(e) {
  return JSON.parse(e);
}
const Pc = dn("windowInsets", () => {
  const e = Xn(),
    t = T(_e(Bridge.getStatusBarsWindowInsets())),
    n = T(_e(Bridge.getStatusBarsIgnoringVisibilityWindowInsets())),
    s = T(_e(Bridge.getNavigationBarsWindowInsets())),
    o = T(_e(Bridge.getNavigationBarsIgnoringVisibilityWindowInsets())),
    r = T(_e(Bridge.getCaptionBarWindowInsets())),
    i = T(_e(Bridge.getCaptionBarIgnoringVisibilityWindowInsets())),
    l = T(_e(Bridge.getSystemBarsWindowInsets())),
    c = T(_e(Bridge.getSystemBarsIgnoringVisibilityWindowInsets())),
    a = T(_e(Bridge.getImeWindowInsets())),
    d = T(_e(Bridge.getImeAnimationSourceWindowInsets())),
    p = T(_e(Bridge.getImeAnimationTargetWindowInsets())),
    h = T(_e(Bridge.getTappableElementWindowInsets())),
    w = T(_e(Bridge.getTappableElementIgnoringVisibilityWindowInsets())),
    A = T(_e(Bridge.getSystemGesturesWindowInsets())),
    E = T(_e(Bridge.getMandatorySystemGesturesWindowInsets())),
    V = T(_e(Bridge.getDisplayCutoutWindowInsets())),
    F = T(_e(Bridge.getWaterfallWindowInsets()));
  return (
    e.addEventListener((R, L) => {
      console.log(
        "@useWindowInsetsStore: onBridgeEvent:",
        R,
        JSON.stringify(L)
      ),
        R === "statusBarsWindowInsetsChanged"
          ? (t.value = L.newValue)
          : R === "statusBarsIgnoringVisibilityWindowInsetsChanged"
          ? (n.value = L.newValue)
          : R === "navigationBarsWindowInsetsChanged"
          ? (s.value = L.newValue)
          : R === "navigationBarsIgnoringVisibilityWindowInsetsChanged"
          ? (o.value = L.newValue)
          : R === "captionBarWindowInsetsChanged"
          ? (r.value = L.newValue)
          : R === "captionBarIgnoringVisibilityWindowInsetsChanged"
          ? (i.value = L.newValue)
          : R === "systemBarsWindowInsetsChanged"
          ? (l.value = L.newValue)
          : R === "systemBarsIgnoringVisibilityWindowInsetsChanged"
          ? (c.value = L.newValue)
          : R === "imeWindowInsetsChanged"
          ? (a.value = L.newValue)
          : R === "imeAnimationSourceWindowInsetsChanged"
          ? (d.value = L.newValue)
          : R === "imeAnimationTargetWindowInsetsChanged"
          ? (p.value = L.newValue)
          : R === "tappableElementWindowInsetsChanged"
          ? (h.value = L.newValue)
          : R === "tappableElementIgnoringVisibilityWindowInsetsChanged"
          ? (w.value = L.newValue)
          : R === "systemGesturesWindowInsetsChanged"
          ? (A.value = L.newValue)
          : R === "mandatorySystemGesturesWindowInsetsChanged"
          ? (E.value = L.newValue)
          : R === "displayCutoutWindowInsetsChanged"
          ? (V.value = L.newValue)
          : R === "waterfallWindowInsetsChanged" && (F.value = L.newValue);
    }),
    {
      statusBars: t,
      statusBarsIgnoringVisibility: n,
      navigationBars: s,
      navigationBarsIgnoringVisibility: o,
      captionBar: r,
      captionBarIgnoringVisibility: i,
      systemBars: l,
      systemBarsIgnoringVisibility: c,
      ime: a,
      imeAnimationSource: d,
      imeAnimationTarget: p,
      tappableElement: h,
      tappableElementIgnoringVisibility: w,
      systemGestures: A,
      mandatorySystemGestures: E,
      displayCutout: V,
      waterfall: F,
    }
  );
});
function Cn(e) {
  return typeof e == "number" ? `${e}px` : void 0;
}
function cn(e) {
  return Vs() ? (Zo(e), !0) : !1;
}
function $e(e) {
  return typeof e == "function" ? e() : I(e);
}
const xs = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Lc = Object.prototype.toString,
  Fc = (e) => Lc.call(e) === "[object Object]",
  Ze = () => {};
function Ur(e, t) {
  function n(...s) {
    return new Promise((o, r) => {
      Promise.resolve(
        e(() => t.apply(this, s), { fn: t, thisArg: this, args: s })
      )
        .then(o)
        .catch(r);
    });
  }
  return n;
}
function Hc(e, t = {}) {
  let n,
    s,
    o = Ze;
  const r = (l) => {
    clearTimeout(l), o(), (o = Ze);
  };
  return (l) => {
    const c = $e(e),
      a = $e(t.maxWait);
    return (
      n && r(n),
      c <= 0 || (a !== void 0 && a <= 0)
        ? (s && (r(s), (s = null)), Promise.resolve(l()))
        : new Promise((d, p) => {
            (o = t.rejectOnCancel ? p : d),
              a &&
                !s &&
                (s = setTimeout(() => {
                  n && r(n), (s = null), d(l());
                }, a)),
              (n = setTimeout(() => {
                s && r(s), (s = null), d(l());
              }, c));
          })
    );
  };
}
function Rc(e, t = !0, n = !0, s = !1) {
  let o = 0,
    r,
    i = !0,
    l = Ze,
    c;
  const a = () => {
    r && (clearTimeout(r), (r = void 0), l(), (l = Ze));
  };
  return (p) => {
    const h = $e(e),
      w = Date.now() - o,
      A = () => (c = p());
    return (
      a(),
      h <= 0
        ? ((o = Date.now()), A())
        : (w > h && (n || !i)
            ? ((o = Date.now()), A())
            : t &&
              (c = new Promise((E, V) => {
                (l = s ? V : E),
                  (r = setTimeout(() => {
                    (o = Date.now()), (i = !0), E(A()), a();
                  }, Math.max(0, h - w)));
              })),
          !n && !r && (r = setTimeout(() => (i = !0), h)),
          (i = !1),
          c)
    );
  };
}
function Nc(e, t = 200, n = {}) {
  return Ur(Hc(t, n), e);
}
function Dc(e, t = 200, n = !1, s = !0, o = !1) {
  return Ur(Rc(t, n, s, o), e);
}
function qr(e, t = !0) {
  qs() ? Ns(e) : t ? e() : Fs(e);
}
function kc(e, t = 1e3, n = {}) {
  const { immediate: s = !0, immediateCallback: o = !1 } = n;
  let r = null;
  const i = T(!1);
  function l() {
    r && (clearInterval(r), (r = null));
  }
  function c() {
    (i.value = !1), l();
  }
  function a() {
    const d = $e(t);
    d <= 0 || ((i.value = !0), o && e(), l(), (r = setInterval(e, d)));
  }
  if ((s && xs && a(), le(t) || typeof t == "function")) {
    const d = Oe(t, () => {
      i.value && xs && a();
    });
    cn(d);
  }
  return cn(c), { isActive: i, pause: c, resume: a };
}
function vt(e) {
  var t;
  const n = $e(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Dt = xs ? window : void 0;
function Gt(...e) {
  let t, n, s, o;
  if (
    (typeof e[0] == "string" || Array.isArray(e[0])
      ? (([n, s, o] = e), (t = Dt))
      : ([t, n, s, o] = e),
    !t)
  )
    return Ze;
  Array.isArray(n) || (n = [n]), Array.isArray(s) || (s = [s]);
  const r = [],
    i = () => {
      r.forEach((d) => d()), (r.length = 0);
    },
    l = (d, p, h, w) => (
      d.addEventListener(p, h, w), () => d.removeEventListener(p, h, w)
    ),
    c = Oe(
      () => [vt(t), $e(o)],
      ([d, p]) => {
        if ((i(), !d)) return;
        const h = Fc(p) ? { ...p } : p;
        r.push(...n.flatMap((w) => s.map((A) => l(d, w, A, h))));
      },
      { immediate: !0, flush: "post" }
    ),
    a = () => {
      c(), i();
    };
  return cn(a), a;
}
function jc() {
  const e = T(!1);
  return (
    qs() &&
      Ns(() => {
        e.value = !0;
      }),
    e
  );
}
function Uc(e) {
  const t = jc();
  return te(() => (t.value, !!e()));
}
function qc(e, t = {}) {
  const { immediate: n = !0, fpsLimit: s = void 0, window: o = Dt } = t,
    r = T(!1),
    i = s ? 1e3 / s : null;
  let l = 0,
    c = null;
  function a(h) {
    if (!r.value || !o) return;
    const w = h - (l || h);
    if (i && w < i) {
      c = o.requestAnimationFrame(a);
      return;
    }
    e({ delta: w, timestamp: h }), (l = h), (c = o.requestAnimationFrame(a));
  }
  function d() {
    !r.value && o && ((r.value = !0), (c = o.requestAnimationFrame(a)));
  }
  function p() {
    (r.value = !1), c != null && o && (o.cancelAnimationFrame(c), (c = null));
  }
  return n && d(), cn(p), { isActive: Hn(r), pause: p, resume: d };
}
function Kc(e, t, n = {}) {
  const { window: s = Dt, ...o } = n;
  let r;
  const i = Uc(() => s && "ResizeObserver" in s),
    l = () => {
      r && (r.disconnect(), (r = void 0));
    },
    c = te(() => (Array.isArray(e) ? e.map((p) => vt(p)) : [vt(e)])),
    a = Oe(
      c,
      (p) => {
        if ((l(), i.value && s)) {
          r = new ResizeObserver(t);
          for (const h of p) h && r.observe(h, o);
        }
      },
      { immediate: !0, flush: "post", deep: !0 }
    ),
    d = () => {
      l(), a();
    };
  return cn(d), { isSupported: i, stop: d };
}
function Ho(e, t = { width: 0, height: 0 }, n = {}) {
  const { window: s = Dt, box: o = "content-box" } = n,
    r = te(() => {
      var p, h;
      return (h = (p = vt(e)) == null ? void 0 : p.namespaceURI) == null
        ? void 0
        : h.includes("svg");
    }),
    i = T(t.width),
    l = T(t.height),
    { stop: c } = Kc(
      e,
      ([p]) => {
        const h =
          o === "border-box"
            ? p.borderBoxSize
            : o === "content-box"
            ? p.contentBoxSize
            : p.devicePixelContentBoxSize;
        if (s && r.value) {
          const w = vt(e);
          if (w) {
            const A = s.getComputedStyle(w);
            (i.value = Number.parseFloat(A.width)),
              (l.value = Number.parseFloat(A.height));
          }
        } else if (h) {
          const w = Array.isArray(h) ? h : [h];
          (i.value = w.reduce((A, { inlineSize: E }) => A + E, 0)),
            (l.value = w.reduce((A, { blockSize: E }) => A + E, 0));
        } else
          (i.value = p.contentRect.width), (l.value = p.contentRect.height);
      },
      n
    );
  qr(() => {
    const p = vt(e);
    p &&
      ((i.value = "offsetWidth" in p ? p.offsetWidth : t.width),
      (l.value = "offsetHeight" in p ? p.offsetHeight : t.height));
  });
  const a = Oe(
    () => vt(e),
    (p) => {
      (i.value = p ? t.width : 0), (l.value = p ? t.height : 0);
    }
  );
  function d() {
    c(), a();
  }
  return { width: i, height: l, stop: d };
}
const Ro = 1;
function Yc(e, t = {}) {
  const {
      throttle: n = 0,
      idle: s = 200,
      onStop: o = Ze,
      onScroll: r = Ze,
      offset: i = { left: 0, right: 0, top: 0, bottom: 0 },
      eventListenerOptions: l = { capture: !1, passive: !0 },
      behavior: c = "auto",
      window: a = Dt,
    } = t,
    d = T(0),
    p = T(0),
    h = te({
      get() {
        return d.value;
      },
      set(q) {
        A(q, void 0);
      },
    }),
    w = te({
      get() {
        return p.value;
      },
      set(q) {
        A(void 0, q);
      },
    });
  function A(q, ae) {
    var N, $, K;
    if (!a) return;
    const J = $e(e);
    J &&
      ((K = J instanceof Document ? a.document.body : J) == null ||
        K.scrollTo({
          top: (N = $e(ae)) != null ? N : w.value,
          left: ($ = $e(q)) != null ? $ : h.value,
          behavior: $e(c),
        }));
  }
  const E = T(!1),
    V = lt({ left: !0, right: !1, top: !0, bottom: !1 }),
    F = lt({ left: !1, right: !1, top: !1, bottom: !1 }),
    R = (q) => {
      E.value &&
        ((E.value = !1),
        (F.left = !1),
        (F.right = !1),
        (F.top = !1),
        (F.bottom = !1),
        o(q));
    },
    L = Nc(R, n + s),
    M = (q) => {
      var ae;
      if (!a) return;
      const N = q.document
          ? q.document.documentElement
          : (ae = q.documentElement) != null
          ? ae
          : q,
        { display: $, flexDirection: K } = getComputedStyle(N),
        J = N.scrollLeft;
      (F.left = J < d.value), (F.right = J > d.value);
      const Ee = Math.abs(J) <= 0 + (i.left || 0),
        Ye = Math.abs(J) + N.clientWidth >= N.scrollWidth - (i.right || 0) - Ro;
      $ === "flex" && K === "row-reverse"
        ? ((V.left = Ye), (V.right = Ee))
        : ((V.left = Ee), (V.right = Ye)),
        (d.value = J);
      let Se = N.scrollTop;
      q === a.document && !Se && (Se = a.document.body.scrollTop),
        (F.top = Se < p.value),
        (F.bottom = Se > p.value);
      const Te = Math.abs(Se) <= 0 + (i.top || 0),
        X =
          Math.abs(Se) + N.clientHeight >=
          N.scrollHeight - (i.bottom || 0) - Ro;
      $ === "flex" && K === "column-reverse"
        ? ((V.top = X), (V.bottom = Te))
        : ((V.top = Te), (V.bottom = X)),
        (p.value = Se);
    },
    Q = (q) => {
      var ae;
      if (!a) return;
      const N = (ae = q.target.documentElement) != null ? ae : q.target;
      M(N), (E.value = !0), L(q), r(q);
    };
  return (
    Gt(e, "scroll", n ? Dc(Q, n, !0, !1) : Q, l),
    qr(() => {
      const q = $e(e);
      q && M(q);
    }),
    Gt(e, "scrollend", R, l),
    {
      x: h,
      y: w,
      isScrolling: E,
      arrivedState: V,
      directions: F,
      measure() {
        const q = $e(e);
        a && q && M(q);
      },
    }
  );
}
function zc(e = {}) {
  const { controls: t = !1, interval: n = "requestAnimationFrame" } = e,
    s = T(new Date()),
    o = () => (s.value = new Date()),
    r =
      n === "requestAnimationFrame"
        ? qc(o, { immediate: !0 })
        : kc(o, n, { immediate: !0 });
  return t ? { now: s, ...r } : s;
}
function Xc(e, t = {}) {
  const {
      threshold: n = 50,
      onSwipe: s,
      onSwipeEnd: o,
      onSwipeStart: r,
      passive: i = !0,
      window: l = Dt,
    } = t,
    c = lt({ x: 0, y: 0 }),
    a = lt({ x: 0, y: 0 }),
    d = te(() => c.x - a.x),
    p = te(() => c.y - a.y),
    { max: h, abs: w } = Math,
    A = te(() => h(w(d.value), w(p.value)) >= n),
    E = T(!1),
    V = te(() =>
      A.value
        ? w(d.value) > w(p.value)
          ? d.value > 0
            ? "left"
            : "right"
          : p.value > 0
          ? "up"
          : "down"
        : "none"
    ),
    F = ($) => [$.touches[0].clientX, $.touches[0].clientY],
    R = ($, K) => {
      (c.x = $), (c.y = K);
    },
    L = ($, K) => {
      (a.x = $), (a.y = K);
    };
  let M;
  const Q = Jc(l == null ? void 0 : l.document);
  i
    ? (M = Q ? { passive: !0 } : { capture: !1 })
    : (M = Q ? { passive: !1, capture: !0 } : { capture: !0 });
  const q = ($) => {
      E.value && (o == null || o($, V.value)), (E.value = !1);
    },
    ae = [
      Gt(
        e,
        "touchstart",
        ($) => {
          if ($.touches.length !== 1) return;
          M.capture && !M.passive && $.preventDefault();
          const [K, J] = F($);
          R(K, J), L(K, J), r == null || r($);
        },
        M
      ),
      Gt(
        e,
        "touchmove",
        ($) => {
          if ($.touches.length !== 1) return;
          const [K, J] = F($);
          L(K, J),
            !E.value && A.value && (E.value = !0),
            E.value && (s == null || s($));
        },
        M
      ),
      Gt(e, ["touchend", "touchcancel"], q, M),
    ];
  return {
    isPassiveEventSupported: Q,
    isSwiping: E,
    direction: V,
    coordsStart: c,
    coordsEnd: a,
    lengthX: d,
    lengthY: p,
    stop: () => ae.forEach(($) => $()),
  };
}
function Jc(e) {
  if (!e) return !1;
  let t = !1;
  const n = {
    get passive() {
      return (t = !0), !1;
    },
  };
  return e.addEventListener("x", Ze, n), e.removeEventListener("x", Ze), t;
}
const Zc = [
    { max: 6e4, value: 1e3, name: "second" },
    { max: 276e4, value: 6e4, name: "minute" },
    { max: 72e6, value: 36e5, name: "hour" },
    { max: 5184e5, value: 864e5, name: "day" },
    { max: 24192e5, value: 6048e5, name: "week" },
    { max: 28512e6, value: 2592e6, name: "month" },
    { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" },
  ],
  Qc = {
    justNow: "just now",
    past: (e) => (e.match(/\d/) ? `${e} ago` : e),
    future: (e) => (e.match(/\d/) ? `in ${e}` : e),
    month: (e, t) =>
      e === 1
        ? t
          ? "last month"
          : "next month"
        : `${e} month${e > 1 ? "s" : ""}`,
    year: (e, t) =>
      e === 1
        ? t
          ? "last year"
          : "next year"
        : `${e} year${e > 1 ? "s" : ""}`,
    day: (e, t) =>
      e === 1 ? (t ? "yesterday" : "tomorrow") : `${e} day${e > 1 ? "s" : ""}`,
    week: (e, t) =>
      e === 1
        ? t
          ? "last week"
          : "next week"
        : `${e} week${e > 1 ? "s" : ""}`,
    hour: (e) => `${e} hour${e > 1 ? "s" : ""}`,
    minute: (e) => `${e} minute${e > 1 ? "s" : ""}`,
    second: (e) => `${e} second${e > 1 ? "s" : ""}`,
    invalid: "",
  };
function Gc(e) {
  return e.toISOString().slice(0, 10);
}
function ea(e, t = {}, n = Date.now()) {
  var s;
  const {
      max: o,
      messages: r = Qc,
      fullDateFormatter: i = Gc,
      units: l = Zc,
      showSecond: c = !1,
      rounding: a = "round",
    } = t,
    d = typeof a == "number" ? (V) => +V.toFixed(a) : Math[a],
    p = +n - +e,
    h = Math.abs(p);
  function w(V, F) {
    return d(Math.abs(V) / F.value);
  }
  function A(V, F) {
    const R = w(V, F),
      L = V > 0,
      M = E(F.name, R, L);
    return E(L ? "past" : "future", M, L);
  }
  function E(V, F, R) {
    const L = r[V];
    return typeof L == "function" ? L(F, R) : L.replace("{0}", F.toString());
  }
  if (h < 6e4 && !c) return r.justNow;
  if (typeof o == "number" && h > o) return i(new Date(e));
  if (typeof o == "string") {
    const V = (s = l.find((F) => F.name === o)) == null ? void 0 : s.max;
    if (V && h > V) return i(new Date(e));
  }
  for (const [V, F] of l.entries()) {
    if (w(p, F) <= 0 && l[V - 1]) return A(p, l[V - 1]);
    if (h < F.max) return A(p, F);
  }
  return r.invalid;
}
const ta = ["width", "height", "view-box"],
  na = ["d"],
  Lt = ce({
    __name: "SvgIcon",
    props: { path: {}, size: { default: 24 }, viewBoxOverride: {} },
    setup(e) {
      const t = e;
      function n() {
        return t.viewBoxOverride ?? `0 0 ${t.size} ${t.size}`;
      }
      return (s, o) => (
        U(),
        ne(
          "svg",
          { width: s.size, height: s.size, "view-box": n() },
          [S("path", { d: s.path, fill: "currentColor" }, null, 8, na)],
          8,
          ta
        )
      );
    },
  }),
  sa = ce({
    __name: "TextButton",
    props: { variant: { default: "outlined" }, suffixIcon: {}, prefixIcon: {} },
    setup(e) {
      return (t, n) => {
        const s = Nt("wave");
        return Ke(
          (U(),
          ne(
            "button",
            { class: Ve(["btn", t.variant]) },
            [
              t.prefixIcon
                ? (U(),
                  qe(Lt, { key: 0, path: t.prefixIcon }, null, 8, ["path"]))
                : Wt("", !0),
              sn(t.$slots, "default", {}, void 0, !0),
              t.suffixIcon
                ? (U(),
                  qe(Lt, { key: 1, path: t.suffixIcon }, null, 8, ["path"]))
                : Wt("", !0),
            ],
            2
          )),
          [[s]]
        );
      };
    },
  });
const he = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, o] of t) n[s] = o;
    return n;
  },
  No = he(sa, [["__scopeId", "data-v-9ba9ba14"]]);
function Is(e) {
  return e.toFixed(2);
}
function oa(e) {
  return e.toString().padStart(2, "0");
}
const Js = (e) => (Ct("data-v-6eb79dc6"), (e = e()), xt(), e),
  ra = { class: "column" },
  ia = { class: "stick" },
  la = { class: "type-jumbo" },
  ca = Js(() =>
    S("div", { class: "type-pri" }, "Bridge Launcher API Tester", -1)
  ),
  aa = { class: "type-pri" },
  ua = Js(() =>
    S("div", { class: "type-sec" }, "Tap anywhere to send a wallpaper tap", -1)
  ),
  fa = Js(() => S("div", { class: "type-sec" }, "Swipe left for tools", -1)),
  da = ce({
    __name: "HomeColumn",
    setup(e) {
      const t = zc({ interval: 1e3 });
      function n() {
        const s = t.value,
          o = s.getHours(),
          r = s.getMinutes(),
          i = o > 12 ? "PM" : "AM";
        return `${o > 12 ? o - 12 : o}:${oa(r)} ${i}`;
      }
      return (s, o) => (
        U(),
        ne("div", ra, [
          S("div", ia, [
            S("div", la, de(n()), 1),
            ca,
            S(
              "div",
              aa,
              "Bridge v." +
                de(s.Bridge.getBridgeVersionName()) +
                " (" +
                de(s.Bridge.getBridgeVersionCode()) +
                ")",
              1
            ),
            ua,
            fa,
          ]),
        ])
      );
    },
  });
const pa = he(da, [["__scopeId", "data-v-6eb79dc6"]]);
var ha =
    "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  ga =
    "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
  ma =
    "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  _a =
    "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
  va = "M19,13H5V11H19V13Z",
  ba =
    "M14.04,12H10V11H5.5A3.5,3.5 0 0,1 2,7.5A3.5,3.5 0 0,1 5.5,4C6.53,4 7.45,4.44 8.09,5.15C8.5,3.35 10.08,2 12,2C13.92,2 15.5,3.35 15.91,5.15C16.55,4.44 17.47,4 18.5,4A3.5,3.5 0 0,1 22,7.5A3.5,3.5 0 0,1 18.5,11H14.04V12M10,16.9V15.76H5V13.76H19V15.76H14.04V16.92L20,19.08C20.58,19.29 21,19.84 21,20.5A1.5,1.5 0 0,1 19.5,22H4.5A1.5,1.5 0 0,1 3,20.5C3,19.84 3.42,19.29 4,19.08L10,16.9Z",
  ya = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  wa =
    "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z",
  Ca =
    "M19.31 18.9C19.75 18.21 20 17.38 20 16.5C20 14 18 12 15.5 12S11 14 11 16.5 13 21 15.5 21C16.37 21 17.19 20.75 17.88 20.32L21 23.39L22.39 22L19.31 18.9M15.5 19C14.12 19 13 17.88 13 16.5S14.12 14 15.5 14 18 15.12 18 16.5 16.88 19 15.5 19M21 9H19V7H21V9M21 5H19V3H20C20.55 3 21 3.45 21 4V5M19 11.03V11H21V13H20.97C20.46 12.21 19.79 11.54 19 11.03M17 5H15V3H17V5M13 5H11V3H13V5M3 7H5V9H3V7M7 19H9V21H7V19M3 11H5V13H3V11M4 3H5V5H3V4C3 3.45 3.45 3 4 3M9 5H7V3H9V5M3 19H5V21H4C3.45 21 3 20.55 3 20V19M3 15H5V17H3V15Z";
const xa = ["disabled"],
  Ia = ce({
    __name: "IconButton",
    props: { icon: {}, disabled: { type: Boolean }, flavor: {} },
    setup(e) {
      return (t, n) => {
        const s = Nt("wave");
        return Ke(
          (U(),
          ne(
            "button",
            { class: Ve(["btn icon", t.flavor]), disabled: !!t.disabled },
            [O(Lt, { path: t.icon }, null, 8, ["path"])],
            10,
            xa
          )),
          [[s]]
        );
      };
    },
  });
const an = he(Ia, [["__scopeId", "data-v-09afc0fc"]]),
  Ea = (e) => (Ct("data-v-4ce9b46b"), (e = e()), xt(), e),
  Sa = { class: "card" },
  Ba = { class: "title" },
  Aa = { class: "actions" },
  Va = Ea(() => S("div", { class: "separator" }, null, -1)),
  $a = ce({
    __name: "Card",
    props: { title: {}, actions: {} },
    setup(e) {
      return (t, n) => (
        U(),
        ne("section", Sa, [
          S("header", null, [
            S("div", Ba, de(t.title), 1),
            S("div", Aa, [sn(t.$slots, "actions", {}, void 0, !0)]),
          ]),
          Va,
          sn(t.$slots, "default", {}, void 0, !0),
        ])
      );
    },
  });
const kt = he($a, [["__scopeId", "data-v-4ce9b46b"]]),
  Oa = { class: "app-list-item row" },
  Ta = ["src"],
  Ma = { class: "col" },
  Wa = { class: "type-pri" },
  Pa = { class: "type-sec" },
  La = ce({
    __name: "AppListItem",
    props: { app: {} },
    setup(e) {
      return (t, n) => {
        const s = Nt("wave");
        return Ke(
          (U(),
          ne("div", Oa, [
            S(
              "img",
              { src: t.Bridge.getDefaultAppIconURL(t.app.packageName) },
              null,
              8,
              Ta
            ),
            S("div", Ma, [
              S("div", Wa, de(t.app.label), 1),
              S("div", Pa, de(t.app.packageName), 1),
            ]),
          ])),
          [[s]]
        );
      };
    },
  });
const Fa = he(La, [["__scopeId", "data-v-340f4a74"]]),
  Ha = { class: "tip" },
  Ra = ce({
    __name: "Tip",
    props: { icon: {} },
    setup(e) {
      return (t, n) => (
        U(),
        ne("div", Ha, [
          S("header", null, [O(Lt, { path: t.icon }, null, 8, ["path"])]),
          S("main", null, [sn(t.$slots, "default", {}, void 0, !0)]),
        ])
      );
    },
  });
const Na = he(Ra, [["__scopeId", "data-v-1f2c51f8"]]),
  Da = (e) => (Ct("data-v-cd3d2890"), (e = e()), xt(), e),
  ka = { class: "column" },
  ja = { class: "searchbar" },
  Ua = Da(() => S("div", { class: "separator" }, null, -1)),
  qa = { class: "app-list" },
  Ka = ce({
    __name: "AppsColumn",
    setup(e) {
      const t = Wc(),
        n = T(""),
        s = te(() => {
          const o = jr(n.value),
            r = n.value.trim().toLowerCase();
          return Array.from(t.apps.values())
            .filter(
              (i) => i.labelSimplified.includes(o) || i.packageName.includes(r)
            )
            .sort((i, l) => i.label.localeCompare(l.label));
        });
      return (o, r) => (
        U(),
        ne("div", ka, [
          O(
            kt,
            { title: "Apps" },
            {
              actions: oe(() => [
                O(
                  an,
                  {
                    icon: I(wa),
                    disabled: I(t).requestStatus === I(Cs).InProgress,
                    flavor:
                      I(t).requestStatus === I(Cs).Error ? "error" : void 0,
                    onClick: r[0] || (r[0] = (i) => I(t).requestAppsAsync()),
                  },
                  null,
                  8,
                  ["icon", "disabled", "flavor"]
                ),
              ]),
              default: oe(() => [
                S("div", ja, [
                  O(Lt, { path: I(_a) }, null, 8, ["path"]),
                  Ke(
                    S(
                      "input",
                      {
                        type: "text",
                        autocomplete: "new-password",
                        placeholder: "Tap here to search...",
                        "onUpdate:modelValue":
                          r[1] || (r[1] = (i) => (n.value = i)),
                      },
                      null,
                      512
                    ),
                    [[Yn, n.value]]
                  ),
                  O(
                    an,
                    {
                      icon: I(ma),
                      onClick: r[2] || (r[2] = (i) => (n.value = "")),
                    },
                    null,
                    8,
                    ["icon"]
                  ),
                ]),
                Ua,
                S("main", qa, [
                  s.value.length > 0
                    ? (U(!0),
                      ne(
                        xe,
                        { key: 0 },
                        Ds(
                          s.value,
                          (i) => (
                            U(),
                            qe(
                              Fa,
                              {
                                app: i,
                                onClick: (l) =>
                                  o.Bridge.requestLaunchApp(i.packageName),
                              },
                              null,
                              8,
                              ["app", "onClick"]
                            )
                          )
                        ),
                        256
                      ))
                    : (U(),
                      qe(
                        Na,
                        { key: 1, icon: I(Ca) },
                        {
                          default: oe(() => [ve(" No matching apps found. ")]),
                          _: 1,
                        },
                        8,
                        ["icon"]
                      )),
                ]),
              ]),
              _: 1,
            }
          ),
        ])
      );
    },
  });
const Ya = he(Ka, [["__scopeId", "data-v-cd3d2890"]]),
  za = { class: "text" },
  Xa = { class: "type-pri" },
  Ja = { key: 0, class: "type-sec" },
  Za = ce({
    __name: "CheckboxField",
    props: fn(
      { label: {}, secText: {} },
      { modelValue: { type: Boolean, required: !0 } }
    ),
    emits: ["update:modelValue"],
    setup(e) {
      const t = un(e, "modelValue");
      return (n, s) => {
        const o = Nt("wave");
        return Ke(
          (U(),
          ne(
            "button",
            {
              class: Ve(["checkbox field", { checked: t.value }]),
              onClick: s[0] || (s[0] = (r) => (t.value = !t.value)),
            },
            [
              O(Lt, { path: t.value ? I(ga) : I(ha) }, null, 8, ["path"]),
              S("div", za, [
                S("div", Xa, de(n.label), 1),
                n.secText ? (U(), ne("div", Ja, de(n.secText), 1)) : Wt("", !0),
              ]),
            ],
            2
          )),
          [[o]]
        );
      };
    },
  });
const Qa = he(Za, [["__scopeId", "data-v-4b9eb4a5"]]),
  Ga = { class: "name" },
  eu = { key: 0, class: "computed" },
  tu = ce({
    __name: "NumberField",
    props: fn(
      {
        label: {},
        min: {},
        max: {},
        step: { default: 1 },
        computedValue: {},
        disabled: { type: Boolean },
      },
      { modelValue: { required: !0 } }
    ),
    emits: ["update:modelValue"],
    setup(e) {
      const t = un(e, "modelValue"),
        n = e;
      function s() {
        typeof n.max == "number"
          ? (t.value = Math.min(t.value + n.step, n.max))
          : (t.value += n.step);
      }
      function o() {
        typeof n.min == "number"
          ? (t.value = Math.max(n.min, t.value - n.step))
          : (t.value -= n.step);
      }
      return (r, i) => (
        U(),
        ne(
          "div",
          { class: Ve(["number field", { disabled: r.disabled }]) },
          [
            S("label", Ga, de(r.label), 1),
            O(
              an,
              { icon: I(va), onClick: i[0] || (i[0] = (l) => o()) },
              null,
              8,
              ["icon"]
            ),
            Ke(
              S(
                "input",
                {
                  "onUpdate:modelValue": i[1] || (i[1] = (l) => (t.value = l)),
                },
                null,
                512
              ),
              [[Yn, t.value]]
            ),
            O(
              an,
              { icon: I(ya), onClick: i[2] || (i[2] = (l) => s()) },
              null,
              8,
              ["icon"]
            ),
            r.computedValue
              ? (U(), ne("label", eu, de(r.computedValue), 1))
              : Wt("", !0),
          ],
          2
        )
      );
    },
  });
const Do = he(tu, [["__scopeId", "data-v-6d067b63"]]),
  nu = (e) => (Ct("data-v-17e53bc1"), (e = e()), xt(), e),
  su = { class: "name" },
  ou = { class: "range" },
  ru = nu(() => S("div", { class: "track" }, null, -1)),
  iu = { class: "thumb-container" },
  lu = ["min", "max", "step"],
  cu = { class: "value" },
  au = ce({
    __name: "SliderField",
    props: fn(
      {
        label: {},
        min: {},
        max: {},
        step: { default: 0.01 },
        disabled: { type: Boolean },
      },
      { modelValue: { required: !0 } }
    ),
    emits: ["update:modelValue"],
    setup(e) {
      const t = un(e, "modelValue"),
        n = e,
        s = te({
          get: () => t.value.toString(),
          set: (r) => (t.value = parseFloat(r)),
        }),
        o = te(() => (t.value - n.min) / (n.max - n.min));
      return (r, i) => (
        U(),
        ne(
          "div",
          { class: Ve(["slider field", { disabled: r.disabled }]) },
          [
            S("label", su, de(r.label), 1),
            S("div", ou, [
              ru,
              S(
                "div",
                {
                  class: "progress",
                  style: nt({ transform: `scaleX(${o.value})` }),
                },
                null,
                4
              ),
              S("div", iu, [
                S(
                  "div",
                  { class: "thumb", style: nt({ left: `${o.value * 100}%` }) },
                  null,
                  4
                ),
              ]),
              Ke(
                S(
                  "input",
                  {
                    type: "range",
                    "onUpdate:modelValue":
                      i[0] || (i[0] = (l) => (s.value = l)),
                    min: r.min,
                    max: r.max,
                    step: r.step,
                  },
                  null,
                  8,
                  lu
                ),
                [[Yn, s.value]]
              ),
            ]),
            S("label", cu, de(I(Is)(t.value)), 1),
          ],
          2
        )
      );
    },
  });
const ko = he(au, [["__scopeId", "data-v-17e53bc1"]]),
  Jn = (e) => (Ct("data-v-3bdd09ee"), (e = e()), xt(), e),
  uu = { class: "cbx-container" },
  fu = Jn(() => S("div", { class: "separator" }, null, -1)),
  du = { class: "fields" },
  pu = Jn(() => S("label", { class: "type-caption" }, "Pages", -1)),
  hu = Jn(() => S("div", { class: "separator" }, null, -1)),
  gu = { class: "fields" },
  mu = Jn(() => S("label", { class: "type-caption" }, "Offsets", -1)),
  _u = ce({
    __name: "WallpaperOffsetsCard",
    setup(e) {
      const t = kr();
      return (n, s) => (
        U(),
        qe(
          kt,
          { title: "Wallpaper offsets" },
          {
            default: oe(() => [
              S("main", uu, [
                O(
                  Qa,
                  {
                    label: "Use page scroll",
                    modelValue: I(t).usePageScroll,
                    "onUpdate:modelValue":
                      s[0] || (s[0] = (o) => (I(t).usePageScroll = o)),
                  },
                  null,
                  8,
                  ["modelValue"]
                ),
              ]),
              fu,
              S("main", du, [
                pu,
                O(
                  Do,
                  {
                    label: "X",
                    modelValue: I(t).pagesX,
                    "onUpdate:modelValue":
                      s[1] || (s[1] = (o) => (I(t).pagesX = o)),
                    disabled: I(t).usePageScroll,
                    min: 1,
                    "computed-value": I(Is)(I(t).stepsX),
                  },
                  null,
                  8,
                  ["modelValue", "disabled", "computed-value"]
                ),
                O(
                  Do,
                  {
                    label: "Y",
                    modelValue: I(t).pagesY,
                    "onUpdate:modelValue":
                      s[2] || (s[2] = (o) => (I(t).pagesY = o)),
                    min: 1,
                    "computed-value": I(Is)(I(t).stepsY),
                  },
                  null,
                  8,
                  ["modelValue", "computed-value"]
                ),
              ]),
              hu,
              S("main", gu, [
                mu,
                O(
                  ko,
                  {
                    label: "X",
                    modelValue: I(t).manualOffsetX,
                    "onUpdate:modelValue":
                      s[3] || (s[3] = (o) => (I(t).manualOffsetX = o)),
                    min: 0,
                    max: 1,
                    disabled: I(t).usePageScroll,
                  },
                  null,
                  8,
                  ["modelValue", "disabled"]
                ),
                O(
                  ko,
                  {
                    label: "Y",
                    modelValue: I(t).manualOffsetY,
                    "onUpdate:modelValue":
                      s[4] || (s[4] = (o) => (I(t).manualOffsetY = o)),
                    min: 0,
                    max: 1,
                    disabled: I(t).usePageScroll,
                  },
                  null,
                  8,
                  ["modelValue", "disabled"]
                ),
              ]),
            ]),
            _: 1,
          }
        )
      );
    },
  });
const vu = he(_u, [["__scopeId", "data-v-3bdd09ee"]]);
function pt(...e) {
  return e;
}
const bu = { class: "option-strip field" },
  yu = { key: 0 },
  wu = { class: "strip" },
  Cu = ["onClick"],
  xu = ce({
    __name: "OptionStripField",
    props: fn({ label: {}, options: {} }, { modelValue: { required: !0 } }),
    emits: ["update:modelValue"],
    setup(e) {
      const t = un(e, "modelValue");
      return (n, s) => {
        const o = Nt("wave");
        return (
          U(),
          ne("div", bu, [
            n.label ? (U(), ne("label", yu, de(n.label), 1)) : Wt("", !0),
            S("div", wu, [
              (U(!0),
              ne(
                xe,
                null,
                Ds(n.options, ([r, i]) =>
                  Ke(
                    (U(),
                    ne(
                      "div",
                      {
                        class: Ve(["option", { selected: i === t.value }]),
                        onClick: (l) => (t.value = i),
                      },
                      [ve(de(r), 1)],
                      10,
                      Cu
                    )),
                    [[o]]
                  )
                ),
                256
              )),
            ]),
          ])
        );
      };
    },
  });
const ht = he(xu, [["__scopeId", "data-v-66fb61aa"]]),
  Iu = ce({
    __name: "TogglesCard",
    setup(e) {
      const t = Xs();
      return (n, s) => (
        U(),
        qe(
          kt,
          { title: "Toggles" },
          {
            default: oe(() => [
              S("main", null, [
                O(
                  ht,
                  {
                    label: "Bridge button",
                    modelValue: I(t).bridgeButtonVisibility,
                    "onUpdate:modelValue":
                      s[0] || (s[0] = (o) => (I(t).bridgeButtonVisibility = o)),
                    options: I(pt)(["Hidden", "hidden"], ["Shown", "shown"]),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
                O(
                  ht,
                  {
                    label: "Draw system wallpaper behind WebView",
                    modelValue: I(t).drawSystemWallpaperBehindWebView,
                    "onUpdate:modelValue":
                      s[1] ||
                      (s[1] = (o) =>
                        (I(t).drawSystemWallpaperBehindWebView = o)),
                    options: I(pt)(["Disabled", !1], ["Enabled", !0]),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
                O(
                  ht,
                  {
                    label: "Draw overscroll effects",
                    modelValue: I(t).overscrollEffects,
                    "onUpdate:modelValue":
                      s[2] || (s[2] = (o) => (I(t).overscrollEffects = o)),
                    options: I(pt)(
                      ["Disabled", "none"],
                      ["Enabled", "default"]
                    ),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
                O(
                  ht,
                  {
                    label: "System night mode",
                    modelValue: I(t).systemNightMode,
                    "onUpdate:modelValue":
                      s[3] || (s[3] = (o) => (I(t).systemNightMode = o)),
                    options: I(pt)(
                      ["Auto", "auto"],
                      ["Custom", "custom"],
                      ["Light", "no"],
                      ["Dark", "yes"]
                    ),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
                O(
                  ht,
                  {
                    label: "Bridge theme",
                    modelValue: I(t).bridgeTheme,
                    "onUpdate:modelValue":
                      s[4] || (s[4] = (o) => (I(t).bridgeTheme = o)),
                    options: I(pt)(
                      ["System", "system"],
                      ["Light", "light"],
                      ["Dark", "dark"]
                    ),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
                O(
                  ht,
                  {
                    label: "Status bar",
                    modelValue: I(t).statusBarAppearance,
                    "onUpdate:modelValue":
                      s[5] || (s[5] = (o) => (I(t).statusBarAppearance = o)),
                    options: I(pt)(
                      ["Hide", "hide"],
                      ["Light FG", "light-fg"],
                      ["Dark FG", "dark-fg"]
                    ),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
                O(
                  ht,
                  {
                    label: "Navigation bar",
                    modelValue: I(t).navigationBarAppearance,
                    "onUpdate:modelValue":
                      s[6] ||
                      (s[6] = (o) => (I(t).navigationBarAppearance = o)),
                    options: I(pt)(
                      ["Hide", "hide"],
                      ["Light FG", "light-fg"],
                      ["Dark FG", "dark-fg"]
                    ),
                  },
                  null,
                  8,
                  ["modelValue", "options"]
                ),
              ]),
            ]),
            _: 1,
          }
        )
      );
    },
  }),
  Eu = ce({
    __name: "ActionListItem",
    props: { disabled: { type: Boolean } },
    setup(e) {
      return (t, n) => {
        const s = Nt("wave");
        return Ke(
          (U(),
          ne(
            "div",
            { class: Ve(["action-list-item", { disabled: t.disabled }]) },
            [sn(t.$slots, "default", {}, void 0, !0)],
            2
          )),
          [[s]]
        );
      };
    },
  });
const We = he(Eu, [["__scopeId", "data-v-54e4abce"]]),
  Su = (e) => (Ct("data-v-6e199489"), (e = e()), xt(), e),
  Bu = Su(() => S("div", { class: "separator" }, null, -1)),
  Au = ce({
    __name: "MiscActionsCard",
    setup(e) {
      const t = Xs();
      function n() {
        throw new Error("Manually triggered error.");
      }
      return (s, o) => (
        U(),
        qe(
          kt,
          { title: "Actions" },
          {
            default: oe(() => [
              S("main", null, [
                O(
                  We,
                  {
                    onClick:
                      o[0] ||
                      (o[0] = (r) => s.Bridge.requestOpenBridgeSettings()),
                  },
                  { default: oe(() => [ve(" Open Bridge settings ")]), _: 1 }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[1] ||
                      (o[1] = (r) => s.Bridge.requestOpenBridgeAppDrawer()),
                  },
                  { default: oe(() => [ve(" Open Bridge app drawer ")]), _: 1 }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[2] ||
                      (o[2] = (r) => s.Bridge.requestOpenDeveloperConsole()),
                  },
                  { default: oe(() => [ve(" Open developer console ")]), _: 1 }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[3] ||
                      (o[3] = (r) => s.Bridge.requestExpandNotificationShade()),
                  },
                  {
                    default: oe(() => [ve(" Expand notification shade ")]),
                    _: 1,
                  }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[4] || (o[4] = (r) => s.Bridge.requestLockScreen()),
                    disabled: !I(t).canLockScreen,
                  },
                  { default: oe(() => [ve(" Lock screen ")]), _: 1 },
                  8,
                  ["disabled"]
                ),
                O(
                  We,
                  {
                    onClick:
                      o[5] ||
                      (o[5] = (r) => s.Bridge.requestChangeSystemWallpaper()),
                  },
                  {
                    default: oe(() => [
                      ve(" Request change system wallpaper "),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              Bu,
              S("main", null, [
                O(
                  We,
                  {
                    onClick:
                      o[6] ||
                      (o[6] = (r) => console.log("Log message", new Date())),
                  },
                  { default: oe(() => [ve(" console.log() ")]), _: 1 }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[7] ||
                      (o[7] = (r) => console.info("Info message", new Date())),
                  },
                  { default: oe(() => [ve(" console.info() ")]), _: 1 }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[8] ||
                      (o[8] = (r) =>
                        console.warn("Warning message", new Date())),
                  },
                  { default: oe(() => [ve(" console.warn() ")]), _: 1 }
                ),
                O(
                  We,
                  {
                    onClick:
                      o[9] ||
                      (o[9] = (r) =>
                        console.error("Error message", new Date())),
                  },
                  { default: oe(() => [ve(" console.error() ")]), _: 1 }
                ),
                O(
                  We,
                  { onClick: o[10] || (o[10] = (r) => n()) },
                  { default: oe(() => [ve(" throw new Error() ")]), _: 1 }
                ),
              ]),
            ]),
            _: 1,
          }
        )
      );
    },
  });
const Vu = he(Au, [["__scopeId", "data-v-6e199489"]]),
  $u = { class: "input field" },
  Ou = { key: 0 },
  Tu = ["placeholder"],
  Mu = ce({
    __name: "InputField",
    props: fn({ label: {}, placeholder: {} }, { modelValue: { required: !0 } }),
    emits: ["update:modelValue"],
    setup(e) {
      const t = un(e, "modelValue");
      return (n, s) => (
        U(),
        ne("div", $u, [
          n.label ? (U(), ne("label", Ou, de(n.label), 1)) : Wt("", !0),
          Ke(
            S(
              "input",
              {
                type: "text",
                "onUpdate:modelValue": s[0] || (s[0] = (o) => (t.value = o)),
                placeholder: n.placeholder,
              },
              null,
              8,
              Tu
            ),
            [[Yn, t.value]]
          ),
        ])
      );
    },
  });
const Wu = he(Mu, [["__scopeId", "data-v-35514456"]]),
  Pu = { class: "row" },
  Lu = ce({
    __name: "ShowToastCard",
    setup(e) {
      const t = T("Hello there!");
      return (n, s) => (
        U(),
        qe(
          kt,
          { title: "Show toast" },
          {
            default: oe(() => [
              S("main", null, [
                O(
                  Wu,
                  {
                    modelValue: t.value,
                    "onUpdate:modelValue":
                      s[0] || (s[0] = (o) => (t.value = o)),
                    placeholder: "Enter toast text...",
                  },
                  null,
                  8,
                  ["modelValue"]
                ),
                S("div", Pu, [
                  O(
                    No,
                    {
                      onClick:
                        s[1] || (s[1] = (o) => n.Bridge.showToast(t.value, !1)),
                    },
                    { default: oe(() => [ve(" Show short ")]), _: 1 }
                  ),
                  O(
                    No,
                    {
                      onClick:
                        s[2] || (s[2] = (o) => n.Bridge.showToast(t.value, !0)),
                    },
                    { default: oe(() => [ve(" Show long ")]), _: 1 }
                  ),
                ]),
              ]),
            ]),
            _: 1,
          }
        )
      );
    },
  });
const Fu = he(Lu, [["__scopeId", "data-v-c5b9b765"]]),
  Hu = { class: "column" },
  Ru = ce({
    __name: "MiscColumn",
    setup(e) {
      return (t, n) => (U(), ne("div", Hu, [O(vu), O(Iu), O(Vu), O(Fu)]));
    },
  });
const Nu = he(Ru, [["__scopeId", "data-v-2bc025d3"]]),
  Du = (e) => (Ct("data-v-740ac3cc"), (e = e()), xt(), e),
  ku = { class: "column" },
  ju = { class: "entry col" },
  Uu = { class: "sec" },
  qu = { class: "uppercase" },
  Ku = Du(() => S("span", { class: "bullet" }, null, -1)),
  Yu = ["title"],
  zu = { class: "pri" },
  Xu = { class: "sec type-mono" },
  Ju = ce({
    __name: "EventHistoryColumn",
    setup(e) {
      const t = Xn();
      function n(o) {
        switch (o) {
          case "appInstalled":
          case "appChanged":
          case "appRemoved":
            return "apps";
          case "beforePause":
          case "afterResume":
          case "canRequestSystemNightModeChanged":
          case "canLockScreenChanged":
            return "system";
          case "bridgeButtonVisibilityChanged":
          case "drawSystemWallpaperBehindWebViewChanged":
          case "systemNightModeChanged":
          case "bridgeThemeChanged":
          case "statusBarAppearanceChanged":
          case "navigationBarAppearanceChanged":
            return "toggles";
          case "statusBarsWindowInsetsChanged":
          case "statusBarsIgnoringVisibilityWindowInsetsChanged":
          case "navigationBarsWindowInsetsChanged":
          case "navigationBarsIgnoringVisibilityWindowInsetsChanged":
          case "captionBarWindowInsetsChanged":
          case "captionBarIgnoringVisibilityWindowInsetsChanged":
          case "systemBarsWindowInsetsChanged":
          case "systemBarsIgnoringVisibilityWindowInsetsChanged":
          case "imeWindowInsetsChanged":
          case "imeAnimationSourceWindowInsetsChanged":
          case "imeAnimationTargetWindowInsetsChanged":
          case "tappableElementWindowInsetsChanged":
          case "tappableElementIgnoringVisibilityWindowInsetsChanged":
          case "systemGesturesWindowInsetsChanged":
          case "mandatorySystemGesturesWindowInsetsChanged":
          case "displayCutoutWindowInsetsChanged":
          case "waterfallWindowInsetsChanged":
            return "insets";
          default:
            return "system";
        }
      }
      const s = te(() => t.eventHistory.slice().reverse());
      return (o, r) => (
        U(),
        ne("div", ku, [
          O(
            kt,
            { title: "Event history" },
            {
              actions: oe(() => [
                O(
                  an,
                  {
                    icon: I(ba),
                    onClick: r[0] || (r[0] = (i) => I(t).clearHistory()),
                  },
                  null,
                  8,
                  ["icon"]
                ),
              ]),
              default: oe(() => [
                S("main", null, [
                  (U(!0),
                  ne(
                    xe,
                    null,
                    Ds(
                      s.value,
                      (i) => (
                        U(),
                        ne("div", ju, [
                          S("div", Uu, [
                            S("span", qu, de(n(i.event[0])), 1),
                            Ku,
                            S(
                              "span",
                              { title: i.time.toLocaleString() },
                              de(I(ea)(i.time)),
                              9,
                              Yu
                            ),
                          ]),
                          S("div", zu, [S("b", null, de(i.event[0]), 1)]),
                          S("div", Xu, de(JSON.stringify(i.event[1])), 1),
                        ])
                      )
                    ),
                    256
                  )),
                ]),
              ]),
              _: 1,
            }
          ),
        ])
      );
    },
  });
const Zu = he(Ju, [["__scopeId", "data-v-740ac3cc"]]),
  Qu = ce({
    __name: "App",
    setup(e) {
      const n = Pc(),
        s = kr(),
        o = Xs(),
        r = T(),
        i = Ho(r),
        l = T(),
        c = Ho(l),
        a = Yc(l);
      return (
        Gi(() => {
          const d = i.width.value - c.width.value,
            p = i.height.value - c.height.value,
            h = a.x.value,
            w = a.y.value,
            A = d === 0 ? 0 : h / d,
            E = p === 0 ? 0 : w / p;
          requestAnimationFrame(() => {
            (s.pageScrollOffsetX = A), (s.pageScrollOffsetY = E);
          });
        }),
        Xc(l, {
          onSwipeEnd: (d, p) => {
            p === "down" &&
              a.y.value <= 1 &&
              Bridge.requestExpandNotificationShade();
          },
        }),
        (d, p) => (
          U(),
          ne(
            "div",
            {
              class: Ve(["bridge-tester-root", { dev: I(!1) }]),
              style: nt({
                "padding-top": I(Cn)(I(n).statusBars.top),
                "padding-bottom": I(Cn)(I(n).navigationBars.bottom),
              }),
              ref_key: "scrollingRef",
              ref: l,
              onClick:
                p[0] ||
                (p[0] = (h) => d.Bridge.sendWallpaperTap(h.clientX, h.clientY)),
            },
            [
              S(
                "div",
                {
                  class: Ve(["system-bar-bg top", I(o).statusBarAppearance]),
                  style: nt({ height: I(Cn)(I(n).statusBars.top) }),
                },
                null,
                6
              ),
              S(
                "div",
                { class: "columns", ref_key: "columnsRef", ref: r },
                [O(pa), O(Ya), O(Nu), O(Zu)],
                512
              ),
              S(
                "div",
                {
                  class: Ve([
                    "system-bar-bg bot",
                    I(o).navigationBarAppearance,
                  ]),
                  style: nt({ height: I(Cn)(I(n).navigationBars.bottom) }),
                },
                null,
                6
              ),
            ],
            6
          )
        )
      );
    },
  });
const Gu = he(Qu, [["__scopeId", "data-v-36b92cad"]]);
console.log("@main: !!window.Bridge:", !!window.Bridge);
const Zn = gc(Gu);
Zn.config.globalProperties.Bridge = Bridge;
Zn.use(vc());
Zn.use(Mc, { cancellationPeriod: 100 });
Zn.mount("#app");
