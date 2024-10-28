//@ts-check
import { State, Derived } from "leviathan-state";

/** @typedef {import(".").PropsElem | import(".").PropsSVG} Props */
/** @typedef {import(".").Nodes} Nodes */
/** @typedef {import(".").Elems} Elems */
/** @typedef {Nodes extends infer T | import("leviathan-state").Derived<infer U> ? U : never} DeriveableNodes */

/** @typedef {Node | (OutputArray & {parentNode?: never})} Output */
/** @typedef {Output[]} OutputArray */

const svg_tag_names = function () {
    const l = "animate,animateMotion,animateTransform,circle,clipPath,defs,desc,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,switch,symbol,text,textPath,tspan,use,view".split(',')
    const o = /** @type {Record<string, true | undefined>} */ (/** @type {unknown} */ ({ __proto__: null }));
    for (let i = 0; i < l.length; i++) o[l[i]] = true;
    return o;
}();

const sym_mount_count = Symbol("jsx_mount_count");
const sym_on_mount = Symbol("jsx_on_mount");
const sym_on_unmount = Symbol("jsx_on_unmount");
const sym_use_mount = Symbol("jsx_use_mount");
const sym_unuse_mount = Symbol("jsx_unuse_mount");

export const Fragment = "";
// jsxs is called instead of jsx when props.children is an array
export const jsxs = jsx;

if (document.body) {
    new MutationObserver(jsx_handle_dom_mutations).observe(document.body, { childList: true, subtree: true });
} else {
    document.addEventListener("DOMContentLoaded", () => {
        new MutationObserver(jsx_handle_dom_mutations).observe(document.body, { childList: true, subtree: true });
    });
}

/** @param {MutationRecord[]} list */
function jsx_handle_dom_mutations(list) {
    // TODO! detect and omit calls to unmount followed by mount
    const length = list.length;
    for (let i = 0; i < length; i++) {
        const record = list[i];
        const target = record.target;
        const removes = record.removedNodes;
        const adds = record.addedNodes;
        for (let j = 0; j < removes.length; j++) {
            const remove = removes[j];
            /** @type {number | undefined} */
            const track_mount_count = remove[sym_mount_count];
            if (track_mount_count) {
                for (let i = /** @type {Node | null} */ (target); i; i = i.parentElement) {
                    i[sym_mount_count] -= track_mount_count;
                }
                jsx_trigger_unmount(remove);
            }
        }
        for (let j = 0; j < adds.length; j++) {
            const add = adds[j];
            /** @type {number | undefined} */
            const track_mount_count = add[sym_mount_count];
            if (track_mount_count) {
                for (let i = /** @type {Node | null} */ (target); i; i = i.parentElement) {
                    i[sym_mount_count] = (i[sym_mount_count] || 0) + track_mount_count;
                }
                jsx_trigger_mount(add);
            }
        }
    }
}

/** @param {Node} node */
function jsx_trigger_unmount(node) {
    const unuse_mount = node[sym_unuse_mount];
    if (unuse_mount) {
        delete node[sym_unuse_mount];
        queueMicrotask(unuse_mount);
    }
    const event = node[sym_on_unmount];
    if (event) queueMicrotask(event);
    const children = node.childNodes;
    const length = children.length;
    for (let i = 0; i < length; i++) {
        const child = children[i];
        if (child[sym_mount_count]) {
            jsx_trigger_unmount(child);
        }
    }
}

/** @param {Node} node */
function jsx_trigger_mount(node) {
    const event = node[sym_on_mount];
    if (event) queueMicrotask(event);
    const use_mount = node[sym_use_mount];
    if (use_mount) queueMicrotask(() => {
        const unuse_mount = use_mount();
        if (typeof unuse_mount == "function") node[sym_unuse_mount] = unuse_mount;
    });
    const children = node.childNodes;
    const length = children.length;
    for (let i = 0; i < length; i++) {
        const child = children[i];
        if (child[sym_mount_count]) {
            jsx_trigger_mount(child);
        }
    }
}

/**
 * @param {string | ((props: Props) => Elems)} tag
 * @param {Props | null | undefined} props
 * @returns {Elems}
 */
