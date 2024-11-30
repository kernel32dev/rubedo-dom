import { Signal, Effect } from "rubedo";

export function Scope() {
    if (!new.target) throw new TypeError("Constructor Scope requires 'new'");
    Object.setPrototypeOf(Scope, new.target.prototype);
    Object.defineProperty(Scope, "effects", { value: new Set(), writable: false, enumerable: true, configurable: false });
    Object.defineProperty(Scope, "active", { value: false, writable: true, enumerable: true, configurable: false });
    return Scope;
    function Scope(target) {
        if (Scope.active) throw new Error("effects already active");
        Scope.active = true;
        Scope.target = target;
        let teardowns = null;
        for (const i of Scope.effects) {
            try {
                const teardown = i(target);
                if (typeof teardown == "function") {
                    if (teardowns) {
                        teardowns.push(teardown);
                    } else {
                        teardowns = [teardown];
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        if (teardowns) return () => {
            if (!teardowns) return;
            Scope.active = false;
            delete Scope.target;
            const arr = teardowns;
            teardowns = null;
            const length = arr.length;
            for (let i = 0; i < length; i++) {
                try {
                    arr[i]();
                } catch (e) {
                    console.error(e);
                }
            }
        };
        teardowns = true;
        return () => {
            if (teardowns) {
                delete Scope.target;
                teardowns = Scope.active = false;
            }
        };
    }
}

const ScopePrototype = { __proto__: Function.prototype };

Scope.prototype = ScopePrototype;

Object.defineProperty(ScopePrototype, "constructor", { value: Scope, writable: true, configurable: true });
Object.defineProperty(ScopePrototype, "use", { value: use, writable: true, configurable: true })
Object.defineProperty(ScopePrototype, "timeout", { value: timeout, writable: true, configurable: true })
Object.defineProperty(ScopePrototype, "interval", { value: interval, writable: true, configurable: true })
Object.defineProperty(ScopePrototype, "affect", { value: affect, writable: true, configurable: true })
Object.defineProperty(ScopePrototype, "signal", { value: signal, writable: true, configurable: true })

function use(callback) {
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    this.effects.add(callback);
    return this;
}

function timeout(timeout, callback) {
    if (typeof timeout != "number") throw new TypeError("timeout is not a number");
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    const effects = this.effects;
    const setup = target => {
        const handle = setTimeout(() => {
            effects.delete(setup);
            callback(target);
        }, timeout);
        return () => {
            effects.delete(setup);
            clearTimeout(handle);
        };
    }
    effects.add(setup);
    return this;
}

function interval(timeout, callback) {
    if (typeof timeout != "number") throw new TypeError("timeout is not a number");
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    this.effects.add(target => {
        const handle = setInterval(callback, timeout, target);
        return () => clearInterval(handle);
    });
    return this;
}

function affect(callback) {
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    this.effects.add(() => {
        const effect = new Effect.Persistent(callback);
        return () => effect.clear();
    });
    return this;
}

function signal(signal, handler) {
    if (!(signal instanceof Signal)) throw new TypeError("signal is not a Signal");
    if (typeof handler != "function") throw new TypeError("handler is not a function");
    this.effects.add(() => {
        signal.persistent(handler);
        return () => signal.off(handler);
    });
    return this;
}
