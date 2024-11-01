
const ScopePrototype = Signal.prototype = { __proto__: Function.prototype };

Object.defineProperty(ScopePrototype, "constructor", { value: Signal, writable: true, configurable: true });
Object.defineProperty(ScopePrototype, "on", { value: on, writable: true, configurable: true });
Object.defineProperty(ScopePrototype, "weak", { value: weak, writable: true, configurable: true });
Object.defineProperty(ScopePrototype, "off", { value: off, writable: true, configurable: true });

export function Signal() {
    if (!new.target) throw new TypeError("Constructor Signal requires 'new'");
    Object.setPrototypeOf(Signal, typeof new.target.prototype == "object" ? new.target.prototype : SignalPrototype);
    Object.defineProperty(Signal, "handlers", { value: /** @type {Map<WeakRef<any>, WeakMap<WeakKey, any>>} */ (new Map()), writable: false, enumerable: false, configurable: false });
    Object.defineProperty(Signal, "weakrefs", { value: /** @type {WeakMap<WeakKey, WeakRef<any>>} */ (new WeakMap()), writable: false, enumerable: false, configurable: false });
    return Signal;
    function Signal() {
        const handlers = Signal.handlers;
        const copy = Array.from(handlers.keys());
        const length = copy.length;
        for (let i = 0; i < length; i++) {
            const weakref = copy[i];
            const handler = weakref.deref();
            if (!handler) {
                handlers.delete(weakref);
            } else {
                handler();
            }
        }
    }
}

function on(handler) {
    return this.weak(this, handler);
}

/** @this {{handlers: Map<WeakRef<any>, WeakMap<WeakKey, any>>>, weakrefs: WeakMap<WeakKey, WeakRef<any>>}} */
function weak() {
    const handler = arguments[arguments.length - 1];
    if (typeof handler != "function") throw new TypeError("handler is not a function");
    const weakrefs = this.weakrefs;
    const handlers = this.handlers;

    let weakref = weakrefs.get(handler);
    if (!weakref) weakrefs.set(handler, weakref = new WeakRef(handler));

    let refs = handlers.get(weakref);
    if (!refs) handlers.set(weakref, refs = new WeakMap());

    for (let i = 0; i < arguments.length - 1; i++) {
        refs.set(arguments[i], handler);
    }
    return this;
}

/** @this {{handlers: Map<WeakRef<any>, any>, weakrefs: WeakMap<any, WeakRef<any>>}} */
function off(handler) {
    if (typeof handler != "function") throw new TypeError("handler is not a function");
    const weakref = this.weakrefs.get(handler);
    if (weakref) {
        this.handlers.delete(weakref);
        this.weakrefs.delete(weakref);
    }
    return this;
}