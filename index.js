//@ts-check
import { State, Derived, Effect } from "rubedo";

/** @typedef {import(".").PropsElem | import(".").PropsSVG} Props */
/** @typedef {import(".").Nodes} Nodes */
/** @typedef {import(".").Elems} Elems */

/** @typedef {Node | (OutputArray & {parentNode?: never})} Output */
/** @typedef {Output[]} OutputArray */

import elems from "./elements";
export { elems };

export * from "./context";
export * from "./ref";
export * from "./scope";

export function css(code) {
    const style = document.createElement("style");
    style.innerHTML = typeof code == "string" ? code : String.raw(code);
    document.head.appendChild(style);
    return style;
}

//#region Mount detector

const sym_scope_count = Symbol("sym_scope_count");
const sym_scope = Symbol("jsx_scope");
const sym_unscope = Symbol("jsx_unscope");

/** @type {MutationObserver | null} */
let mutation_observer = null;

function jsx_init_mutation_observer() {
    if (!mutation_observer) {
        mutation_observer = new MutationObserver(jsx_handle_dom_mutations);
        mutation_observer.observe(document.body, { childList: true, subtree: true });
    }
}

/** @param {MutationRecord[]} list */
function jsx_handle_dom_mutations(list) {
    const length = list.length;
    if (length >= 2) console.log(`length ${length} >= 2`, list);
    /** @type {Map<Node, Node | null>} */
    const map = new Map();
    for (let i = 0; i < length; i++) {
        const record = list[i];
        const target = record.target;
        const removes = record.removedNodes;
        const adds = record.addedNodes;
        for (let j = 0; j < removes.length; j++) {
            const remove = removes[j];
            if (!map.has(remove)) map.set(remove, target);
        }
        for (let j = 0; j < adds.length; j++) {
            const add = adds[j];
            if (!map.has(add)) map.set(add, null);
        }
    }
    /** @type {Map<Node, number>} */
    const delta_scope_count = new Map();
    for (const [remove, oldParent] of map) {
        const newParent = remove.getRootNode() == document ? remove.parentNode : null;
        if (oldParent && newParent != oldParent) {
            /** @type {number | undefined} */
            const scope_count = remove[sym_scope_count];
            if (scope_count) {
                delta_scope_count.set(
                    oldParent,
                    (delta_scope_count.get(oldParent) || 0) - scope_count,
                );
                jsx_trigger_unmount(remove);
            }
        }
    }
    for (const [add, oldParent] of map) {
        const newParent = add.getRootNode() == document ? add.parentNode : null;
        if (newParent && (!oldParent || newParent != oldParent)) {
            const scope_count = jsx_trigger_mount(add);
            if (scope_count && oldParent) {
                delta_scope_count.set(
                    oldParent,
                    (delta_scope_count.get(oldParent) || 0) + scope_count,
                );
            }
        }
    }
    for (const [parent, delta] of delta_scope_count) {
        if (delta) {
            for (let i = parent; i != document.body; i = /** @type {Node} */ (i.parentNode)) {
                i[sym_scope_count] = (i[sym_scope_count] || 0) + delta;
            }
        }
    }
}

/** @param {Node} node */
function jsx_trigger_unmount(node) {
    delete node[sym_scope_count];
    const unscope = node[sym_unscope];
    if (unscope) {
        delete node[sym_unscope];
        queueMicrotask(unscope);
    }
    const children = node.childNodes;
    const length = children.length;
    for (let i = 0; i < length; i++) {
        const child = children[i];
        if (child[sym_scope_count] > 0) {
            jsx_trigger_unmount(child);
        }
    }
}

/** @param {Node} node */
function jsx_trigger_mount(node) {
    const scope = node[sym_scope];
    if (scope) queueMicrotask(scope);
    let scope_count = scope ? 1 : 0;
    const children = node.childNodes;
    const length = children.length;
    for (let i = 0; i < length; i++) {
        scope_count += jsx_trigger_mount(children[i]);
    }
    if (scope_count) node[sym_scope_count] = scope_count;
    return scope_count;
}

//#endregion

//#region jsx
const svg_namespace = "http://www.w3.org/2000/svg";
const svg_tag_names = function () {
    const l = "animate,animateMotion,animateTransform,circle,clipPath,defs,desc,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,switch,symbol,text,textPath,tspan,use,view".split(',')
    const o = /** @type {Record<string, true | undefined>} */ (/** @type {unknown} */ ({ __proto__: null }));
    for (let i = 0; i < l.length; i++) o[l[i]] = true;
    return o;
}();

/**
 * @param {string | ((props: Props) => Elems)} tag
 * @param {Props | null | undefined} [props]
 * @returns {Elems}
 */
