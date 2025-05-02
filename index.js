//@ts-check
import { State, Derived, Effect } from "rubedo";

/** @typedef {import(".").PropsElem | import(".").PropsSVG} Props */
/** @typedef {import(".").Nodes} Nodes */
/** @typedef {import(".").Elems} Elems */
/** @typedef {Effect & {0: Output, length: 1}} JsxEffect */

/** @typedef {Node | OutputArray | JsxEffect} Output */
/** @typedef {Output[]} OutputArray */

export * from "./context";
export * from "./ref";
export * from "./scope";

export function css(code) {
    const style = document.createElement("style");
    style.innerHTML = typeof code == "string" ? code : String.raw(code);
    document.head.appendChild(style);
    return style;
}

export const tag = new Proxy({ __proto__: null }, {
    get(target, p) {
        return typeof p == "string" ? (target[p] || (target[p] = createElement.bind(null, p))) : undefined;
    }
});

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
    // if (length >= 2) console.log(`length ${length} >= 2`, list);
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
            if (value instanceof Derived) {
                new Effect(elem, () => {
                    const v = value();
                    Derived.now(() => jsx_apply_value_prop(elem, name, v));
                }).run();
            } else {
                jsx_apply_value_prop(elem, name, value);
            }
        }
    }
}

/**
 * @param {HTMLElement | SVGElement} elem 
 * @param {string} name 
 * @param {unknown} value 
 */