export function jsx(tag, props) {
    if (!props) {
        if (typeof tag === "function") {
            return tag({});
        } else if (typeof tag !== "string") {
            throw new TypeError("jsx: tag must be a string or a function");
        } else if (!tag) {
            return document.createDocumentFragment();
        } else if (svg_tag_names[tag]) {
            return document.createElementNS("http://www.w3.org/2000/svg", tag);
        } else {
            return document.createElement(tag);
        }
    }
    if (typeof tag === "string") {
        if (tag === "") return document.createDocumentFragment();
        const elem = !svg_tag_names[tag] ? document.createElement(tag) : document.createElementNS("http://www.w3.org/2000/svg", tag);
        jsx_apply_props(elem, props);
        return elem;
    } else if (typeof tag === "function") {
        let ref = undefined;
        if ("ref" in props) {
            ref = props.ref;
            delete props.ref;
        }
        // if (tag.prototype instanceof CustomHTMLElement) {
        //     elem = new tag(props);
        // } else { ... }
        const elem = tag(props);
        if (ref === undefined) {
            // nothing to do
        } else if (typeof ref === "object" && ref) {
            /*if (ref instanceof State) {
                /** @type {any} /
                const state_value = ref.value;
                if (typeof state_value === "object" && state_value !== null && typeof state_value.current === "object") {
                    state_value.current = elem;
                    ref.trigger();
                } else {
                    ref.value = elem;
                }
            } else */if (typeof ref.current === "object") {
                ref.current = /** @type {HTMLElement | SVGElement} */ (elem);
            } else {
                throw new Error("jsx: ref passed was an object that is not a State nor a Ref");
            }
        } else if (typeof ref === "function") {
            ref.call(elem, elem);
        } else {
            throw new TypeError("jsx: unsupported ref attribute type: " + typeof ref);
        }
        return elem;
    } else {
        throw new TypeError("jsx: tag must be a string or a function");
    }
}

/** @param {HTMLElement | SVGElement} elem newly created element @param {Props} props  */
function jsx_apply_props(elem, props) {
    if (props === null) return;
    for (const key in props) {
        if (key === "__source") {
            // let source = (props as any)["__source"] as { fileName: string, lineNumber: number, columnNumber: number };
            continue;
        } else if (key === "__self") {
            continue;
        } else if (key === "children") {
            jsx_apply_children(elem, props.children);
            continue;
        } else if (key === "class") {
            jsx_apply_class(elem.classList, props["class"]);
            continue;
        }
        const value = props[key];
        if (key === "value" && value instanceof Derived && (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement)) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    value.set(this.value);
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            Derived.affect(elem, () => {
                const x = "" + value();
                if (x !== elem.value) elem.value = x;
            });
        } else if (key === "checked" && value instanceof Derived && elem instanceof HTMLInputElement) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    if (this.type !== "checkbox" && this.type !== "radio") return;
                    value.set(!!this.checked);
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            Derived.affect(elem, () => {
                const x = !!value();
                if (x !== elem.checked) elem.checked = x;
            });
        } else if (key === "ref") {
            if (typeof value === "function") {
                value.call(elem, elem);
            } else if (typeof value === "object") {
                /*if (value instanceof State) {
                    const state_value = value.value;
                    if (typeof state_value === "object" && state_value !== null && typeof state_value.current === "object") {
                        state_value.current = elem;
                        value.trigger();
                    } else {
                        value.value = elem;
                    }
                } else */if (typeof value.current === "object") {
                    value.current = elem;
                } else {
                    throw new Error("jsx: ref passed was an object that is not a State nor a Ref");
                }
            } else {
                throw new Error("jsx: ref passed was a value of type " + typeof value);
            }
        } else if (key === "useMount") {
            if (typeof value == "function") {
                if (!(sym_on_mount in elem || sym_on_unmount in elem || sym_use_mount in elem)) {
                    for (let i = /** @type {Node | null} */ (elem); i; i = i.parentElement) {
                        i[sym_mount_count] = (i[sym_mount_count] || 0) + 1;
                    }
                }
                elem[sym_use_mount] = value;
            } else if (value !== undefined) {
                throw new Error("jsx: event attributes must be functions");
            }
        } else if (key.startsWith("on")) {
            if (typeof value == "function") {
                if (key === "onMount") {
                    if (!(sym_on_mount in elem || sym_on_unmount in elem || sym_use_mount in elem)) {
                        for (let i = /** @type {Node | null} */ (elem); i; i = i.parentElement) {
                            i[sym_mount_count] = (i[sym_mount_count] || 0) + 1;
                        }
                    }
                    elem[sym_on_mount] = value.bind(elem);
                } else if (key === "onUnmount") {
                    if (!(sym_on_mount in elem || sym_on_unmount in elem || sym_use_mount in elem)) {
                        for (let i = /** @type {Node | null} */ (elem); i; i = i.parentElement) {
                            i[sym_mount_count] = (i[sym_mount_count] || 0) + 1;
                        }
                    }
                    elem[sym_on_unmount] = value.bind(elem);
                } else {
                    elem.addEventListener(key.slice(2).toLowerCase(), value);
                }
            } else if (value !== undefined) {
                throw new Error("jsx: event attributes must be functions");
            }
        } else {
            const name = elem instanceof SVGElement ? key : key.toLowerCase();
            Derived.affect(elem, () => {
                const v = Derived.use(value);
                if (typeof v === "string" || typeof v === "number" || typeof v === "bigint") {
                    elem.setAttribute(name, "" + v);
                } else if (typeof v === "function") {
                    throw new Error("jsx: unsupported function attribute " + name);
                } else if (typeof v === "boolean") {
                    if (v) {
                        elem.setAttribute(name, "");
                    } else {
                        elem.removeAttribute(name);
                    }
                } else if (typeof v === "undefined") {
                    elem.removeAttribute(name);
                } else if (typeof v === "object") {
                    if (v === null) {
                        elem.removeAttribute(name);
                    } else if (name === "style") {
                        elem.style.cssText = "";
                        for (const key in v) {
                            const kebab = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                            elem.style.setProperty(kebab, "" + v[key]);
                        }
                    } else {
                        throw new Error("jsx: unsupported object attribute " + name);
                    }
                }
            });
        }
    }
}

