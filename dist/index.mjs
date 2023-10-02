var Pi = Object.defineProperty;
var wi = (e, t, n) => t in e ? Pi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => (wi(e, typeof t != "symbol" ? t + "" : t, n), n);
function xn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const B = {}, et = [], Ee = () => {
}, Li = () => !1, Ri = /^on[^a-z]/, Xt = (e) => Ri.test(e), Cn = (e) => e.startsWith("onUpdate:"), V = Object.assign, An = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Fi = Object.prototype.hasOwnProperty, L = (e, t) => Fi.call(e, t), I = Array.isArray, tt = (e) => Vt(e) === "[object Map]", ws = (e) => Vt(e) === "[object Set]", M = (e) => typeof e == "function", J = (e) => typeof e == "string", Mn = (e) => typeof e == "symbol", Y = (e) => e !== null && typeof e == "object", Ls = (e) => Y(e) && M(e.then) && M(e.catch), Rs = Object.prototype.toString, Vt = (e) => Rs.call(e), ji = (e) => Vt(e).slice(8, -1), Fs = (e) => Vt(e) === "[object Object]", Pn = (e) => J(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Jt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, zi = /-(\w)/g, Ce = Jt((e) => e.replace(zi, (t, n) => n ? n.toUpperCase() : "")), Ui = /\B([A-Z])/g, me = Jt(
  (e) => e.replace(Ui, "-$1").toLowerCase()
), js = Jt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), pn = Jt(
  (e) => e ? `on${js(e)}` : ""
), vt = (e, t) => !Object.is(e, t), un = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Gt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Hi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ns = (e) => {
  const t = J(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let ss;
const gn = () => ss || (ss = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ae(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = J(s) ? Ki(s) : Ae(s);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else {
    if (J(e))
      return e;
    if (Y(e))
      return e;
  }
}
const Gi = /;(?![^(]*\))/g, $i = /:([^]+)/, Bi = /\/\*[^]*?\*\//g;
function Ki(e) {
  const t = {};
  return e.replace(Bi, "").split(Gi).forEach((n) => {
    if (n) {
      const s = n.split($i);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Qt(e) {
  let t = "";
  if (J(e))
    t = e;
  else if (I(e))
    for (let n = 0; n < e.length; n++) {
      const s = Qt(e[n]);
      s && (t += s + " ");
    }
  else if (Y(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Yi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Wi = /* @__PURE__ */ xn(Yi);
function zs(e) {
  return !!e || e === "";
}
const Et = (e) => J(e) ? e : e == null ? "" : I(e) || Y(e) && (e.toString === Rs || !M(e.toString)) ? JSON.stringify(e, Us, 2) : String(e), Us = (e, t) => t && t.__v_isRef ? Us(e, t.value) : tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, i]) => (n[`${s} =>`] = i, n), {})
} : ws(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : Y(t) && !I(t) && !Fs(t) ? String(t) : t;
let de;
class Xi {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = de, !t && de && (this.index = (de.scopes || (de.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = de;
      try {
        return de = this, t();
      } finally {
        de = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    de = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    de = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Vi(e, t = de) {
  t && t.active && t.effects.push(e);
}
function Ji() {
  return de;
}
const wn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Hs = (e) => (e.w & ze) > 0, Gs = (e) => (e.n & ze) > 0, Qi = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ze;
}, qi = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      Hs(i) && !Gs(i) ? i.delete(e) : t[n++] = i, i.w &= ~ze, i.n &= ~ze;
    }
    t.length = n;
  }
}, vn = /* @__PURE__ */ new WeakMap();
let ft = 0, ze = 1;
const En = 30;
let ge;
const Xe = Symbol(""), yn = Symbol("");
class Ln {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Vi(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ge, n = Fe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ge, ge = this, Fe = !0, ze = 1 << ++ft, ft <= En ? Qi(this) : is(this), this.fn();
    } finally {
      ft <= En && qi(this), ze = 1 << --ft, ge = this.parent, Fe = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ge === this ? this.deferStop = !0 : this.active && (is(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function is(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Fe = !0;
const $s = [];
function lt() {
  $s.push(Fe), Fe = !1;
}
function ct() {
  const e = $s.pop();
  Fe = e === void 0 ? !0 : e;
}
function le(e, t, n) {
  if (Fe && ge) {
    let s = vn.get(e);
    s || vn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = wn()), Bs(i);
  }
}
function Bs(e, t) {
  let n = !1;
  ft <= En ? Gs(e) || (e.n |= ze, n = !Hs(e)) : n = !e.has(ge), n && (e.add(ge), ge.deps.push(e));
}
function Me(e, t, n, s, i, o) {
  const r = vn.get(e);
  if (!r)
    return;
  let c = [];
  if (t === "clear")
    c = [...r.values()];
  else if (n === "length" && I(e)) {
    const a = Number(s);
    r.forEach((u, d) => {
      (d === "length" || d >= a) && c.push(u);
    });
  } else
    switch (n !== void 0 && c.push(r.get(n)), t) {
      case "add":
        I(e) ? Pn(n) && c.push(r.get("length")) : (c.push(r.get(Xe)), tt(e) && c.push(r.get(yn)));
        break;
      case "delete":
        I(e) || (c.push(r.get(Xe)), tt(e) && c.push(r.get(yn)));
        break;
      case "set":
        tt(e) && c.push(r.get(Xe));
        break;
    }
  if (c.length === 1)
    c[0] && bn(c[0]);
  else {
    const a = [];
    for (const u of c)
      u && a.push(...u);
    bn(wn(a));
  }
}
function bn(e, t) {
  const n = I(e) ? e : [...e];
  for (const s of n)
    s.computed && os(s);
  for (const s of n)
    s.computed || os(s);
}
function os(e, t) {
  (e !== ge || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Zi = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), Ks = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Mn)
), eo = /* @__PURE__ */ Rn(), to = /* @__PURE__ */ Rn(!1, !0), no = /* @__PURE__ */ Rn(!0), rs = /* @__PURE__ */ so();
function so() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = R(this);
      for (let o = 0, r = this.length; o < r; o++)
        le(s, "get", o + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(R)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      lt();
      const s = R(this)[t].apply(this, n);
      return ct(), s;
    };
  }), e;
}
function io(e) {
  const t = R(this);
  return le(t, "has", e), t.hasOwnProperty(e);
}
function Rn(e = !1, t = !1) {
  return function(s, i, o) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && o === (e ? t ? bo : Js : t ? Vs : Xs).get(s))
      return s;
    const r = I(s);
    if (!e) {
      if (r && L(rs, i))
        return Reflect.get(rs, i, o);
      if (i === "hasOwnProperty")
        return io;
    }
    const c = Reflect.get(s, i, o);
    return (Mn(i) ? Ks.has(i) : Zi(i)) || (e || le(s, "get", i), t) ? c : te(c) ? r && Pn(i) ? c : c.value : Y(c) ? e ? Qs(c) : zn(c) : c;
  };
}
const oo = /* @__PURE__ */ Ys(), ro = /* @__PURE__ */ Ys(!0);
function Ys(e = !1) {
  return function(n, s, i, o) {
    let r = n[s];
    if (it(r) && te(r) && !te(i))
      return !1;
    if (!e && (!$t(i) && !it(i) && (r = R(r), i = R(i)), !I(n) && te(r) && !te(i)))
      return r.value = i, !0;
    const c = I(n) && Pn(s) ? Number(s) < n.length : L(n, s), a = Reflect.set(n, s, i, o);
    return n === R(o) && (c ? vt(i, r) && Me(n, "set", s, i) : Me(n, "add", s, i)), a;
  };
}
function lo(e, t) {
  const n = L(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Me(e, "delete", t, void 0), s;
}
function co(e, t) {
  const n = Reflect.has(e, t);
  return (!Mn(t) || !Ks.has(t)) && le(e, "has", t), n;
}
function ao(e) {
  return le(e, "iterate", I(e) ? "length" : Xe), Reflect.ownKeys(e);
}
const Ws = {
  get: eo,
  set: oo,
  deleteProperty: lo,
  has: co,
  ownKeys: ao
}, po = {
  get: no,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, uo = /* @__PURE__ */ V(
  {},
  Ws,
  {
    get: to,
    set: ro
  }
), Fn = (e) => e, qt = (e) => Reflect.getPrototypeOf(e);
function At(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = R(e), o = R(t);
  n || (t !== o && le(i, "get", t), le(i, "get", o));
  const { has: r } = qt(i), c = s ? Fn : n ? Hn : yt;
  if (r.call(i, t))
    return c(e.get(t));
  if (r.call(i, o))
    return c(e.get(o));
  e !== i && e.get(t);
}
function Mt(e, t = !1) {
  const n = this.__v_raw, s = R(n), i = R(e);
  return t || (e !== i && le(s, "has", e), le(s, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Pt(e, t = !1) {
  return e = e.__v_raw, !t && le(R(e), "iterate", Xe), Reflect.get(e, "size", e);
}
function ls(e) {
  e = R(e);
  const t = R(this);
  return qt(t).has.call(t, e) || (t.add(e), Me(t, "add", e, e)), this;
}
function cs(e, t) {
  t = R(t);
  const n = R(this), { has: s, get: i } = qt(n);
  let o = s.call(n, e);
  o || (e = R(e), o = s.call(n, e));
  const r = i.call(n, e);
  return n.set(e, t), o ? vt(t, r) && Me(n, "set", e, t) : Me(n, "add", e, t), this;
}
function as(e) {
  const t = R(this), { has: n, get: s } = qt(t);
  let i = n.call(t, e);
  i || (e = R(e), i = n.call(t, e)), s && s.call(t, e);
  const o = t.delete(e);
  return i && Me(t, "delete", e, void 0), o;
}
function ps() {
  const e = R(this), t = e.size !== 0, n = e.clear();
  return t && Me(e, "clear", void 0, void 0), n;
}
function wt(e, t) {
  return function(s, i) {
    const o = this, r = o.__v_raw, c = R(r), a = t ? Fn : e ? Hn : yt;
    return !e && le(c, "iterate", Xe), r.forEach((u, d) => s.call(i, a(u), a(d), o));
  };
}
function Lt(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, o = R(i), r = tt(o), c = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, u = i[e](...s), d = n ? Fn : t ? Hn : yt;
    return !t && le(
      o,
      "iterate",
      a ? yn : Xe
    ), {
      // iterator protocol
      next() {
        const { value: g, done: k } = u.next();
        return k ? { value: g, done: k } : {
          value: c ? [d(g[0]), d(g[1])] : d(g),
          done: k
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function we(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function _o() {
  const e = {
    get(o) {
      return At(this, o);
    },
    get size() {
      return Pt(this);
    },
    has: Mt,
    add: ls,
    set: cs,
    delete: as,
    clear: ps,
    forEach: wt(!1, !1)
  }, t = {
    get(o) {
      return At(this, o, !1, !0);
    },
    get size() {
      return Pt(this);
    },
    has: Mt,
    add: ls,
    set: cs,
    delete: as,
    clear: ps,
    forEach: wt(!1, !0)
  }, n = {
    get(o) {
      return At(this, o, !0);
    },
    get size() {
      return Pt(this, !0);
    },
    has(o) {
      return Mt.call(this, o, !0);
    },
    add: we("add"),
    set: we("set"),
    delete: we("delete"),
    clear: we("clear"),
    forEach: wt(!0, !1)
  }, s = {
    get(o) {
      return At(this, o, !0, !0);
    },
    get size() {
      return Pt(this, !0);
    },
    has(o) {
      return Mt.call(this, o, !0);
    },
    add: we("add"),
    set: we("set"),
    delete: we("delete"),
    clear: we("clear"),
    forEach: wt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Lt(
      o,
      !1,
      !1
    ), n[o] = Lt(
      o,
      !0,
      !1
    ), t[o] = Lt(
      o,
      !1,
      !0
    ), s[o] = Lt(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  fo,
  ho,
  mo,
  go
] = /* @__PURE__ */ _o();
function jn(e, t) {
  const n = t ? e ? go : mo : e ? ho : fo;
  return (s, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    L(n, i) && i in s ? n : s,
    i,
    o
  );
}
const vo = {
  get: /* @__PURE__ */ jn(!1, !1)
}, Eo = {
  get: /* @__PURE__ */ jn(!1, !0)
}, yo = {
  get: /* @__PURE__ */ jn(!0, !1)
}, Xs = /* @__PURE__ */ new WeakMap(), Vs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap();
function ko(e) {
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
function Do(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ko(ji(e));
}
function zn(e) {
  return it(e) ? e : Un(
    e,
    !1,
    Ws,
    vo,
    Xs
  );
}
function To(e) {
  return Un(
    e,
    !1,
    uo,
    Eo,
    Vs
  );
}
function Qs(e) {
  return Un(
    e,
    !0,
    po,
    yo,
    Js
  );
}
function Un(e, t, n, s, i) {
  if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = Do(e);
  if (r === 0)
    return e;
  const c = new Proxy(
    e,
    r === 2 ? s : n
  );
  return i.set(e, c), c;
}
function nt(e) {
  return it(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function it(e) {
  return !!(e && e.__v_isReadonly);
}
function $t(e) {
  return !!(e && e.__v_isShallow);
}
function qs(e) {
  return nt(e) || it(e);
}
function R(e) {
  const t = e && e.__v_raw;
  return t ? R(t) : e;
}
function Zs(e) {
  return Gt(e, "__v_skip", !0), e;
}
const yt = (e) => Y(e) ? zn(e) : e, Hn = (e) => Y(e) ? Qs(e) : e;
function ei(e) {
  Fe && ge && (e = R(e), Bs(e.dep || (e.dep = wn())));
}
function ti(e, t) {
  e = R(e);
  const n = e.dep;
  n && bn(n);
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
function Re(e) {
  return So(e, !1);
}
function So(e, t) {
  return te(e) ? e : new Oo(e, t);
}
class Oo {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : R(t), this._value = n ? t : yt(t);
  }
  get value() {
    return ei(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || $t(t) || it(t);
    t = n ? t : R(t), vt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : yt(t), ti(this));
  }
}
function K(e) {
  return te(e) ? e.value : e;
}
const No = {
  get: (e, t, n) => K(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return te(i) && !te(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function ni(e) {
  return nt(e) ? e : new Proxy(e, No);
}
class Io {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Ln(t, () => {
      this._dirty || (this._dirty = !0, ti(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = R(this);
    return ei(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function xo(e, t, n = !1) {
  let s, i;
  const o = M(e);
  return o ? (s = e, i = Ee) : (s = e.get, i = e.set), new Io(s, i, o || !i, n);
}
function je(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (o) {
    Zt(o, t, n);
  }
  return i;
}
function ye(e, t, n, s) {
  if (M(e)) {
    const o = je(e, t, n, s);
    return o && Ls(o) && o.catch((r) => {
      Zt(r, t, n);
    }), o;
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    i.push(ye(e[o], t, n, s));
  return i;
}
function Zt(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const r = t.proxy, c = n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, r, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      je(
        a,
        null,
        10,
        [e, r, c]
      );
      return;
    }
  }
  Co(e, n, i, s);
}
function Co(e, t, n, s = !0) {
  console.error(e);
}
let bt = !1, kn = !1;
const Z = [];
let Oe = 0;
const st = [];
let xe = null, Ye = 0;
const si = /* @__PURE__ */ Promise.resolve();
let Gn = null;
function ii(e) {
  const t = Gn || si;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ao(e) {
  let t = Oe + 1, n = Z.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    kt(Z[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function $n(e) {
  (!Z.length || !Z.includes(
    e,
    bt && e.allowRecurse ? Oe + 1 : Oe
  )) && (e.id == null ? Z.push(e) : Z.splice(Ao(e.id), 0, e), oi());
}
function oi() {
  !bt && !kn && (kn = !0, Gn = si.then(li));
}
function Mo(e) {
  const t = Z.indexOf(e);
  t > Oe && Z.splice(t, 1);
}
function Po(e) {
  I(e) ? st.push(...e) : (!xe || !xe.includes(
    e,
    e.allowRecurse ? Ye + 1 : Ye
  )) && st.push(e), oi();
}
function us(e, t = bt ? Oe + 1 : 0) {
  for (; t < Z.length; t++) {
    const n = Z[t];
    n && n.pre && (Z.splice(t, 1), t--, n());
  }
}
function ri(e) {
  if (st.length) {
    const t = [...new Set(st)];
    if (st.length = 0, xe) {
      xe.push(...t);
      return;
    }
    for (xe = t, xe.sort((n, s) => kt(n) - kt(s)), Ye = 0; Ye < xe.length; Ye++)
      xe[Ye]();
    xe = null, Ye = 0;
  }
}
const kt = (e) => e.id == null ? 1 / 0 : e.id, wo = (e, t) => {
  const n = kt(e) - kt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function li(e) {
  kn = !1, bt = !0, Z.sort(wo);
  const t = Ee;
  try {
    for (Oe = 0; Oe < Z.length; Oe++) {
      const n = Z[Oe];
      n && n.active !== !1 && je(n, null, 14);
    }
  } finally {
    Oe = 0, Z.length = 0, ri(), bt = !1, Gn = null, (Z.length || st.length) && li();
  }
}
function Lo(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || B;
  let i = n;
  const o = t.startsWith("update:"), r = o && t.slice(7);
  if (r && r in s) {
    const d = `${r === "modelValue" ? "model" : r}Modifiers`, { number: g, trim: k } = s[d] || B;
    k && (i = n.map((x) => J(x) ? x.trim() : x)), g && (i = n.map(Hi));
  }
  let c, a = s[c = pn(t)] || // also try camelCase event handler (#2249)
  s[c = pn(Ce(t))];
  !a && o && (a = s[c = pn(me(t))]), a && ye(
    a,
    e,
    6,
    i
  );
  const u = s[c + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ye(
      u,
      e,
      6,
      i
    );
  }
}
function ci(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, c = !1;
  if (!M(e)) {
    const a = (u) => {
      const d = ci(u, t, !0);
      d && (c = !0, V(r, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !c ? (Y(e) && s.set(e, null), null) : (I(o) ? o.forEach((a) => r[a] = null) : V(r, o), Y(e) && s.set(e, r), r);
}
function en(e, t) {
  return !e || !Xt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, me(t)) || L(e, t));
}
let Ne = null, ai = null;
function Bt(e) {
  const t = Ne;
  return Ne = e, ai = e && e.type.__scopeId || null, t;
}
function Ro(e, t = Ne, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && bs(-1);
    const o = Bt(t);
    let r;
    try {
      r = e(...i);
    } finally {
      Bt(o), s._d && bs(1);
    }
    return r;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function _n(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    props: o,
    propsOptions: [r],
    slots: c,
    attrs: a,
    emit: u,
    render: d,
    renderCache: g,
    data: k,
    setupState: x,
    ctx: z,
    inheritAttrs: w
  } = e;
  let $, Q;
  const A = Bt(e);
  try {
    if (n.shapeFlag & 4) {
      const O = i || s;
      $ = Se(
        d.call(
          O,
          O,
          g,
          o,
          x,
          k,
          z
        )
      ), Q = a;
    } else {
      const O = t;
      $ = Se(
        O.length > 1 ? O(
          o,
          { attrs: a, slots: c, emit: u }
        ) : O(
          o,
          null
          /* we know it doesn't need it */
        )
      ), Q = t.props ? a : Fo(a);
    }
  } catch (O) {
    gt.length = 0, Zt(O, e, 1), $ = ie(Dt);
  }
  let N = $;
  if (Q && w !== !1) {
    const O = Object.keys(Q), { shapeFlag: pe } = N;
    O.length && pe & 7 && (r && O.some(Cn) && (Q = jo(
      Q,
      r
    )), N = ot(N, Q));
  }
  return n.dirs && (N = ot(N), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && (N.transition = n.transition), $ = N, Bt(A), $;
}
const Fo = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Xt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, jo = (e, t) => {
  const n = {};
  for (const s in e)
    (!Cn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function zo(e, t, n) {
  const { props: s, children: i, component: o } = e, { props: r, children: c, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? _s(s, r, u) : !!r;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        const k = d[g];
        if (r[k] !== s[k] && !en(u, k))
          return !0;
      }
    }
  } else
    return (i || c) && (!c || !c.$stable) ? !0 : s === r ? !1 : s ? r ? _s(s, r, u) : !0 : !!r;
  return !1;
}
function _s(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    if (t[o] !== e[o] && !en(n, o))
      return !0;
  }
  return !1;
}
function Uo({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Ho = (e) => e.__isSuspense;
function Go(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : Po(e);
}
const Rt = {};
function dn(e, t, n) {
  return pi(e, t, n);
}
function pi(e, t, { immediate: n, deep: s, flush: i, onTrack: o, onTrigger: r } = B) {
  var c;
  const a = Ji() === ((c = ee) == null ? void 0 : c.scope) ? ee : null;
  let u, d = !1, g = !1;
  if (te(e) ? (u = () => e.value, d = $t(e)) : nt(e) ? (u = () => e, s = !0) : I(e) ? (g = !0, d = e.some((O) => nt(O) || $t(O)), u = () => e.map((O) => {
    if (te(O))
      return O.value;
    if (nt(O))
      return Ze(O);
    if (M(O))
      return je(O, a, 2);
  })) : M(e) ? t ? u = () => je(e, a, 2) : u = () => {
    if (!(a && a.isUnmounted))
      return k && k(), ye(
        e,
        a,
        3,
        [x]
      );
  } : u = Ee, t && s) {
    const O = u;
    u = () => Ze(O());
  }
  let k, x = (O) => {
    k = A.onStop = () => {
      je(O, a, 4);
    };
  }, z;
  if (St)
    if (x = Ee, t ? n && ye(t, a, 3, [
      u(),
      g ? [] : void 0,
      x
    ]) : u(), i === "sync") {
      const O = Fr();
      z = O.__watcherHandles || (O.__watcherHandles = []);
    } else
      return Ee;
  let w = g ? new Array(e.length).fill(Rt) : Rt;
  const $ = () => {
    if (A.active)
      if (t) {
        const O = A.run();
        (s || d || (g ? O.some(
          (pe, pt) => vt(pe, w[pt])
        ) : vt(O, w))) && (k && k(), ye(t, a, 3, [
          O,
          // pass undefined as the old value when it's changed for the first time
          w === Rt ? void 0 : g && w[0] === Rt ? [] : w,
          x
        ]), w = O);
      } else
        A.run();
  };
  $.allowRecurse = !!t;
  let Q;
  i === "sync" ? Q = $ : i === "post" ? Q = () => oe($, a && a.suspense) : ($.pre = !0, a && ($.id = a.uid), Q = () => $n($));
  const A = new Ln(u, Q);
  t ? n ? $() : w = A.run() : i === "post" ? oe(
    A.run.bind(A),
    a && a.suspense
  ) : A.run();
  const N = () => {
    A.stop(), a && a.scope && An(a.scope.effects, A);
  };
  return z && z.push(N), N;
}
function $o(e, t, n) {
  const s = this.proxy, i = J(e) ? e.includes(".") ? ui(s, e) : () => s[e] : e.bind(s, s);
  let o;
  M(t) ? o = t : (o = t.handler, n = t);
  const r = ee;
  rt(this);
  const c = pi(i, o.bind(s), n);
  return r ? rt(r) : Ve(), c;
}
function ui(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function Ze(e, t) {
  if (!Y(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), te(e))
    Ze(e.value, t);
  else if (I(e))
    for (let n = 0; n < e.length; n++)
      Ze(e[n], t);
  else if (ws(e) || tt(e))
    e.forEach((n) => {
      Ze(n, t);
    });
  else if (Fs(e))
    for (const n in e)
      Ze(e[n], t);
  return e;
}
function Be(e, t, n, s) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const c = i[r];
    o && (c.oldValue = o[r].value);
    let a = c.dir[s];
    a && (lt(), ye(a, n, 8, [
      e.el,
      c,
      e,
      t
    ]), ct());
  }
}
function tn(e, t) {
  return M(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => V({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const jt = (e) => !!e.type.__asyncLoader, _i = (e) => e.type.__isKeepAlive;
function Bo(e, t) {
  di(e, "a", t);
}
function Ko(e, t) {
  di(e, "da", t);
}
function di(e, t, n = ee) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (nn(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      _i(i.parent.vnode) && Yo(s, t, n, i), i = i.parent;
  }
}
function Yo(e, t, n, s) {
  const i = nn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  hi(() => {
    An(s[t], i);
  }, n);
}
function nn(e, t, n = ee, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...r) => {
      if (n.isUnmounted)
        return;
      lt(), rt(n);
      const c = ye(t, n, e, r);
      return Ve(), ct(), c;
    });
    return s ? i.unshift(o) : i.push(o), o;
  }
}
const Pe = (e) => (t, n = ee) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!St || e === "sp") && nn(e, (...s) => t(...s), n)
), Wo = Pe("bm"), fi = Pe("m"), Xo = Pe("bu"), Vo = Pe("u"), Jo = Pe("bum"), hi = Pe("um"), Qo = Pe("sp"), qo = Pe(
  "rtg"
), Zo = Pe(
  "rtc"
);
function er(e, t = ee) {
  nn("ec", e, t);
}
const tr = Symbol.for("v-ndc");
function mi(e, t, n, s) {
  let i;
  const o = n && n[s];
  if (I(e) || J(e)) {
    i = new Array(e.length);
    for (let r = 0, c = e.length; r < c; r++)
      i[r] = t(e[r], r, void 0, o && o[r]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let r = 0; r < e; r++)
      i[r] = t(r + 1, r, void 0, o && o[r]);
  } else if (Y(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (r, c) => t(r, c, void 0, o && o[c])
      );
    else {
      const r = Object.keys(e);
      i = new Array(r.length);
      for (let c = 0, a = r.length; c < a; c++) {
        const u = r[c];
        i[c] = t(e[u], u, c, o && o[c]);
      }
    }
  else
    i = [];
  return n && (n[s] = i), i;
}
const Dn = (e) => e ? Ni(e) ? Xn(e) || e.proxy : Dn(e.parent) : null, mt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ V(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Dn(e.parent),
    $root: (e) => Dn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Bn(e),
    $forceUpdate: (e) => e.f || (e.f = () => $n(e.update)),
    $nextTick: (e) => e.n || (e.n = ii.bind(e.proxy)),
    $watch: (e) => $o.bind(e)
  })
), fn = (e, t) => e !== B && !e.__isScriptSetup && L(e, t), nr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: i, props: o, accessCache: r, type: c, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const x = r[t];
      if (x !== void 0)
        switch (x) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (fn(s, t))
          return r[t] = 1, s[t];
        if (i !== B && L(i, t))
          return r[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && L(u, t)
        )
          return r[t] = 3, o[t];
        if (n !== B && L(n, t))
          return r[t] = 4, n[t];
        Tn && (r[t] = 0);
      }
    }
    const d = mt[t];
    let g, k;
    if (d)
      return t === "$attrs" && le(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (g = c.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== B && L(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      k = a.config.globalProperties, L(k, t)
    )
      return k[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: o } = e;
    return fn(i, t) ? (i[t] = n, !0) : s !== B && L(s, t) ? (s[t] = n, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: o }
  }, r) {
    let c;
    return !!n[r] || e !== B && L(e, r) || fn(t, r) || (c = o[0]) && L(c, r) || L(s, r) || L(mt, r) || L(i.config.globalProperties, r);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ds(e) {
  return I(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Tn = !0;
function sr(e) {
  const t = Bn(e), n = e.proxy, s = e.ctx;
  Tn = !1, t.beforeCreate && fs(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: c,
    provide: a,
    inject: u,
    // lifecycle
    created: d,
    beforeMount: g,
    mounted: k,
    beforeUpdate: x,
    updated: z,
    activated: w,
    deactivated: $,
    beforeDestroy: Q,
    beforeUnmount: A,
    destroyed: N,
    unmounted: O,
    render: pe,
    renderTracked: pt,
    renderTriggered: Ot,
    errorCaptured: Ue,
    serverPrefetch: rn,
    // public API
    expose: He,
    inheritAttrs: ut,
    // assets
    components: Nt,
    directives: It,
    filters: ln
  } = t;
  if (u && ir(u, s, null), r)
    for (const W in r) {
      const U = r[W];
      M(U) && (s[W] = U.bind(n));
    }
  if (i) {
    const W = i.call(n, n);
    Y(W) && (e.data = zn(W));
  }
  if (Tn = !0, o)
    for (const W in o) {
      const U = o[W], Ge = M(U) ? U.bind(n, n) : M(U.get) ? U.get.bind(n, n) : Ee, xt = !M(U) && M(U.set) ? U.set.bind(n) : Ee, $e = Lr({
        get: Ge,
        set: xt
      });
      Object.defineProperty(s, W, {
        enumerable: !0,
        configurable: !0,
        get: () => $e.value,
        set: (be) => $e.value = be
      });
    }
  if (c)
    for (const W in c)
      gi(c[W], s, n, W);
  if (a) {
    const W = M(a) ? a.call(n) : a;
    Reflect.ownKeys(W).forEach((U) => {
      pr(U, W[U]);
    });
  }
  d && fs(d, e, "c");
  function ne(W, U) {
    I(U) ? U.forEach((Ge) => W(Ge.bind(n))) : U && W(U.bind(n));
  }
  if (ne(Wo, g), ne(fi, k), ne(Xo, x), ne(Vo, z), ne(Bo, w), ne(Ko, $), ne(er, Ue), ne(Zo, pt), ne(qo, Ot), ne(Jo, A), ne(hi, O), ne(Qo, rn), I(He))
    if (He.length) {
      const W = e.exposed || (e.exposed = {});
      He.forEach((U) => {
        Object.defineProperty(W, U, {
          get: () => n[U],
          set: (Ge) => n[U] = Ge
        });
      });
    } else
      e.exposed || (e.exposed = {});
  pe && e.render === Ee && (e.render = pe), ut != null && (e.inheritAttrs = ut), Nt && (e.components = Nt), It && (e.directives = It);
}
function ir(e, t, n = Ee) {
  I(e) && (e = Sn(e));
  for (const s in e) {
    const i = e[s];
    let o;
    Y(i) ? "default" in i ? o = zt(
      i.from || s,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = zt(i.from || s) : o = zt(i), te(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[s] = o;
  }
}
function fs(e, t, n) {
  ye(
    I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function gi(e, t, n, s) {
  const i = s.includes(".") ? ui(n, s) : () => n[s];
  if (J(e)) {
    const o = t[e];
    M(o) && dn(i, o);
  } else if (M(e))
    dn(i, e.bind(n));
  else if (Y(e))
    if (I(e))
      e.forEach((o) => gi(o, t, n, s));
    else {
      const o = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(o) && dn(i, o, e);
    }
}
function Bn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach(
    (u) => Kt(a, u, r, !0)
  ), Kt(a, t, r)), Y(t) && o.set(t, a), a;
}
function Kt(e, t, n, s = !1) {
  const { mixins: i, extends: o } = t;
  o && Kt(e, o, n, !0), i && i.forEach(
    (r) => Kt(e, r, n, !0)
  );
  for (const r in t)
    if (!(s && r === "expose")) {
      const c = or[r] || n && n[r];
      e[r] = c ? c(e[r], t[r]) : t[r];
    }
  return e;
}
const or = {
  data: hs,
  props: ms,
  emits: ms,
  // objects
  methods: ht,
  computed: ht,
  // lifecycle
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  // assets
  components: ht,
  directives: ht,
  // watch
  watch: lr,
  // provide / inject
  provide: hs,
  inject: rr
};
function hs(e, t) {
  return t ? e ? function() {
    return V(
      M(e) ? e.call(this, this) : e,
      M(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function rr(e, t) {
  return ht(Sn(e), Sn(t));
}
function Sn(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ht(e, t) {
  return e ? V(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ms(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : V(
    /* @__PURE__ */ Object.create(null),
    ds(e),
    ds(t ?? {})
  ) : t;
}
function lr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = V(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = se(e[s], t[s]);
  return n;
}
function vi() {
  return {
    app: null,
    config: {
      isNativeTag: Li,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let cr = 0;
function ar(e, t) {
  return function(s, i = null) {
    M(s) || (s = V({}, s)), i != null && !Y(i) && (i = null);
    const o = vi(), r = /* @__PURE__ */ new Set();
    let c = !1;
    const a = o.app = {
      _uid: cr++,
      _component: s,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: jr,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...d) {
        return r.has(u) || (u && M(u.install) ? (r.add(u), u.install(a, ...d)) : M(u) && (r.add(u), u(a, ...d))), a;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), a;
      },
      component(u, d) {
        return d ? (o.components[u] = d, a) : o.components[u];
      },
      directive(u, d) {
        return d ? (o.directives[u] = d, a) : o.directives[u];
      },
      mount(u, d, g) {
        if (!c) {
          const k = ie(
            s,
            i
          );
          return k.appContext = o, d && t ? t(k, u) : e(k, u, g), c = !0, a._container = u, u.__vue_app__ = a, Xn(k.component) || k.component.proxy;
        }
      },
      unmount() {
        c && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, d) {
        return o.provides[u] = d, a;
      },
      runWithContext(u) {
        Yt = a;
        try {
          return u();
        } finally {
          Yt = null;
        }
      }
    };
    return a;
  };
}
let Yt = null;
function pr(e, t) {
  if (ee) {
    let n = ee.provides;
    const s = ee.parent && ee.parent.provides;
    s === n && (n = ee.provides = Object.create(s)), n[e] = t;
  }
}
function zt(e, t, n = !1) {
  const s = ee || Ne;
  if (s || Yt) {
    const i = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Yt._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && M(t) ? t.call(s && s.proxy) : t;
  }
}
function ur(e, t, n, s = !1) {
  const i = {}, o = {};
  Gt(o, on, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Ei(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  n ? e.props = s ? i : To(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function _r(e, t, n, s) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, c = R(i), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        let k = d[g];
        if (en(e.emitsOptions, k))
          continue;
        const x = t[k];
        if (a)
          if (L(o, k))
            x !== o[k] && (o[k] = x, u = !0);
          else {
            const z = Ce(k);
            i[z] = On(
              a,
              c,
              z,
              x,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          x !== o[k] && (o[k] = x, u = !0);
      }
    }
  } else {
    Ei(e, t, i, o) && (u = !0);
    let d;
    for (const g in c)
      (!t || // for camelCase
      !L(t, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = me(g)) === g || !L(t, d))) && (a ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[d] !== void 0) && (i[g] = On(
        a,
        c,
        g,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[g]);
    if (o !== c)
      for (const g in o)
        (!t || !L(t, g)) && (delete o[g], u = !0);
  }
  u && Me(e, "set", "$attrs");
}
function Ei(e, t, n, s) {
  const [i, o] = e.propsOptions;
  let r = !1, c;
  if (t)
    for (let a in t) {
      if (Ft(a))
        continue;
      const u = t[a];
      let d;
      i && L(i, d = Ce(a)) ? !o || !o.includes(d) ? n[d] = u : (c || (c = {}))[d] = u : en(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, r = !0);
    }
  if (o) {
    const a = R(n), u = c || B;
    for (let d = 0; d < o.length; d++) {
      const g = o[d];
      n[g] = On(
        i,
        a,
        g,
        u[g],
        e,
        !L(u, g)
      );
    }
  }
  return r;
}
function On(e, t, n, s, i, o) {
  const r = e[n];
  if (r != null) {
    const c = L(r, "default");
    if (c && s === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && M(a)) {
        const { propsDefaults: u } = i;
        n in u ? s = u[n] : (rt(i), s = u[n] = a.call(
          null,
          t
        ), Ve());
      } else
        s = a;
    }
    r[
      0
      /* shouldCast */
    ] && (o && !c ? s = !1 : r[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === me(n)) && (s = !0));
  }
  return s;
}
function yi(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, c = [];
  let a = !1;
  if (!M(e)) {
    const d = (g) => {
      a = !0;
      const [k, x] = yi(g, t, !0);
      V(r, k), x && c.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!o && !a)
    return Y(e) && s.set(e, et), et;
  if (I(o))
    for (let d = 0; d < o.length; d++) {
      const g = Ce(o[d]);
      gs(g) && (r[g] = B);
    }
  else if (o)
    for (const d in o) {
      const g = Ce(d);
      if (gs(g)) {
        const k = o[d], x = r[g] = I(k) || M(k) ? { type: k } : V({}, k);
        if (x) {
          const z = ys(Boolean, x.type), w = ys(String, x.type);
          x[
            0
            /* shouldCast */
          ] = z > -1, x[
            1
            /* shouldCastTrue */
          ] = w < 0 || z < w, (z > -1 || L(x, "default")) && c.push(g);
        }
      }
    }
  const u = [r, c];
  return Y(e) && s.set(e, u), u;
}
function gs(e) {
  return e[0] !== "$";
}
function vs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Es(e, t) {
  return vs(e) === vs(t);
}
function ys(e, t) {
  return I(t) ? t.findIndex((n) => Es(n, e)) : M(t) && Es(t, e) ? 0 : -1;
}
const bi = (e) => e[0] === "_" || e === "$stable", Kn = (e) => I(e) ? e.map(Se) : [Se(e)], dr = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ro((...i) => Kn(t(...i)), n);
  return s._c = !1, s;
}, ki = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (bi(i))
      continue;
    const o = e[i];
    if (M(o))
      t[i] = dr(i, o, s);
    else if (o != null) {
      const r = Kn(o);
      t[i] = () => r;
    }
  }
}, Di = (e, t) => {
  const n = Kn(t);
  e.slots.default = () => n;
}, fr = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = R(t), Gt(t, "_", n)) : ki(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Di(e, t);
  Gt(e.slots, on, 1);
}, hr = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let o = !0, r = B;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? o = !1 : (V(i, t), !n && c === 1 && delete i._) : (o = !t.$stable, ki(t, i)), r = t;
  } else
    t && (Di(e, t), r = { default: 1 });
  if (o)
    for (const c in i)
      !bi(c) && !(c in r) && delete i[c];
};
function Nn(e, t, n, s, i = !1) {
  if (I(e)) {
    e.forEach(
      (k, x) => Nn(
        k,
        t && (I(t) ? t[x] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (jt(s) && !i)
    return;
  const o = s.shapeFlag & 4 ? Xn(s.component) || s.component.proxy : s.el, r = i ? null : o, { i: c, r: a } = e, u = t && t.r, d = c.refs === B ? c.refs = {} : c.refs, g = c.setupState;
  if (u != null && u !== a && (J(u) ? (d[u] = null, L(g, u) && (g[u] = null)) : te(u) && (u.value = null)), M(a))
    je(a, c, 12, [r, d]);
  else {
    const k = J(a), x = te(a);
    if (k || x) {
      const z = () => {
        if (e.f) {
          const w = k ? L(g, a) ? g[a] : d[a] : a.value;
          i ? I(w) && An(w, o) : I(w) ? w.includes(o) || w.push(o) : k ? (d[a] = [o], L(g, a) && (g[a] = d[a])) : (a.value = [o], e.k && (d[e.k] = a.value));
        } else
          k ? (d[a] = r, L(g, a) && (g[a] = r)) : x && (a.value = r, e.k && (d[e.k] = r));
      };
      r ? (z.id = -1, oe(z, n)) : z();
    }
  }
}
const oe = Go;
function mr(e) {
  return gr(e);
}
function gr(e, t) {
  const n = gn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: c,
    createComment: a,
    setText: u,
    setElementText: d,
    parentNode: g,
    nextSibling: k,
    setScopeId: x = Ee,
    insertStaticContent: z
  } = e, w = (l, p, _, h = null, f = null, E = null, b = !1, v = null, y = !!p.dynamicChildren) => {
    if (l === p)
      return;
    l && !dt(l, p) && (h = Ct(l), be(l, f, E, !0), l = null), p.patchFlag === -2 && (y = !1, p.dynamicChildren = null);
    const { type: m, ref: T, shapeFlag: D } = p;
    switch (m) {
      case sn:
        $(l, p, _, h);
        break;
      case Dt:
        Q(l, p, _, h);
        break;
      case Ut:
        l == null && A(p, _, h, b);
        break;
      case he:
        Nt(
          l,
          p,
          _,
          h,
          f,
          E,
          b,
          v,
          y
        );
        break;
      default:
        D & 1 ? pe(
          l,
          p,
          _,
          h,
          f,
          E,
          b,
          v,
          y
        ) : D & 6 ? It(
          l,
          p,
          _,
          h,
          f,
          E,
          b,
          v,
          y
        ) : (D & 64 || D & 128) && m.process(
          l,
          p,
          _,
          h,
          f,
          E,
          b,
          v,
          y,
          Je
        );
    }
    T != null && f && Nn(T, l && l.ref, E, p || l, !p);
  }, $ = (l, p, _, h) => {
    if (l == null)
      s(
        p.el = c(p.children),
        _,
        h
      );
    else {
      const f = p.el = l.el;
      p.children !== l.children && u(f, p.children);
    }
  }, Q = (l, p, _, h) => {
    l == null ? s(
      p.el = a(p.children || ""),
      _,
      h
    ) : p.el = l.el;
  }, A = (l, p, _, h) => {
    [l.el, l.anchor] = z(
      l.children,
      p,
      _,
      h,
      l.el,
      l.anchor
    );
  }, N = ({ el: l, anchor: p }, _, h) => {
    let f;
    for (; l && l !== p; )
      f = k(l), s(l, _, h), l = f;
    s(p, _, h);
  }, O = ({ el: l, anchor: p }) => {
    let _;
    for (; l && l !== p; )
      _ = k(l), i(l), l = _;
    i(p);
  }, pe = (l, p, _, h, f, E, b, v, y) => {
    b = b || p.type === "svg", l == null ? pt(
      p,
      _,
      h,
      f,
      E,
      b,
      v,
      y
    ) : rn(
      l,
      p,
      f,
      E,
      b,
      v,
      y
    );
  }, pt = (l, p, _, h, f, E, b, v) => {
    let y, m;
    const { type: T, props: D, shapeFlag: S, transition: C, dirs: P } = l;
    if (y = l.el = r(
      l.type,
      E,
      D && D.is,
      D
    ), S & 8 ? d(y, l.children) : S & 16 && Ue(
      l.children,
      y,
      null,
      h,
      f,
      E && T !== "foreignObject",
      b,
      v
    ), P && Be(l, null, h, "created"), Ot(y, l, l.scopeId, b, h), D) {
      for (const F in D)
        F !== "value" && !Ft(F) && o(
          y,
          F,
          null,
          D[F],
          E,
          l.children,
          h,
          f,
          Ie
        );
      "value" in D && o(y, "value", null, D.value), (m = D.onVnodeBeforeMount) && De(m, h, l);
    }
    P && Be(l, null, h, "beforeMount");
    const H = (!f || f && !f.pendingBranch) && C && !C.persisted;
    H && C.beforeEnter(y), s(y, p, _), ((m = D && D.onVnodeMounted) || H || P) && oe(() => {
      m && De(m, h, l), H && C.enter(y), P && Be(l, null, h, "mounted");
    }, f);
  }, Ot = (l, p, _, h, f) => {
    if (_ && x(l, _), h)
      for (let E = 0; E < h.length; E++)
        x(l, h[E]);
    if (f) {
      let E = f.subTree;
      if (p === E) {
        const b = f.vnode;
        Ot(
          l,
          b,
          b.scopeId,
          b.slotScopeIds,
          f.parent
        );
      }
    }
  }, Ue = (l, p, _, h, f, E, b, v, y = 0) => {
    for (let m = y; m < l.length; m++) {
      const T = l[m] = v ? Le(l[m]) : Se(l[m]);
      w(
        null,
        T,
        p,
        _,
        h,
        f,
        E,
        b,
        v
      );
    }
  }, rn = (l, p, _, h, f, E, b) => {
    const v = p.el = l.el;
    let { patchFlag: y, dynamicChildren: m, dirs: T } = p;
    y |= l.patchFlag & 16;
    const D = l.props || B, S = p.props || B;
    let C;
    _ && Ke(_, !1), (C = S.onVnodeBeforeUpdate) && De(C, _, p, l), T && Be(p, l, _, "beforeUpdate"), _ && Ke(_, !0);
    const P = f && p.type !== "foreignObject";
    if (m ? He(
      l.dynamicChildren,
      m,
      v,
      _,
      h,
      P,
      E
    ) : b || U(
      l,
      p,
      v,
      null,
      _,
      h,
      P,
      E,
      !1
    ), y > 0) {
      if (y & 16)
        ut(
          v,
          p,
          D,
          S,
          _,
          h,
          f
        );
      else if (y & 2 && D.class !== S.class && o(v, "class", null, S.class, f), y & 4 && o(v, "style", D.style, S.style, f), y & 8) {
        const H = p.dynamicProps;
        for (let F = 0; F < H.length; F++) {
          const X = H[F], ue = D[X], Qe = S[X];
          (Qe !== ue || X === "value") && o(
            v,
            X,
            ue,
            Qe,
            f,
            l.children,
            _,
            h,
            Ie
          );
        }
      }
      y & 1 && l.children !== p.children && d(v, p.children);
    } else
      !b && m == null && ut(
        v,
        p,
        D,
        S,
        _,
        h,
        f
      );
    ((C = S.onVnodeUpdated) || T) && oe(() => {
      C && De(C, _, p, l), T && Be(p, l, _, "updated");
    }, h);
  }, He = (l, p, _, h, f, E, b) => {
    for (let v = 0; v < p.length; v++) {
      const y = l[v], m = p[v], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === he || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !dt(y, m) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 70) ? g(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      w(
        y,
        m,
        T,
        null,
        h,
        f,
        E,
        b,
        !0
      );
    }
  }, ut = (l, p, _, h, f, E, b) => {
    if (_ !== h) {
      if (_ !== B)
        for (const v in _)
          !Ft(v) && !(v in h) && o(
            l,
            v,
            _[v],
            null,
            b,
            p.children,
            f,
            E,
            Ie
          );
      for (const v in h) {
        if (Ft(v))
          continue;
        const y = h[v], m = _[v];
        y !== m && v !== "value" && o(
          l,
          v,
          m,
          y,
          b,
          p.children,
          f,
          E,
          Ie
        );
      }
      "value" in h && o(l, "value", _.value, h.value);
    }
  }, Nt = (l, p, _, h, f, E, b, v, y) => {
    const m = p.el = l ? l.el : c(""), T = p.anchor = l ? l.anchor : c("");
    let { patchFlag: D, dynamicChildren: S, slotScopeIds: C } = p;
    C && (v = v ? v.concat(C) : C), l == null ? (s(m, _, h), s(T, _, h), Ue(
      p.children,
      _,
      T,
      f,
      E,
      b,
      v,
      y
    )) : D > 0 && D & 64 && S && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (He(
      l.dynamicChildren,
      S,
      _,
      f,
      E,
      b,
      v
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || f && p === f.subTree) && Ti(
      l,
      p,
      !0
      /* shallow */
    )) : U(
      l,
      p,
      _,
      T,
      f,
      E,
      b,
      v,
      y
    );
  }, It = (l, p, _, h, f, E, b, v, y) => {
    p.slotScopeIds = v, l == null ? p.shapeFlag & 512 ? f.ctx.activate(
      p,
      _,
      h,
      b,
      y
    ) : ln(
      p,
      _,
      h,
      f,
      E,
      b,
      y
    ) : Jn(l, p, y);
  }, ln = (l, p, _, h, f, E, b) => {
    const v = l.component = xr(
      l,
      h,
      f
    );
    if (_i(l) && (v.ctx.renderer = Je), Cr(v), v.asyncDep) {
      if (f && f.registerDep(v, ne), !l.el) {
        const y = v.subTree = ie(Dt);
        Q(null, y, p, _);
      }
      return;
    }
    ne(
      v,
      l,
      p,
      _,
      f,
      E,
      b
    );
  }, Jn = (l, p, _) => {
    const h = p.component = l.component;
    if (zo(l, p, _))
      if (h.asyncDep && !h.asyncResolved) {
        W(h, p, _);
        return;
      } else
        h.next = p, Mo(h.update), h.update();
    else
      p.el = l.el, h.vnode = p;
  }, ne = (l, p, _, h, f, E, b) => {
    const v = () => {
      if (l.isMounted) {
        let { next: T, bu: D, u: S, parent: C, vnode: P } = l, H = T, F;
        Ke(l, !1), T ? (T.el = P.el, W(l, T, b)) : T = P, D && un(D), (F = T.props && T.props.onVnodeBeforeUpdate) && De(F, C, T, P), Ke(l, !0);
        const X = _n(l), ue = l.subTree;
        l.subTree = X, w(
          ue,
          X,
          // parent may have changed if it's in a teleport
          g(ue.el),
          // anchor may have changed if it's in a fragment
          Ct(ue),
          l,
          f,
          E
        ), T.el = X.el, H === null && Uo(l, X.el), S && oe(S, f), (F = T.props && T.props.onVnodeUpdated) && oe(
          () => De(F, C, T, P),
          f
        );
      } else {
        let T;
        const { el: D, props: S } = p, { bm: C, m: P, parent: H } = l, F = jt(p);
        if (Ke(l, !1), C && un(C), !F && (T = S && S.onVnodeBeforeMount) && De(T, H, p), Ke(l, !0), D && an) {
          const X = () => {
            l.subTree = _n(l), an(
              D,
              l.subTree,
              l,
              f,
              null
            );
          };
          F ? p.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && X()
          ) : X();
        } else {
          const X = l.subTree = _n(l);
          w(
            null,
            X,
            _,
            h,
            l,
            f,
            E
          ), p.el = X.el;
        }
        if (P && oe(P, f), !F && (T = S && S.onVnodeMounted)) {
          const X = p;
          oe(
            () => De(T, H, X),
            f
          );
        }
        (p.shapeFlag & 256 || H && jt(H.vnode) && H.vnode.shapeFlag & 256) && l.a && oe(l.a, f), l.isMounted = !0, p = _ = h = null;
      }
    }, y = l.effect = new Ln(
      v,
      () => $n(m),
      l.scope
      // track it in component's effect scope
    ), m = l.update = () => y.run();
    m.id = l.uid, Ke(l, !0), m();
  }, W = (l, p, _) => {
    p.component = l;
    const h = l.vnode.props;
    l.vnode = p, l.next = null, _r(l, p.props, h, _), hr(l, p.children, _), lt(), us(), ct();
  }, U = (l, p, _, h, f, E, b, v, y = !1) => {
    const m = l && l.children, T = l ? l.shapeFlag : 0, D = p.children, { patchFlag: S, shapeFlag: C } = p;
    if (S > 0) {
      if (S & 128) {
        xt(
          m,
          D,
          _,
          h,
          f,
          E,
          b,
          v,
          y
        );
        return;
      } else if (S & 256) {
        Ge(
          m,
          D,
          _,
          h,
          f,
          E,
          b,
          v,
          y
        );
        return;
      }
    }
    C & 8 ? (T & 16 && Ie(m, f, E), D !== m && d(_, D)) : T & 16 ? C & 16 ? xt(
      m,
      D,
      _,
      h,
      f,
      E,
      b,
      v,
      y
    ) : Ie(m, f, E, !0) : (T & 8 && d(_, ""), C & 16 && Ue(
      D,
      _,
      h,
      f,
      E,
      b,
      v,
      y
    ));
  }, Ge = (l, p, _, h, f, E, b, v, y) => {
    l = l || et, p = p || et;
    const m = l.length, T = p.length, D = Math.min(m, T);
    let S;
    for (S = 0; S < D; S++) {
      const C = p[S] = y ? Le(p[S]) : Se(p[S]);
      w(
        l[S],
        C,
        _,
        null,
        f,
        E,
        b,
        v,
        y
      );
    }
    m > T ? Ie(
      l,
      f,
      E,
      !0,
      !1,
      D
    ) : Ue(
      p,
      _,
      h,
      f,
      E,
      b,
      v,
      y,
      D
    );
  }, xt = (l, p, _, h, f, E, b, v, y) => {
    let m = 0;
    const T = p.length;
    let D = l.length - 1, S = T - 1;
    for (; m <= D && m <= S; ) {
      const C = l[m], P = p[m] = y ? Le(p[m]) : Se(p[m]);
      if (dt(C, P))
        w(
          C,
          P,
          _,
          null,
          f,
          E,
          b,
          v,
          y
        );
      else
        break;
      m++;
    }
    for (; m <= D && m <= S; ) {
      const C = l[D], P = p[S] = y ? Le(p[S]) : Se(p[S]);
      if (dt(C, P))
        w(
          C,
          P,
          _,
          null,
          f,
          E,
          b,
          v,
          y
        );
      else
        break;
      D--, S--;
    }
    if (m > D) {
      if (m <= S) {
        const C = S + 1, P = C < T ? p[C].el : h;
        for (; m <= S; )
          w(
            null,
            p[m] = y ? Le(p[m]) : Se(p[m]),
            _,
            P,
            f,
            E,
            b,
            v,
            y
          ), m++;
      }
    } else if (m > S)
      for (; m <= D; )
        be(l[m], f, E, !0), m++;
    else {
      const C = m, P = m, H = /* @__PURE__ */ new Map();
      for (m = P; m <= S; m++) {
        const ce = p[m] = y ? Le(p[m]) : Se(p[m]);
        ce.key != null && H.set(ce.key, m);
      }
      let F, X = 0;
      const ue = S - P + 1;
      let Qe = !1, Zn = 0;
      const _t = new Array(ue);
      for (m = 0; m < ue; m++)
        _t[m] = 0;
      for (m = C; m <= D; m++) {
        const ce = l[m];
        if (X >= ue) {
          be(ce, f, E, !0);
          continue;
        }
        let ke;
        if (ce.key != null)
          ke = H.get(ce.key);
        else
          for (F = P; F <= S; F++)
            if (_t[F - P] === 0 && dt(ce, p[F])) {
              ke = F;
              break;
            }
        ke === void 0 ? be(ce, f, E, !0) : (_t[ke - P] = m + 1, ke >= Zn ? Zn = ke : Qe = !0, w(
          ce,
          p[ke],
          _,
          null,
          f,
          E,
          b,
          v,
          y
        ), X++);
      }
      const es = Qe ? vr(_t) : et;
      for (F = es.length - 1, m = ue - 1; m >= 0; m--) {
        const ce = P + m, ke = p[ce], ts = ce + 1 < T ? p[ce + 1].el : h;
        _t[m] === 0 ? w(
          null,
          ke,
          _,
          ts,
          f,
          E,
          b,
          v,
          y
        ) : Qe && (F < 0 || m !== es[F] ? $e(ke, _, ts, 2) : F--);
      }
    }
  }, $e = (l, p, _, h, f = null) => {
    const { el: E, type: b, transition: v, children: y, shapeFlag: m } = l;
    if (m & 6) {
      $e(l.component.subTree, p, _, h);
      return;
    }
    if (m & 128) {
      l.suspense.move(p, _, h);
      return;
    }
    if (m & 64) {
      b.move(l, p, _, Je);
      return;
    }
    if (b === he) {
      s(E, p, _);
      for (let D = 0; D < y.length; D++)
        $e(y[D], p, _, h);
      s(l.anchor, p, _);
      return;
    }
    if (b === Ut) {
      N(l, p, _);
      return;
    }
    if (h !== 2 && m & 1 && v)
      if (h === 0)
        v.beforeEnter(E), s(E, p, _), oe(() => v.enter(E), f);
      else {
        const { leave: D, delayLeave: S, afterLeave: C } = v, P = () => s(E, p, _), H = () => {
          D(E, () => {
            P(), C && C();
          });
        };
        S ? S(E, P, H) : H();
      }
    else
      s(E, p, _);
  }, be = (l, p, _, h = !1, f = !1) => {
    const {
      type: E,
      props: b,
      ref: v,
      children: y,
      dynamicChildren: m,
      shapeFlag: T,
      patchFlag: D,
      dirs: S
    } = l;
    if (v != null && Nn(v, null, _, l, !0), T & 256) {
      p.ctx.deactivate(l);
      return;
    }
    const C = T & 1 && S, P = !jt(l);
    let H;
    if (P && (H = b && b.onVnodeBeforeUnmount) && De(H, p, l), T & 6)
      Mi(l.component, _, h);
    else {
      if (T & 128) {
        l.suspense.unmount(_, h);
        return;
      }
      C && Be(l, null, p, "beforeUnmount"), T & 64 ? l.type.remove(
        l,
        p,
        _,
        f,
        Je,
        h
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== he || D > 0 && D & 64) ? Ie(
        m,
        p,
        _,
        !1,
        !0
      ) : (E === he && D & 384 || !f && T & 16) && Ie(y, p, _), h && Qn(l);
    }
    (P && (H = b && b.onVnodeUnmounted) || C) && oe(() => {
      H && De(H, p, l), C && Be(l, null, p, "unmounted");
    }, _);
  }, Qn = (l) => {
    const { type: p, el: _, anchor: h, transition: f } = l;
    if (p === he) {
      Ai(_, h);
      return;
    }
    if (p === Ut) {
      O(l);
      return;
    }
    const E = () => {
      i(_), f && !f.persisted && f.afterLeave && f.afterLeave();
    };
    if (l.shapeFlag & 1 && f && !f.persisted) {
      const { leave: b, delayLeave: v } = f, y = () => b(_, E);
      v ? v(l.el, E, y) : y();
    } else
      E();
  }, Ai = (l, p) => {
    let _;
    for (; l !== p; )
      _ = k(l), i(l), l = _;
    i(p);
  }, Mi = (l, p, _) => {
    const { bum: h, scope: f, update: E, subTree: b, um: v } = l;
    h && un(h), f.stop(), E && (E.active = !1, be(b, l, p, _)), v && oe(v, p), oe(() => {
      l.isUnmounted = !0;
    }, p), p && p.pendingBranch && !p.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve());
  }, Ie = (l, p, _, h = !1, f = !1, E = 0) => {
    for (let b = E; b < l.length; b++)
      be(l[b], p, _, h, f);
  }, Ct = (l) => l.shapeFlag & 6 ? Ct(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : k(l.anchor || l.el), qn = (l, p, _) => {
    l == null ? p._vnode && be(p._vnode, null, null, !0) : w(p._vnode || null, l, p, null, null, null, _), us(), ri(), p._vnode = l;
  }, Je = {
    p: w,
    um: be,
    m: $e,
    r: Qn,
    mt: ln,
    mc: Ue,
    pc: U,
    pbc: He,
    n: Ct,
    o: e
  };
  let cn, an;
  return t && ([cn, an] = t(
    Je
  )), {
    render: qn,
    hydrate: cn,
    createApp: ar(qn, cn)
  };
}
function Ke({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ti(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (I(s) && I(i))
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      let c = i[o];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = i[o] = Le(i[o]), c.el = r.el), n || Ti(r, c)), c.type === sn && (c.el = r.el);
    }
}
function vr(e) {
  const t = e.slice(), n = [0];
  let s, i, o, r, c;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (o = 0, r = n.length - 1; o < r; )
        c = o + r >> 1, e[n[c]] < u ? o = c + 1 : r = c;
      u < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, r = n[o - 1]; o-- > 0; )
    n[o] = r, r = t[r];
  return n;
}
const Er = (e) => e.__isTeleport, he = Symbol.for("v-fgt"), sn = Symbol.for("v-txt"), Dt = Symbol.for("v-cmt"), Ut = Symbol.for("v-stc"), gt = [];
let ve = null;
function re(e = !1) {
  gt.push(ve = e ? null : []);
}
function yr() {
  gt.pop(), ve = gt[gt.length - 1] || null;
}
let Tt = 1;
function bs(e) {
  Tt += e;
}
function Si(e) {
  return e.dynamicChildren = Tt > 0 ? ve || et : null, yr(), Tt > 0 && ve && ve.push(e), e;
}
function ae(e, t, n, s, i, o) {
  return Si(
    j(
      e,
      t,
      n,
      s,
      i,
      o,
      !0
      /* isBlock */
    )
  );
}
function ks(e, t, n, s, i) {
  return Si(
    ie(
      e,
      t,
      n,
      s,
      i,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function br(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const on = "__vInternal", Oi = ({ key: e }) => e ?? null, Ht = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? J(e) || te(e) || M(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function j(e, t = null, n = null, s = 0, i = null, o = e === he ? 0 : 1, r = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Oi(t),
    ref: t && Ht(t),
    scopeId: ai,
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
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return c ? (Yn(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= J(n) ? 8 : 16), Tt > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ve.push(a), a;
}
const ie = kr;
function kr(e, t = null, n = null, s = 0, i = null, o = !1) {
  if ((!e || e === tr) && (e = Dt), br(e)) {
    const c = ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Yn(c, n), Tt > 0 && !o && ve && (c.shapeFlag & 6 ? ve[ve.indexOf(e)] = c : ve.push(c)), c.patchFlag |= -2, c;
  }
  if (wr(e) && (e = e.__vccOpts), t) {
    t = Dr(t);
    let { class: c, style: a } = t;
    c && !J(c) && (t.class = Qt(c)), Y(a) && (qs(a) && !I(a) && (a = V({}, a)), t.style = Ae(a));
  }
  const r = J(e) ? 1 : Ho(e) ? 128 : Er(e) ? 64 : Y(e) ? 4 : M(e) ? 2 : 0;
  return j(
    e,
    t,
    n,
    s,
    i,
    r,
    o,
    !0
  );
}
function Dr(e) {
  return e ? qs(e) || on in e ? V({}, e) : e : null;
}
function ot(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: o, children: r } = e, c = t ? Or(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Oi(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? I(i) ? i.concat(Ht(t)) : [i, Ht(t)] : Ht(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== he ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ot(e.ssContent),
    ssFallback: e.ssFallback && ot(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Tr(e = " ", t = 0) {
  return ie(sn, null, e, t);
}
function Sr(e, t) {
  const n = ie(Ut, null, e);
  return n.staticCount = t, n;
}
function Se(e) {
  return e == null || typeof e == "boolean" ? ie(Dt) : I(e) ? ie(
    he,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Le(e) : ie(sn, null, String(e));
}
function Le(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ot(e);
}
function Yn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (I(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Yn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(on in t) ? t._ctx = Ne : i === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    M(t) ? (t = { default: t, _ctx: Ne }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Tr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Or(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Qt([t.class, s.class]));
      else if (i === "style")
        t.style = Ae([t.style, s.style]);
      else if (Xt(i)) {
        const o = t[i], r = s[i];
        r && o !== r && !(I(o) && o.includes(r)) && (t[i] = o ? [].concat(o, r) : r);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function De(e, t, n, s = null) {
  ye(e, t, 7, [
    n,
    s
  ]);
}
const Nr = vi();
let Ir = 0;
function xr(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Nr, o = {
    uid: Ir++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Xi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: yi(s, i),
    emitsOptions: ci(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
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
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Lo.bind(null, o), e.ce && e.ce(o), o;
}
let ee = null, Wn, qe, Ds = "__VUE_INSTANCE_SETTERS__";
(qe = gn()[Ds]) || (qe = gn()[Ds] = []), qe.push((e) => ee = e), Wn = (e) => {
  qe.length > 1 ? qe.forEach((t) => t(e)) : qe[0](e);
};
const rt = (e) => {
  Wn(e), e.scope.on();
}, Ve = () => {
  ee && ee.scope.off(), Wn(null);
};
function Ni(e) {
  return e.vnode.shapeFlag & 4;
}
let St = !1;
function Cr(e, t = !1) {
  St = t;
  const { props: n, children: s } = e.vnode, i = Ni(e);
  ur(e, n, i, t), fr(e, s);
  const o = i ? Ar(e, t) : void 0;
  return St = !1, o;
}
function Ar(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Zs(new Proxy(e.ctx, nr));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? Pr(e) : null;
    rt(e), lt();
    const o = je(
      s,
      e,
      0,
      [e.props, i]
    );
    if (ct(), Ve(), Ls(o)) {
      if (o.then(Ve, Ve), t)
        return o.then((r) => {
          Ts(e, r, t);
        }).catch((r) => {
          Zt(r, e, 0);
        });
      e.asyncDep = o;
    } else
      Ts(e, o, t);
  } else
    Ii(e, t);
}
function Ts(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = ni(t)), Ii(e, n);
}
let Ss;
function Ii(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ss && !s.render) {
      const i = s.template || Bn(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: r } = e.appContext.config, { delimiters: c, compilerOptions: a } = s, u = V(
          V(
            {
              isCustomElement: o,
              delimiters: c
            },
            r
          ),
          a
        );
        s.render = Ss(i, u);
      }
    }
    e.render = s.render || Ee;
  }
  rt(e), lt(), sr(e), ct(), Ve();
}
function Mr(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return le(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Pr(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Mr(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Xn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ni(Zs(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in mt)
          return mt[n](e);
      },
      has(t, n) {
        return n in t || n in mt;
      }
    }));
}
function wr(e) {
  return M(e) && "__vccOpts" in e;
}
const Lr = (e, t) => xo(e, t, St), Rr = Symbol.for("v-scx"), Fr = () => zt(Rr), jr = "3.3.4", zr = "http://www.w3.org/2000/svg", We = typeof document < "u" ? document : null, Os = We && /* @__PURE__ */ We.createElement("template"), Ur = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? We.createElementNS(zr, e) : We.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => We.createTextNode(e),
  createComment: (e) => We.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => We.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, o) {
    const r = n ? n.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      Os.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = Os.content;
      if (s) {
        const a = c.firstChild;
        for (; a.firstChild; )
          c.appendChild(a.firstChild);
        c.removeChild(a);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Hr(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Gr(e, t, n) {
  const s = e.style, i = J(n);
  if (n && !i) {
    if (t && !J(t))
      for (const o in t)
        n[o] == null && In(s, o, "");
    for (const o in n)
      In(s, o, n[o]);
  } else {
    const o = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = o);
  }
}
const Ns = /\s*!important$/;
function In(e, t, n) {
  if (I(n))
    n.forEach((s) => In(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = $r(e, t);
    Ns.test(n) ? e.setProperty(
      me(s),
      n.replace(Ns, ""),
      "important"
    ) : e[s] = n;
  }
}
const Is = ["Webkit", "Moz", "ms"], hn = {};
function $r(e, t) {
  const n = hn[t];
  if (n)
    return n;
  let s = Ce(t);
  if (s !== "filter" && s in e)
    return hn[t] = s;
  s = js(s);
  for (let i = 0; i < Is.length; i++) {
    const o = Is[i] + s;
    if (o in e)
      return hn[t] = o;
  }
  return t;
}
const xs = "http://www.w3.org/1999/xlink";
function Br(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(xs, t.slice(6, t.length)) : e.setAttributeNS(xs, t, n);
  else {
    const o = Wi(t);
    n == null || o && !zs(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function Kr(e, t, n, s, i, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    s && r(s, i, o), e[t] = n ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = n;
    const u = c === "OPTION" ? e.getAttribute("value") : e.value, d = n ?? "";
    u !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = zs(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function Yr(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Wr(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Xr(e, t, n, s, i = null) {
  const o = e._vei || (e._vei = {}), r = o[t];
  if (s && r)
    r.value = s;
  else {
    const [c, a] = Vr(t);
    if (s) {
      const u = o[t] = qr(s, i);
      Yr(e, c, u, a);
    } else
      r && (Wr(e, c, r, a), o[t] = void 0);
  }
}
const Cs = /(?:Once|Passive|Capture)$/;
function Vr(e) {
  let t;
  if (Cs.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Cs); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : me(e.slice(2)), t];
}
let mn = 0;
const Jr = /* @__PURE__ */ Promise.resolve(), Qr = () => mn || (Jr.then(() => mn = 0), mn = Date.now());
function qr(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ye(
      Zr(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Qr(), n;
}
function Zr(e, t) {
  if (I(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const As = /^on[a-z]/, el = (e, t, n, s, i = !1, o, r, c, a) => {
  t === "class" ? Hr(e, s, i) : t === "style" ? Gr(e, n, s) : Xt(t) ? Cn(t) || Xr(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : tl(e, t, s, i)) ? Kr(
    e,
    t,
    s,
    o,
    r,
    c,
    a
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Br(e, t, s, i));
};
function tl(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && As.test(t) && M(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || As.test(t) && J(n) ? !1 : t in e;
}
function nl(e, t) {
  const n = tn(e);
  class s extends Vn {
    constructor(o) {
      super(n, o, t);
    }
  }
  return s.def = n, s;
}
const sl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Vn extends sl {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, ii(() => {
      this._connected || (Ps(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const i of s)
        this._setAttr(i.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, i = !1) => {
      const { props: o, styles: r } = s;
      let c;
      if (o && !I(o))
        for (const a in o) {
          const u = o[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = ns(this._props[a])), (c || (c = /* @__PURE__ */ Object.create(null)))[Ce(a)] = !0);
        }
      this._numberProps = c, i && this._resolveProps(s), this._applyStyles(r), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = I(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of s.map(Ce))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(o) {
          this._setProp(i, o);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = Ce(t);
    this._numberProps && this._numberProps[s] && (n = ns(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, i = !0) {
    n !== this._props[t] && (this._props[t] = n, i && this._instance && this._update(), s && (n === !0 ? this.setAttribute(me(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(me(t), n + "") : n || this.removeAttribute(me(t))));
  }
  _update() {
    Ps(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = ie(this._def, V({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (o, r) => {
        this.dispatchEvent(
          new CustomEvent(o, {
            detail: r
          })
        );
      };
      n.emit = (o, ...r) => {
        s(o, r), me(o) !== o && s(me(o), r);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof Vn) {
          n.parent = i._instance, n.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const il = /* @__PURE__ */ V({ patchProp: el }, Ur);
let Ms;
function ol() {
  return Ms || (Ms = mr(il));
}
const Ps = (...e) => {
  ol().render(...e);
}, at = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, rl = {}, ll = {
  width: "24",
  height: "24",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, cl = /* @__PURE__ */ j("rect", {
  width: "48",
  height: "48",
  fill: "white",
  "fill-opacity": "0.01"
}, null, -1), al = /* @__PURE__ */ j("path", {
  d: "M34 36L22 24L34 12",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), pl = /* @__PURE__ */ j("path", {
  d: "M14 12V36",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), ul = [
  cl,
  al,
  pl
];
function _l(e, t) {
  return re(), ae("svg", ll, ul);
}
const dl = /* @__PURE__ */ at(rl, [["render", _l]]), fl = {}, hl = {
  width: "24",
  height: "24",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, ml = /* @__PURE__ */ j("rect", {
  width: "48",
  height: "48",
  fill: "white",
  "fill-opacity": "0.01"
}, null, -1), gl = /* @__PURE__ */ j("path", {
  d: "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
  fill: "none",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linejoin": "round"
}, null, -1), vl = /* @__PURE__ */ j("path", {
  d: "M20 24V17.0718L26 20.5359L32 24L26 27.4641L20 30.9282V24Z",
  fill: "none",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linejoin": "round"
}, null, -1), El = [
  ml,
  gl,
  vl
];
function yl(e, t) {
  return re(), ae("svg", hl, El);
}
const bl = /* @__PURE__ */ at(fl, [["render", yl]]), kl = {}, Dl = {
  width: "24",
  height: "24",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Tl = /* @__PURE__ */ j("rect", {
  width: "48",
  height: "48",
  fill: "white",
  "fill-opacity": "0.01"
}, null, -1), Sl = /* @__PURE__ */ j("path", {
  d: "M14 12L26 24L14 36",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Ol = /* @__PURE__ */ j("path", {
  d: "M34 12V36",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Nl = [
  Tl,
  Sl,
  Ol
];
function Il(e, t) {
  return re(), ae("svg", Dl, Nl);
}
const xl = /* @__PURE__ */ at(kl, [["render", Il]]), Cl = {}, Al = {
  width: "24",
  height: "24",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Ml = /* @__PURE__ */ Sr('<path d="M24 19H40" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 10H40" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 38H40" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 28H40" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 10L16 15L8 20V10Z" fill="none" stroke="#FFF" stroke-width="4" stroke-linejoin="round"></path>', 5), Pl = [
  Ml
];
function wl(e, t) {
  return re(), ae("svg", Al, Pl);
}
const Ll = /* @__PURE__ */ at(Cl, [["render", wl]]), xi = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAwYTUxMiA1MTIgMCAxIDAgNTEyIDUxMiA1MTIgNTEyIDAgMCAwLTUxMi01MTJ6IG0zNzguMjQgNDQ4aC0xOTcuNzZhMTg3LjUyIDE4Ny41MiAwIDAgMC0zNy4xMi02NGwxMTYuNDgtMTU1LjUyQTM4NCAzODQgMCAwIDEgODkwLjI0IDQ0OHpNNTc2IDUxMmE2NCA2NCAwIDEgMS02NC02NCA2NCA2NCAwIDAgMSA2NCA2NHogbS02NCAzODRhMzg0IDM4NCAwIDEgMSAxNTIuMzItNzM2LjY0TDU0MS40NCAzMjMuMkExNDcuODQgMTQ3Ljg0IDAgMCAwIDUxMiAzMjBhMTkyIDE5MiAwIDEgMCAxODAuNDggMjU2aDE5Ny43NkEzODQgMzg0IDAgMCAxIDUxMiA4OTZ6IiBmaWxsPSIlMjNGRkZGRkYiLz48L3N2Zz4=";
class Wt {
  /**
   *
   * Lyric类构造函数
   *
   * @constructor
   *
   * @param {number} time 开始时间
   * @param {string} lyric 歌词文本
   *
   */
  constructor(t, n) {
    /**
     * 这段歌词开始的时间
     * @type {number}
     */
    G(this, "time");
    /**
     * 这段歌词的文本
     * @type {string}
     */
    G(this, "lyric");
    this.time = t, this.lyric = n;
  }
}
class _e {
  static getVueInstance(t) {
    return t._instance;
  }
  static getProcessEnv() {
    return "production";
  }
}
class Te {
  static debug(t) {
  }
}
G(Te, "info", console.log);
const Rl = ["data-id"], Fl = /* @__PURE__ */ tn({
  __name: "LyricPanel",
  props: {
    lyric: {
      type: Array,
      default: [new Wt(0, "无歌词")],
      validator(e) {
        return e.length >= 1;
      }
    },
    currentTime: {
      type: Number,
      default: 0
    },
    fullLyric: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e;
    let n = Re(0), s = Re();
    function i(a) {
      let u = n.value;
      if (t.lyric[u] == null && (u = 0), t.currentTime < t.lyric[u].time) {
        for (let d = u; d > 0; d--)
          if (t.lyric[d] != null && t.lyric[d].time <= a) {
            u = d;
            break;
          }
      } else
        for (let d = u; d < t.lyric.length; d++)
          if (t.lyric[d] != null)
            if (t.lyric[d].time <= a)
              u = d;
            else
              break;
      return n.value = u, u;
    }
    function o() {
      let a = n.value;
      t.lyric[a] == null && (a = 0);
      let u = t.currentTime, d = 0;
      return t.currentTime < t.lyric[a].time && (u = t.lyric[a].time), t.lyric[a + 1] == null ? 0 : (d = t.lyric[a + 1].time, 1 - (d - u) / (d - t.lyric[a].time));
    }
    function r(a) {
      if (a != n.value)
        return !1;
      const d = document.createElement("canvas").getContext("2d");
      return d.font = "25px Noto Sans CJK", d.measureText(t.lyric[a].lyric).width >= 300;
    }
    function c() {
      return t.fullLyric || s.value != null && s.value.scrollTo(0, 0), t.fullLyric;
    }
    return (a, u) => (re(), ae("div", {
      ref_key: "fpLyricPanel",
      ref: s,
      class: "fp_animation fp_lyric_panel",
      style: Ae(c() ? { height: "100%", overflow: "auto" } : { height: "40px", overflow: "hidden" })
    }, [
      j("div", {
        class: "fp_lyric_wrapper",
        style: Ae({ transform: "translateY(" + -40 * i(K(t).currentTime) + "px)" })
      }, [
        (re(!0), ae(he, null, mi(K(t).lyric, (d, g) => (re(), ae("p", {
          key: g,
          "data-id": g
        }, [
          j("ul", {
            class: Qt(r(g) ? "fp_lyric_item" : ""),
            style: Ae(r(g) ? { transform: "translateX(" + -110 * o() + "%)", marginLeft: 110 * o() + "%" } : {})
          }, Et(d.lyric), 7)
        ], 8, Rl))), 128))
      ], 4)
    ], 4));
  }
}), jl = {}, zl = {
  width: "24",
  height: "24",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Ul = /* @__PURE__ */ j("rect", {
  width: "48",
  height: "48",
  fill: "white",
  "fill-opacity": "0.01"
}, null, -1), Hl = /* @__PURE__ */ j("path", {
  d: "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
  fill: "none",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linejoin": "round"
}, null, -1), Gl = /* @__PURE__ */ j("path", {
  d: "M19 18V30",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), $l = /* @__PURE__ */ j("path", {
  d: "M29 18V30",
  stroke: "#FFF",
  "stroke-width": "4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Bl = [
  Ul,
  Hl,
  Gl,
  $l
];
function Kl(e, t) {
  return re(), ae("svg", zl, Bl);
}
const Yl = /* @__PURE__ */ at(jl, [["render", Kl]]);
class Wl {
  /**
   * 可能是Lyric类中唯一的函数了。。。。。负责解析lrc文件（字符串个事）
   * @param {string} lrcString
   * @returns {Lyric[]}
   */
  static generateLyricFromLrcString(t) {
    const n = t.split(`
`);
    let s = [], i = 0;
    for (let o = 0; o < n.length; o++) {
      const r = n[o].replace(/[\s]*\[/g, "[").replace(/][\s]*/g, "]");
      let c = r.substring(r.indexOf("[") + 1, r.indexOf("]")).split(":");
      if (c[0].toLowerCase() == "offset") {
        i = parseInt(c[1]);
        continue;
      }
      if (isNaN(parseInt(c[0])))
        continue;
      const a = /\[[0-9:.]*]/g;
      c = r.match(a);
      let u = 0;
      for (let g = 0; g < c.length; g++)
        u += c[g].length;
      const d = r.substring(u);
      for (let g = 0; g < c.length; g++) {
        const x = c[g].substring(1, c[g].length).split(":"), z = parseFloat(Math.max(parseInt(x[0]) * 60 + parseFloat(x[1]) + i / 1e3, 0).toFixed(3));
        s[s.length] = new Wt(z, d);
      }
    }
    return s.sort((o, r) => o.time - r.time), s.length < 1 && (s = [new Wt(0, "无歌词")]), s;
  }
}
class Ci {
  /**
   * Music类构造函数
   *
   * @constructor
   *
   * @param {string} name 歌曲名
   * @param {string} artist 演唱者
   * @param {string} cover 封面链接
   * @param {string|Lyric[]} lrc 歌词（可以是排序过的Lyric数组，也可以是Lrc文件（字符串格式））
   * @param {string|Blob} content 音频内容（可以是链接（本地或在线）或者Blob类）
   */
  constructor(t, n, s, i, o) {
    /**
     * 音乐名称
     * @type {string}
     */
    G(this, "name");
    /**
     * 歌手
     * @type {string}
     */
    G(this, "artist");
    /**
     * 封面（链接，http或blob或base64）
     * @type {string}
     */
    G(this, "cover");
    /**
     * 歌词（Lyric数组）
     * @type {Lyric[]}
     */
    G(this, "lrc");
    /**
     * 音频内容（blob或http）
     * @type {string}
     */
    G(this, "content");
    this.name = t, this.artist = n, this.cover = s, this.lrc = [new Wt(0, "无歌词")], this.content = "", typeof i == "string" && (this.lrc = Wl.generateLyricFromLrcString(i)), i instanceof Array && (this.lrc = i), typeof o == "string" && (this.content = o), o instanceof Blob && (this.content = URL.createObjectURL(o));
  }
  /**
   * 判断两个Music类是否相同，通过概率判断
   * @function equals
   * @param {Music} music
   */
  equals(t) {
    let n = 0;
    return this.name === t.name && n++, this.artist === t.artist && n++, this.content === t.content && n++, this.cover === t.cover && n++, n >= 2 ? !0 : this.lrc === t.lrc;
  }
}
const Xl = ["onClick"], Vl = {
  class: "fp_list_content",
  style: { top: "0" }
}, Jl = {
  class: "fp_list_content",
  style: { bottom: "0" }
}, Ql = /* @__PURE__ */ tn({
  __name: "ListPanel",
  props: {
    showList: {
      type: Boolean,
      default: !1
    },
    musicList: {
      type: Array,
      default: [new Ci("FPlayer", "Team Fangkehou", xi, "", "")]
    }
  },
  emits: ["switch", "close"],
  setup(e) {
    const t = e;
    let n = Re();
    function s() {
      return n.value != null && n.value.scrollTo(0, 0), t.showList;
    }
    return (i, o) => (re(), ae("div", {
      ref_key: "fpListPanel",
      ref: n,
      class: "fp_list_panel",
      style: Ae(s() ? { transform: "translateY(0px)" } : {}),
      onClick: o[0] || (o[0] = (r) => i.$emit("close"))
    }, [
      (re(!0), ae(he, null, mi(K(t).musicList, (r, c) => (re(), ae("div", {
        class: "fp_list_item",
        style: Ae({ backgroundImage: "url(" + r.cover + ")" }),
        onClick: (a) => i.$emit("switch", c)
      }, [
        j("p", Vl, Et(r.name), 1),
        j("p", Jl, Et(r.artist), 1)
      ], 12, Xl))), 256))
    ], 4));
  }
}), ql = { class: "fp_panel" }, Zl = { class: "fp_control_panel" }, ec = { class: "fp_detail_panel" }, tc = { class: "fp_detail_title" }, nc = { class: "fp_detail_artist" }, sc = {
  class: "fp_button_controller",
  "data-action": "previous"
}, ic = {
  class: "fp_button_controller",
  "data-action": "play"
}, oc = {
  class: "fp_button_controller",
  "data-action": "next"
}, rc = {
  class: "fp_button_controller",
  "data-action": "list"
}, lc = /* @__PURE__ */ tn({
  __name: "FPlayer.ce",
  props: {
    mode: {
      type: String,
      default: "single"
    },
    autoPlay: {
      type: Boolean,
      default: !1
    },
    autoSkip: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { expose: t }) {
    const n = e;
    let s = Re([new Ci("FPlayer", "Team Fangkehou", xi, "", "")]), i = Re([0]), o = Re({
      playing: !1,
      currentTime: 0,
      showLyricPanel: !1,
      showListPanel: !1
    }), r = Re(), c = Re();
    function a(A) {
      s.value = A, i.value = Array.from(new Array(A.length).keys()), u(), o.value.playing = !1, o.value.currentTime = 0, $(A[0]);
    }
    function u() {
      if (n.mode !== fe.MODE_RANDOM)
        return;
      let A = i.value[0];
      i.value.shift();
      let N = i.value.length, O, pe;
      for (; N > 0; )
        O = Math.floor(Math.random() * N), pe = i.value[N - 1], i.value[N - 1] = i.value[O], i.value[O] = pe, N--;
      i.value.unshift(A);
    }
    function d(A) {
      c.value = A;
    }
    function g() {
      let A = i.value[0];
      i.value.shift(), i.value.push(A), A = i.value[0], $(s.value[A]), z(), c.value.notifyListener(fe.ACTION_ON_NEXT);
    }
    function k() {
      let A = i.value[i.value.length - 1];
      i.value.unshift(A), i.value.pop(), $(s.value[A]), z(), c.value.notifyListener(fe.ACTION_ON_PREVIOUS);
    }
    function x() {
      Te.debug(r.value), o.value.playing = !1, r.value.pause();
    }
    function z() {
      Te.debug(r.value), o.value.playing = !0, r.value.readyState >= 2 && r.value.play().catch();
    }
    function w(A) {
      i.value = [];
      for (let N = A; N < s.value.length; N++)
        i.value.push(N);
      for (let N = 0; N < A; N++)
        i.value.push(N);
      u(), o.value.currentTime = 0, $(s.value[A]), z(), c.value.notifyListener(fe.ACTION_ON_SWITCH);
    }
    function $(A) {
      r.value.src = A.content, r.value.load();
    }
    function Q() {
      if (n.mode === fe.MODE_SINGLE) {
        $(s.value[i.value[0]]), c.value.notifyListener(fe.ACTION_ON_NEXT);
        return;
      }
      g();
    }
    return fi(() => {
      r.value = new Audio(), r.value.addEventListener("canplaythrough", function() {
        c.value.notifyListener(fe.ACTION_ON_LOAD), o.value.playing && r.value.play().catch();
      }), r.value.addEventListener("pause", function() {
        o.value.playing && (c.value.notifyListener(fe.ACTION_ON_NEXT), Q());
      }), r.value.addEventListener("error", function() {
        c.value.notifyListener(fe.ACTION_ON_FAIL), o.value.playing && (n.autoSkip ? g() : x());
      }), r.value.addEventListener("timeupdate", function() {
        o.value.currentTime = r.value.currentTime;
      });
    }), t({
      setMusicList: a,
      setFPlayerInstance: d
    }), (A, N) => (re(), ae("div", ql, [
      j("div", {
        class: "fp_control_panel_background",
        style: Ae({ backgroundImage: "url(" + K(s)[K(i)[0]].cover + ")" })
      }, [
        j("div", Zl, [
          j("div", ec, [
            j("p", tc, Et(K(s)[K(i)[0]].name), 1),
            j("p", nc, Et(K(s)[K(i)[0]].artist), 1)
          ]),
          j("div", sc, [
            ie(dl, {
              onClick: N[0] || (N[0] = (O) => k())
            })
          ]),
          j("div", ic, [
            K(o).playing ? (re(), ks(Yl, {
              key: 1,
              onClick: N[2] || (N[2] = (O) => x())
            })) : (re(), ks(bl, {
              key: 0,
              onClick: N[1] || (N[1] = (O) => z())
            }))
          ]),
          j("div", oc, [
            ie(xl, {
              onClick: N[3] || (N[3] = (O) => g())
            })
          ]),
          j("div", rc, [
            ie(Ll, {
              onClick: N[4] || (N[4] = (O) => K(o).showListPanel = !K(o).showListPanel)
            })
          ])
        ])
      ], 4),
      ie(Fl, {
        onClick: N[5] || (N[5] = (O) => K(o).showLyricPanel = !K(o).showLyricPanel),
        "full-lyric": K(o).showLyricPanel,
        lyric: K(s)[K(i)[0]].lrc,
        "current-time": K(o).currentTime
      }, null, 8, ["full-lyric", "lyric", "current-time"]),
      ie(Ql, {
        "show-list": K(o).showListPanel,
        "music-list": K(s),
        onClose: N[6] || (N[6] = () => {
          K(o).showListPanel = !1;
        }),
        onSwitch: N[7] || (N[7] = (O) => {
          K(o).showListPanel = !1, w(O);
        })
      }, null, 8, ["show-list", "music-list"])
    ]));
  }
}), cc = `*{margin:0;padding:0}.fp_animation{transition:all .6s cubic-bezier(.23,1,.32,1)}.fp_panel{font-family:Noto Sans CJK SC,sans-serif;position:relative;top:50px;left:5px;overflow:hidden;width:300px;height:160px;border-radius:12px;box-shadow:0 0 10px #000}.fp_control_panel_background{position:absolute;z-index:1;width:300px;height:120px;background-color:#462e7c;background-position:0 10%;background-size:cover}.fp_control_panel{position:relative;float:right;width:100%;height:100%;background-color:#0006}.fp_detail_panel{float:left;width:100%;height:60%}.fp_detail_title{font-size:30px;display:block;overflow:hidden;width:94%;height:47px;margin-left:6%;white-space:nowrap;text-overflow:ellipsis;color:#fff}.fp_detail_artist{font-size:15px;display:block;overflow:hidden;width:94%;height:25px;margin-left:6%;white-space:nowrap;text-overflow:ellipsis;color:#e6e6e6}.fp_button_controller{float:left;width:25%;height:30%}.fp_button_controller svg{width:100%;height:100%}.fp_list_panel{position:relative;z-index:1;overflow:scroll;width:100%;height:100%;padding-top:2px;padding-bottom:2px;transition:transform .6s cubic-bezier(.33,1,.68,1);transform:translateY(160px);background-color:#462e7c;scrollbar-width:none}.fp_list_panel::-webkit-scrollbar{display:none}.fp_list_item{position:relative;display:block;float:left;overflow:hidden;width:48%;height:72px;margin:1%;border-radius:12px;background-size:cover;box-shadow:0 0 5px #190634}.fp_list_content{font-size:20px;position:absolute;overflow:hidden;width:100%;height:50%;text-align:center;white-space:nowrap;text-overflow:ellipsis;color:#fff;background-color:#0000004d}.fp_lyric_panel{position:absolute;z-index:1;bottom:0;overflow:hidden;width:300px;height:40px;transition:all .6s cubic-bezier(.23,1,.32,1);background-color:#58438b;scrollbar-width:none}.fp_lyric_panel::-webkit-scrollbar{display:none}.fp_lyric_wrapper{position:absolute;width:100%;height:100%;transition:transform .6s cubic-bezier(.33,1,.68,1);text-align:center;color:#fff;scrollbar-width:none}.fp_lyric_wrapper::-webkit-scrollbar{display:none}.fp_lyric_wrapper p{font-size:25px;width:100%;height:40px;white-space:nowrap;overflow:hidden}.fp_lyric_item{float:left}
`, ac = /* @__PURE__ */ at(lc, [["styles", [cc]]]);
class pc {
  static randomString(t) {
    t = t || 32;
    const n = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678-", s = n.length;
    let i = "";
    for (let o = 0; o < t; o++)
      i += n.charAt(Math.floor(Math.random() * s));
    return i;
  }
}
const uc = nl(ac), q = class q {
  /**
   * 这是FPlayer构造函数，实现了FPlayer与容器和FPlayer设置参数的绑定，同时也承载FPlayer的类定义。
   *
   * @constructor
   *
   * @param {HTMLElement} container FPlayer将要填充的容器
   * @param {FPlayerConfig} config FPlayer设置参数
   */
  constructor(t, n) {
    G(this, "mView");
    G(this, "config");
    G(this, "rootViewId");
    G(this, "listeners");
    const s = pc.randomString(20);
    this.rootViewId = s, n = {
      //@ts-ignore
      mode: q.MODE_SINGLE,
      //@ts-ignore
      autoPlay: !1,
      //@ts-ignore
      autoSkip: !0,
      ...n
    }, this.mView = new DOMParser().parseFromString(`<f-player mode="${n.mode}" ${n.autoPlay ? "auto-play" : ""} ${n.autoSkip ? "auto-skip" : ""} class="${s}"></f-player>`, "text/html").querySelector(`.${s}`), this.config = n, this.listeners = [], t.appendChild(this.mView), _e.getVueInstance(this.mView).exposed.setFPlayerInstance(this), Te.info("%c FPlayer %c https://github.com/fangkehou-team/FPlayer.js", "padding: 5px; font-weight: bold; font-size: 20px; color: #272727; background: #FFD033", "padding: 5px; font-weight: bold; font-size: 20px; color: #272727; background: #9EFF3C");
  }
  static init() {
    customElements.define("f-player", uc);
  }
  /**
   *
   * 这是FPlayer构造函数，实现了FPlayer与容器和FPlayer设置参数的绑定，同时也承载FPlayer的类定义。
   *
   * @class FPlayer
   * @constructor
   *
   * @param {HTMLElement} container FPlayer将要填充的容器
   * @param {object} config FPlayer设置参数
   *
   * @example
   * var FPlayer = FPlayer.create("container", {
   *
   * })
   *
   * @see
   * FPlayerConfig
   */
  static create(t, n) {
    if (t instanceof HTMLElement)
      return new q(t, n);
    if (document.querySelector(t) != null)
      return new this(document.querySelector(t), n);
    throw new Error("Unable to initialize FPlayer: No valid Container available");
  }
  setMusicList(t) {
    Te.debug(_e.getVueInstance(this.mView).exposed), Te.debug(typeof this.mView), _e.getVueInstance(this.mView).exposed.setMusicList(t);
  }
  play() {
    Te.debug(_e.getVueInstance(this.mView).exposed), _e.getVueInstance(this.mView).exposed.play();
  }
  pause() {
    Te.debug(_e.getVueInstance(this.mView).exposed), _e.getVueInstance(this.mView).exposed.pause();
  }
  next() {
    Te.debug(_e.getVueInstance(this.mView).exposed), _e.getVueInstance(this.mView).exposed.next();
  }
  previous() {
    Te.debug(_e.getVueInstance(this.mView).exposed), _e.getVueInstance(this.mView).exposed.previous();
  }
  addListener(t) {
    this.listeners.push(t);
  }
  notifyListener(t) {
    this.listeners.forEach((n) => {
      n(this, t);
    });
  }
};
/**
 * 监听常量，FPlayer加载完成时触发
 * @type {string}
 */
G(q, "ACTION_PREPARE_READY", "prepare_ready"), /**
 * 监听常量，FPlayer加载失败时触发
 * @type {string}
 */
G(q, "ACTION_PREPARE_FAIL", "prepare_fail"), /**
 * 监听常量，开始播放时触发
 * @type {string}
 */
G(q, "ACTION_ON_PLAY", "on_play"), /**
 * 监听常量，音乐加载完成时触发
 * @type {string}
 */
G(q, "ACTION_ON_LOAD", "on_load"), /**
 * 监听常量，暂停时触发
 * @type {string}
 */
G(q, "ACTION_ON_PAUSE", "on_pause"), /**
 * 监听常量，切歌时触发
 * @type {string}
 */
G(q, "ACTION_ON_SWITCH", "on_switch"), /**
 * 监听常量，下一曲触发
 * @type {string}
 */
G(q, "ACTION_ON_NEXT", "on_next"), /**
 * 监听常量，上一曲触发
 * @type {string}
 */
G(q, "ACTION_ON_PREVIOUS", "on_previous"), /**
 * 监听常量，失败时触发
 * @type {string}
 */
G(q, "ACTION_ON_FAIL", "on_fail"), /**
 * 播放模式，单曲循环
 * @type {string}
 */
G(q, "MODE_SINGLE", "single"), /**
 * 播放模式，列表循环
 * @type {string}
 */
G(q, "MODE_LIST", "list"), /**
 * 播放模式，列表随机
 * @type {string}
 */
G(q, "MODE_RANDOM", "random");
let fe = q;
export {
  fe as FPlayer,
  Ci as Music,
  fe as default
};