export function createElement(tag, props) {
    if (!props) {
        if (typeof tag == "function") {
            if (arguments.length >= 3) {
                const children = Array.from(arguments);
                children.shift();
                children.shift();
                return tag({ children });
            } else {
                return tag({});
            }
        } else if (typeof tag != "string") {
            throw new TypeError("jsx: tag must be a string or a function");
        } else if (!tag) {
            return document.createDocumentFragment();
        } else if (svg_tag_names[tag]) {
            return document.createElementNS(svg_namespace, tag);
        } else {
            return document.createElement(tag);
        }
    }
    if (typeof tag == "string") {
        if (arguments.length >= 3) {
            arguments[0] = undefined;
            arguments[1] = undefined;
        }
        if (!tag) {
            const elem = document.createDocumentFragment();
            jsx_apply_children(elem, props.children);
            if (arguments.length >= 3) jsx_apply_children(elem, arguments);
            return elem;
        }
        const elem = !svg_tag_names[tag] ? document.createElement(tag) : document.createElementNS(svg_namespace, tag);
        jsx_apply_props(elem, props);
        if (arguments.length >= 3) jsx_apply_children(elem, arguments);
        return elem;
    } else if (typeof tag == "function") {
        if (arguments.length >= 3) {
            if ("children" in props) {
                let children = props.children;
                if (!Array.isArray(children)) {
                    if (typeof children == "object" && children && Symbol.iterator in children) {
                        children = Array.from(children);
                    } else {
                        children = [children];
                    }
                }
                for (let i = 2; i < arguments.length; i++) {
                    children[/** @type {any[]} */ (children).length] = arguments[i];
                }
                props.children = children;
            } else {
                const children = Array.from(arguments);
                children.shift();
                children.shift();
                props.children = children;
            }
        }
        return tag(props);
    }
    throw new TypeError("jsx: tag must be a string or a function");
}

/**
 * @param {string | ((props: Props) => Elems)} tag
 * @param {Props | null | undefined} [props]
 * @param {any} [key]
 * @returns {Elems}
 */
export function jsx(tag, props, key) {
    if (!props) {
        if (typeof tag == "function") {
            return tag({});
        } else if (typeof tag != "string") {
            throw new TypeError("jsx: tag must be a string or a function");
        } else if (!tag) {
            return document.createDocumentFragment();
        } else if (svg_tag_names[tag]) {
            return document.createElementNS(svg_namespace, tag);
        } else {
            return document.createElement(tag);
        }
    }
    if (arguments.length == 3 || (arguments.length > 3 && key !== undefined)) {
        /** @type {any} */ (props).key = key;
    }
    if (typeof tag == "string") {
        if (!tag) {
            const elem = document.createDocumentFragment();
            jsx_apply_children(elem, props.children);
            return elem;
        }
        const elem = !svg_tag_names[tag] ? document.createElement(tag) : document.createElementNS(svg_namespace, tag);
        jsx_apply_props(elem, props);
        return elem;
    } else if (typeof tag == "function") {
        return tag(props);
    }
    throw new TypeError("jsx: tag must be a string or a function");
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
        if (value === undefined) continue;
        if (key === "value" && value instanceof Derived && (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement)) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    value.set(this.value);
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            new Effect(elem, () => {
                const x = "" + value();
                if (x !== elem.value) elem.value = x;
            }).run();
        } else if (key === "checked" && value instanceof Derived && elem instanceof HTMLInputElement) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    if (this.type !== "checkbox" && this.type !== "radio") return;
                    value.set(!!this.checked);
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            new Effect(elem, () => {
                const x = !!value();
                if (x !== elem.checked) elem.checked = x;
            }).run();
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
        } else if (key === "scope") {
            if (typeof value == "function") {
                jsx_init_mutation_observer();
                elem[sym_scope] = function scope() {
                    const unscope = value(elem);
                    if (typeof unscope == "function") elem[sym_unscope] = unscope;
                };
            } else if (value !== undefined) {
                throw new Error("jsx: scope attribute must be a function");
            }
        } else if (key === "context") {
            jsx_apply_context(elem, value);
        } else if (key.startsWith("on")) {
            if (typeof value == "function") {
                elem.addEventListener(key.slice(2).toLowerCase(), value);
            } else if (value !== undefined) {
                throw new Error("jsx: event attributes must be functions");
            }
        } else {
            const name = elem instanceof SVGElement ? key : key.toLowerCase();
            new Effect(elem, () => {
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
            }).run();
        }
    }
}