/**
 * @param {DOMTokenList} tokens
 * @param {import("./html").HTML.ClassList} prop
 */
function jsx_apply_class(tokens, prop) {
    if (!prop) return;
    if (typeof prop === "string") {
        tokens.value = prop;
    } else if (Array.isArray(prop)) {
        for (let i = 0; i < prop.length; i++) {
            jsx_apply_class(tokens, prop[i]);
        }
    } else if (prop instanceof Derived) {
        //@ts-expect-error
        const bucket = /** @type {Record<string, boolean | undefined>} */ ({ __proto__: null });
        Derived.affect(tokens, () => {
            const v = prop();
            for (const key in bucket) {
                if (bucket[key]) {
                    tokens.remove(key);
                    bucket[key] = false;
                }
            }
            jsx_apply_stateless_class(tokens, v, bucket);
        });
    } else {
        for (const key in prop) {
            const item = prop[key];
            if (!item) continue;
            if (item instanceof Derived) {
                Derived.affect(tokens, () => {
                    tokens.toggle(key, !!item());
                });
            } else {
                tokens.add(key);
            }
        }
    }
}

/**
 * @param {DOMTokenList} list
 * @param {import("./html").HTML.StatelessClassList | import("./html").HTML.StatelessClassList[]} prop
 * @param {Record<string, boolean | undefined>} bucket
 */
function jsx_apply_stateless_class(list, prop, bucket) {
    if (!prop) return;
    if (typeof prop === "string") {
        prop = prop.split(" ");
        for (let i = 0; i < prop.length; i++) {
            const item = /** @type {string} */ (prop[i]);
            if (item) {
                list.add(item);
                bucket[item] = true;
            }
        }
    } else if (Array.isArray(prop)) {
        for (let i = 0; i < prop.length; i++) {
            jsx_apply_stateless_class(list, prop[i], bucket);
        }
    } else {
        for (const key in prop) {
            if (prop[key]) {
                list.add(key);
                bucket[key] = true;
            }
        }
    }
}

/**
 * @param {Node} elem
 * @param {Nodes} child
 */
function jsx_apply_children(elem, child) {
    if (child === null || child === undefined || child === "" || typeof child === "boolean") {
        // ignore boolean, undefined and null
        // this exists to allow things like `<div>{is_checked && <span>checked!</span>}</div>` to exist
    } else if (child instanceof Derived) {
        jsx_apply_stateful_children(elem, child);
    } else if (typeof child !== "object") {
        child = document.createTextNode("" + child);
        elem.appendChild(child);
    } else if ("view" in child) {
        child = child["view"]();
        elem.appendChild(child);
    } else if (child instanceof Node) {
        elem.appendChild(child);
    } else if (Array.isArray(child)) {
        if (child instanceof State.Array) {
            jsx_append_output(jsx_compute_tracked_array(child), elem, null);
        } else {
            for (let i = 0; i < /** @type {Array<Nodes>} */ (child).length; i++) {
                jsx_apply_children(elem, /** @type {Array<Nodes>} */ (child)[i]);
            }
        }
    } else if (Symbol.iterator in child) {
        for (let i of child) {
            jsx_apply_children(elem, i);
        }
    } else {
        console.error("not a valid jsx node: ", child);
        throw new Error("not a valid jsx node: " + child);
    }
}

