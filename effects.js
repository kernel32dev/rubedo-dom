import { Derived } from "leviathan-state";

export function Effects() {
    Object.setPrototypeOf(Effects, new.target ? new.target.prototype || EffectsPrototype : EffectsPrototype);
    Object.defineProperty(Effects, "effects", { value: new Set(), writable: false, enumerable: true, configurable: false });
    Object.defineProperty(Effects, "active", { value: false, writable: true, enumerable: true, configurable: false });
    return Effects;
    function Effects() {
        if (Effects.active) throw new Error("effects already active");
        Effects.active = true;
        let teardowns = null;
        for (const i of Effects.effects) {
            try {
                const teardown = i();
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
            Effects.active = false;
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
            if (teardowns) teardowns = Effects.active = false;
        };
    }
}

const EffectsPrototype = { __proto__: Function.prototype };

Effects.prototype = EffectsPrototype;

Object.defineProperty(EffectsPrototype, "constructor", { value: Effects, writable: true, configurable: true });
Object.defineProperty(EffectsPrototype, "use", { value: use, writable: true, configurable: true })
Object.defineProperty(EffectsPrototype, "timeout", { value: timeout, writable: true, configurable: true })
Object.defineProperty(EffectsPrototype, "interval", { value: interval, writable: true, configurable: true })
Object.defineProperty(EffectsPrototype, "affect", { value: affect, writable: true, configurable: true })

function use(callback) {
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    this.effects.add(callback);
    return this;
}

function timeout(timeout, callback) {
    if (typeof timeout != "number") throw new TypeError("timeout is not a number");
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    const effects = this.effects;
    const setup = () => {
        const handle = setTimeout(() => {
            effects.delete(setup);
            callback();
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
    this.effects.add(() => {
        const handle = setInterval(callback, timeout);
        return () => clearInterval(handle);
    });
    return this;
}

function affect(callback) {
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    this.effects.add(() => {
        Derived.affect("everything", callback);
        return () => Derived.affect.clear(callback);
    });
    return this;
}