function jsx_apply_context(node, context) {
    if (Array.isArray(context)) {
        for (let i = 0; i < context.length; i++) {
            jsx_apply_context(node, context[i]);
        }
    } else if (typeof context == "function") {
        context(node);
    } else if (context !== undefined) {
        throw new Error("jsx: invalid context value: " + typeof context);
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
        new Effect(tokens, () => {
            const v = prop();
            for (const key in bucket) {
                if (bucket[key]) {
                    tokens.remove(key);
                    bucket[key] = false;
                }
            }
            jsx_apply_stateless_class(tokens, v, bucket);
        }).run();
    } else {
        for (const key in prop) {
            const item = prop[key];
            if (!item) continue;
            if (item instanceof Derived) {
                new Effect(tokens, () => {
                    tokens.toggle(key, !!item());
                }).run();
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

export function Elems() {
    const frag = document.createDocumentFragment();
    jsx_apply_children(frag, arguments);
    const length = frag.childNodes.length;
    return !length ? document.createTextNode("") : length == 1 ? frag.childNodes[0] : frag;
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
                jsx_apply_children(elem, /** @type {Array<Nodes>} */(child)[i]);
            }
        }
    } else if (Symbol.iterator in child) {
        for (let i of child) {
            jsx_apply_children(elem, i);
        }
    } else { // TODO! handle array like
        console.error("not a valid jsx node: ", child);
        throw new Error("not a valid jsx node: " + child);
    }
}


/** @param {Output} output @returns {Node} */
function jsx_last_output(output) {
    while (Array.isArray(output)) output = output[output.length - 1];
    return output;
}

/** @param {Output} output @param {Node} parent @param {Node | null} child */
function jsx_append_output(output, parent, child) {
    if (Array.isArray(output)) {
        for (let i = 0; i < output.length; i++) {
            jsx_append_output(output[i], parent, child);
        }
    } else {
        if (parent) parent.insertBefore(output, child);
    }
}
//#endregion

//#region Derived

/** @param {Node} elem @param {Derived<Nodes>} state */
function jsx_apply_stateful_children(elem, state) {
    const sym_jsx = Symbol("jsx");
    const affector = new Effect.Weak(jsx);
    /** @type {Output} */
    let output = elem.appendChild(jsx_create_text_node("", affector, sym_jsx)); // TODO! find a better way of initializing elements into a container that does not invole a dummy first element
    affector.run();
    function jsx() {
        output = jsx_replace_output(output, jsx_compute_derivable_nodes(state(), affector, sym_jsx), sym_jsx);
    }
}

/** @param {Nodes} v @param {Effect} affector @param {symbol} sym_jsx @returns {Output} */
function jsx_compute_derivable_nodes(v, affector, sym_jsx) {
    if (v instanceof Derived) {
        // TODO! handle nested derived
    }
    if (typeof v != "object") {
        if (typeof v == "symbol") throw new TypeError("jsx: symbol cannot be rendered");
        // "string" | "number" | "bigint" == 6
        // "boolean" | "function" | "undefined" != 6
        return jsx_create_text_node((typeof v).length == 6 ? "" + v : "", affector, sym_jsx);
    }
    if (!v) return jsx_create_text_node("", affector, sym_jsx);
    if (v instanceof Node) {
    } else if (is_view(v)) {
        v = v.view();
        if (!(v instanceof Node)) throw new TypeError("jsx: view method did not return a Node");
    } else {
        // TODO! handle iterable
        // TODO! handle array like
        if (!Array.isArray(v)) {
            throw new TypeError("jsx: invalid object returned by derivation, not a Node, View or Array");
        }
        if (!(v instanceof State.Array)) {
            return /** @type {Nodes[]} */ (v).map(v => jsx_compute_derivable_nodes(v, affector, sym_jsx));
        }
        return jsx_compute_tracked_array(v, affector, sym_jsx);
    }
    if (v.nodeType == 11) {
        const output = [];
        jsx_collect_document_fragment_children(output, sym_jsx, affector, v.childNodes);
        if (!output.length) return jsx_create_text_node("", affector, sym_jsx);
        return output;
    }
    v[sym_jsx] = affector;
    return v;
}

/** @param {Node[]} output @param {Effect} affector @param {symbol} sym_jsx @param {NodeListOf<ChildNode>} children */
function jsx_collect_document_fragment_children(output, sym_jsx, affector, children) {
    const length = children.length;
    for (let i = 0; i < length; i++) {
        const node = children[i];
        if (node.nodeType == 11) {
            jsx_collect_document_fragment_children(output, sym_jsx, affector, node.childNodes);
        } else {
            output.push(node);
            node[sym_jsx] = affector;
        }
    }
}

/** @param {Nodes[]} v  @param {Effect} [outer_affector] @param {symbol} [outer_sym_jsx] @returns {Output} */
function jsx_compute_tracked_array(v, outer_affector, outer_sym_jsx) {
    const affector = new Effect.Weak(jsx);
    const sym_jsx = Symbol("jsx");
    const mapped = v.$map(v => jsx_compute_derivable_nodes(v, affector, sym_jsx));
    const output = [jsx_create_text_node("", affector, sym_jsx)]; // TODO! find a better way of initializing elements into a container that does not invole a dummy first element
    if (outer_sym_jsx) jsx[outer_sym_jsx] = outer_affector;
    affector.run();
    return output;
    function jsx() {
        State.Array.use(mapped);
        Derived.now(() => {
            const new_output = Array.from(mapped);
            if (new_output.length == 0) new_output[0] = jsx_create_text_node("", affector, sym_jsx);
            jsx_replace_output(output, new_output, sym_jsx);
            output.length = 0;
            output.push.apply(output, new_output);
        });
    }
}

/** @param {string} v @param {Effect} affector @param {symbol} sym_jsx  @returns {Text} */
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
    // TODO! do this with less dom calls
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

//#endregion
