export function ref(current) {
    if (current === undefined) current = null;
    if (typeof current != "object") throw new TypeError("can't initialize a ref with a value of type " + typeof current)
    return new Proxy({ __proto__: null, current }, ref_proxy);
}

function unwrap_ref(target) {
    const current = target.current;
    if (current) return current;
    throw new Error("Ref is not yet initialized");
}

/** @type {ProxyHandler<{current: null | object}>} */
const ref_proxy = {
    apply(target, thisArg, argArray) {
        return Reflect.apply(unwrap_ref(target), thisArg, argArray);
    },
    construct(target, argArray, newTarget) {
        return Reflect.construct(unwrap_ref(target), argArray, newTarget);
    },
    defineProperty(target, property, attributes) {
        if (property === "current") return false;
        return Reflect.defineProperty(unwrap_ref(target), property, attributes);
    },
    deleteProperty(target, p) {
        if (p === "current") return false;
        return Reflect.deleteProperty(unwrap_ref(target), p);
    },
    get(target, p) {
        const current = target.current;
        if (p === "current") return current;
        if (!current) unwrap_ref(target);
        const value = Reflect.get(current, p, current);
        return typeof value == "function" ? value.bind(current) : value;
    },
    getOwnPropertyDescriptor(target, p) {
        if (p === "current") return {
            value: target.current,
            writable: true,
            enumerable: false,
            configurable: false,
        };
        return Reflect.getOwnPropertyDescriptor(unwrap_ref(target), p);
    },
    getPrototypeOf(target) {
        const current = target.current;
        return current && Reflect.getPrototypeOf(current);
    },
    has(target, p) {
        if (p === "current") return true;
        return Reflect.has(unwrap_ref(target), p);
    },
    isExtensible(target) {
        return Reflect.isExtensible(unwrap_ref(target));
    },
    ownKeys(target) {
        return Reflect.ownKeys(unwrap_ref(target));
    },
    preventExtensions(target) {
        return Reflect.preventExtensions(unwrap_ref(target));
    },
    set(target, p, newValue) {
        if (p === "current") {
            if (typeof newValue != "object") {
                throw new Error("Ref can only be initialized to an object or null");
            }
            target.current = newValue;
            return true;
        }
        const current = unwrap_ref(target);
        return Reflect.set(current, p, newValue, current);
    },
    setPrototypeOf(target, v) {
        return Reflect.setPrototypeOf(unwrap_ref(target), v);
    },
};