function jsx_apply_value_prop(elem, name, value) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
        elem.setAttribute(name, "" + value);
    } else if (typeof value === "function") {
        throw new Error("jsx: unsupported function attribute " + name);
    } else if (typeof value === "boolean") {
        if (value) {
            elem.setAttribute(name, "");
        } else {
            elem.removeAttribute(name);
        }
    } else if (typeof value === "undefined") {
        elem.removeAttribute(name);
    } else if (typeof value === "object") {
        if (value === null) {
            elem.removeAttribute(name);
        } else if (name === "style") {
            elem.style.cssText = "";
            for (const key in value) {
                const kebab = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                elem.style.setProperty(kebab, "" + value[key]);
            }
        } else {
            throw new Error("jsx: unsupported object attribute " + name);
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
    for (let i = 0; i < arguments.length; i++) {
        jsx_apply_children(frag, arguments[i]);
    }
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
        if (child instanceof Derived.Array) {
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
    while (!(output instanceof Node)) output = output[output.length - 1];
    return output;
}

/** @param {Output} output @param {Node} parent @param {Node | null} child */
function jsx_append_output(output, parent, child) {
    if (!(output instanceof Node)) {
        for (let i = 0; i < output.length; i++) {
            jsx_append_output(output[i], parent, child);
        }
    } else {
        if (parent) parent.insertBefore(output, child);
    }
}
//#endregion

//#region Derived

const sym_jsx = Symbol("jsx");

/** @param {Node | null} parent @param {Derived<Nodes>} state */
function jsx_apply_stateful_children(parent, state) {
    const affector = /** @type {JsxEffect} */ (new Effect.Weak(/** @type {(effect: Effect) => void} */ (jsx)));
    affector[0] = /** @type {Output} */(/** @type {Node} */(parent).appendChild(jsx_create_text_node("", affector)));
    affector.length = 1;
    affector.run();
    /** @param {JsxEffect} effect */
    function jsx(effect) {
        const value = state();
        parent = jsx_select_parent(effect[0], parent);
        effect[0] = jsx_replace_output(parent, effect[0], jsx_compute_derivable_nodes(value, effect));
        parent = jsx_last_output(effect[0]).parentNode;
    }
}

/** @param {Nodes} v @param {Effect} affector @returns {Output} */
function jsx_compute_derivable_nodes(v, affector) {
    if (v instanceof Derived) {
        // TODO! handle nested derived
    }
    if (typeof v != "object") {
        if (typeof v == "symbol") throw new TypeError("jsx: symbol cannot be rendered");
        // "string" | "number" | "bigint" == 6
        // "boolean" | "function" | "undefined" != 6
        return jsx_create_text_node((typeof v).length == 6 ? "" + v : "", affector);
    }
    if (!v) return jsx_create_text_node("", affector);
    if (v instanceof Node) {
        // TODO! if there are multiple nodes coming from the same effect this likely causes them to be placed multiple times in the tree
        // this should not have any visible consequence but it does waste time
        /** @type {JsxEffect | undefined} */
        const effect = v[sym_jsx];
        if (effect && effect != affector) {
            effect[sym_jsx] = affector;
            return effect;
        }
    } else if (is_view(v)) {
        v = v.view();
        if (!(v instanceof Node)) throw new TypeError("jsx: view method did not return a Node");
    } else {
        // TODO! handle iterable
        // TODO! handle array like
        if (!Array.isArray(v)) {
            throw new TypeError("jsx: invalid object returned by derivation, not a Node, View or Array");
        }
        if (!(v instanceof Derived.Array)) {
            return /** @type {Nodes[]} */ (v).map(v => jsx_compute_derivable_nodes(v, affector));
        }
        return jsx_compute_tracked_array(v, affector);
    }
    if (v.nodeType == 11) {
        const output = [];
        jsx_collect_document_fragment_children(output, affector, v.childNodes);
        if (!output.length) return jsx_create_text_node("", affector);
        return output;
    }
    v[sym_jsx] = affector;
    return v;
}

/** @param {Node[]} output @param {Effect} affector @param {NodeListOf<ChildNode>} children */
function jsx_collect_document_fragment_children(output, affector, children) {
    const length = children.length;
    for (let i = 0; i < length; i++) {
        const node = children[i];
        if (node.nodeType == 11) {
            jsx_collect_document_fragment_children(output, affector, node.childNodes);
        } else {
            output.push(node);
            node[sym_jsx] = affector;
        }
    }
}

/** @param {Nodes[]} v  @param {Effect} [outer_affector] @returns {Exclude<Output, Node>} */
function jsx_compute_tracked_array(v, outer_affector) {
    const affector = /** @type {JsxEffect} */ (new Effect.Weak(jsx));
    const mapped = v.$map(v => jsx_compute_derivable_nodes(v, affector));
    const output = [jsx_create_text_node("", affector)]; // TODO! find a better way of initializing elements into a container that does not invole a dummy first element
    affector[0] = output;
    affector.length = 1;
    /** @type {Node | null} */
    let parent = null;
    // if (outer_affector) jsx[Symbol("jsx_outer")] = outer_affector;
    if (outer_affector) jsx[sym_jsx] = outer_affector;
    affector.run();
    return output;
    function jsx() {
        mapped.$use();
        Derived.now(() => {
            const new_output = Array.from(mapped);
            parent = jsx_select_parent(output, parent);
            if (new_output.length == 0) new_output[0] = jsx_create_text_node("", affector);
            jsx_replace_output(parent, output, new_output);
            parent = jsx_last_output(new_output).parentNode;
            output.length = 0;
            output.push.apply(output, new_output);
        });
    }
}

/** @param {string} v @param {Effect} affector @returns {Text} */
function jsx_create_text_node(v, affector) {
    const text = document.createTextNode(v);
    /** @type {any} */ (text)[sym_jsx] = affector;
    return text;
}

/** @param {any} arg @returns {arg is {view(): unknown}} TODO! inline this */
function is_view(arg) {
    return typeof arg.view == "function";
}

/** returns the common parent of all nodes in output,
 *
 * if all nodes in output have null parent returns null
 * if all nodes in output have either one same parent or null parent returns that parent
 * if all nodes in output have two or more parents (ignoring nulls) returns prefered_parent
 * @param {Output} output @param {Node | null} prefered_parent @returns {Node | null} */
function jsx_select_parent(output, prefered_parent) {
    if (output instanceof Node) {
        return output.parentNode;
    }
    let first_occourence = null;
    const length = output.length;
    for (let i = 0; i < length; i++) {
        const suboutput = output[i];
        const selected_parent = jsx_select_parent(suboutput, prefered_parent);
        if (first_occourence === null) {
            first_occourence = selected_parent;
        } else if (selected_parent !== null && first_occourence !== selected_parent) {
            return prefered_parent;
        }
    }
    return first_occourence;
}

/** @param {Node | null} parent @param {Output} old_output @param {Output} new_output @returns {Output} */
function jsx_replace_output(parent, old_output, new_output) {
    while (Array.isArray(old_output) && old_output.length == 1) old_output = old_output[0];
    while (Array.isArray(new_output) && new_output.length == 1) new_output = new_output[0];
    // 0. special case, if it is just text changing, don't swap the nodes
    if (old_output instanceof Text && new_output instanceof Text) {
        old_output.nodeValue = new_output.nodeValue;
        return old_output;
    }
    /** @type {Node[]} */
    const new_arr = [];
    recursive_collect_output(new_output, new_arr);
    // 1. detach ourselves from old nodes that moved parents, and remove old nodes that are no longer part of the output
    let lastNode = recursive_remove_and_detach_old_output(old_output, new_arr, parent) || null;
    // if there is no parent, undo sym_jsx references from the old nodes, (that are not also new_nodes)
    // and remove the new output (from wherever they are because we are at null so they also need to be at null)
    if (!parent) {
        for (let i = 0; i < new_arr.length; i++) {
            const node = new_arr[i];
            if (node.parentNode) node.parentNode.removeChild(node);
        }
        return new_output;
    }
    // at this point, old_arr is a subset of new_arr, and parent is set
    for (let i = new_arr.length - 1; i >= 0; i--) {
        const node = new_arr[i];
        if (node.nextSibling !== lastNode || (!lastNode && node.parentNode != parent)) {
            parent.insertBefore(node, lastNode);
        }
        lastNode = node;
    }

    return new_output;

    /** @param {Output} output @param {Node[]} arr */
    function recursive_collect_output(output, arr) {
        if (!(output instanceof Node)) {
            for (let i = 0; i < output.length; i++) {
                recursive_collect_output(output[i], arr);
            }
        } else {
            arr.push(output);
        }
    }
    
    /** @param {Output} output @param {Node[]} new_arr @param {Node | null} parent @returns {Node | null | undefined} */
    function recursive_remove_and_detach_old_output(output, new_arr, parent) {
        let lastNode = undefined;
        if (!(output instanceof Node)) {
            delete output[sym_jsx];
            for (let i = 0; i < output.length; i++) {
                const newLastNode = recursive_remove_and_detach_old_output(output[i], new_arr, parent);
                if (newLastNode !== undefined) lastNode = newLastNode;
            }
        } else if (output.parentNode != parent) {
            delete output[sym_jsx];
        } else {
            lastNode = output.nextSibling;
            if (new_arr.indexOf(output) == -1) {
                parent && parent.removeChild(output);
                delete output[sym_jsx];
            }
        }
        return lastNode;
    }
}

//#endregion
