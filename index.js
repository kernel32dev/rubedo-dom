export * from "leviathan-state";
export * from "./effects";

// support for custom elements will come later
//
// export class CustomHTMLElement extends HTMLElement {
//     constructor() {
//         try {
//             super();
//         } catch (e) {
//             if (typeof e === "object" && e !== null && e.message === "Illegal constructor") {
//                 e.message = "Unregistered custom element: " + new.target.name;
//             }
//             throw e;
//         }
//         jsx_apply_props(this, props);
//     }
// }

// #region CSS

export function css(code) {
    const style = document.createElement("style");
    style.innerHTML = typeof code === "string" ? code : String.raw(code);
    document.head.appendChild(style);
    return style;
}

// #endregion

// #region Ref

export function ref() {
    return new Proxy({ __proto__: null, current: null }, ref_proxy);
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

// #endregion

// #region Extensions

Object.defineProperties(Element.prototype, {
    findParent: {
        configurable: true, enumerable: false, writable: true, value: function findParent(filter) {
            let target = this;
            while (target !== null) {
                if (filter(target)) return target;
                target = target.parentElement;
            }
            return null;
        }
    },
    findForward: {
        configurable: true, enumerable: false, writable: true, value: function findForward(filter, root) {
            let i = this;
            if (root === undefined) root = this;
            do {
                if (i.firstElementChild) {
                    i = i.firstElementChild;
                } else {
                    while (i.nextElementSibling == null) {
                        i = i.parentElement;
                        if (i == root || i == null) return null;
                    }
                    i = i.nextElementSibling;
                }
            } while (!filter(i));
            return i;
        }
    },
    focusForward: {
        configurable: true, enumerable: false, writable: true, value: function focusForward(includeNonTabbable, root) {
            return this.findForward(x => {
                if (x instanceof HTMLElement) {
                    if (!includeNonTabbable) {
                        let tabindex = x.getAttribute("tabindex");
                        if (tabindex !== null && tabindex.startsWith("-")) {
                            return false;
                        }
                    }
                    x.focus();
                    return document.activeElement == x;
                }
                return false;
            }, root);
        }
    },
});

// support for custom elements will come later
//
// CustomElementRegistry.prototype.register = function register(classes) {
//     for (const key in classes) {
//         let name = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
//         if (name.indexOf("-") == -1) name = "custom-" + name;
//         customElements.define(name, classes[key]);
//     }
// }

// #endregion