/** @param {Node} elem @param {Derived<DeriveableNodes>} state */
function jsx_apply_stateful_children(elem, state) {
    const sym_jsx = Symbol("jsx");
    /** @type {Output} */
    let output = elem.appendChild(jsx_create_text_node("", jsx, sym_jsx)); // TODO! find a better way of initializing elements into a container that does not invole a dummy first element
    Derived.affect("nothing", jsx);
    function jsx() {
        output = jsx_replace_output(output, jsx_compute_derivable_nodes(state(), jsx, sym_jsx), sym_jsx);
    }
}

/** @param {DeriveableNodes} v @param {Function} affector @param {symbol} sym_jsx @returns {Output} */
function jsx_compute_derivable_nodes(v, affector, sym_jsx) {
    if (!v || typeof v != "object") {
        const t = typeof v;
        if (t === "symbol") throw new TypeError("jsx: symbol cannot be rendered");
        // "string" | "number" | "bigint" == 6
        // "boolean" | "function" != 6
        return jsx_create_text_node(t.length == 6 ? "" + v : "", affector, sym_jsx);
    }
    if (v instanceof Node) {
        v[sym_jsx] = affector;
        return v;
    }
    if (is_view(v)) {
        v = v.view();
        if (!(v instanceof Node)) throw new TypeError("jsx: view method did not return a Node");
        v[sym_jsx] = affector;
        return v;
    }
    if (!Array.isArray(v)) {
        throw new TypeError("jsx: invalid object returned by derivation, not a Node, View or Array");
    }
    if (!(v instanceof State.Array)) {
        return /** @type {DeriveableNodes[]} */ (v).map(v => jsx_compute_derivable_nodes(v, affector, sym_jsx));
    }
    return jsx_compute_tracked_array(v, affector, sym_jsx);
}

/** @param {DeriveableNodes[]} v  @param {Function} [affector] @param {symbol} [outer_sym_jsx] @returns {Output} */
function jsx_compute_tracked_array(v, affector, outer_sym_jsx) {
    const sym_jsx = Symbol("jsx");
    const mapped = v.$map(v => jsx_compute_derivable_nodes(v, jsx, sym_jsx));
    const output = [jsx_create_text_node("", jsx, sym_jsx)]; // TODO! find a better way of initializing elements into a container that does not invole a dummy first element
    if (outer_sym_jsx) jsx[outer_sym_jsx] = affector;
    Derived.affect("nothing", jsx);
    return output;
    function jsx() {
        State.Array.use(mapped);
        Derived.now(() => {
            const new_output = Array.from(mapped);
            if (new_output.length == 0) new_output[0] = jsx_create_text_node("", jsx, sym_jsx);
            jsx_replace_output(output, new_output, sym_jsx);
            output.length = 0;
            output.push.apply(output, new_output);
        });
    }
}

/** @param {string} v @param {Function} affector @param {symbol} sym_jsx  @returns {Text} */
function jsx_create_text_node(v, affector, sym_jsx) {
    const text = document.createTextNode(v);
    /** @type {any} */ (text)[sym_jsx] = affector;
    return text;
}

/** @param {any} arg @returns {arg is {view(): unknown}} TODO! inline this */
function is_view(arg) {
    return typeof arg.view == "function";
}

/** @param {Output} old_output @param {Output} new_output @param {symbol} sym_jsx @returns {Output} */
function jsx_replace_output(old_output, new_output, sym_jsx) {
    // 0. special common case, if it is just text changing, don't swap the nodes
    if (old_output instanceof Text && new_output instanceof Text) {
        old_output.nodeValue = new_output.nodeValue;
        return old_output;
    }
    // 1. get the last element of old_output
    const last = jsx_last_output(old_output);
    const parent = last.parentNode;
    if (!parent) return new_output;
    const child = last.nextSibling;
    // 2. remove old_output
    jsx_remove_output(old_output, sym_jsx);
    jsx_append_output(new_output, parent, child);
    return new_output;
}

/** @param {Output} output @returns {Node} */
function jsx_last_output(output) {
    while (Array.isArray(output)) output = output[output.length - 1];
    return output;
}

/** @param {Output} output @param {symbol} sym_jsx  */
function jsx_remove_output(output, sym_jsx) {
    if (Array.isArray(output)) {
        for (let i = 0; i < output.length; i++) {
            jsx_remove_output(output[i], sym_jsx);
        }
    } else {
        if (output.parentNode) output.parentNode.removeChild(output);
        delete output[sym_jsx];
    }
}

/** @param {Output} output @param {Node} parent @param {Node | null} child second parameter */
function jsx_append_output(output, parent, child) {
    if (Array.isArray(output)) {
        for (let i = 0; i < output.length; i++) {
            jsx_append_output(output[i], parent, child);
        }
    } else {
        if (parent) parent.insertBefore(output, child);
    }
}
