"use strict";
(self.webpackChunkloterias = self.webpackChunkloterias || []).push([
  [179],
  {
    291: () => {
      function ee(e) {
        return "function" == typeof e;
      }
      function fo(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ji = fo(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function ho(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class yt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ee(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ji ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Rf(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ji ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ji(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Rf(t);
            else {
              if (t instanceof yt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && ho(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && ho(n, t), t instanceof yt && t._removeParent(this);
        }
      }
      yt.EMPTY = (() => {
        const e = new yt();
        return (e.closed = !0), e;
      })();
      const xf = yt.EMPTY;
      function Nf(e) {
        return (
          e instanceof yt ||
          (e && "closed" in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        );
      }
      function Rf(e) {
        ee(e) ? e() : e.unsubscribe();
      }
      const Un = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Bi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Bi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Bi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Ff(e) {
        Bi.setTimeout(() => {
          const { onUnhandledError: t } = Un;
          if (!t) throw e;
          t(e);
        });
      }
      function Of() {}
      const vw = Qa("C", void 0, void 0);
      function Qa(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Gn = null;
      function $i(e) {
        if (Un.useDeprecatedSynchronousErrorHandling) {
          const t = !Gn;
          if ((t && (Gn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Gn;
            if (((Gn = null), n)) throw r;
          }
        } else e();
      }
      class Ja extends yt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Nf(t) && t.add(this))
              : (this.destination = Mw);
        }
        static create(t, n, r) {
          return new po(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Xa(
                (function Dw(e) {
                  return Qa("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Xa(
                (function _w(e) {
                  return Qa("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Xa(vw, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const ww = Function.prototype.bind;
      function Ya(e, t) {
        return ww.call(e, t);
      }
      class Ew {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Hi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Hi(r);
            }
          else Hi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Hi(n);
            }
        }
      }
      class po extends Ja {
        constructor(t, n, r) {
          let o;
          if ((super(), ee(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Un.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Ya(t.next, i),
                  error: t.error && Ya(t.error, i),
                  complete: t.complete && Ya(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new Ew(o);
        }
      }
      function Hi(e) {
        Un.useDeprecatedSynchronousErrorHandling
          ? (function Cw(e) {
              Un.useDeprecatedSynchronousErrorHandling &&
                Gn &&
                ((Gn.errorThrown = !0), (Gn.error = e));
            })(e)
          : Ff(e);
      }
      function Xa(e, t) {
        const { onStoppedNotification: n } = Un;
        n && Bi.setTimeout(() => n(e, t));
      }
      const Mw = {
          closed: !0,
          next: Of,
          error: function bw(e) {
            throw e;
          },
          complete: Of,
        },
        el =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function zn(e) {
        return e;
      }
      function Pf(e) {
        return 0 === e.length
          ? zn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let pe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Aw(e) {
              return (
                (e && e instanceof Ja) ||
                ((function Iw(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete);
                })(e) &&
                  Nf(e))
              );
            })(n)
              ? n
              : new po(n, r, o);
            return (
              $i(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = kf(r))((o, i) => {
              const s = new po({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [el]() {
            return this;
          }
          pipe(...n) {
            return Pf(n)(this);
          }
          toPromise(n) {
            return new (n = kf(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function kf(e) {
        var t;
        return null !== (t = e ?? Un.Promise) && void 0 !== t ? t : Promise;
      }
      const Tw = fo(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Ht = (() => {
        class e extends pe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Lf(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Tw();
          }
          next(n) {
            $i(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            $i(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            $i(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? xf
              : ((this.currentObservers = null),
                i.push(n),
                new yt(() => {
                  (this.currentObservers = null), ho(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new pe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Lf(t, n)), e;
      })();
      class Lf extends Ht {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : xf;
        }
      }
      function Vf(e) {
        return ee(e?.lift);
      }
      function Ne(e) {
        return (t) => {
          if (Vf(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function be(e, t, n, r, o) {
        return new xw(e, t, n, r, o);
      }
      class xw extends Ja {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function H(e, t) {
        return Ne((n, r) => {
          let o = 0;
          n.subscribe(
            be(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Wn(e) {
        return this instanceof Wn ? ((this.v = e), this) : new Wn(e);
      }
      function Fw(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof Wn
                ? Promise.resolve(f.value.v).then(u, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function u(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function Ow(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function $f(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Hf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Uf(e) {
        return ee(e?.then);
      }
      function Gf(e) {
        return ee(e[el]);
      }
      function zf(e) {
        return Symbol.asyncIterator && ee(e?.[Symbol.asyncIterator]);
      }
      function Wf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const qf = (function kw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Zf(e) {
        return ee(e?.[qf]);
      }
      function Kf(e) {
        return Fw(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Wn(n.read());
              if (o) return yield Wn(void 0);
              yield yield Wn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Qf(e) {
        return ee(e?.getReader);
      }
      function It(e) {
        if (e instanceof pe) return e;
        if (null != e) {
          if (Gf(e))
            return (function Lw(e) {
              return new pe((t) => {
                const n = e[el]();
                if (ee(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Hf(e))
            return (function Vw(e) {
              return new pe((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Uf(e))
            return (function jw(e) {
              return new pe((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Ff);
              });
            })(e);
          if (zf(e)) return Jf(e);
          if (Zf(e))
            return (function Bw(e) {
              return new pe((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Qf(e))
            return (function $w(e) {
              return Jf(Kf(e));
            })(e);
        }
        throw Wf(e);
      }
      function Jf(e) {
        return new pe((t) => {
          (function Hw(e, t) {
            var n, r, o, i;
            return (function Nw(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Ow(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function nn(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Fe(e, t, n = 1 / 0) {
        return ee(t)
          ? Fe((r, o) => H((i, s) => t(r, i, o, s))(It(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Ne((r, o) =>
              (function Uw(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (g) => (u < r ? p(g) : l.push(g)),
                  p = (g) => {
                    i && t.next(g), u++;
                    let y = !1;
                    It(n(g, c++)).subscribe(
                      be(
                        t,
                        (_) => {
                          o?.(_), i ? h(_) : t.next(_);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (u--; l.length && u < r; ) {
                                const _ = l.shift();
                                s ? nn(t, s, () => p(_)) : p(_);
                              }
                              f();
                            } catch (_) {
                              t.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    be(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function mr(e = 1 / 0) {
        return Fe(zn, e);
      }
      const rn = new pe((e) => e.complete());
      function nl(e) {
        return e[e.length - 1];
      }
      function Yf(e) {
        return ee(nl(e)) ? e.pop() : void 0;
      }
      function go(e) {
        return (function zw(e) {
          return e && ee(e.schedule);
        })(nl(e))
          ? e.pop()
          : void 0;
      }
      function Xf(e, t = 0) {
        return Ne((n, r) => {
          n.subscribe(
            be(
              r,
              (o) => nn(r, e, () => r.next(o), t),
              () => nn(r, e, () => r.complete(), t),
              (o) => nn(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function eh(e, t = 0) {
        return Ne((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function th(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new pe((n) => {
          nn(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            nn(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ve(e, t) {
        return t
          ? (function Yw(e, t) {
              if (null != e) {
                if (Gf(e))
                  return (function qw(e, t) {
                    return It(e).pipe(eh(t), Xf(t));
                  })(e, t);
                if (Hf(e))
                  return (function Kw(e, t) {
                    return new pe((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Uf(e))
                  return (function Zw(e, t) {
                    return It(e).pipe(eh(t), Xf(t));
                  })(e, t);
                if (zf(e)) return th(e, t);
                if (Zf(e))
                  return (function Qw(e, t) {
                    return new pe((n) => {
                      let r;
                      return (
                        nn(n, t, () => {
                          (r = e[qf]()),
                            nn(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ee(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Qf(e))
                  return (function Jw(e, t) {
                    return th(Kf(e), t);
                  })(e, t);
              }
              throw Wf(e);
            })(e, t)
          : It(e);
      }
      function rl(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new po({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function Y(e) {
        for (let t in e) if (e[t] === Y) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ol(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function X(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(X).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function il(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const tE = Y({ __forward_ref__: Y });
      function te(e) {
        return (
          (e.__forward_ref__ = te),
          (e.toString = function () {
            return X(this());
          }),
          e
        );
      }
      function R(e) {
        return sl(e) ? e() : e;
      }
      function sl(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(tE) &&
          e.__forward_ref__ === te
        );
      }
      class C extends Error {
        constructor(t, n) {
          super(
            (function Ui(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function k(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Gi(e, t) {
        throw new C(-201, !1);
      }
      function st(e, t) {
        null == e &&
          (function K(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function F(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function at(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function zi(e) {
        return nh(e, Wi) || nh(e, oh);
      }
      function nh(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function rh(e) {
        return e && (e.hasOwnProperty(al) || e.hasOwnProperty(cE))
          ? e[al]
          : null;
      }
      const Wi = Y({ ɵprov: Y }),
        al = Y({ ɵinj: Y }),
        oh = Y({ ngInjectableDef: Y }),
        cE = Y({ ngInjectorDef: Y });
      var x = (() => (
        ((x = x || {})[(x.Default = 0)] = "Default"),
        (x[(x.Host = 1)] = "Host"),
        (x[(x.Self = 2)] = "Self"),
        (x[(x.SkipSelf = 4)] = "SkipSelf"),
        (x[(x.Optional = 8)] = "Optional"),
        x
      ))();
      let ll;
      function vt(e) {
        const t = ll;
        return (ll = e), t;
      }
      function ih(e, t, n) {
        const r = zi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & x.Optional
          ? null
          : void 0 !== t
          ? t
          : void Gi(X(e));
      }
      function Mn(e) {
        return { toString: e }.toString();
      }
      var At = (() => (
          ((At = At || {})[(At.OnPush = 0)] = "OnPush"),
          (At[(At.Default = 1)] = "Default"),
          At
        ))(),
        Ut = (() => {
          return (
            ((e = Ut || (Ut = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Ut
          );
          var e;
        })();
      const ne = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        yr = {},
        Z = [],
        qi = Y({ ɵcmp: Y }),
        ul = Y({ ɵdir: Y }),
        cl = Y({ ɵpipe: Y }),
        sh = Y({ ɵmod: Y }),
        sn = Y({ ɵfac: Y }),
        mo = Y({ __NG_ELEMENT_ID__: Y });
      let fE = 0;
      function yo(e) {
        return Mn(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === At.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || Z,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Ut.Emulated,
              id: "c" + fE++,
              styles: e.styles || Z,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = uh(e.inputs, r)),
            (o.outputs = uh(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(ah).filter(lh)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(ze).filter(lh)
              : null),
            o
          );
        });
      }
      function ah(e) {
        return Q(e) || Ge(e);
      }
      function lh(e) {
        return null !== e;
      }
      function _t(e) {
        return Mn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Z,
          declarations: e.declarations || Z,
          imports: e.imports || Z,
          exports: e.exports || Z,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function uh(e, t) {
        if (null == e) return yr;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const O = yo;
      function et(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function Q(e) {
        return e[qi] || null;
      }
      function Ge(e) {
        return e[ul] || null;
      }
      function ze(e) {
        return e[cl] || null;
      }
      function lt(e, t) {
        const n = e[sh] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${X(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const j = 11;
      function tt(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function xt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function hl(e) {
        return 0 != (8 & e.flags);
      }
      function Ji(e) {
        return 2 == (2 & e.flags);
      }
      function Yi(e) {
        return 1 == (1 & e.flags);
      }
      function Nt(e) {
        return null !== e.template;
      }
      function vE(e) {
        return 0 != (256 & e[2]);
      }
      function Jn(e, t) {
        return e.hasOwnProperty(sn) ? e[sn] : null;
      }
      class CE {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ct() {
        return fh;
      }
      function fh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = EE), wE;
      }
      function wE() {
        const e = ph(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === yr) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function EE(e, t, n, r) {
        const o =
            ph(e) ||
            (function bE(e, t) {
              return (e[hh] = t);
            })(e, { previous: yr, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          l = s[a];
        (i[a] = new CE(l && l.currentValue, t, s === yr)), (e[r] = t);
      }
      Ct.ngInherit = !0;
      const hh = "__ngSimpleChanges__";
      function ph(e) {
        return e[hh] || null;
      }
      function _e(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Xi(e, t) {
        return _e(t[e]);
      }
      function ct(e, t) {
        return _e(t[e.index]);
      }
      function vl(e, t) {
        return e.data[t];
      }
      function dt(e, t) {
        const n = t[e];
        return tt(n) ? n : n[0];
      }
      function es(e) {
        return 64 == (64 & e[2]);
      }
      function Sn(e, t) {
        return null == t ? null : e[t];
      }
      function gh(e) {
        e[18] = 0;
      }
      function _l(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const P = { lFrame: Mh(null), bindingsEnabled: !0 };
      function yh() {
        return P.bindingsEnabled;
      }
      function v() {
        return P.lFrame.lView;
      }
      function z() {
        return P.lFrame.tView;
      }
      function Me() {
        let e = vh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function vh() {
        return P.lFrame.currentTNode;
      }
      function Gt(e, t) {
        const n = P.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Dl() {
        return P.lFrame.isParent;
      }
      function Cl() {
        P.lFrame.isParent = !1;
      }
      function Er() {
        return P.lFrame.bindingIndex++;
      }
      function ln(e) {
        const t = P.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function $E(e, t) {
        const n = P.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), wl(t);
      }
      function wl(e) {
        P.lFrame.currentDirectiveIndex = e;
      }
      function bl(e) {
        P.lFrame.currentQueryIndex = e;
      }
      function UE(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Eh(e, t, n) {
        if (n & x.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & x.Host ||
              ((o = UE(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (P.lFrame = bh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ml(e) {
        const t = bh(),
          n = e[1];
        (P.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function bh() {
        const e = P.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Mh(e) : t;
      }
      function Mh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Sh() {
        const e = P.lFrame;
        return (
          (P.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Ih = Sh;
      function Sl() {
        const e = Sh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function qe() {
        return P.lFrame.selectedIndex;
      }
      function In(e) {
        P.lFrame.selectedIndex = e;
      }
      function Il() {
        P.lFrame.currentNamespace = "svg";
      }
      function Al() {
        !(function qE() {
          P.lFrame.currentNamespace = null;
        })();
      }
      function ts(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function ns(e, t, n) {
        Ah(e, t, 3, n);
      }
      function rs(e, t, n, r) {
        (3 & e[2]) === n && Ah(e, t, n, r);
      }
      function Tl(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Ah(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (QE(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function QE(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class Eo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function os(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            xh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Th(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function xh(e) {
        return 64 === e.charCodeAt(0);
      }
      function is(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Nh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Nh(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Rh(e) {
        return -1 !== e;
      }
      function br(e) {
        return 32767 & e;
      }
      function Mr(e, t) {
        let n = (function tb(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Nl = !0;
      function ss(e) {
        const t = Nl;
        return (Nl = e), t;
      }
      let nb = 0;
      const zt = {};
      function Mo(e, t) {
        const n = Fl(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Rl(r.data, e),
          Rl(t, null),
          Rl(r.blueprint, null));
        const o = as(e, t),
          i = e.injectorIndex;
        if (Rh(o)) {
          const s = br(o),
            a = Mr(o, t),
            l = a[1].data;
          for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | l[s + u];
        }
        return (t[i + 8] = o), i;
      }
      function Rl(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Fl(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function as(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = $h(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function ls(e, t, n) {
        !(function rb(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(mo) && (r = n[mo]),
            null == r && (r = n[mo] = nb++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function Ph(e, t, n) {
        if (n & x.Optional || void 0 !== e) return e;
        Gi();
      }
      function kh(e, t, n, r) {
        if (
          (n & x.Optional && void 0 === r && (r = null),
          0 == (n & (x.Self | x.Host)))
        ) {
          const o = e[9],
            i = vt(void 0);
          try {
            return o ? o.get(t, r, n & x.Optional) : ih(t, r, n & x.Optional);
          } finally {
            vt(i);
          }
        }
        return Ph(r, 0, n);
      }
      function Lh(e, t, n, r = x.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function lb(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Vh(i, s, n, r | x.Self, zt);
                if (a !== zt) return a;
                let l = i.parent;
                if (!l) {
                  const u = s[21];
                  if (u) {
                    const c = u.get(n, zt, r);
                    if (c !== zt) return c;
                  }
                  (l = $h(s)), (s = s[15]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, zt);
            if (s !== zt) return s;
          }
          const i = Vh(e, t, n, r, zt);
          if (i !== zt) return i;
        }
        return kh(t, n, r, o);
      }
      function Vh(e, t, n, r, o) {
        const i = (function sb(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(mo) ? e[mo] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : ab) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Eh(t, e, r)) return r & x.Host ? Ph(o, 0, r) : kh(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & x.Optional) return s;
            Gi();
          } finally {
            Ih();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Fl(e, t),
            l = -1,
            u = r & x.Host ? t[16][6] : null;
          for (
            (-1 === a || r & x.SkipSelf) &&
            ((l = -1 === a ? as(e, t) : t[a + 8]),
            -1 !== l && Bh(r, !1)
              ? ((s = t[1]), (a = br(l)), (t = Mr(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (jh(i, a, c.data)) {
              const d = ib(a, t, n, s, r, u);
              if (d !== zt) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Bh(r, t[1].data[a + 8] === u) && jh(i, a, t)
                ? ((s = c), (a = br(l)), (t = Mr(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function ib(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function us(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (o) {
              const h = s[l];
              if (h && Nt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Ji(a) && Nl : r != s && 0 != (3 & a.type),
            o & x.Host && i === a
          );
        return null !== c ? So(t, s, c, a) : zt;
      }
      function So(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function JE(e) {
            return e instanceof Eo;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function nE(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function q(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : k(e);
              })(i[n])
            );
          const a = ss(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? vt(s.injectImpl) : null;
          Eh(e, r, x.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function KE(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = fh(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && vt(l), ss(a), (s.resolving = !1), Ih();
          }
        }
        return o;
      }
      function jh(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Bh(e, t) {
        return !(e & x.Self || (e & x.Host && t));
      }
      class Sr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Lh(this._tNode, this._lView, t, r, n);
        }
      }
      function ab() {
        return new Sr(Me(), v());
      }
      function Ve(e) {
        return Mn(() => {
          const t = e.prototype.constructor,
            n = t[sn] || Ol(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[sn] || Ol(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Ol(e) {
        return sl(e)
          ? () => {
              const t = Ol(R(e));
              return t && t();
            }
          : Jn(e);
      }
      function $h(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const Ar = "__parameters__";
      function xr(e, t, n) {
        return Mn(() => {
          const r = (function Pl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Ar)
                ? l[Ar]
                : Object.defineProperty(l, Ar, { value: [] })[Ar];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class I {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = F({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function un(e, t) {
        e.forEach((n) => (Array.isArray(n) ? un(n, t) : t(n)));
      }
      function Uh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function cs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ht(e, t, n) {
        let r = Nr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function fb(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Ll(e, t) {
        const n = Nr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Nr(e, t) {
        return (function Wh(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const No = {},
        jl = "__NG_DI_FLAG__",
        fs = "ngTempTokenPath",
        Db = /\n/gm,
        qh = "__source";
      let Ro;
      function Rr(e) {
        const t = Ro;
        return (Ro = e), t;
      }
      function wb(e, t = x.Default) {
        if (void 0 === Ro) throw new C(-203, !1);
        return null === Ro
          ? ih(e, void 0, t)
          : Ro.get(e, t & x.Optional ? null : void 0, t);
      }
      function M(e, t = x.Default) {
        return (
          (function dE() {
            return ll;
          })() || wb
        )(R(e), t);
      }
      function ge(e, t = x.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          M(e, t)
        );
      }
      function Bl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = R(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = x.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = Eb(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(M(o, i));
          } else t.push(M(r));
        }
        return t;
      }
      function Fo(e, t) {
        return (e[jl] = t), (e.prototype[jl] = t), e;
      }
      function Eb(e) {
        return e[jl];
      }
      const Oo = Fo(xr("Optional"), 8),
        Po = Fo(xr("SkipSelf"), 4);
      var nt = (() => (
        ((nt = nt || {})[(nt.Important = 1)] = "Important"),
        (nt[(nt.DashCase = 2)] = "DashCase"),
        nt
      ))();
      const zl = new Map();
      let $b = 0;
      const ql = "__ngContext__";
      function je(e, t) {
        tt(t)
          ? ((e[ql] = t[20]),
            (function Ub(e) {
              zl.set(e[20], e);
            })(t))
          : (e[ql] = t);
      }
      function Kl(e, t) {
        return undefined(e, t);
      }
      function jo(e) {
        const t = e[3];
        return xt(t) ? t[3] : t;
      }
      function Ql(e) {
        return pp(e[13]);
      }
      function Jl(e) {
        return pp(e[4]);
      }
      function pp(e) {
        for (; null !== e && !xt(e); ) e = e[4];
        return e;
      }
      function Or(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          xt(r) ? (i = r) : tt(r) && ((s = !0), (r = r[0]));
          const a = _e(r);
          0 === e && null !== n
            ? null == o
              ? Dp(t, n, a)
              : Yn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Yn(t, n, a, o || null, !0)
            : 2 === e
            ? (function ou(e, t, n) {
                const r = gs(e, t);
                r &&
                  (function f0(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function g0(e, t, n, r, o) {
                const i = n[7];
                i !== _e(n) && Or(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  Bo(l[1], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Xl(e, t, n) {
        return e.createElement(t, n);
      }
      function mp(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), _l(o, -1)), n.splice(r, 1);
      }
      function eu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && mp(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = cs(e, 10 + t);
          !(function r0(e, t) {
            Bo(e, t, t[j], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function yp(e, t) {
        if (!(128 & t[2])) {
          const n = t[j];
          n.destroyNode && Bo(e, t, n, 3, null, null),
            (function a0(e) {
              let t = e[13];
              if (!t) return tu(e[1], e);
              for (; t; ) {
                let n = null;
                if (tt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    tt(t) && tu(t[1], t), (t = t[3]);
                  null === t && (t = e), tt(t) && tu(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function tu(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function d0(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Eo)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function c0(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : _e(t[s]),
                      l = r[(o = n[i + 2])],
                      u = n[i + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[i], l, u)
                      : u >= 0
                      ? r[(o = u)]()
                      : r[(o = -u)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[j].destroy();
          const n = t[17];
          if (null !== n && xt(t[3])) {
            n !== t[3] && mp(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function Gb(e) {
            zl.delete(e[20]);
          })(t);
        }
      }
      function vp(e, t, n) {
        return (function _p(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === Ut.None || o === Ut.Emulated) return null;
          }
          return ct(r, n);
        })(e, t.parent, n);
      }
      function Yn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Dp(e, t, n) {
        e.appendChild(t, n);
      }
      function Cp(e, t, n, r, o) {
        null !== r ? Yn(e, t, n, r, o) : Dp(e, t, n);
      }
      function gs(e, t) {
        return e.parentNode(t);
      }
      let lu,
        bp = function Ep(e, t, n) {
          return 40 & e.type ? ct(e, n) : null;
        };
      function ms(e, t, n, r) {
        const o = vp(e, r, t),
          i = t[j],
          a = (function wp(e, t, n) {
            return bp(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) Cp(i, o, n[l], a, !1);
          else Cp(i, o, n, a, !1);
      }
      function ys(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return ct(t, e);
          if (4 & n) return ru(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return ys(e, r);
            {
              const o = e[t.index];
              return xt(o) ? ru(-1, o) : _e(o);
            }
          }
          if (32 & n) return Kl(t, e)() || _e(e[t.index]);
          {
            const r = Sp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ys(jo(e[16]), r)
              : ys(e, t.next);
          }
        }
        return null;
      }
      function Sp(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function ru(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return ys(r, o);
        }
        return t[7];
      }
      function iu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && je(_e(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) iu(e, t, n.child, r, o, i, !1), Or(t, e, o, a, i);
            else if (32 & l) {
              const u = Kl(n, r);
              let c;
              for (; (c = u()); ) Or(t, e, o, c, i);
              Or(t, e, o, a, i);
            } else 16 & l ? Ip(e, t, r, n, o, i) : Or(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Bo(e, t, n, r, o, i) {
        iu(n, r, e.firstChild, t, o, i, !1);
      }
      function Ip(e, t, n, r, o, i) {
        const s = n[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Or(t, e, o, l[u], i);
        else iu(e, t, l, s[3], o, i, !0);
      }
      function Ap(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function su(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      class Fp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Tn(e) {
        return e instanceof Fp ? e.changingThisBreaksApplicationSecurity : e;
      }
      const x0 =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var De = (() => (
        ((De = De || {})[(De.NONE = 0)] = "NONE"),
        (De[(De.HTML = 1)] = "HTML"),
        (De[(De.STYLE = 2)] = "STYLE"),
        (De[(De.SCRIPT = 3)] = "SCRIPT"),
        (De[(De.URL = 4)] = "URL"),
        (De[(De.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        De
      ))();
      function Uo(e) {
        const t = (function Go() {
          const e = v();
          return e && e[12];
        })();
        return t
          ? t.sanitize(De.URL, e) || ""
          : (function $o(e, t) {
              const n = (function S0(e) {
                return (e instanceof Fp && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? Tn(e)
          : (function cu(e) {
              return (e = String(e)).match(x0) ? e : "unsafe:" + e;
            })(k(e));
      }
      const pu = new I("ENVIRONMENT_INITIALIZER"),
        $p = new I("INJECTOR", -1),
        Hp = new I("INJECTOR_DEF_TYPES");
      class Up {
        get(t, n = No) {
          if (n === No) {
            const r = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function G0(...e) {
        return { ɵproviders: Gp(0, e) };
      }
      function Gp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          un(t, (i) => {
            const s = i;
            gu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && zp(o, n),
          n
        );
      }
      function zp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          un(o, (i) => {
            t.push(i);
          });
        }
      }
      function gu(e, t, n, r) {
        if (!(e = R(e))) return !1;
        let o = null,
          i = rh(e);
        const s = !i && Q(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = rh(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) gu(u, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let u;
              r.add(o);
              try {
                un(i.imports, (c) => {
                  gu(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && zp(u, t);
            }
            if (!a) {
              const u = Jn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: u, deps: Z },
                { provide: Hp, useValue: o, multi: !0 },
                { provide: pu, useValue: () => M(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              un(l, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      const z0 = Y({ provide: String, useValue: Y });
      function mu(e) {
        return null !== e && "object" == typeof e && z0 in e;
      }
      function er(e) {
        return "function" == typeof e;
      }
      const yu = new I("Set Injector scope."),
        Cs = {},
        q0 = {};
      let vu;
      function ws() {
        return void 0 === vu && (vu = new Up()), vu;
      }
      class xn {}
      class Zp extends xn {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Du(t, (s) => this.processProvider(s)),
            this.records.set($p, Pr(void 0, this)),
            o.has("environment") && this.records.set(xn, Pr(void 0, this));
          const i = this.records.get(yu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Hp.multi, Z, x.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Rr(this),
            r = vt(void 0);
          try {
            return t();
          } finally {
            Rr(n), vt(r);
          }
        }
        get(t, n = No, r = x.Default) {
          this.assertNotDestroyed();
          const o = Rr(this),
            i = vt(void 0);
          try {
            if (!(r & x.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function Y0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof I)
                    );
                  })(t) && zi(t);
                (a = l && this.injectableDefInScope(l) ? Pr(_u(t), Cs) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & x.Self ? ws() : this.parent).get(
              t,
              (n = r & x.Optional && n === No ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[fs] = s[fs] || []).unshift(X(t)), o)) throw s;
              return (function bb(e, t, n, r) {
                const o = e[fs];
                throw (
                  (t[qh] && o.unshift(t[qh]),
                  (e.message = (function Mb(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = X(t);
                    if (Array.isArray(t)) o = t.map(X).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : X(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Db,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[fs] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            vt(i), Rr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Rr(this),
            n = vt(void 0);
          try {
            const r = this.get(pu.multi, Z, x.Self);
            for (const o of r) o();
          } finally {
            Rr(t), vt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(X(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = er((t = R(t))) ? t : R(t && t.provide);
          const r = (function K0(e) {
            return mu(e) ? Pr(void 0, e.useValue) : Pr(Kp(e), Cs);
          })(t);
          if (er(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Pr(void 0, Cs, !0)),
              (o.factory = () => Bl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Cs && ((n.value = q0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function J0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = R(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function _u(e) {
        const t = zi(e),
          n = null !== t ? t.factory : Jn(e);
        if (null !== n) return n;
        if (e instanceof I) throw new C(204, !1);
        if (e instanceof Function)
          return (function Z0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function xo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function lE(e) {
              const t = e && (e[Wi] || e[oh]);
              if (t) {
                const n = (function uE(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function Kp(e, t, n) {
        let r;
        if (er(e)) {
          const o = R(e);
          return Jn(o) || _u(o);
        }
        if (mu(e)) r = () => R(e.useValue);
        else if (
          (function qp(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Bl(e.deps || []));
        else if (
          (function Wp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => M(R(e.useExisting));
        else {
          const o = R(e && (e.useClass || e.provide));
          if (
            !(function Q0(e) {
              return !!e.deps;
            })(e)
          )
            return Jn(o) || _u(o);
          r = () => new o(...Bl(e.deps));
        }
        return r;
      }
      function Pr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function X0(e) {
        return !!e.ɵproviders;
      }
      function Du(e, t) {
        for (const n of e)
          Array.isArray(n) ? Du(n, t) : X0(n) ? Du(n.ɵproviders, t) : t(n);
      }
      class Qp {}
      class nM {
        resolveComponentFactory(t) {
          throw (function tM(e) {
            const t = Error(
              `No component factory found for ${X(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let zo = (() => {
        class e {}
        return (e.NULL = new nM()), e;
      })();
      function rM() {
        return kr(Me(), v());
      }
      function kr(e, t) {
        return new pt(ct(e, t));
      }
      let pt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = rM), e;
      })();
      class Yp {}
      let dn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function iM() {
                const e = v(),
                  n = dt(Me().index, e);
                return (tt(n) ? n : e)[j];
              })()),
            e
          );
        })(),
        sM = (() => {
          class e {}
          return (
            (e.ɵprov = F({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Wo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const aM = new Wo("14.2.12"),
        Cu = {};
      function Eu(e) {
        return e.ngOriginalError;
      }
      class Lr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Eu(t);
          for (; n && Eu(n); ) n = Eu(n);
          return n || null;
        }
      }
      function fn(e) {
        return e instanceof Function ? e() : e;
      }
      function eg(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const tg = "ng-template";
      function vM(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== eg(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function ng(e) {
        return 4 === e.type && e.value !== tg;
      }
      function _M(e, t, n) {
        return t === (4 !== e.type || n ? e.value : tg);
      }
      function DM(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function EM(e) {
            for (let t = 0; t < e.length; t++) if (Th(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !_M(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Rt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!vM(e.attrs, u, n)) {
                    if (Rt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = CM(8 & r ? "class" : l, o, ng(e), n);
                if (-1 === d) {
                  if (Rt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== eg(h, u, 0)) || (2 & r && u !== f)) {
                    if (Rt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Rt(r) && !Rt(l)) return !1;
            if (s && Rt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Rt(r) || s;
      }
      function Rt(e) {
        return 0 == (1 & e);
      }
      function CM(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function bM(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function rg(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (DM(e, t[r], n)) return !0;
        return !1;
      }
      function og(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function SM(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Rt(s) && ((t += og(i, o)), (o = "")),
              (r = s),
              (i = i || !Rt(r));
          n++;
        }
        return "" !== o && (t += og(i, o)), t;
      }
      const L = {};
      function me(e) {
        ig(z(), v(), qe() + e, !1);
      }
      function ig(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && ns(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && rs(t, i, 0, n);
          }
        In(n);
      }
      function ug(e, t = null, n = null, r) {
        const o = cg(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function cg(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Z, G0(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : X(e))),
          new Zp(i, t || ws(), r || null, o)
        );
      }
      let gt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return ug({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return ug({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = No),
          (e.NULL = new Up()),
          (e.ɵprov = F({ token: e, providedIn: "any", factory: () => M($p) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function D(e, t = x.Default) {
        const n = v();
        return null === n ? M(e, t) : Lh(Me(), n, R(e), t);
      }
      function Au() {
        throw new Error("invalid");
      }
      function bs(e, t) {
        return (e << 17) | (t << 2);
      }
      function Ft(e) {
        return (e >> 17) & 32767;
      }
      function Tu(e) {
        return 2 | e;
      }
      function hn(e) {
        return (131068 & e) >> 2;
      }
      function xu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Nu(e) {
        return 1 | e;
      }
      function Ig(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              bl(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Is(e, t, n, r, o, i, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          gh(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[j] = a || (e && e[j])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = u || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function Hb() {
            return $b++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function Br(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function ju(e, t, n, r, o) {
            const i = vh(),
              s = Dl(),
              l = (e.data[t] = (function lS(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && (i.next = l)),
              l
            );
          })(e, t, n, r, o)),
            (function BE() {
              return P.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function wo() {
            const e = P.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Gt(i, !0), i;
      }
      function $r(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Bu(e, t, n) {
        Ml(t);
        try {
          const r = e.viewQuery;
          null !== r && Zu(1, r, n);
          const o = e.template;
          null !== o && Ag(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Ig(e, t),
            e.staticViewQueries && Zu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function iS(e, t) {
              for (let n = 0; n < t.length; n++) bS(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Sl();
        }
      }
      function As(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          Ml(t);
          try {
            gh(t),
              (function Dh(e) {
                return (P.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Ag(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && ns(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && rs(t, u, 0, null), Tl(t, 0);
            }
            if (
              ((function wS(e) {
                for (let t = Ql(e); null !== t; t = Jl(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (512 & o[2]) && _l(i, 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function CS(e) {
                for (let t = Ql(e); null !== t; t = Jl(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    es(r) && As(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Ig(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && ns(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && rs(t, u, 1), Tl(t, 1);
            }
            !(function rS(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) In(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      $E(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  In(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function oS(e, t) {
                for (let n = 0; n < t.length; n++) ES(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Zu(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && ns(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && rs(t, u, 2), Tl(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), _l(t[3], -1));
          } finally {
            Sl();
          }
        }
      }
      function Ag(e, t, n, r, o) {
        const i = qe(),
          s = 2 & r;
        try {
          In(-1), s && t.length > 22 && ig(e, t, 22, !1), n(r, o);
        } finally {
          In(i);
        }
      }
      function Tg(e, t, n) {
        if (hl(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function $u(e, t, n) {
        !yh() ||
          ((function hS(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || Mo(n, t), je(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = Nt(l);
              u && vS(t, n, l);
              const c = So(t, e, a, n);
              je(c, t),
                null !== s && _S(0, a - o, c, l, 0, s),
                u && (dt(n.index, t)[8] = c);
            }
          })(e, t, n, ct(n, t)),
          128 == (128 & n.flags) &&
            (function pS(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function HE() {
                  return P.lFrame.currentDirectiveIndex;
                })();
              try {
                In(i);
                for (let a = r; a < o; a++) {
                  const l = e.data[a],
                    u = t[a];
                  wl(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      kg(l, u);
                }
              } finally {
                In(-1), wl(s);
              }
            })(e, t, n));
      }
      function Hu(e, t, n = ct) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function xg(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Uu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Uu(e, t, n, r, o, i, s, a, l, u) {
        const c = 22 + r,
          d = c + o,
          f = (function sS(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : L);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Rg(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Fg(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = [];
        let a = null,
          l = null;
        for (let u = t.directiveStart; u < r; u++) {
          const c = o[u],
            d = c.inputs,
            f = null === i || ng(t) ? null : DS(d, i);
          s.push(f), (a = Rg(d, u, a)), (l = Rg(c.outputs, u, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = l);
      }
      function Og(e, t) {
        const n = dt(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function Gu(e, t, n, r) {
        let o = !1;
        if (yh()) {
          const i = (function gS(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  rg(n, s.selectors, !1) &&
                    (o || (o = []),
                    ls(Mo(n, t), e, s.type),
                    Nt(s) ? (Lg(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), Vg(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = $r(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = is(n.mergedAttrs, d.hostAttrs)),
                jg(e, n, t, u, d),
                yS(u, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            Fg(e, n);
          }
          s &&
            (function mS(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new C(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = is(n.mergedAttrs, n.attrs)), o;
      }
      function Pg(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const l = ~t.index;
          (function fS(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, o, s);
        }
      }
      function kg(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Lg(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function yS(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Nt(t) && (n[""] = e);
        }
      }
      function Vg(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function jg(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Jn(o.type)),
          s = new Eo(i, Nt(o), D);
        (e.blueprint[r] = s),
          (n[r] = s),
          Pg(e, t, 0, r, $r(e, n, o.hostVars, L), o);
      }
      function vS(e, t, n) {
        const r = ct(t, e),
          o = xg(n),
          i = e[10],
          s = Ts(
            e,
            Is(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function _S(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function DS(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Bg(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function ES(e, t) {
        const n = dt(t, e);
        if (es(n)) {
          const r = n[1];
          48 & n[2] ? As(r, n, r.template, n[8]) : n[5] > 0 && Wu(n);
        }
      }
      function Wu(e) {
        for (let r = Ql(e); null !== r; r = Jl(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (es(i))
              if (512 & i[2]) {
                const s = i[1];
                As(s, i, s.template, i[8]);
              } else i[5] > 0 && Wu(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = dt(n[r], e);
            es(o) && o[5] > 0 && Wu(o);
          }
      }
      function bS(e, t) {
        const n = dt(t, e),
          r = n[1];
        (function MS(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Bu(r, n, n[8]);
      }
      function Ts(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function qu(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = jo(e);
          if (vE(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function xs(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          As(e, t, e.template, n);
        } catch (s) {
          throw (r && Gg(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Zu(e, t, n) {
        bl(0), t(e, n);
      }
      function $g(e) {
        return e[7] || (e[7] = []);
      }
      function Hg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Gg(e, t) {
        const n = e[9],
          r = n ? n.get(Lr, null) : null;
        r && r.handleError(t);
      }
      function Ku(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function pn(e, t, n) {
        const r = Xi(t, e);
        !(function gp(e, t, n) {
          e.setValue(t, n);
        })(e[j], r, n);
      }
      function Ns(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = il(o, a))
              : 2 == i && (r = il(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Rs(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(_e(i)), xt(i)))
            for (let a = 10; a < i.length; a++) {
              const l = i[a],
                u = l[1].firstChild;
              null !== u && Rs(l[1], l, u, r);
            }
          const s = n.type;
          if (8 & s) Rs(e, t, n.child, r);
          else if (32 & s) {
            const a = Kl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Sp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = jo(t[16]);
              Rs(l[1], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class qo {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Rs(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (xt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (eu(t, r), cs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          yp(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function Ng(e, t, n, r) {
            const o = $g(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && Hg(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          qu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          xs(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function s0(e, t) {
              Bo(e, t, t[j], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class SS extends qo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          xs(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Qu extends zo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Q(t);
          return new Zo(n, this.ngModule);
        }
      }
      function zg(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class AS {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const o = this.injector.get(t, Cu, r);
          return o !== Cu || n === Cu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Zo extends Qp {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function IM(e) {
              return e.map(SM).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return zg(this.componentDef.inputs);
        }
        get outputs() {
          return zg(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof xn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new AS(t, i) : t,
            a = s.get(Yp, null);
          if (null === a) throw new C(407, !1);
          const l = s.get(sM, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function aS(e, t, n) {
                  return e.selectRootElement(t, n === Ut.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : Xl(
                  u,
                  c,
                  (function IS(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Uu(0, null, null, 1, 0, null, null, null, null, null),
            p = Is(null, h, null, f, null, null, a, u, l, s, null);
          let g, y;
          Ml(p);
          try {
            const _ = (function NS(e, t, n, r, o, i) {
              const s = n[1];
              n[22] = e;
              const l = Br(s, 22, 2, "#host", null),
                u = (l.mergedAttrs = t.hostAttrs);
              null !== u &&
                (Ns(l, u, !0),
                null !== e &&
                  (os(o, e, u),
                  null !== l.classes && su(o, e, l.classes),
                  null !== l.styles && Ap(o, e, l.styles)));
              const c = r.createRenderer(e, t),
                d = Is(
                  n,
                  xg(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  l,
                  r,
                  c,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (ls(Mo(l, n), s, t.type), Lg(s, l), Vg(l, n.length, 1)),
                Ts(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, p, a, u);
            if (d)
              if (r) os(u, d, ["ng-version", aM.full]);
              else {
                const { attrs: w, classes: m } = (function AM(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!Rt(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                w && os(u, d, w), m && m.length > 0 && su(u, d, m.join(" "));
              }
            if (((y = vl(h, 22)), void 0 !== n)) {
              const w = (y.projection = []);
              for (let m = 0; m < this.ngContentSelectors.length; m++) {
                const S = n[m];
                w.push(null != S ? Array.from(S) : null);
              }
            }
            (g = (function RS(e, t, n, r) {
              const o = n[1],
                i = (function dS(e, t, n) {
                  const r = Me();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    jg(e, r, t, $r(e, t, 1, null), n),
                    Fg(e, r));
                  const o = So(t, e, r.directiveStart, r);
                  je(o, t);
                  const i = ct(r, t);
                  return i && je(i, t), o;
                })(o, n, t);
              if (((e[8] = n[8] = i), null !== r)) for (const a of r) a(i, t);
              if (t.contentQueries) {
                const a = Me();
                t.contentQueries(1, i, a.directiveStart);
              }
              const s = Me();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (In(s.index),
                  Pg(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  kg(t, i)),
                i
              );
            })(_, this.componentDef, p, [FS])),
              Bu(h, p, null);
          } finally {
            Sl();
          }
          return new xS(this.componentType, g, kr(y, p), p, y);
        }
      }
      class xS extends class eM {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new SS(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Ku(i[1], i, o, t, n), Og(i, this._tNode.index);
          }
        }
        get injector() {
          return new Sr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function FS() {
        const e = Me();
        ts(v()[1], e);
      }
      function J(e) {
        let t = (function Wg(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (Nt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Ju(e.inputs)),
                (s.declaredInputs = Ju(e.declaredInputs)),
                (s.outputs = Ju(e.outputs));
              const a = o.hostBindings;
              a && LS(e, a);
              const l = o.viewQuery,
                u = o.contentQueries;
              if (
                (l && PS(e, l),
                u && kS(e, u),
                ol(e.inputs, o.inputs),
                ol(e.declaredInputs, o.declaredInputs),
                ol(e.outputs, o.outputs),
                Nt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === J && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function OS(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = is(o.hostAttrs, (n = is(n, o.hostAttrs))));
          }
        })(r);
      }
      function Ju(e) {
        return e === yr ? {} : e === Z ? [] : e;
      }
      function PS(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function kS(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function LS(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      let Fs = null;
      function tr() {
        if (!Fs) {
          const e = ne.Symbol;
          if (e && e.iterator) Fs = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Fs = r);
            }
          }
        }
        return Fs;
      }
      function Ko(e) {
        return (
          !!(function Yu(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && tr() in e))
        );
      }
      function Be(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Gr(e, t, n, r, o, i) {
        const a = (function nr(e, t, n, r) {
          const o = Be(e, t, n);
          return Be(e, t + 1, r) || o;
        })(
          e,
          (function an() {
            return P.lFrame.bindingIndex;
          })(),
          n,
          o
        );
        return ln(2), a ? t + k(n) + r + k(o) + i : L;
      }
      function rr(e, t, n, r, o, i, s, a) {
        const l = v(),
          u = z(),
          c = e + 22,
          d = u.firstCreatePass
            ? (function zS(e, t, n, r, o, i, s, a, l) {
                const u = t.consts,
                  c = Br(t, e, 4, s || null, Sn(u, a));
                Gu(t, n, c, Sn(u, l)), ts(t, c);
                const d = (c.tViews = Uu(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, o, i, s)
            : u.data[c];
        Gt(d, !1);
        const f = l[j].createComment("");
        ms(u, l, f, d),
          je(f, l),
          Ts(l, (l[c] = Bg(f, l, f, d))),
          Yi(d) && $u(u, l, d),
          null != s && Hu(l, d, a);
      }
      function rt(e, t, n) {
        const r = v();
        return (
          Be(r, Er(), t) &&
            (function mt(e, t, n, r, o, i, s, a) {
              const l = ct(t, n);
              let c,
                u = t.inputs;
              !a && null != u && (c = u[r])
                ? (Ku(e, n, c, r, o), Ji(t) && Og(n, t.index))
                : 3 & t.type &&
                  ((r = (function uS(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(l, r, o));
            })(
              z(),
              (function le() {
                const e = P.lFrame;
                return vl(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[j],
              n,
              !1
            ),
          rt
        );
      }
      function Xu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Ku(e, n, t.inputs[s], s, r);
      }
      function ue(e, t, n, r) {
        const o = v(),
          i = z(),
          s = 22 + e,
          a = o[j],
          l = (o[s] = Xl(
            a,
            t,
            (function ZE() {
              return P.lFrame.currentNamespace;
            })()
          )),
          u = i.firstCreatePass
            ? (function ZS(e, t, n, r, o, i, s) {
                const a = t.consts,
                  u = Br(t, e, 2, o, Sn(a, i));
                return (
                  Gu(t, n, u, Sn(a, s)),
                  null !== u.attrs && Ns(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ns(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        Gt(u, !0);
        const c = u.mergedAttrs;
        null !== c && os(a, l, c);
        const d = u.classes;
        null !== d && su(a, l, d);
        const f = u.styles;
        return (
          null !== f && Ap(a, l, f),
          64 != (64 & u.flags) && ms(i, o, l, u),
          0 ===
            (function RE() {
              return P.lFrame.elementDepthCount;
            })() && je(l, o),
          (function FE() {
            P.lFrame.elementDepthCount++;
          })(),
          Yi(u) && ($u(i, o, u), Tg(i, u, o)),
          null !== r && Hu(o, u),
          ue
        );
      }
      function Ie() {
        let e = Me();
        Dl() ? Cl() : ((e = e.parent), Gt(e, !1));
        const t = e;
        !(function OE() {
          P.lFrame.elementDepthCount--;
        })();
        const n = z();
        return (
          n.firstCreatePass && (ts(n, e), hl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function XE(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Xu(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function eb(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Xu(n, t, v(), t.stylesWithoutHost, !1),
          Ie
        );
      }
      function Kt(e, t, n, r) {
        return ue(e, t, n, r), Ie(), Kt;
      }
      function Jo(e, t, n) {
        const r = v(),
          o = z(),
          i = e + 22,
          s = o.firstCreatePass
            ? (function KS(e, t, n, r, o) {
                const i = t.consts,
                  s = Sn(i, r),
                  a = Br(t, e, 8, "ng-container", s);
                return (
                  null !== s && Ns(a, s, !0),
                  Gu(t, n, a, Sn(i, o)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(i, o, r, t, n)
            : o.data[i];
        Gt(s, !0);
        const a = (r[i] = r[j].createComment(""));
        return (
          ms(o, r, a, s),
          je(a, r),
          Yi(s) && ($u(o, r, s), Tg(o, s, r)),
          null != n && Hu(r, s),
          Jo
        );
      }
      function Yo() {
        let e = Me();
        const t = z();
        return (
          Dl() ? Cl() : ((e = e.parent), Gt(e, !1)),
          t.firstCreatePass && (ts(t, e), hl(e) && t.queries.elementEnd(e)),
          Yo
        );
      }
      function Xo(e) {
        return !!e && "function" == typeof e.then;
      }
      const ec = function rm(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Ke(e, t, n, r) {
        const o = v(),
          i = z(),
          s = Me();
        return (
          (function im(e, t, n, r, o, i, s, a) {
            const l = Yi(r),
              c = e.firstCreatePass && Hg(e),
              d = t[8],
              f = $g(t);
            let h = !0;
            if (3 & r.type || a) {
              const y = ct(r, t),
                _ = a ? a(y) : y,
                w = f.length,
                m = a ? (W) => a(_e(W[r.index])) : r.index;
              let S = null;
              if (
                (!a &&
                  l &&
                  (S = (function JS(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== S)
              )
                ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = i),
                  (S.__ngLastListenerFn__ = i),
                  (h = !1);
              else {
                i = am(r, t, d, i, !1);
                const W = n.listen(_, o, i);
                f.push(i, W), c && c.push(o, m, w, w + 1);
              }
            } else i = am(r, t, d, i, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[o])) {
              const y = g.length;
              if (y)
                for (let _ = 0; _ < y; _ += 2) {
                  const ae = t[g[_]][g[_ + 1]].subscribe(i),
                    gr = f.length;
                  f.push(i, ae), c && c.push(o, r.index, gr, -(gr + 1));
                }
            }
          })(i, o, o[j], s, e, t, 0, r),
          Ke
        );
      }
      function sm(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Gg(e, o), !1;
        }
      }
      function am(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          qu(2 & e.flags ? dt(e.index, t) : t);
          let l = sm(t, 0, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = sm(t, 0, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function tc(e = 1) {
        return (function GE(e) {
          return (P.lFrame.contextLView = (function zE(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, P.lFrame.contextLView))[8];
        })(e);
      }
      function ym(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Ft(i) : hn(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          rI(e[a], t) && ((l = !0), (e[a + 1] = r ? Nu(c) : Tu(c))),
            (a = r ? Ft(c) : hn(c));
        }
        l && (e[n + 1] = r ? Tu(i) : Nu(i));
      }
      function rI(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Nr(e, t) >= 0)
        );
      }
      const Ae = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function vm(e) {
        return e.substring(Ae.key, Ae.keyEnd);
      }
      function _m(e, t) {
        const n = Ae.textEnd;
        return n === t
          ? -1
          : ((t = Ae.keyEnd =
              (function aI(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (Ae.key = t), n)),
            Jr(e, t, n));
      }
      function Jr(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function Ps(e, t) {
        return (
          (function Ot(e, t, n, r) {
            const o = v(),
              i = z(),
              s = ln(2);
            i.firstUpdatePass && Sm(i, e, s, r),
              t !== L &&
                Be(o, s, t) &&
                Am(
                  i,
                  i.data[qe()],
                  o,
                  o[j],
                  e,
                  (o[s + 1] = (function yI(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = X(Tn(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Ps
        );
      }
      function rc(e) {
        !(function Pt(e, t, n, r) {
          const o = z(),
            i = ln(2);
          o.firstUpdatePass && Sm(o, null, i, r);
          const s = v();
          if (n !== L && Be(s, i, n)) {
            const a = o.data[qe()];
            if (xm(a, r) && !Mm(o, i)) {
              let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (n = il(l, n || "")), Xu(o, a, s, n, r);
            } else
              !(function mI(e, t, n, r, o, i, s, a) {
                o === L && (o = Z);
                let l = 0,
                  u = 0,
                  c = 0 < o.length ? o[0] : null,
                  d = 0 < i.length ? i[0] : null;
                for (; null !== c || null !== d; ) {
                  const f = l < o.length ? o[l + 1] : void 0,
                    h = u < i.length ? i[u + 1] : void 0;
                  let g,
                    p = null;
                  c === d
                    ? ((l += 2), (u += 2), f !== h && ((p = d), (g = h)))
                    : null === d || (null !== c && c < d)
                    ? ((l += 2), (p = c))
                    : ((u += 2), (p = d), (g = h)),
                    null !== p && Am(e, t, n, r, p, g, s, a),
                    (c = l < o.length ? o[l] : null),
                    (d = u < i.length ? i[u] : null);
                }
              })(
                o,
                a,
                s,
                s[j],
                s[i + 1],
                (s[i + 1] = (function gI(e, t, n) {
                  if (null == n || "" === n) return Z;
                  const r = [],
                    o = Tn(n);
                  if (Array.isArray(o))
                    for (let i = 0; i < o.length; i++) e(r, o[i], !0);
                  else if ("object" == typeof o)
                    for (const i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
                  else "string" == typeof o && t(r, o);
                  return r;
                })(e, t, n)),
                r,
                i
              );
          }
        })(ht, Jt, e, !0);
      }
      function Jt(e, t) {
        for (
          let n = (function iI(e) {
            return (
              (function Cm(e) {
                (Ae.key = 0),
                  (Ae.keyEnd = 0),
                  (Ae.value = 0),
                  (Ae.valueEnd = 0),
                  (Ae.textEnd = e.length);
              })(e),
              _m(e, Jr(e, 0, Ae.textEnd))
            );
          })(t);
          n >= 0;
          n = _m(t, n)
        )
          ht(e, vm(t), !0);
      }
      function Mm(e, t) {
        return t >= e.expandoStartIndex;
      }
      function Sm(e, t, n, r) {
        const o = e.data;
        if (null === o[n + 1]) {
          const i = o[qe()],
            s = Mm(e, n);
          xm(i, r) && null === t && !s && (t = !1),
            (t = (function dI(e, t, n, r) {
              const o = (function El(e) {
                const t = P.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let i = r ? t.residualClasses : t.residualStyles;
              if (null === o)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = ei((n = oc(null, e, t, n, r)), t.attrs, r)),
                  (i = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== o)
                  if (((n = oc(o, e, t, n, r)), null === i)) {
                    let l = (function fI(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== hn(r)) return e[Ft(r)];
                    })(e, t, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = oc(null, e, t, l[1], r)),
                      (l = ei(l, t.attrs, r)),
                      (function hI(e, t, n, r) {
                        e[Ft(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, l));
                  } else
                    i = (function pI(e, t, n) {
                      let r;
                      const o = t.directiveEnd;
                      for (let i = 1 + t.directiveStylingLast; i < o; i++)
                        r = ei(r, e[i].hostAttrs, n);
                      return ei(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== i &&
                  (r ? (t.residualClasses = i) : (t.residualStyles = i)),
                n
              );
            })(o, i, t, r)),
            (function tI(e, t, n, r, o, i) {
              let s = i ? t.classBindings : t.styleBindings,
                a = Ft(s),
                l = hn(s);
              e[r] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const d = n;
                (c = d[1]), (null === c || Nr(d, c) > 0) && (u = !0);
              } else c = n;
              if (o)
                if (0 !== l) {
                  const f = Ft(e[a + 1]);
                  (e[r + 1] = bs(f, a)),
                    0 !== f && (e[f + 1] = xu(e[f + 1], r)),
                    (e[a + 1] = (function qM(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = bs(a, 0)),
                    0 !== a && (e[a + 1] = xu(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = bs(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = xu(e[l + 1], r)),
                  (l = r);
              u && (e[r + 1] = Tu(e[r + 1])),
                ym(e, c, r, !0),
                ym(e, c, r, !1),
                (function nI(e, t, n, r, o) {
                  const i = o ? e.residualClasses : e.residualStyles;
                  null != i &&
                    "string" == typeof t &&
                    Nr(i, t) >= 0 &&
                    (n[r + 1] = Nu(n[r + 1]));
                })(t, c, e, r, i),
                (s = bs(a, l)),
                i ? (t.classBindings = s) : (t.styleBindings = s);
            })(o, i, t, n, s, r);
        }
      }
      function oc(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = ei(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function ei(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                ht(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Am(e, t, n, r, o, i, s, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          u = l[a + 1];
        ks(
          (function _g(e) {
            return 1 == (1 & e);
          })(u)
            ? Tm(l, t, n, o, hn(u), s)
            : void 0
        ) ||
          (ks(i) ||
            ((function vg(e) {
              return 2 == (2 & e);
            })(u) &&
              (i = Tm(l, null, n, o, a, s))),
          (function m0(e, t, n, r, o) {
            if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let i = -1 === r.indexOf("-") ? void 0 : nt.DashCase;
              null == o
                ? e.removeStyle(n, r, i)
                : ("string" == typeof o &&
                    o.endsWith("!important") &&
                    ((o = o.slice(0, -10)), (i |= nt.Important)),
                  e.setStyle(n, r, o, i));
            }
          })(r, s, Xi(qe(), n), o, i));
      }
      function Tm(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[o + 1];
          f === L && (f = d ? Z : void 0);
          let h = d ? Ll(f, r) : c === r ? f : void 0;
          if ((u && !ks(h) && (h = Ll(l, r)), ks(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Ft(p) : hn(p);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = Ll(l, r));
        }
        return a;
      }
      function ks(e) {
        return void 0 !== e;
      }
      function xm(e, t) {
        return 0 != (e.flags & (t ? 16 : 32));
      }
      function kt(e, t = "") {
        const n = v(),
          r = z(),
          o = e + 22,
          i = r.firstCreatePass ? Br(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Yl(e, t) {
            return e.createText(t);
          })(n[j], t));
        ms(r, n, s, i), Gt(i, !1);
      }
      function Yr(e) {
        return ti("", e, ""), Yr;
      }
      function ti(e, t, n) {
        const r = v(),
          o = (function Ur(e, t, n, r) {
            return Be(e, Er(), n) ? t + k(n) + r : L;
          })(r, e, t, n);
        return o !== L && pn(r, qe(), o), ti;
      }
      function Ls(e, t, n, r, o) {
        const i = v(),
          s = Gr(i, e, t, n, r, o);
        return s !== L && pn(i, qe(), s), Ls;
      }
      const eo = "en-US";
      let Jm = eo;
      function ac(e, t, n, r, o) {
        if (((e = R(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) ac(e[i], t, n, r, o);
        else {
          const i = z(),
            s = v();
          let a = er(e) ? e : R(e.provide),
            l = Kp(e);
          const u = Me(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (er(e) || !e.multi) {
            const h = new Eo(l, o, D),
              p = uc(a, t, o ? c : c + f, d);
            -1 === p
              ? (ls(Mo(u, s), i, a),
                lc(i, e, t.length),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = uc(a, t, c + f, d),
              p = uc(a, t, c, c + f),
              g = h >= 0 && n[h],
              y = p >= 0 && n[p];
            if ((o && !y) || (!o && !g)) {
              ls(Mo(u, s), i, a);
              const _ = (function PA(e, t, n, r, o) {
                const i = new Eo(e, n, D);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  wy(i, o, r && !n),
                  i
                );
              })(o ? OA : FA, n.length, o, r, l);
              !o && y && (n[p].providerFactory = _),
                lc(i, e, t.length, 0),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(_),
                s.push(_);
            } else lc(i, e, h > -1 ? h : p, wy(n[o ? p : h], l, !o && r));
            !o && r && y && n[p].componentProviders++;
          }
        }
      }
      function lc(e, t, n, r) {
        const o = er(t),
          i = (function W0(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const l = (i ? R(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function wy(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function uc(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function FA(e, t, n, r) {
        return cc(this.multi, []);
      }
      function OA(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = So(n, n[1], this.providerFactory.index, r);
          (i = a.slice(0, s)), cc(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), cc(o, i);
        return i;
      }
      function cc(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function se(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function RA(e, t, n) {
              const r = z();
              if (r.firstCreatePass) {
                const o = Nt(e);
                ac(n, r.data, r.blueprint, o, !0),
                  ac(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class ir {}
      class Ey {}
      class by extends ir {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Qu(this));
          const r = lt(t);
          (this._bootstrapComponents = fn(r.bootstrap)),
            (this._r3Injector = cg(
              t,
              n,
              [
                { provide: ir, useValue: this },
                { provide: zo, useValue: this.componentFactoryResolver },
              ],
              X(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class dc extends Ey {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new by(this.moduleType, t);
        }
      }
      class LA extends ir {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Qu(this)),
            (this.instance = null);
          const o = new Zp(
            [
              ...t,
              { provide: ir, useValue: this },
              { provide: zo, useValue: this.componentFactoryResolver },
            ],
            n || ws(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Hs(e, t, n = null) {
        return new LA(e, t, n).injector;
      }
      let VA = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Gp(0, n.type),
                o =
                  r.length > 0
                    ? Hs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = F({
            token: e,
            providedIn: "environment",
            factory: () => new e(M(xn)),
          })),
          e
        );
      })();
      function My(e) {
        e.getStandaloneInjector = (t) =>
          t.get(VA).getOrCreateStandaloneInjector(e);
      }
      function Ry(e, t, n, r, o, i) {
        const s = t + n;
        return Be(e, s, o)
          ? (function qt(e, t, n) {
              return (e[t] = n);
            })(e, s + 1, i ? r.call(i, o) : r(o))
          : (function ai(e, t) {
              const n = e[t];
              return n === L ? void 0 : n;
            })(e, s + 1);
      }
      function li(e, t) {
        const n = z();
        let r;
        const o = e + 22;
        n.firstCreatePass
          ? ((r = (function rT(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[o] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(o, r.onDestroy))
          : (r = n.data[o]);
        const i = r.factory || (r.factory = Jn(r.type)),
          s = vt(D);
        try {
          const a = ss(!1),
            l = i();
          return (
            ss(a),
            (function WS(e, t, n, r) {
              n >= e.data.length &&
                ((e.data[n] = null), (e.blueprint[n] = null)),
                (t[n] = r);
            })(n, v(), o, l),
            l
          );
        } finally {
          vt(s);
        }
      }
      function ui(e, t, n) {
        const r = e + 22,
          o = v(),
          i = (function wr(e, t) {
            return e[t];
          })(o, r);
        return (function ci(e, t) {
          return e[1].data[t].pure;
        })(o, r)
          ? Ry(
              o,
              (function We() {
                const e = P.lFrame;
                let t = e.bindingRootIndex;
                return (
                  -1 === t &&
                    (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                  t
                );
              })(),
              t,
              i.transform,
              n,
              i
            )
          : i.transform(n);
      }
      function hc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const he = class lT extends Ht {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = hc(i)), o && (o = hc(o)), s && (s = hc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof yt && t.add(a), a;
        }
      };
      let gn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = fT), e;
      })();
      const cT = gn,
        dT = class extends cT {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = Is(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              Bu(r, o, t),
              new qo(o)
            );
          }
        };
      function fT() {
        return (function Us(e, t) {
          return 4 & e.type ? new dT(t, e, kr(e, t)) : null;
        })(Me(), v());
      }
      let Lt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = hT), e;
      })();
      function hT() {
        return (function jy(e, t) {
          let n;
          const r = t[e.index];
          if (xt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = _e(r);
            else {
              const i = t[j];
              o = i.createComment("");
              const s = ct(e, t);
              Yn(
                i,
                gs(i, s),
                o,
                (function h0(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = Bg(r, t, o, e)), Ts(t, n);
          }
          return new Ly(n, e, t);
        })(Me(), v());
      }
      const pT = Lt,
        Ly = class extends pT {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return kr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Sr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = as(this._hostTNode, this._hostLView);
            if (Rh(t)) {
              const n = Mr(t, this._hostLView),
                r = br(t);
              return new Sr(n[1].data[r + 8], n);
            }
            return new Sr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Vy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function To(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new Zo(Q(t)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(xn, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function NE(e) {
                return xt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Ly(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function l0(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Uh(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function u0(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = ru(i, s),
              l = r[j],
              u = gs(l, s[7]);
            return (
              null !== u &&
                (function o0(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Bo(e, r, n, 1, o, i);
                })(o, s[6], l, r, u, a),
              t.attachToViewContainerRef(),
              Uh(gc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Vy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = eu(this._lContainer, n);
            r && (cs(gc(this._lContainer), n), yp(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = eu(this._lContainer, n);
            return r && null != cs(gc(this._lContainer), n) ? new qo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Vy(e) {
        return e[8];
      }
      function gc(e) {
        return e[8] || (e[8] = []);
      }
      function zs(...e) {}
      const Ws = new I("Application Initializer");
      let qs = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = zs),
              (this.reject = zs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Xo(i)) n.push(i);
                else if (ec(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ws, 8));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const fi = new I("AppId", {
        providedIn: "root",
        factory: function uv() {
          return `${Ac()}${Ac()}${Ac()}`;
        },
      });
      function Ac() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const cv = new I("Platform Initializer"),
        Tc = new I("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        dv = new I("appBootstrapListener");
      let GT = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const mn = new I("LocaleId", {
        providedIn: "root",
        factory: () =>
          ge(mn, x.Optional | x.SkipSelf) ||
          (function zT() {
            return (typeof $localize < "u" && $localize.locale) || eo;
          })(),
      });
      class qT {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let xc = (() => {
        class e {
          compileModuleSync(n) {
            return new dc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = fn(lt(n).declarations).reduce((s, a) => {
                const l = Q(a);
                return l && s.push(new Zo(l)), s;
              }, []);
            return new qT(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const QT = (() => Promise.resolve(0))();
      function Nc(e) {
        typeof Zone > "u"
          ? QT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Te {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new he(!1)),
            (this.onMicrotaskEmpty = new he(!1)),
            (this.onStable = new he(!1)),
            (this.onError = new he(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function JT() {
              let e = ne.requestAnimationFrame,
                t = ne.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function ex(e) {
              const t = () => {
                !(function XT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ne, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Fc(e),
                                (e.isCheckStableRunning = !0),
                                Rc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Fc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return pv(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      gv(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return pv(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), gv(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Fc(e),
                          Rc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Te.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (Te.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, YT, zs, zs);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const YT = {};
      function Rc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Fc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function pv(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function gv(e) {
        e._nesting--, Rc(e);
      }
      class tx {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new he()),
            (this.onMicrotaskEmpty = new he()),
            (this.onStable = new he()),
            (this.onError = new he());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const mv = new I(""),
        Zs = new I("");
      let kc,
        Oc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                kc ||
                  ((function nx(e) {
                    kc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Te.assertNotInAngularZone(),
                        Nc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Nc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Te), M(Pc), M(Zs));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Pc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return kc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        Fn = null;
      const yv = new I("AllowMultipleToken"),
        Lc = new I("PlatformDestroyListeners");
      class vv {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Dv(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new I(r);
        return (i = []) => {
          let s = Vc();
          if (!s || s.injector.get(yv, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function ix(e) {
                  if (Fn && !Fn.get(yv, !1)) throw new C(400, !1);
                  Fn = e;
                  const t = e.get(wv);
                  (function _v(e) {
                    const t = e.get(cv, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Cv(e = [], t) {
                    return gt.create({
                      name: t,
                      providers: [
                        { provide: yu, useValue: "platform" },
                        { provide: Lc, useValue: new Set([() => (Fn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function ax(e) {
            const t = Vc();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function Vc() {
        return Fn?.get(wv) ?? null;
      }
      let wv = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function bv(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new tx()
                      : ("zone.js" === e ? void 0 : e) || new Te(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Ev(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: Te, useValue: o }];
            return o.run(() => {
              const s = gt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(Lr, null);
              if (!l) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const u = o.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Qs(this._modules, a), u.unsubscribe();
                  });
                }),
                (function Mv(e, t, n) {
                  try {
                    const r = n();
                    return Xo(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const u = a.injector.get(qs);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function Ym(e) {
                          st(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Jm = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(mn, eo) || eo),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Sv({}, r);
            return (function rx(e, t, n) {
              const r = new dc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Ks);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Lc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(gt));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Sv(e, t) {
        return Array.isArray(t) ? t.reduce(Sv, e) : { ...e, ...t };
      }
      let Ks = (() => {
        class e {
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new pe((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new pe((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Te.assertNotInAngularZone(),
                      Nc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  Te.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function Xw(...e) {
              const t = go(e),
                n = (function Ww(e, t) {
                  return "number" == typeof nl(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? It(r[0])
                  : mr(n)(ve(r, t))
                : rn;
            })(
              i,
              s.pipe(
                (function eE(e = {}) {
                  const {
                    connector: t = () => new Ht(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Ne((g, y) => {
                      u++, !d && !c && f();
                      const _ = (l = l ?? t());
                      y.add(() => {
                        u--, 0 === u && !d && !c && (a = rl(p, o));
                      }),
                        _.subscribe(y),
                        !s &&
                          u > 0 &&
                          ((s = new po({
                            next: (w) => _.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = rl(h, n, w)), _.error(w);
                            },
                            complete: () => {
                              (c = !0), f(), (a = rl(h, r)), _.complete();
                            },
                          })),
                          It(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof Qp;
            if (!this._injector.get(qs).done)
              throw (
                (!o &&
                  (function vr(e) {
                    const t = Q(e) || Ge(e) || ze(e);
                    return null !== t && t.standalone;
                  })(n),
                new C(405, false))
              );
            let s;
            (s = o ? n : this._injector.get(zo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function ox(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(ir),
              u = s.create(gt.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(mv, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Qs(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Qs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(dv, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Qs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Te), M(xn), M(Lr));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Qs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Av = !0,
        Js = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = cx), e;
        })();
      function cx(e) {
        return (function dx(e, t, n) {
          if (Ji(e) && !n) {
            const r = dt(e.index, t);
            return new qo(r, r);
          }
          return 47 & e.type ? new qo(t[16], t) : null;
        })(Me(), v(), 16 == (16 & e));
      }
      class Fv {
        constructor() {}
        supports(t) {
          return Ko(t);
        }
        create(t) {
          return new yx(t);
        }
      }
      const mx = (e, t) => t;
      class yx {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || mx);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Pv(r, o, i)) ? n : r,
              a = Pv(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Ko(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function HS(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[tr()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new vx(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Ov()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Ov()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class vx {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class _x {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Ov {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new _x()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Pv(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function Lv() {
        return new ea([new Fv()]);
      }
      let ea = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Lv()),
              deps: [[e, new Po(), new Oo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = F({ token: e, providedIn: "root", factory: Lv })), e;
      })();
      const bx = Dv(null, "core", []);
      let Mx = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ks));
          }),
          (e.ɵmod = _t({ type: e })),
          (e.ɵinj = at({})),
          e
        );
      })();
      let ta = null;
      function Yt() {
        return ta;
      }
      const Ye = new I("DocumentToken");
      let Uc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return (function Tx() {
                return M(jv);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const xx = new I("Location Initialized");
      let jv = (() => {
        class e extends Uc {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Yt().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Yt().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Yt().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, o) {
            Bv() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            Bv()
              ? this._history.replaceState(n, r, o)
              : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ye));
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return (function Nx() {
                return new jv(M(Ye));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Bv() {
        return !!window.history.pushState;
      }
      function Gc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function $v(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function _n(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let ar = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return ge(Uv);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Hv = new I("appBaseHref");
      let Uv = (() => {
          class e extends ar {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  ge(Ye).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Gc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  _n(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + _n(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + _n(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Uc), M(Hv, 8));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Rx = (() => {
          class e extends ar {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Gc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + _n(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + _n(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Uc), M(Hv, 8));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        zc = (() => {
          class e {
            constructor(n) {
              (this._subject = new he()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = $v(Gv(r))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + _n(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function Ox(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, Gv(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + _n(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + _n(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = _n),
            (e.joinWithSlash = Gc),
            (e.stripTrailingSlash = $v),
            (e.ɵfac = function (n) {
              return new (n || e)(M(ar));
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return (function Fx() {
                  return new zc(M(ar));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Gv(e) {
        return e.replace(/\/index.html$/, "");
      }
      function Xv(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class _N {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let n_ = (() => {
        class e {
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new _N(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), r_(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              r_(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Lt), D(gn), D(ea));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function r_(e, t) {
        e.context.$implicit = t.item;
      }
      let o_ = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new CN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            i_("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            i_("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Lt), D(gn));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class CN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function i_(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${X(t)}'.`
          );
      }
      function Bt(e, t) {
        return new C(2100, !1);
      }
      const FN =
        /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
      let a_ = (() => {
          class e {
            transform(n) {
              if (null == n) return null;
              if ("string" != typeof n) throw Bt();
              return n.replace(
                FN,
                (r) => r[0].toUpperCase() + r.slice(1).toLowerCase()
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵpipe = et({
              name: "titlecase",
              type: e,
              pure: !0,
              standalone: !0,
            })),
            e
          );
        })(),
        l_ = (() => {
          class e {
            transform(n) {
              if (null == n) return null;
              if ("string" != typeof n) throw Bt();
              return n.toUpperCase();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵpipe = et({
              name: "uppercase",
              type: e,
              pure: !0,
              standalone: !0,
            })),
            e
          );
        })(),
        WN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({})),
            e
          );
        })();
      let QN = (() => {
        class e {}
        return (
          (e.ɵprov = F({
            token: e,
            providedIn: "root",
            factory: () => new JN(M(Ye), window),
          })),
          e
        );
      })();
      class JN {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function YN(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              d_(this.window.history) ||
              d_(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function d_(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class f_ {}
      class ad extends class mR extends class Ax {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function Ix(e) {
            ta || (ta = e);
          })(new ad());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function yR() {
            return (
              (yi = yi || document.querySelector("base")),
              yi ? yi.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function vR(e) {
                (fa = fa || document.createElement("a")),
                  fa.setAttribute("href", e);
                const t = fa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          yi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return Xv(document.cookie, t);
        }
      }
      let fa,
        yi = null;
      const m_ = new I("TRANSITION_ID"),
        DR = [
          {
            provide: Ws,
            useFactory: function _R(e, t, n) {
              return () => {
                n.get(qs).donePromise.then(() => {
                  const r = Yt(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [m_, Ye, gt],
            multi: !0,
          },
        ];
      let wR = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ha = new I("EventManagerPlugins");
      let pa = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(ha), M(Te));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class y_ {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = Yt().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let v_ = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        vi = (() => {
          class e extends v_ {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(__), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(__));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ye));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function __(e) {
        Yt().remove(e);
      }
      const ld = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        ud = /%COMP%/g;
      function ga(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? ga(e, o, n) : ((o = o.replace(ud, e)), n.push(o));
        }
        return n;
      }
      function w_(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let cd = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new dd(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Ut.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new AR(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case Ut.ShadowDom:
                return new TR(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = ga(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(pa), M(vi), M(fi));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class dd {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(ld[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (b_(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (b_(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = ld[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = ld[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (nt.DashCase | nt.Important)
            ? t.style.setProperty(n, r, o & nt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & nt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, w_(r))
            : this.eventManager.addEventListener(t, n, w_(r));
        }
      }
      function b_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class AR extends dd {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = ga(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function MR(e) {
              return "_ngcontent-%COMP%".replace(ud, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function SR(e) {
              return "_nghost-%COMP%".replace(ud, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class TR extends dd {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = ga(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let xR = (() => {
        class e extends y_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ye));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const M_ = ["alt", "control", "meta", "shift"],
        NR = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        RR = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let FR = (() => {
        class e extends y_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Yt().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              M_.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = NR[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                M_.forEach((s) => {
                  s !== o && (0, RR[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ye));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const LR = Dv(bx, "browser", [
          { provide: Tc, useValue: "browser" },
          {
            provide: cv,
            useValue: function OR() {
              ad.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Ye,
            useFactory: function kR() {
              return (
                (function D0(e) {
                  lu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        A_ = new I(""),
        T_ = [
          {
            provide: Zs,
            useClass: class CR {
              addToWindow(t) {
                (ne.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ne.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ne.getAllAngularRootElements = () => t.getAllRootElements()),
                  ne.frameworkStabilizers || (ne.frameworkStabilizers = []),
                  ne.frameworkStabilizers.push((r) => {
                    const o = ne.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Yt().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: mv, useClass: Oc, deps: [Te, Pc, Zs] },
          { provide: Oc, useClass: Oc, deps: [Te, Pc, Zs] },
        ],
        x_ = [
          { provide: yu, useValue: "root" },
          {
            provide: Lr,
            useFactory: function PR() {
              return new Lr();
            },
            deps: [],
          },
          { provide: ha, useClass: xR, multi: !0, deps: [Ye, Te, Tc] },
          { provide: ha, useClass: FR, multi: !0, deps: [Ye] },
          { provide: cd, useClass: cd, deps: [pa, vi, fi] },
          { provide: Yp, useExisting: cd },
          { provide: v_, useExisting: vi },
          { provide: vi, useClass: vi, deps: [Ye] },
          { provide: pa, useClass: pa, deps: [ha, Te] },
          { provide: f_, useClass: wR, deps: [] },
          [],
        ];
      let VR = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: fi, useValue: n.appId },
                  { provide: m_, useExisting: fi },
                  DR,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(A_, 12));
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({ providers: [...x_, ...T_], imports: [WN, Mx] })),
            e
          );
        })(),
        N_ = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ye));
            }),
            (e.ɵprov = F({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function BR() {
                        return new N_(M(Ye));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function A(...e) {
        return ve(e, go(e));
      }
      typeof window < "u" && window;
      class $t extends Ht {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const ma = fo(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: ZR } = Array,
        { getPrototypeOf: KR, prototype: QR, keys: JR } = Object;
      function O_(e) {
        if (1 === e.length) {
          const t = e[0];
          if (ZR(t)) return { args: t, keys: null };
          if (
            (function YR(e) {
              return e && "object" == typeof e && KR(e) === QR;
            })(t)
          ) {
            const n = JR(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: XR } = Array;
      function P_(e) {
        return H((t) =>
          (function eF(e, t) {
            return XR(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function k_(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function L_(...e) {
        const t = go(e),
          n = Yf(e),
          { args: r, keys: o } = O_(e);
        if (0 === r.length) return ve([], t);
        const i = new pe(
          (function tF(e, t, n = zn) {
            return (r) => {
              V_(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    V_(
                      t,
                      () => {
                        const u = ve(e[l], t);
                        let c = !1;
                        u.subscribe(
                          be(
                            r,
                            (d) => {
                              (i[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => k_(o, s) : zn)
        );
        return n ? i.pipe(P_(n)) : i;
      }
      function V_(e, t, n) {
        e ? nn(n, e, t) : t();
      }
      function pd(...e) {
        return (function nF() {
          return mr(1);
        })()(ve(e, go(e)));
      }
      function j_(e) {
        return new pe((t) => {
          It(e()).subscribe(t);
        });
      }
      function _i(e, t) {
        const n = ee(e) ? e : () => e,
          r = (o) => o.error(n());
        return new pe(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function gd() {
        return Ne((e, t) => {
          let n = null;
          e._refCount++;
          const r = be(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class B_ extends pe {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Vf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new yt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                be(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = yt.EMPTY));
          }
          return t;
        }
        refCount() {
          return gd()(this);
        }
      }
      function Xt(e, t) {
        return Ne((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            be(
              r,
              (l) => {
                o?.unsubscribe();
                let u = 0;
                const c = i++;
                It(e(l, c)).subscribe(
                  (o = be(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Di(e) {
        return e <= 0
          ? () => rn
          : Ne((t, n) => {
              let r = 0;
              t.subscribe(
                be(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function Cn(e, t) {
        return Ne((n, r) => {
          let o = 0;
          n.subscribe(be(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function ya(e) {
        return Ne((t, n) => {
          let r = !1;
          t.subscribe(
            be(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function $_(e = oF) {
        return Ne((t, n) => {
          let r = !1;
          t.subscribe(
            be(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function oF() {
        return new ma();
      }
      function Pn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Cn((o, i) => e(o, i, r)) : zn,
            Di(1),
            n ? ya(t) : $_(() => new ma())
          );
      }
      function kn(e, t) {
        return ee(t) ? Fe(e, t, 1) : Fe(e, 1);
      }
      function He(e, t, n) {
        const r = ee(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ne((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                be(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : zn;
      }
      function Ln(e) {
        return Ne((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            be(n, void 0, void 0, (s) => {
              (i = It(e(s, Ln(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function iF(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            l = t,
            u = 0;
          i.subscribe(
            be(
              s,
              (c) => {
                const d = u++;
                (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
              },
              o &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function H_(e, t) {
        return Ne(iF(e, t, arguments.length >= 2, !0));
      }
      function md(e) {
        return e <= 0
          ? () => rn
          : Ne((t, n) => {
              let r = [];
              t.subscribe(
                be(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function U_(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Cn((o, i) => e(o, i, r)) : zn,
            md(1),
            n ? ya(t) : $_(() => new ma())
          );
      }
      function yd(e) {
        return Ne((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const $ = "primary",
        Ci = Symbol("RouteTitle");
      class lF {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ro(e) {
        return new lF(e);
      }
      function uF(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function en(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !G_(e[o], t[o]))) return !1;
        return !0;
      }
      function G_(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function z_(e) {
        return Array.prototype.concat.apply([], e);
      }
      function W_(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Oe(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Vn(e) {
        return ec(e) ? e : Xo(e) ? ve(Promise.resolve(e)) : A(e);
      }
      const fF = {
          exact: function K_(e, t, n) {
            if (
              !ur(e.segments, t.segments) ||
              !va(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !K_(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Q_,
        },
        q_ = {
          exact: function hF(e, t) {
            return en(e, t);
          },
          subset: function pF(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => G_(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Z_(e, t, n) {
        return (
          fF[n.paths](e.root, t.root, n.matrixParams) &&
          q_[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Q_(e, t, n) {
        return J_(e, t, t.segments, n);
      }
      function J_(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!ur(o, n) || t.hasChildren() || !va(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!ur(e.segments, n) || !va(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Q_(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(ur(e.segments, o) && va(e.segments, o, r) && e.children[$]) &&
            J_(e.children[$], t, i, r)
          );
        }
      }
      function va(e, t, n) {
        return t.every((r, o) => q_[n](e[o].parameters, r.parameters));
      }
      class lr {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ro(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return yF.serialize(this);
        }
      }
      class U {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Oe(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return _a(this);
        }
      }
      class wi {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ro(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return tD(this);
        }
      }
      function ur(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Y_ = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return new _d();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class _d {
        parse(t) {
          const n = new SF(t);
          return new lr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Ei(t.root, !0)}`,
            r = (function DF(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Da(n)}=${Da(o)}`).join("&")
                    : `${Da(n)}=${Da(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function vF(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const yF = new _d();
      function _a(e) {
        return e.segments.map((t) => tD(t)).join("/");
      }
      function Ei(e, t) {
        if (!e.hasChildren()) return _a(e);
        if (t) {
          const n = e.children[$] ? Ei(e.children[$], !1) : "",
            r = [];
          return (
            Oe(e.children, (o, i) => {
              i !== $ && r.push(`${i}:${Ei(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function mF(e, t) {
            let n = [];
            return (
              Oe(e.children, (r, o) => {
                o === $ && (n = n.concat(t(r, o)));
              }),
              Oe(e.children, (r, o) => {
                o !== $ && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === $ ? [Ei(e.children[$], !1)] : [`${o}:${Ei(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${_a(e)}/${n[0]}`
            : `${_a(e)}/(${n.join("//")})`;
        }
      }
      function X_(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Da(e) {
        return X_(e).replace(/%3B/gi, ";");
      }
      function Dd(e) {
        return X_(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Ca(e) {
        return decodeURIComponent(e);
      }
      function eD(e) {
        return Ca(e.replace(/\+/g, "%20"));
      }
      function tD(e) {
        return `${Dd(e.path)}${(function _F(e) {
          return Object.keys(e)
            .map((t) => `;${Dd(t)}=${Dd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const CF = /^[^\/()?;=#]+/;
      function wa(e) {
        const t = e.match(CF);
        return t ? t[0] : "";
      }
      const wF = /^[^=?&#]+/,
        bF = /^[^&#]+/;
      class SF {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new U([], {})
              : new U([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[$] = new U(t, n)),
            r
          );
        }
        parseSegment() {
          const t = wa(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new C(4009, !1);
          return this.capture(t), new wi(Ca(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = wa(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = wa(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Ca(n)] = Ca(r);
        }
        parseQueryParam(t) {
          const n = (function EF(e) {
            const t = e.match(wF);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function MF(e) {
              const t = e.match(bF);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = eD(n),
            i = eD(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = wa(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = $);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[$] : new U([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new C(4011, !1);
        }
      }
      function Cd(e) {
        return e.segments.length > 0 ? new U([], { [$]: e }) : e;
      }
      function Ea(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Ea(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function IF(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new U(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new U(e.segments, t));
      }
      function cr(e) {
        return e instanceof lr;
      }
      function xF(e, t, n, r, o) {
        if (0 === n.length) return oo(t.root, t.root, t.root, r, o);
        const i = (function oD(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new rD(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Oe(i.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new rD(n, t, r);
        })(n);
        return i.toRoot()
          ? oo(t.root, t.root, new U([], {}), r, o)
          : (function s(l) {
              const u = (function RF(e, t, n, r) {
                  if (e.isAbsolute) return new io(t.root, !0, 0);
                  if (-1 === r) return new io(n, n === t.root, 0);
                  return (function iD(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new C(4005, !1);
                      o = r.segments.length;
                    }
                    return new io(r, !1, o - i);
                  })(n, r + (bi(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? Si(u.segmentGroup, u.index, i.commands)
                  : Ed(u.segmentGroup, u.index, i.commands);
              return oo(t.root, u.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function bi(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Mi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function oo(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Oe(r, (l, u) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : nD(e, t, n));
        const a = Cd(Ea(s));
        return new lr(a, i, o);
      }
      function nD(e, t, n) {
        const r = {};
        return (
          Oe(e.children, (o, i) => {
            r[i] = o === t ? n : nD(o, t, n);
          }),
          new U(e.segments, r)
        );
      }
      class rD {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && bi(r[0]))
          )
            throw new C(4003, !1);
          const o = r.find(Mi);
          if (o && o !== W_(r)) throw new C(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class io {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Ed(e, t, n) {
        if (
          (e || (e = new U([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Si(e, t, n);
        const r = (function OF(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Mi(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!aD(l, u, s)) return i;
                r += 2;
              } else {
                if (!aD(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new U(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[$] = new U(e.segments.slice(r.pathIndex), e.children)),
            Si(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new U(e.segments, {})
          : r.match && !e.hasChildren()
          ? bd(e, t, n)
          : r.match
          ? Si(e, 0, o)
          : bd(e, t, n);
      }
      function Si(e, t, n) {
        if (0 === n.length) return new U(e.segments, {});
        {
          const r = (function FF(e) {
              return Mi(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            o = {};
          return (
            Oe(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Ed(e.children[s], t, i));
            }),
            Oe(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new U(e.segments, o)
          );
        }
      }
      function bd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Mi(i)) {
            const l = PF(i.outlets);
            return new U(r, l);
          }
          if (0 === o && bi(n[0])) {
            r.push(new wi(e.segments[t].path, sD(n[0]))), o++;
            continue;
          }
          const s = Mi(i) ? i.outlets[$] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && bi(a)
            ? (r.push(new wi(s, sD(a))), (o += 2))
            : (r.push(new wi(s, {})), o++);
        }
        return new U(r, {});
      }
      function PF(e) {
        const t = {};
        return (
          Oe(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = bd(new U([], {}), 0, n));
          }),
          t
        );
      }
      function sD(e) {
        const t = {};
        return Oe(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function aD(e, t, n) {
        return e == n.path && en(t, n.parameters);
      }
      class wn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Md extends wn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class dr extends wn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ba extends wn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class lD extends wn {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class kF extends wn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class LF extends wn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class VF extends wn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class jF extends wn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class BF extends wn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class $F {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class HF {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class UF {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class GF {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zF {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class WF {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class uD {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class cD {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Sd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Sd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Id(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Id(t, this._root).map((n) => n.value);
        }
      }
      function Sd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Sd(e, n);
          if (r) return r;
        }
        return null;
      }
      function Id(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Id(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class En {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function so(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class dD extends cD {
        constructor(t, n) {
          super(t), (this.snapshot = n), Ad(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function fD(e, t) {
        const n = (function ZF(e, t) {
            const s = new Ma([], {}, {}, "", {}, $, t, null, e.root, -1, {});
            return new pD("", new En(s, []));
          })(e, t),
          r = new $t([new wi("", {})]),
          o = new $t({}),
          i = new $t({}),
          s = new $t({}),
          a = new $t(""),
          l = new fr(r, o, s, a, i, $, t, n.root);
        return (l.snapshot = n.root), new dD(new En(l, []), n);
      }
      class fr {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(H((u) => u[Ci])) ?? A(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(H((t) => ro(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(H((t) => ro(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function hD(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function KF(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Ma {
        constructor(t, n, r, o, i, s, a, l, u, c, d, f) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.[Ci]),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._correctedLastPathIndex = f ?? c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ro(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ro(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class pD extends cD {
        constructor(t, n) {
          super(n), (this.url = t), Ad(this, n);
        }
        toString() {
          return gD(this._root);
        }
      }
      function Ad(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Ad(e, n));
      }
      function gD(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(gD).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Td(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            en(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            en(t.params, n.params) || e.params.next(n.params),
            (function cF(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!en(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            en(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function xd(e, t) {
        const n =
          en(e.params, t.params) &&
          (function gF(e, t) {
            return (
              ur(e, t) && e.every((n, r) => en(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || xd(e.parent, t.parent))
        );
      }
      function Ii(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function JF(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ii(e, r, o);
              return Ii(e, r);
            });
          })(e, t, n);
          return new En(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ii(e, a))),
                s
              );
            }
          }
          const r = (function YF(e) {
              return new fr(
                new $t(e.url),
                new $t(e.params),
                new $t(e.queryParams),
                new $t(e.fragment),
                new $t(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ii(e, i));
          return new En(r, o);
        }
      }
      const Nd = "ngNavigationCancelingError";
      function mD(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = cr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = yD(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function yD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Nd] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function vD(e) {
        return _D(e) && cr(e.url);
      }
      function _D(e) {
        return e && e[Nd];
      }
      class XF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ai()),
            (this.attachRef = null);
        }
      }
      let Ai = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new XF()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Sa = !1;
      let Rd = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = i),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new he()),
              (this.deactivateEvents = new he()),
              (this.attachEvents = new he()),
              (this.detachEvents = new he()),
              (this.name = o || $),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new C(4012, Sa);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new C(4012, Sa);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new C(4012, Sa);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new C(4013, Sa);
            this._activatedRoute = n;
            const o = this.location,
              s = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new eO(n, a, o.injector);
            if (
              r &&
              (function tO(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = o.createComponent(u, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              D(Ai),
              D(Lt),
              (function Io(e) {
                return (function ob(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let o = 0;
                    for (; o < r; ) {
                      const i = n[o];
                      if (Th(i)) break;
                      if (0 === i) o += 2;
                      else if ("number" == typeof i)
                        for (o++; o < r && "string" == typeof n[o]; ) o++;
                      else {
                        if (i === t) return n[o + 1];
                        o += 2;
                      }
                    }
                  }
                  return null;
                })(Me(), e);
              })("name"),
              D(Js),
              D(xn)
            );
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          e
        );
      })();
      class eO {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === fr
            ? this.route
            : t === Ai
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Fd = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = yo({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [My],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Kt(0, "router-outlet");
            },
            dependencies: [Rd],
            encapsulation: 2,
          })),
          e
        );
      })();
      function DD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Hs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Pd(e) {
        const t = e.children && e.children.map(Pd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = Fd),
          n
        );
      }
      function St(e) {
        return e.outlet || $;
      }
      function CD(e, t) {
        const n = e.filter((r) => St(r) === t);
        return n.push(...e.filter((r) => St(r) !== t)), n;
      }
      function Ti(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class sO {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Td(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = so(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Oe(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = so(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = so(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = so(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new WF(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new GF(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Td(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Td(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ti(o.snapshot),
                l = a?.get(zo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class wD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ia {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function aO(e, t, n) {
        const r = e._root;
        return xi(r, t ? t._root : null, n, [r.value]);
      }
      function ao(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function aE(e) {
              return null !== zi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function xi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = so(t);
        return (
          e.children.forEach((s) => {
            (function uO(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function cO(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !ur(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !ur(e.url, t.url) || !en(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !xd(e, t) || !en(e.queryParams, t.queryParams);
                    default:
                      return !xd(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new wD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  xi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Ia(a.outlet.component, s));
              } else
                s && Ni(t, a, o),
                  o.canActivateChecks.push(new wD(r)),
                  xi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Oe(i, (s, a) => Ni(s, n.getContext(a), o)),
          o
        );
      }
      function Ni(e, t, n) {
        const r = so(e),
          o = e.value;
        Oe(r, (i, s) => {
          Ni(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Ia(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Ri(e) {
        return "function" == typeof e;
      }
      function kd(e) {
        return e instanceof ma || "EmptyError" === e?.name;
      }
      const Aa = Symbol("INITIAL_VALUE");
      function lo() {
        return Xt((e) =>
          L_(
            e.map((t) =>
              t.pipe(
                Di(1),
                (function rF(...e) {
                  const t = go(e);
                  return Ne((n, r) => {
                    (t ? pd(e, n, t) : pd(e, n)).subscribe(r);
                  });
                })(Aa)
              )
            )
          ).pipe(
            H((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Aa) return Aa;
                  if (!1 === n || n instanceof lr) return n;
                }
              return !0;
            }),
            Cn((t) => t !== Aa),
            Di(1)
          )
        );
      }
      function ED(e) {
        return (function Sw(...e) {
          return Pf(e);
        })(
          He((t) => {
            if (cr(t)) throw mD(0, t);
          }),
          H((t) => !0 === t)
        );
      }
      const Ld = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function bD(e, t, n, r, o) {
        const i = Vd(e, t, n);
        return i.matched
          ? (function IO(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? A(
                    o.map((s) => {
                      const a = ao(s, e);
                      return Vn(
                        (function mO(e) {
                          return e && Ri(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(lo(), ED())
                : A(!0);
            })((r = DD(t, r)), t, n).pipe(H((s) => (!0 === s ? i : { ...Ld })))
          : A(i);
      }
      function Vd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Ld }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || uF)(n, e, t);
        if (!o) return { ...Ld };
        const i = {};
        Oe(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Ta(e, t, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function xO(e, t, n) {
            return n.some((r) => xa(e, t, r) && St(r) !== $);
          })(e, n, r)
        ) {
          const s = new U(
            t,
            (function TO(e, t, n, r) {
              const o = {};
              (o[$] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && St(i) !== $) {
                  const s = new U([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[St(i)] = s);
                }
              return o;
            })(e, t, r, new U(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function NO(e, t, n) {
            return n.some((r) => xa(e, t, r));
          })(e, n, r)
        ) {
          const s = new U(
            e.segments,
            (function AO(e, t, n, r, o, i) {
              const s = {};
              for (const a of r)
                if (xa(e, n, a) && !o[St(a)]) {
                  const l = new U([], {});
                  (l._sourceSegment = e),
                    (l._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (s[St(a)] = l);
                }
              return { ...o, ...s };
            })(e, t, n, r, e.children, o)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const i = new U(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function xa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function MD(e, t, n, r) {
        return (
          !!(St(e) === r || (r !== $ && xa(t, n, e))) &&
          ("**" === e.path || Vd(t, e, n).matched)
        );
      }
      function SD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Na = !1;
      class Ra {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class ID {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Fi(e) {
        return _i(new Ra(e));
      }
      function AD(e) {
        return _i(new ID(e));
      }
      class PO {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Ta(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new U(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, $)
            .pipe(
              H((i) =>
                this.createUrlTree(
                  Ea(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Ln((i) => {
                if (i instanceof ID)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Ra ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, $)
            .pipe(
              H((o) => this.createUrlTree(Ea(o), t.queryParams, t.fragment))
            )
            .pipe(
              Ln((o) => {
                throw o instanceof Ra ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new C(4002, Na);
        }
        createUrlTree(t, n, r) {
          const o = Cd(t);
          return new lr(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(H((i) => new U([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return ve(o).pipe(
            kn((i) => {
              const s = r.children[i],
                a = CD(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                H((l) => ({ segment: l, outlet: i }))
              );
            }),
            H_((i, s) => ((i[s.outlet] = s.segment), i), {}),
            U_()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return ve(r).pipe(
            kn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                Ln((u) => {
                  if (u instanceof Ra) return A(null);
                  throw u;
                })
              )
            ),
            Pn((a) => !!a),
            Ln((a, l) => {
              if (kd(a)) return SD(n, o, i) ? A(new U([], {})) : Fi(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return MD(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Fi(n)
            : Fi(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? AD(i)
            : this.lineralizeSegments(r, i).pipe(
                Fe((s) => {
                  const a = new U(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = Vd(n, o, i);
          if (!a) return Fi(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? AD(d)
            : this.lineralizeSegments(o, d).pipe(
                Fe((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = DD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    H(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new U(o, {})
                      )
                    )
                  )
                : A(new U(o, {})))
            : bD(n, r, o, t).pipe(
                Xt(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Fe((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Ta(
                                n,
                                a,
                                l,
                                f
                              ),
                              g = new U(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                H((m) => new U(a, m))
                              );
                            if (0 === f.length && 0 === p.length)
                              return A(new U(a, {}));
                            const y = St(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              y ? $ : i,
                              !0
                            ).pipe(
                              H((w) => new U(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : Fi(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function SO(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? A(!0)
                    : A(
                        o.map((s) => {
                          const a = ao(s, e);
                          return Vn(
                            (function fO(e) {
                              return e && Ri(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(lo(), ED());
                })(t, n, r).pipe(
                  Fe((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          He((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function FO(e) {
                          return _i(yD(Na, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return A(r);
            if (o.numberOfChildren > 1 || !o.children[$])
              return _i(new C(4e3, Na));
            o = o.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new lr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Oe(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Oe(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new U(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new C(4001, Na);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class LO {}
      class BO {
        constructor(t, n, r, o, i, s, a, l) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = l);
        }
        recognize() {
          const t = Ta(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $
          ).pipe(
            H((n) => {
              if (null === n) return null;
              const r = new Ma(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new En(r, n),
                i = new pD(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = hD(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return ve(Object.keys(r.children)).pipe(
            kn((o) => {
              const i = r.children[o],
                s = CD(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            H_((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function sF(e, t = !1) {
              return Ne((n, r) => {
                let o = 0;
                n.subscribe(
                  be(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            ya(null),
            U_(),
            H((o) => {
              if (null === o) return null;
              const i = TD(o);
              return (
                (function $O(e) {
                  e.sort((t, n) =>
                    t.value.outlet === $
                      ? -1
                      : n.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return ve(n).pipe(
            kn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            Pn((s) => !!s),
            Ln((s) => {
              if (kd(s)) return SD(r, o, i) ? A([]) : A(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !MD(n, r, o, i)) return A(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? W_(o).parameters : {},
              l = ND(r) + o.length;
            s = A({
              snapshot: new Ma(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                FD(n),
                St(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                xD(r),
                l,
                OD(n),
                l
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = bD(r, n, o, t).pipe(
              H(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = ND(r) + l.length;
                  return {
                    snapshot: new Ma(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      FD(n),
                      St(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      xD(r),
                      d,
                      OD(n),
                      d
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            Xt((a) => {
              if (null === a) return A(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function HO(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Ta(
                  r,
                  u,
                  c,
                  f.filter((y) => void 0 === y.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  H((y) => (null === y ? null : [new En(l, y)]))
                );
              if (0 === f.length && 0 === p.length) return A([new En(l, [])]);
              const g = St(n) === i;
              return this.processSegment(d, f, h, p, g ? $ : i).pipe(
                H((y) => (null === y ? null : [new En(l, y)]))
              );
            })
          );
        }
      }
      function UO(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function TD(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!UO(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = TD(r.children);
          t.push(new En(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function xD(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function ND(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function FD(e) {
        return e.data || {};
      }
      function OD(e) {
        return e.resolve || {};
      }
      function PD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function jd(e) {
        return Xt((t) => {
          const n = e(t);
          return n ? ve(n).pipe(H(() => t)) : A(t);
        });
      }
      let kD = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === $));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Ci];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return ge(LD);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        LD = (() => {
          class e extends kD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(N_));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      class JO {}
      class XO extends class YO {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const Oa = new I("", { providedIn: "root", factory: () => ({}) }),
        Bd = new I("ROUTES");
      let $d = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Vn(n.loadComponent()).pipe(
                He((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                yd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new B_(r, () => new Ht()).pipe(gd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                H((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = z_(l.get(Bd, [], x.Self | x.Optional))));
                  return { routes: u.map(Pd), injector: l };
                }),
                yd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new B_(i, () => new Ht()).pipe(gd());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Vn(n()).pipe(
              Fe((r) =>
                r instanceof Ey || Array.isArray(r)
                  ? A(r)
                  : ve(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(gt), M(xc));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class tP {}
      class nP {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function rP(e) {
        throw e;
      }
      function oP(e, t, n) {
        return t.parse("/");
      }
      const iP = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        sP = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function jD() {
        const e = ge(Y_),
          t = ge(Ai),
          n = ge(zc),
          r = ge(gt),
          o = ge(xc),
          i = ge(Bd, { optional: !0 }) ?? [],
          s = ge(Oa, { optional: !0 }) ?? {},
          a = ge(LD),
          l = ge(kD, { optional: !0 }),
          u = ge(tP, { optional: !0 }),
          c = ge(JO, { optional: !0 }),
          d = new Pe(null, e, t, n, r, o, z_(i));
        return (
          u && (d.urlHandlingStrategy = u),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = l ?? a),
          (function aP(e, t) {
            e.errorHandler && (t.errorHandler = e.errorHandler),
              e.malformedUriErrorHandler &&
                (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
              e.onSameUrlNavigation &&
                (t.onSameUrlNavigation = e.onSameUrlNavigation),
              e.paramsInheritanceStrategy &&
                (t.paramsInheritanceStrategy = e.paramsInheritanceStrategy),
              e.relativeLinkResolution &&
                (t.relativeLinkResolution = e.relativeLinkResolution),
              e.urlUpdateStrategy &&
                (t.urlUpdateStrategy = e.urlUpdateStrategy),
              e.canceledNavigationResolution &&
                (t.canceledNavigationResolution =
                  e.canceledNavigationResolution);
          })(s, d),
          d
        );
      }
      let Pe = (() => {
        class e {
          constructor(n, r, o, i, s, a, l) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Ht()),
              (this.errorHandler = rP),
              (this.malformedUriErrorHandler = oP),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => A(void 0)),
              (this.urlHandlingStrategy = new nP()),
              (this.routeReuseStrategy = new XO()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get($d)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new HF(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new $F(f))),
              (this.ngModule = s.get(ir)),
              (this.console = s.get(GT));
            const d = s.get(Te);
            (this.isNgZoneEnabled = d instanceof Te && Te.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function dF() {
                return new lr(new U([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = fD(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new $t({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Cn((o) => 0 !== o.id),
              H((o) => ({
                ...o,
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })),
              Xt((o) => {
                let i = !1,
                  s = !1;
                return A(o).pipe(
                  He((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  Xt((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        BD(a.source) && (this.browserUrlTree = a.extractedUrl),
                        A(a).pipe(
                          Xt((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Md(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? rn
                                : Promise.resolve(d)
                            );
                          }),
                          (function kO(e, t, n, r) {
                            return Xt((o) =>
                              (function OO(e, t, n, r, o) {
                                return new PO(e, t, n, r, o).apply();
                              })(e, t, n, o.extractedUrl, r).pipe(
                                H((i) => ({ ...o, urlAfterRedirects: i }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          He((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (o.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function zO(e, t, n, r, o, i) {
                            return Fe((s) =>
                              (function jO(
                                e,
                                t,
                                n,
                                r,
                                o,
                                i,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new BO(e, t, n, r, o, s, a, i)
                                  .recognize()
                                  .pipe(
                                    Xt((l) =>
                                      null === l
                                        ? (function VO(e) {
                                            return new pe((t) => t.error(e));
                                          })(new LO())
                                        : A(l)
                                    )
                                  );
                              })(
                                e,
                                t,
                                n,
                                s.urlAfterRedirects,
                                r.serialize(s.urlAfterRedirects),
                                r,
                                o,
                                i
                              ).pipe(H((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          He((d) => {
                            if (
                              ((o.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new kF(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: y,
                        } = a,
                        _ = new Md(f, this.serializeUrl(h), p, g);
                      r.next(_);
                      const w = fD(h, this.rootComponentType).snapshot;
                      return A(
                        (o = {
                          ...a,
                          targetSnapshot: w,
                          urlAfterRedirects: h,
                          extras: {
                            ...y,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), rn;
                  }),
                  He((a) => {
                    const l = new LF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  H(
                    (a) =>
                      (o = {
                        ...a,
                        guards: aO(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function vO(e, t) {
                    return Fe((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === i.length
                        ? A({ ...n, guardsResult: !0 })
                        : (function _O(e, t, n, r) {
                            return ve(e).pipe(
                              Fe((o) =>
                                (function MO(e, t, n, r, o) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? A(
                                        i.map((a) => {
                                          const l = Ti(t) ?? o,
                                            u = ao(a, l);
                                          return Vn(
                                            (function gO(e) {
                                              return e && Ri(e.canDeactivate);
                                            })(u)
                                              ? u.canDeactivate(e, t, n, r)
                                              : l.runInContext(() =>
                                                  u(e, t, n, r)
                                                )
                                          ).pipe(Pn());
                                        })
                                      ).pipe(lo())
                                    : A(!0);
                                })(o.component, o.route, n, t, r)
                              ),
                              Pn((o) => !0 !== o, !0)
                            );
                          })(s, r, o, e).pipe(
                            Fe((a) =>
                              a &&
                              (function dO(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function DO(e, t, n, r) {
                                    return ve(t).pipe(
                                      kn((o) =>
                                        pd(
                                          (function wO(e, t) {
                                            return (
                                              null !== e && t && t(new UF(e)),
                                              A(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function CO(e, t) {
                                            return (
                                              null !== e && t && t(new zF(e)),
                                              A(!0)
                                            );
                                          })(o.route, r),
                                          (function bO(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function lO(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  j_(() =>
                                                    A(
                                                      s.guards.map((l) => {
                                                        const u =
                                                            Ti(s.node) ?? n,
                                                          c = ao(l, u);
                                                        return Vn(
                                                          (function pO(e) {
                                                            return (
                                                              e &&
                                                              Ri(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                r,
                                                                e
                                                              )
                                                            : u.runInContext(
                                                                () => c(r, e)
                                                              )
                                                        ).pipe(Pn());
                                                      })
                                                    ).pipe(lo())
                                                  )
                                                );
                                            return A(i).pipe(lo());
                                          })(e, o.path, n),
                                          (function EO(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return A(!0);
                                            const o = r.map((i) =>
                                              j_(() => {
                                                const s = Ti(t) ?? n,
                                                  a = ao(i, s);
                                                return Vn(
                                                  (function hO(e) {
                                                    return (
                                                      e && Ri(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : s.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(Pn());
                                              })
                                            );
                                            return A(o).pipe(lo());
                                          })(e, o.route, n)
                                        )
                                      ),
                                      Pn((o) => !0 !== o, !0)
                                    );
                                  })(r, i, e, t)
                                : A(a)
                            ),
                            H((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  He((a) => {
                    if (((o.guardsResult = a.guardsResult), cr(a.guardsResult)))
                      throw mD(0, a.guardsResult);
                    const l = new VF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Cn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  jd((a) => {
                    if (a.guards.canActivateChecks.length)
                      return A(a).pipe(
                        He((l) => {
                          const u = new jF(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        Xt((l) => {
                          let u = !1;
                          return A(l).pipe(
                            (function WO(e, t) {
                              return Fe((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return A(n);
                                let i = 0;
                                return ve(o).pipe(
                                  kn((s) =>
                                    (function qO(e, t, n, r) {
                                      const o = e.routeConfig,
                                        i = e._resolve;
                                      return (
                                        void 0 !== o?.title &&
                                          !PD(o) &&
                                          (i[Ci] = o.title),
                                        (function ZO(e, t, n, r) {
                                          const o = (function KO(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === o.length) return A({});
                                          const i = {};
                                          return ve(o).pipe(
                                            Fe((s) =>
                                              (function QO(e, t, n, r) {
                                                const o = Ti(t) ?? r,
                                                  i = ao(e, o);
                                                return Vn(
                                                  i.resolve
                                                    ? i.resolve(t, n)
                                                    : o.runInContext(() =>
                                                        i(t, n)
                                                      )
                                                );
                                              })(e[s], t, n, r).pipe(
                                                Pn(),
                                                He((a) => {
                                                  i[s] = a;
                                                })
                                              )
                                            ),
                                            md(1),
                                            (function aF(e) {
                                              return H(() => e);
                                            })(i),
                                            Ln((s) => (kd(s) ? rn : _i(s)))
                                          );
                                        })(i, e, t, r).pipe(
                                          H(
                                            (s) => (
                                              (e._resolvedData = s),
                                              (e.data = hD(e, n).resolve),
                                              o &&
                                                PD(o) &&
                                                (e.data[Ci] = o.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  He(() => i++),
                                  md(1),
                                  Fe((s) => (i === o.length ? A(n) : rn))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            He({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(l, "", 2));
                              },
                            })
                          );
                        }),
                        He((l) => {
                          const u = new BF(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  jd((a) => {
                    const l = (u) => {
                      const c = [];
                      u.routeConfig?.loadComponent &&
                        !u.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(u.routeConfig).pipe(
                            He((d) => {
                              u.component = d;
                            }),
                            H(() => {})
                          )
                        );
                      for (const d of u.children) c.push(...l(d));
                      return c;
                    };
                    return L_(l(a.targetSnapshot.root)).pipe(ya(), Di(1));
                  }),
                  jd(() => this.afterPreactivation()),
                  H((a) => {
                    const l = (function QF(e, t, n) {
                      const r = Ii(e, t._root, n ? n._root : void 0);
                      return new dD(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (o = { ...a, targetRouterState: l });
                  }),
                  He((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    H(
                      (r) => (
                        new sO(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  He({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  yd(() => {
                    i || s || this.cancelNavigationTransition(o, "", 1),
                      this.currentNavigation?.id === o.id &&
                        (this.currentNavigation = null);
                  }),
                  Ln((a) => {
                    if (((s = !0), _D(a))) {
                      vD(a) ||
                        ((this.navigated = !0), this.restoreHistory(o, !0));
                      const l = new ba(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(l), vD(a))) {
                        const u = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: o.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              BD(o.source),
                          };
                        this.scheduleNavigation(u, "imperative", null, c, {
                          resolve: o.resolve,
                          reject: o.reject,
                          promise: o.promise,
                        });
                      } else o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const l = new lD(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a,
                        o.targetSnapshot ?? void 0
                      );
                      r.next(l);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (u) {
                        o.reject(u);
                      }
                    }
                    return rn;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const o = { replaceUrl: !0 },
                      i = n.state?.navigationId ? n.state : null;
                    if (i) {
                      const a = { ...i };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (o.state = a);
                    }
                    const s = this.parseUrl(n.url);
                    this.scheduleNavigation(s, r, i, o);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(Pd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = o || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              xF(u, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = cr(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function lP(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new C(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...iP } : !1 === r ? { ...sP } : r), cr(n)))
              return Z_(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return Z_(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new dr(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, u;
            s
              ? ((a = s.resolve), (l = s.reject), (u = s.promise))
              : (u = new Promise((f, h) => {
                  (a = f), (l = h);
                }));
            const c = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (d =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: c,
                targetPageId: d,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: l,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === o
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new ba(n.id, this.serializeUrl(n.extractedUrl), r, o);
            this.triggerEvent(i), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            Au();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return jD();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function BD(e) {
        return "imperative" !== e;
      }
      class $D {}
      let dP = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Cn((n) => n instanceof dr),
                kn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Hs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
              (i.loadComponent && !i._loadedComponent)
                ? o.push(this.preloadConfig(s, i))
                : (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return ve(o).pipe(mr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const i = o.pipe(
                Fe((s) =>
                  null === s
                    ? A(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ve([i, this.loader.loadComponent(r)]).pipe(mr())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Pe), M(xc), M(xn), M($D), M($d));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Gd = new I("");
      let HD = (() => {
        class e {
          constructor(n, r, o = {}) {
            (this.router = n),
              (this.viewportScroller = r),
              (this.options = o),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (o.scrollPositionRestoration =
                o.scrollPositionRestoration || "disabled"),
              (o.anchorScrolling = o.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof Md
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof dr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof uD &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.router.triggerEvent(
              new uD(
                n,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            Au();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function uo(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function zd(e) {
        return [{ provide: Bd, multi: !0, useValue: e }];
      }
      function GD() {
        const e = ge(gt);
        return (t) => {
          const n = e.get(Ks);
          if (t !== n.components[0]) return;
          const r = e.get(Pe),
            o = e.get(zD);
          1 === e.get(Wd) && r.initialNavigation(),
            e.get(WD, null, x.Optional)?.setUpPreloading(),
            e.get(Gd, null, x.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.unsubscribe());
        };
      }
      const zD = new I("", { factory: () => new Ht() }),
        Wd = new I("", { providedIn: "root", factory: () => 1 });
      const WD = new I("");
      function gP(e) {
        return uo(0, [
          { provide: WD, useExisting: dP },
          { provide: $D, useExisting: e },
        ]);
      }
      const qD = new I("ROUTER_FORROOT_GUARD"),
        mP = [
          zc,
          { provide: Y_, useClass: _d },
          { provide: Pe, useFactory: jD },
          Ai,
          {
            provide: fr,
            useFactory: function UD(e) {
              return e.routerState.root;
            },
            deps: [Pe],
          },
          $d,
        ];
      function yP() {
        return new vv("Router", Pe);
      }
      let ZD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                mP,
                [],
                zd(n),
                {
                  provide: qD,
                  useFactory: CP,
                  deps: [[Pe, new Oo(), new Po()]],
                },
                { provide: Oa, useValue: r || {} },
                r?.useHash
                  ? { provide: ar, useClass: Rx }
                  : { provide: ar, useClass: Uv },
                {
                  provide: Gd,
                  useFactory: () => {
                    const e = ge(Pe),
                      t = ge(QN),
                      n = ge(Oa);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new HD(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? gP(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: vv, multi: !0, useFactory: yP },
                r?.initialNavigation ? wP(r) : [],
                [
                  { provide: KD, useFactory: GD },
                  { provide: dv, multi: !0, useExisting: KD },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [zd(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(qD, 8));
          }),
          (e.ɵmod = _t({ type: e })),
          (e.ɵinj = at({ imports: [Fd] })),
          e
        );
      })();
      function CP(e) {
        return "guarded";
      }
      function wP(e) {
        return [
          "disabled" === e.initialNavigation
            ? uo(3, [
                {
                  provide: Ws,
                  multi: !0,
                  useFactory: () => {
                    const t = ge(Pe);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Wd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? uo(2, [
                { provide: Wd, useValue: 0 },
                {
                  provide: Ws,
                  multi: !0,
                  deps: [gt],
                  useFactory: (t) => {
                    const n = t.get(xx, Promise.resolve());
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((i) => {
                            const s = t.get(Pe),
                              a = t.get(zD);
                            (function o(i) {
                              t.get(Pe)
                                .events.pipe(
                                  Cn(
                                    (a) =>
                                      a instanceof dr ||
                                      a instanceof ba ||
                                      a instanceof lD
                                  ),
                                  H(
                                    (a) =>
                                      a instanceof dr ||
                                      (a instanceof ba &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  Cn((a) => null !== a),
                                  Di(1)
                                )
                                .subscribe(() => {
                                  i();
                                });
                            })(() => {
                              i(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (
                                i(!0), r || a.closed ? A(void 0) : a
                              )),
                              s.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const KD = new I("");
      class JD {}
      class YD {}
      class bn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof bn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new bn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof bn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class bP {
        encodeKey(t) {
          return XD(t);
        }
        encodeValue(t) {
          return XD(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const SP = /%(\d[a-f0-9])/gi,
        IP = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function XD(e) {
        return encodeURIComponent(e).replace(SP, (t, n) => IP[n] ?? t);
      }
      function Va(e) {
        return `${e}`;
      }
      class jn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new bP()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function MP(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(Va) : [Va(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new jn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Va(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(Va(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class AP {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function eC(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function tC(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function nC(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Oi {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function TP(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new bn()),
            this.context || (this.context = new AP()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new jn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : eC(this.body) ||
              tC(this.body) ||
              nC(this.body) ||
              (function xP(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof jn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || nC(this.body)
            ? null
            : tC(this.body)
            ? this.body.type || null
            : eC(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof jn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            u = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (u = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                u
              )),
            new Oi(n, r, i, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var Ee = (() => (
        ((Ee = Ee || {})[(Ee.Sent = 0)] = "Sent"),
        (Ee[(Ee.UploadProgress = 1)] = "UploadProgress"),
        (Ee[(Ee.ResponseHeader = 2)] = "ResponseHeader"),
        (Ee[(Ee.DownloadProgress = 3)] = "DownloadProgress"),
        (Ee[(Ee.Response = 4)] = "Response"),
        (Ee[(Ee.User = 5)] = "User"),
        Ee
      ))();
      class qd {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new bn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Zd extends qd {
        constructor(t = {}) {
          super(t), (this.type = Ee.ResponseHeader);
        }
        clone(t = {}) {
          return new Zd({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class ja extends qd {
        constructor(t = {}) {
          super(t),
            (this.type = Ee.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new ja({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class rC extends qd {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Kd(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let oC = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof Oi) i = n;
            else {
              let l, u;
              (l = o.headers instanceof bn ? o.headers : new bn(o.headers)),
                o.params &&
                  (u =
                    o.params instanceof jn
                      ? o.params
                      : new jn({ fromObject: o.params })),
                (i = new Oi(n, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: u,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = A(i).pipe(kn((l) => this.handler.handle(l)));
            if (n instanceof Oi || "events" === o.observe) return s;
            const a = s.pipe(Cn((l) => l instanceof ja));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      H((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      H((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      H((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(H((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new jn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Kd(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Kd(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Kd(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(JD));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class iC {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const sC = new I("HTTP_INTERCEPTORS");
      let NP = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const RP = /^\)\]\}',?\n/;
      let aC = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new pe((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new bn(o.getAllResponseHeaders()),
                    g =
                      (function FP(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new Zd({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: y } = a(),
                    _ = null;
                  204 !== p &&
                    (_ = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = _ ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof _) {
                    const m = _;
                    _ = _.replace(RP, "");
                    try {
                      _ = "" !== _ ? JSON.parse(_) : null;
                    } catch (S) {
                      (_ = m), w && ((w = !1), (_ = { error: S, text: _ }));
                    }
                  }
                  w
                    ? (r.next(
                        new ja({
                          body: _,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: y || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new rC({
                          error: _,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: y || void 0,
                        })
                      );
                },
                u = (h) => {
                  const { url: p } = a(),
                    g = new rC({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(g);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: Ee.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: Ee.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", l),
                o.addEventListener("error", u),
                o.addEventListener("timeout", u),
                o.addEventListener("abort", u),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: Ee.Sent }),
                () => {
                  o.removeEventListener("error", u),
                    o.removeEventListener("abort", u),
                    o.removeEventListener("load", l),
                    o.removeEventListener("timeout", u),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(f_));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Qd = new I("XSRF_COOKIE_NAME"),
        Jd = new I("XSRF_HEADER_NAME");
      class lC {}
      let OP = (() => {
          class e {
            constructor(n, r, o) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = o),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Xv(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Ye), M(Tc), M(Qd));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Yd = (() => {
          class e {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const o = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                o.startsWith("http://") ||
                o.startsWith("https://")
              )
                return r.handle(n);
              const i = this.tokenService.getToken();
              return (
                null !== i &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, i) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(lC), M(Jd));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        PP = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(sC, []);
                this.chain = r.reduceRight(
                  (o, i) => new iC(o, i),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(YD), M(gt));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        kP = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: Yd, useClass: NP }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: Qd, useValue: n.cookieName } : [],
                  n.headerName ? { provide: Jd, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({
              providers: [
                Yd,
                { provide: sC, useExisting: Yd, multi: !0 },
                { provide: lC, useClass: OP },
                { provide: Qd, useValue: "XSRF-TOKEN" },
                { provide: Jd, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        LP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({
              providers: [
                oC,
                { provide: JD, useClass: PP },
                aC,
                { provide: YD, useExisting: aC },
              ],
              imports: [
                kP.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            e
          );
        })(),
        VP = (() => {
          class e {
            constructor(n) {
              this.http = n;
            }
            getResultado(n) {
              return this.http.get(
                `https://api-loteria.servicosmsc.com.br/api/${n}/latest`
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(oC));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        uC = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(dn), D(pt));
            }),
            (e.ɵdir = O({ type: e })),
            e
          );
        })(),
        hr = (() => {
          class e extends uC {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Ve(e)))(r || e);
              };
            })()),
            (e.ɵdir = O({ type: e, features: [J] })),
            e
          );
        })();
      const tn = new I("NgValueAccessor"),
        $P = { provide: tn, useExisting: te(() => Xd), multi: !0 },
        UP = new I("CompositionEventMode");
      let Xd = (() => {
        class e extends uC {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function HP() {
                  const e = Yt() ? Yt().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(dn), D(pt), D(UP, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Ke("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [se([$P]), J],
          })),
          e
        );
      })();
      const Ue = new I("NgValidators"),
        $n = new I("NgAsyncValidators");
      function DC(e) {
        return null != e;
      }
      function CC(e) {
        return Xo(e) ? ve(e) : e;
      }
      function wC(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function EC(e, t) {
        return t.map((n) => n(e));
      }
      function bC(e) {
        return e.map((t) =>
          (function WP(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function ef(e) {
        return null != e
          ? (function MC(e) {
              if (!e) return null;
              const t = e.filter(DC);
              return 0 == t.length
                ? null
                : function (n) {
                    return wC(EC(n, t));
                  };
            })(bC(e))
          : null;
      }
      function tf(e) {
        return null != e
          ? (function SC(e) {
              if (!e) return null;
              const t = e.filter(DC);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function jP(...e) {
                      const t = Yf(e),
                        { args: n, keys: r } = O_(e),
                        o = new pe((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let l = s,
                            u = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            It(n[c]).subscribe(
                              be(
                                i,
                                (f) => {
                                  d || ((d = !0), u--), (a[c] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (u || i.next(r ? k_(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(P_(t)) : o;
                    })(EC(n, t).map(CC)).pipe(H(wC));
                  };
            })(bC(e))
          : null;
      }
      function IC(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function nf(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function $a(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function xC(e, t) {
        const n = nf(t);
        return (
          nf(e).forEach((o) => {
            $a(n, o) || n.push(o);
          }),
          n
        );
      }
      function NC(e, t) {
        return nf(t).filter((n) => !$a(e, n));
      }
      class RC {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = ef(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = tf(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class Xe extends RC {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Hn extends RC {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      let OC = (() => {
        class e extends class FC {
          constructor(t) {
            this._cd = t;
          }
          get isTouched() {
            return !!this._cd?.control?.touched;
          }
          get isUntouched() {
            return !!this._cd?.control?.untouched;
          }
          get isPristine() {
            return !!this._cd?.control?.pristine;
          }
          get isDirty() {
            return !!this._cd?.control?.dirty;
          }
          get isValid() {
            return !!this._cd?.control?.valid;
          }
          get isInvalid() {
            return !!this._cd?.control?.invalid;
          }
          get isPending() {
            return !!this._cd?.control?.pending;
          }
          get isSubmitted() {
            return !!this._cd?.submitted;
          }
        } {
          constructor(n) {
            super(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Hn, 2));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (n, r) {
              2 & n &&
                Ps("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                  "ng-pristine",
                  r.isPristine
                )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                  "ng-invalid",
                  r.isInvalid
                )("ng-pending", r.isPending);
            },
            features: [J],
          })),
          e
        );
      })();
      const Pi = "VALID",
        Ua = "INVALID",
        co = "PENDING",
        ki = "DISABLED";
      function kC(e) {
        return Array.isArray(e) ? ef(e) : e || null;
      }
      function LC(e) {
        return Array.isArray(e) ? tf(e) : e || null;
      }
      function Ga(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      function Li(e, t) {
        (function df(e, t) {
          const n = (function AC(e) {
            return e._rawValidators;
          })(e);
          null !== t.validator
            ? e.setValidators(IC(n, t.validator))
            : "function" == typeof n && e.setValidators([n]);
          const r = (function TC(e) {
            return e._rawAsyncValidators;
          })(e);
          null !== t.asyncValidator
            ? e.setAsyncValidators(IC(r, t.asyncValidator))
            : "function" == typeof r && e.setAsyncValidators([r]);
          const o = () => e.updateValueAndValidity();
          qa(t._rawValidators, o), qa(t._rawAsyncValidators, o);
        })(e, t),
          t.valueAccessor.writeValue(e.value),
          e.disabled && t.valueAccessor.setDisabledState?.(!0),
          (function n1(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && $C(e, t);
            });
          })(e, t),
          (function o1(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function r1(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && $C(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function t1(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function qa(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function $C(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function zC(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function WC(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const f1 = { provide: Hn, useExisting: te(() => gf) },
        QC = (() => Promise.resolve())();
      let gf = (() => {
          class e extends Hn {
            constructor(n, r, o, i, s) {
              super(),
                (this._changeDetectorRef = s),
                (this.control = new (class extends class BC {
                  constructor(t, n) {
                    (this._pendingDirty = !1),
                      (this._hasOwnPendingAsyncValidator = !1),
                      (this._pendingTouched = !1),
                      (this._onCollectionChange = () => {}),
                      (this._parent = null),
                      (this.pristine = !0),
                      (this.touched = !1),
                      (this._onDisabledChange = []),
                      (this._rawValidators = t),
                      (this._rawAsyncValidators = n),
                      (this._composedValidatorFn = kC(this._rawValidators)),
                      (this._composedAsyncValidatorFn = LC(
                        this._rawAsyncValidators
                      ));
                  }
                  get validator() {
                    return this._composedValidatorFn;
                  }
                  set validator(t) {
                    this._rawValidators = this._composedValidatorFn = t;
                  }
                  get asyncValidator() {
                    return this._composedAsyncValidatorFn;
                  }
                  set asyncValidator(t) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn =
                      t;
                  }
                  get parent() {
                    return this._parent;
                  }
                  get valid() {
                    return this.status === Pi;
                  }
                  get invalid() {
                    return this.status === Ua;
                  }
                  get pending() {
                    return this.status == co;
                  }
                  get disabled() {
                    return this.status === ki;
                  }
                  get enabled() {
                    return this.status !== ki;
                  }
                  get dirty() {
                    return !this.pristine;
                  }
                  get untouched() {
                    return !this.touched;
                  }
                  get updateOn() {
                    return this._updateOn
                      ? this._updateOn
                      : this.parent
                      ? this.parent.updateOn
                      : "change";
                  }
                  setValidators(t) {
                    (this._rawValidators = t),
                      (this._composedValidatorFn = kC(t));
                  }
                  setAsyncValidators(t) {
                    (this._rawAsyncValidators = t),
                      (this._composedAsyncValidatorFn = LC(t));
                  }
                  addValidators(t) {
                    this.setValidators(xC(t, this._rawValidators));
                  }
                  addAsyncValidators(t) {
                    this.setAsyncValidators(xC(t, this._rawAsyncValidators));
                  }
                  removeValidators(t) {
                    this.setValidators(NC(t, this._rawValidators));
                  }
                  removeAsyncValidators(t) {
                    this.setAsyncValidators(NC(t, this._rawAsyncValidators));
                  }
                  hasValidator(t) {
                    return $a(this._rawValidators, t);
                  }
                  hasAsyncValidator(t) {
                    return $a(this._rawAsyncValidators, t);
                  }
                  clearValidators() {
                    this.validator = null;
                  }
                  clearAsyncValidators() {
                    this.asyncValidator = null;
                  }
                  markAsTouched(t = {}) {
                    (this.touched = !0),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent.markAsTouched(t);
                  }
                  markAllAsTouched() {
                    this.markAsTouched({ onlySelf: !0 }),
                      this._forEachChild((t) => t.markAllAsTouched());
                  }
                  markAsUntouched(t = {}) {
                    (this.touched = !1),
                      (this._pendingTouched = !1),
                      this._forEachChild((n) => {
                        n.markAsUntouched({ onlySelf: !0 });
                      }),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent._updateTouched(t);
                  }
                  markAsDirty(t = {}) {
                    (this.pristine = !1),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent.markAsDirty(t);
                  }
                  markAsPristine(t = {}) {
                    (this.pristine = !0),
                      (this._pendingDirty = !1),
                      this._forEachChild((n) => {
                        n.markAsPristine({ onlySelf: !0 });
                      }),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent._updatePristine(t);
                  }
                  markAsPending(t = {}) {
                    (this.status = co),
                      !1 !== t.emitEvent &&
                        this.statusChanges.emit(this.status),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent.markAsPending(t);
                  }
                  disable(t = {}) {
                    const n = this._parentMarkedDirty(t.onlySelf);
                    (this.status = ki),
                      (this.errors = null),
                      this._forEachChild((r) => {
                        r.disable({ ...t, onlySelf: !0 });
                      }),
                      this._updateValue(),
                      !1 !== t.emitEvent &&
                        (this.valueChanges.emit(this.value),
                        this.statusChanges.emit(this.status)),
                      this._updateAncestors({ ...t, skipPristineCheck: n }),
                      this._onDisabledChange.forEach((r) => r(!0));
                  }
                  enable(t = {}) {
                    const n = this._parentMarkedDirty(t.onlySelf);
                    (this.status = Pi),
                      this._forEachChild((r) => {
                        r.enable({ ...t, onlySelf: !0 });
                      }),
                      this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: t.emitEvent,
                      }),
                      this._updateAncestors({ ...t, skipPristineCheck: n }),
                      this._onDisabledChange.forEach((r) => r(!1));
                  }
                  _updateAncestors(t) {
                    this._parent &&
                      !t.onlySelf &&
                      (this._parent.updateValueAndValidity(t),
                      t.skipPristineCheck || this._parent._updatePristine(),
                      this._parent._updateTouched());
                  }
                  setParent(t) {
                    this._parent = t;
                  }
                  getRawValue() {
                    return this.value;
                  }
                  updateValueAndValidity(t = {}) {
                    this._setInitialStatus(),
                      this._updateValue(),
                      this.enabled &&
                        (this._cancelExistingSubscription(),
                        (this.errors = this._runValidator()),
                        (this.status = this._calculateStatus()),
                        (this.status === Pi || this.status === co) &&
                          this._runAsyncValidator(t.emitEvent)),
                      !1 !== t.emitEvent &&
                        (this.valueChanges.emit(this.value),
                        this.statusChanges.emit(this.status)),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent.updateValueAndValidity(t);
                  }
                  _updateTreeValidity(t = { emitEvent: !0 }) {
                    this._forEachChild((n) => n._updateTreeValidity(t)),
                      this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: t.emitEvent,
                      });
                  }
                  _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? ki : Pi;
                  }
                  _runValidator() {
                    return this.validator ? this.validator(this) : null;
                  }
                  _runAsyncValidator(t) {
                    if (this.asyncValidator) {
                      (this.status = co),
                        (this._hasOwnPendingAsyncValidator = !0);
                      const n = CC(this.asyncValidator(this));
                      this._asyncValidationSubscription = n.subscribe((r) => {
                        (this._hasOwnPendingAsyncValidator = !1),
                          this.setErrors(r, { emitEvent: t });
                      });
                    }
                  }
                  _cancelExistingSubscription() {
                    this._asyncValidationSubscription &&
                      (this._asyncValidationSubscription.unsubscribe(),
                      (this._hasOwnPendingAsyncValidator = !1));
                  }
                  setErrors(t, n = {}) {
                    (this.errors = t),
                      this._updateControlsErrors(!1 !== n.emitEvent);
                  }
                  get(t) {
                    let n = t;
                    return null == n ||
                      (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
                      ? null
                      : n.reduce((r, o) => r && r._find(o), this);
                  }
                  getError(t, n) {
                    const r = n ? this.get(n) : this;
                    return r && r.errors ? r.errors[t] : null;
                  }
                  hasError(t, n) {
                    return !!this.getError(t, n);
                  }
                  get root() {
                    let t = this;
                    for (; t._parent; ) t = t._parent;
                    return t;
                  }
                  _updateControlsErrors(t) {
                    (this.status = this._calculateStatus()),
                      t && this.statusChanges.emit(this.status),
                      this._parent && this._parent._updateControlsErrors(t);
                  }
                  _initObservables() {
                    (this.valueChanges = new he()),
                      (this.statusChanges = new he());
                  }
                  _calculateStatus() {
                    return this._allControlsDisabled()
                      ? ki
                      : this.errors
                      ? Ua
                      : this._hasOwnPendingAsyncValidator ||
                        this._anyControlsHaveStatus(co)
                      ? co
                      : this._anyControlsHaveStatus(Ua)
                      ? Ua
                      : Pi;
                  }
                  _anyControlsHaveStatus(t) {
                    return this._anyControls((n) => n.status === t);
                  }
                  _anyControlsDirty() {
                    return this._anyControls((t) => t.dirty);
                  }
                  _anyControlsTouched() {
                    return this._anyControls((t) => t.touched);
                  }
                  _updatePristine(t = {}) {
                    (this.pristine = !this._anyControlsDirty()),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent._updatePristine(t);
                  }
                  _updateTouched(t = {}) {
                    (this.touched = this._anyControlsTouched()),
                      this._parent &&
                        !t.onlySelf &&
                        this._parent._updateTouched(t);
                  }
                  _registerOnCollectionChange(t) {
                    this._onCollectionChange = t;
                  }
                  _setUpdateStrategy(t) {
                    Ga(t) &&
                      null != t.updateOn &&
                      (this._updateOn = t.updateOn);
                  }
                  _parentMarkedDirty(t) {
                    return (
                      !t &&
                      !(!this._parent || !this._parent.dirty) &&
                      !this._parent._anyControlsDirty()
                    );
                  }
                  _find(t) {
                    return null;
                  }
                } {
                  constructor(t = null, n, r) {
                    super(
                      (function lf(e) {
                        return (Ga(e) ? e.validators : e) || null;
                      })(n),
                      (function uf(e, t) {
                        return (Ga(t) ? t.asyncValidators : e) || null;
                      })(r, n)
                    ),
                      (this.defaultValue = null),
                      (this._onChange = []),
                      (this._pendingChange = !1),
                      this._applyFormState(t),
                      this._setUpdateStrategy(n),
                      this._initObservables(),
                      this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator,
                      }),
                      Ga(n) &&
                        (n.nonNullable || n.initialValueIsDefault) &&
                        (this.defaultValue = WC(t) ? t.value : t);
                  }
                  setValue(t, n = {}) {
                    (this.value = this._pendingValue = t),
                      this._onChange.length &&
                        !1 !== n.emitModelToViewChange &&
                        this._onChange.forEach((r) =>
                          r(this.value, !1 !== n.emitViewToModelChange)
                        ),
                      this.updateValueAndValidity(n);
                  }
                  patchValue(t, n = {}) {
                    this.setValue(t, n);
                  }
                  reset(t = this.defaultValue, n = {}) {
                    this._applyFormState(t),
                      this.markAsPristine(n),
                      this.markAsUntouched(n),
                      this.setValue(this.value, n),
                      (this._pendingChange = !1);
                  }
                  _updateValue() {}
                  _anyControls(t) {
                    return !1;
                  }
                  _allControlsDisabled() {
                    return this.disabled;
                  }
                  registerOnChange(t) {
                    this._onChange.push(t);
                  }
                  _unregisterOnChange(t) {
                    zC(this._onChange, t);
                  }
                  registerOnDisabledChange(t) {
                    this._onDisabledChange.push(t);
                  }
                  _unregisterOnDisabledChange(t) {
                    zC(this._onDisabledChange, t);
                  }
                  _forEachChild(t) {}
                  _syncPendingControls() {
                    return !(
                      "submit" !== this.updateOn ||
                      (this._pendingDirty && this.markAsDirty(),
                      this._pendingTouched && this.markAsTouched(),
                      !this._pendingChange) ||
                      (this.setValue(this._pendingValue, {
                        onlySelf: !0,
                        emitModelToViewChange: !1,
                      }),
                      0)
                    );
                  }
                  _applyFormState(t) {
                    WC(t)
                      ? ((this.value = this._pendingValue = t.value),
                        t.disabled
                          ? this.disable({ onlySelf: !0, emitEvent: !1 })
                          : this.enable({ onlySelf: !0, emitEvent: !1 }))
                      : (this.value = this._pendingValue = t);
                  }
                })()),
                (this._registered = !1),
                (this.update = new he()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function hf(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Xd
                        ? (n = i)
                        : (function a1(e) {
                            return Object.getPrototypeOf(e.constructor) === hr;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function ff(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Li(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              QC.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o =
                  0 !== r &&
                  (function vn(e) {
                    return "boolean" == typeof e
                      ? e
                      : null != e && "false" !== e;
                  })(r);
              QC.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function za(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                D(Xe, 9),
                D(Ue, 10),
                D($n, 10),
                D(tn, 10),
                D(Js, 8)
              );
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [se([f1]), J, Ct],
            })),
            e
          );
        })(),
        YC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({})),
            e
          );
        })();
      const E1 = { provide: tn, useExisting: te(() => Ka), multi: !0 };
      function iw(e, t) {
        return null == e
          ? `${t}`
          : (t && "object" == typeof t && (t = "Object"),
            `${e}: ${t}`.slice(0, 50));
      }
      let Ka = (() => {
          class e extends hr {
            constructor() {
              super(...arguments),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this._compareWith = Object.is);
            }
            set compareWith(n) {
              this._compareWith = n;
            }
            writeValue(n) {
              this.value = n;
              const o = iw(this._getOptionId(n), n);
              this.setProperty("value", o);
            }
            registerOnChange(n) {
              this.onChange = (r) => {
                (this.value = this._getOptionValue(r)), n(this.value);
              };
            }
            _registerOption() {
              return (this._idCounter++).toString();
            }
            _getOptionId(n) {
              for (const r of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(r), n)) return r;
              return null;
            }
            _getOptionValue(n) {
              const r = (function b1(e) {
                return e.split(":")[0];
              })(n);
              return this._optionMap.has(r) ? this._optionMap.get(r) : n;
            }
          }
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Ve(e)))(r || e);
              };
            })()),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["select", "formControlName", "", 3, "multiple", ""],
                ["select", "formControl", "", 3, "multiple", ""],
                ["select", "ngModel", "", 3, "multiple", ""],
              ],
              hostBindings: function (n, r) {
                1 & n &&
                  Ke("change", function (i) {
                    return r.onChange(i.target.value);
                  })("blur", function () {
                    return r.onTouched();
                  });
              },
              inputs: { compareWith: "compareWith" },
              features: [se([E1]), J],
            })),
            e
          );
        })(),
        sw = (() => {
          class e {
            constructor(n, r, o) {
              (this._element = n),
                (this._renderer = r),
                (this._select = o),
                this._select && (this.id = this._select._registerOption());
            }
            set ngValue(n) {
              null != this._select &&
                (this._select._optionMap.set(this.id, n),
                this._setElementValue(iw(this.id, n)),
                this._select.writeValue(this._select.value));
            }
            set value(n) {
              this._setElementValue(n),
                this._select && this._select.writeValue(this._select.value);
            }
            _setElementValue(n) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                n
              );
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(pt), D(dn), D(Ka, 9));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            e
          );
        })();
      const M1 = { provide: tn, useExisting: te(() => _f), multi: !0 };
      function aw(e, t) {
        return null == e
          ? `${t}`
          : ("string" == typeof t && (t = `'${t}'`),
            t && "object" == typeof t && (t = "Object"),
            `${e}: ${t}`.slice(0, 50));
      }
      let _f = (() => {
          class e extends hr {
            constructor() {
              super(...arguments),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this._compareWith = Object.is);
            }
            set compareWith(n) {
              this._compareWith = n;
            }
            writeValue(n) {
              let r;
              if (((this.value = n), Array.isArray(n))) {
                const o = n.map((i) => this._getOptionId(i));
                r = (i, s) => {
                  i._setSelected(o.indexOf(s.toString()) > -1);
                };
              } else
                r = (o, i) => {
                  o._setSelected(!1);
                };
              this._optionMap.forEach(r);
            }
            registerOnChange(n) {
              this.onChange = (r) => {
                const o = [],
                  i = r.selectedOptions;
                if (void 0 !== i) {
                  const s = i;
                  for (let a = 0; a < s.length; a++) {
                    const u = this._getOptionValue(s[a].value);
                    o.push(u);
                  }
                } else {
                  const s = r.options;
                  for (let a = 0; a < s.length; a++) {
                    const l = s[a];
                    if (l.selected) {
                      const u = this._getOptionValue(l.value);
                      o.push(u);
                    }
                  }
                }
                (this.value = o), n(o);
              };
            }
            _registerOption(n) {
              const r = (this._idCounter++).toString();
              return this._optionMap.set(r, n), r;
            }
            _getOptionId(n) {
              for (const r of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(r)._value, n))
                  return r;
              return null;
            }
            _getOptionValue(n) {
              const r = (function S1(e) {
                return e.split(":")[0];
              })(n);
              return this._optionMap.has(r) ? this._optionMap.get(r)._value : n;
            }
          }
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Ve(e)))(r || e);
              };
            })()),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["select", "multiple", "", "formControlName", ""],
                ["select", "multiple", "", "formControl", ""],
                ["select", "multiple", "", "ngModel", ""],
              ],
              hostBindings: function (n, r) {
                1 & n &&
                  Ke("change", function (i) {
                    return r.onChange(i.target);
                  })("blur", function () {
                    return r.onTouched();
                  });
              },
              inputs: { compareWith: "compareWith" },
              features: [se([M1]), J],
            })),
            e
          );
        })(),
        lw = (() => {
          class e {
            constructor(n, r, o) {
              (this._element = n),
                (this._renderer = r),
                (this._select = o),
                this._select && (this.id = this._select._registerOption(this));
            }
            set ngValue(n) {
              null != this._select &&
                ((this._value = n),
                this._setElementValue(aw(this.id, n)),
                this._select.writeValue(this._select.value));
            }
            set value(n) {
              this._select
                ? ((this._value = n),
                  this._setElementValue(aw(this.id, n)),
                  this._select.writeValue(this._select.value))
                : this._setElementValue(n);
            }
            _setElementValue(n) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                n
              );
            }
            _setSelected(n) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "selected",
                n
              );
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(pt), D(dn), D(_f, 9));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            e
          );
        })(),
        P1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({ imports: [YC] })),
            e
          );
        })(),
        k1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({ imports: [P1] })),
            e
          );
        })();
      function V1(e, t) {
        if (
          (1 & e && (ue(0, "option", 26), kt(1), li(2, "titlecase"), Ie()),
          2 & e)
        ) {
          const n = t.$implicit;
          rt("value", n),
            me(1),
            Yr(ui(2, 2, n.replace("-", " ").replace("-", " ")));
        }
      }
      function j1(e, t) {
        1 & e && Kt(0, "div", 29);
      }
      function B1(e, t) {
        if (
          (1 & e &&
            (Jo(0),
            rr(1, j1, 1, 0, "div", 27),
            ue(2, "div", 28),
            kt(3),
            Ie(),
            Yo()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = t.index,
            o = tc();
          me(1), rt("ngIf", o.pularLinha(r)), me(2), ti(" ", n, " ");
        }
      }
      function $1(e, t) {
        if (
          (1 & e && (ue(0, "option", 26), kt(1), li(2, "titlecase"), Ie()),
          2 & e)
        ) {
          const n = t.$implicit;
          rt("value", n),
            me(1),
            Yr(ui(2, 2, n.replace("-", " ").replace("-", " ")));
        }
      }
      function H1(e, t) {
        1 & e && Kt(0, "div", 29);
      }
      function U1(e, t) {
        if (
          (1 & e &&
            (Jo(0),
            rr(1, H1, 1, 0, "div", 27),
            ue(2, "div", 30),
            kt(3),
            Ie(),
            Yo()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = t.index,
            o = tc();
          me(1), rt("ngIf", o.pularLinha(r)), me(2), ti(" ", n, " ");
        }
      }
      const G1 = [
        {
          path: "",
          component: (() => {
            class e {
              constructor(n) {
                (this._resultadoService = n),
                  (this.tipoJogo = ""),
                  (this.jogo = "diadesorte"),
                  (this.jogoClass = ""),
                  (this.tiposJogos = [
                    "duplasena",
                    "lotofacil",
                    "lotomania",
                    "quina",
                    "megasena",
                    "timemania",
                    "diadesorte",
                    "supersete",
                  ].sort()),
                  (this.logo = "../../../assets/Logo.png"),
                  (this.resultado = {});
              }
              ngOnInit() {
                (this.resultado.dezenas = [0]), this.carregaResultado();
              }
              carregaResultado() {
                this._resultadoService.getResultado(this.jogo).subscribe(
                  (n) => {
                    (this.tipoJogo = this.jogo),
                      (this.jogoClass = `fill-${this.jogo}-100`),
                      (this.resultado = n);
                  },
                  (n) => console.log(n)
                );
              }
              pularLinha(n) {
                return (
                  0 !== n &&
                  "timemania" !== this.tipoJogo &&
                  "diadesorte" !== this.tipoJogo &&
                  "supersete" !== this.tipoJogo &&
                  "megasena" !== this.tipoJogo &&
                  "quina" !== this.tipoJogo &&
                  (("duplasena" === this.tipoJogo && 6 == n) ||
                    (("duplasena" !== this.tipoJogo || 6 == n) && n % 5 == 0))
                );
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)(D(VP));
              }),
              (e.ɵcmp = yo({
                type: e,
                selectors: [["app-resultado"]],
                decls: 42,
                vars: 22,
                consts: [
                  [
                    1,
                    "flex",
                    "flex-col",
                    "w-screen",
                    "h-screen",
                    "bg-gray-300",
                    "hidden",
                    "sm:block",
                  ],
                  [1, "flex-1", "relative", "w-full", "h-full"],
                  [
                    "viewBox",
                    "0 0 613 1080",
                    "fill",
                    "none",
                    "xmlns",
                    "http://www.w3.org/2000/svg",
                    1,
                    "max-h-full",
                    "inset-0",
                    "max-w-full",
                    "absolute",
                    "rotate-0",
                  ],
                  [
                    "d",
                    "M613 0C613 0 361.26 501.011 613 1080H0V0H613Z",
                    "fill",
                    "#6BEFA3",
                  ],
                  [
                    1,
                    "absolute",
                    "w-full",
                    "h-full",
                    "flex",
                    "flex-row",
                    "justify-between",
                    "items-center",
                    "text-2xl",
                    "font-bold",
                  ],
                  [
                    1,
                    "flex",
                    "flex-col",
                    "items-start",
                    "justify-around",
                    "h-full",
                    "w-full",
                    "px-10",
                  ],
                  [
                    1,
                    "w-48",
                    "bg-gray-50",
                    "border",
                    "border-gray-300",
                    "text-gray-900",
                    "text-sm",
                    "rounded-lg",
                    "focus:ring-blue-500",
                    "focus:border-blue-500",
                    "block",
                    "p-2.5",
                    3,
                    "ngModel",
                    "ngModelChange",
                    "change",
                  ],
                  [
                    "class",
                    "font-normal text-md",
                    3,
                    "value",
                    4,
                    "ngFor",
                    "ngForOf",
                  ],
                  [1, "flex", "flex-row", "justify-center", "items-center"],
                  [
                    "alt",
                    "",
                    "width",
                    "50px",
                    "height",
                    "50px",
                    "srcset",
                    "",
                    3,
                    "src",
                  ],
                  [1, "text-white", "ml-2"],
                  [1, "flex", "flex-col", "h-6", "items-start", "text-white"],
                  [1, "text-lg", "font-normal"],
                  [1, "text-xl", "font-semibold"],
                  [
                    1,
                    "h-[35%]",
                    "w-full",
                    "mb-5",
                    "pt-3",
                    "flex",
                    "flex-col",
                    "items-center",
                    "justify-center",
                  ],
                  [1, "flex", "flex-wrap", "justify-around", "w-[90%]"],
                  [4, "ngFor", "ngForOf"],
                  [
                    1,
                    "flex",
                    "flex-col",
                    "w-screen",
                    "h-screen",
                    "bg-gray-300",
                    "sm:hidden",
                  ],
                  [
                    "viewBox",
                    "0 0 524 544",
                    "fill",
                    "none",
                    "xmlns",
                    "http://www.w3.org/2000/svg",
                    1,
                    "max-w-full",
                    "absolute",
                    "rotate-0",
                  ],
                  [
                    "d",
                    "M566 544C566 544 283.486 320.596 -43 544V0L566 0V544Z",
                    "fill",
                    "#6BEFA3",
                  ],
                  [
                    1,
                    "absolute",
                    "w-full",
                    "h-full",
                    "flex",
                    "flex-col",
                    "justify-around",
                    "items-center",
                    "text-2xl",
                    "font-bold",
                  ],
                  [
                    1,
                    "flex",
                    "flex-col",
                    "items-center",
                    "justify-around",
                    "-mt-10",
                    "w-[60%]",
                    "h-[35%]",
                  ],
                  [
                    1,
                    "bg-gray-50",
                    "border",
                    "border-gray-300",
                    "text-gray-900",
                    "text-sm",
                    "rounded-lg",
                    "focus:ring-blue-500",
                    "focus:border-blue-500",
                    "block",
                    "w-full",
                    "p-2.5",
                    "dark:bg-gray-700",
                    "dark:border-gray-600",
                    "dark:placeholder-gray-400",
                    "dark:text-white",
                    "dark:focus:ring-blue-500",
                    "dark:focus:border-blue-500",
                    3,
                    "ngModel",
                    "ngModelChange",
                    "change",
                  ],
                  [1, "flex", "flex-col", "justify-center", "items-center"],
                  [1, "text-white", "mt-1"],
                  [
                    1,
                    "flex",
                    "flex-col",
                    "text-sm",
                    "font-normal",
                    "h-6",
                    "justify-center",
                    "items-center",
                    "text-white",
                  ],
                  [1, "font-normal", "text-md", 3, "value"],
                  ["class", "basis-[100%] h-0", 4, "ngIf"],
                  [
                    1,
                    "shadow-lg",
                    "item",
                    "rounded-full",
                    "my-1",
                    "bg-white",
                    "w-16",
                    "h-16",
                    "flex",
                    "items-center",
                    "justify-center",
                    "font-bold",
                    "text-2xl",
                  ],
                  [1, "basis-[100%]", "h-0"],
                  [
                    1,
                    "shadow-lg",
                    "item",
                    "rounded-full",
                    "my-1",
                    "bg-white",
                    "w-12",
                    "h-12",
                    "flex",
                    "items-center",
                    "justify-center",
                    "font-bold",
                    "text-xl",
                  ],
                ],
                template: function (n, r) {
                  1 & n &&
                    (ue(0, "div", 0)(1, "div", 1),
                    Il(),
                    ue(2, "svg", 2),
                    Kt(3, "path", 3),
                    Ie(),
                    Al(),
                    ue(4, "div", 4)(5, "div", 5)(6, "select", 6),
                    Ke("ngModelChange", function (i) {
                      return (r.jogo = i);
                    })("change", function () {
                      return r.carregaResultado();
                    }),
                    rr(7, V1, 3, 4, "option", 7),
                    Ie(),
                    ue(8, "div", 8),
                    Kt(9, "img", 9),
                    ue(10, "p", 10),
                    kt(11),
                    li(12, "uppercase"),
                    Ie()(),
                    ue(13, "div", 11)(14, "p", 12),
                    kt(15, "CONCURSO"),
                    Ie(),
                    ue(16, "p", 13),
                    kt(17),
                    Ie()()(),
                    ue(18, "div", 14)(19, "p", 15),
                    rr(20, B1, 4, 2, "ng-container", 16),
                    Ie()()()()(),
                    ue(21, "div", 17)(22, "div", 1),
                    Il(),
                    ue(23, "svg", 18),
                    Kt(24, "path", 19),
                    Ie(),
                    Al(),
                    ue(25, "div", 20)(26, "div", 21)(27, "select", 22),
                    Ke("ngModelChange", function (i) {
                      return (r.jogo = i);
                    })("change", function () {
                      return r.carregaResultado();
                    }),
                    rr(28, $1, 3, 4, "option", 7),
                    Ie(),
                    ue(29, "div", 23),
                    Kt(30, "img", 9),
                    ue(31, "p", 24),
                    kt(32),
                    li(33, "uppercase"),
                    Ie()(),
                    ue(34, "div", 25)(35, "p"),
                    kt(36, "CONCURSO"),
                    Ie(),
                    ue(37, "p"),
                    kt(38),
                    Ie()()(),
                    ue(39, "div", 14)(40, "p", 15),
                    rr(41, U1, 4, 2, "ng-container", 16),
                    Ie()()()()()),
                    2 & n &&
                      (me(3),
                      rc(r.jogoClass),
                      me(3),
                      rt("ngModel", r.jogo),
                      me(1),
                      rt("ngForOf", r.tiposJogos),
                      me(2),
                      rt("src", r.logo, Uo),
                      me(2),
                      Yr(
                        ui(
                          12,
                          18,
                          r.tipoJogo.replace("-", " ").replace("-", " ")
                        )
                      ),
                      me(6),
                      Ls(
                        "",
                        r.resultado.concurso,
                        " \u2013 ",
                        r.resultado.data,
                        ""
                      ),
                      me(3),
                      rt(
                        "ngForOf",
                        null == r.resultado ? null : r.resultado.dezenas
                      ),
                      me(4),
                      rc(r.jogoClass),
                      me(3),
                      rt("ngModel", r.jogo),
                      me(1),
                      rt("ngForOf", r.tiposJogos),
                      me(2),
                      rt("src", r.logo, Uo),
                      me(2),
                      Yr(
                        ui(
                          33,
                          20,
                          r.tipoJogo.replace("-", " ").replace("-", " ")
                        )
                      ),
                      me(6),
                      Ls(
                        "",
                        r.resultado.concurso,
                        " \u2013 ",
                        r.resultado.data,
                        ""
                      ),
                      me(3),
                      rt(
                        "ngForOf",
                        null == r.resultado ? null : r.resultado.dezenas
                      ));
                },
                dependencies: [n_, o_, sw, lw, Ka, OC, gf, l_, a_],
                styles: [
                  ".fill-megasena-100[_ngcontent-%COMP%]{fill:#6befa3}.fill-lotofacil-100[_ngcontent-%COMP%]{fill:#dd7ac6}.fill-quina-100[_ngcontent-%COMP%]{fill:#8666ef}.fill-lotomania-100[_ngcontent-%COMP%]{fill:#ffab64}.fill-duplasena-100[_ngcontent-%COMP%]{fill:#ec3b83}.fill-timemania-100[_ngcontent-%COMP%]{fill:#5aad7d}.fill-diadesorte-100[_ngcontent-%COMP%]{fill:#bfaf83}.fill-supersete-100[_ngcontent-%COMP%]{fill:#7ce619}",
                ],
              })),
              e
            );
          })(),
        },
        { path: "**", redirectTo: "" },
      ];
      let z1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e })),
            (e.ɵinj = at({ imports: [ZD.forRoot(G1), ZD] })),
            e
          );
        })(),
        W1 = (() => {
          class e {
            constructor() {
              this.title = "loterias";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = yo({
              type: e,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && Kt(0, "router-outlet");
              },
              dependencies: [Rd],
            })),
            e
          );
        })(),
        q1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _t({ type: e, bootstrap: [W1] })),
            (e.ɵinj = at({ imports: [VR, LP, k1, z1] })),
            e
          );
        })();
      (function ux() {
        Av = !1;
      })(),
        LR()
          .bootstrapModule(q1)
          .catch((e) => console.error(e));
    },
  },
  (ee) => {
    ee((ee.s = 291));
  },
]);
