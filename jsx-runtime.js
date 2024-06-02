//@ts-check
import { State, Derived, Mutation } from "levi-state";

/** @typedef {import(".").PropsElem | import(".").PropsSVG} Props */
/** @typedef {import(".").Nodes} Nodes */
/** @typedef {import(".").Elems} Elems */
/** @typedef {Nodes extends infer T | import("levi-state").Derived<infer U> ? U : never} DeriveableNodes */

/** @typedef {Node | OutputArray} Output */
/** @typedef {Output[]} OutputArray */

const svg_tag_names = function () {
    const l = "animate,animateMotion,animateTransform,circle,clipPath,defs,desc,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,switch,symbol,text,textPath,tspan,use,view".split(',')
    const o = { __proto__: null };
    for (let i = 0; i < l.length; i++) o[l[i]] = true;
    return o;
}();

const sym_jsx = Symbol("jsx");

export const Fragment = "";
// jsxs is called instead of jsx when props.children is an array
export const jsxs = jsx;

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
            if (ref instanceof State) {
                /** @type {any} */
                const state_value = ref.value;
                if (typeof state_value === "object" && state_value !== null && typeof state_value.current === "object") {
                    state_value.current = elem;
                    ref.trigger();
                } else {
                    ref.value = elem;
                }
            } else if (typeof ref.current === "object") {
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

/** @param {HTMLElement | SVGElement} elem @param {Props} props  */
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
                    value.value = this.value;
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            value.do((/** @type {any} */ x) => {
                x = "" + x;
                if (x !== elem.value) elem.value = x;
            });
        } else if (key === "checked" && value instanceof Derived && elem instanceof HTMLInputElement) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    if (this.type !== "checkbox" && this.type !== "radio") return;
                    value.value = !!this.checked;
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            value.do((/** @type {any} */ x) => {
                x = !!x;
                if (x !== elem.checked) elem.checked = x;
            });
        } else if (key === "value" && value instanceof Derived && elem instanceof HTMLSelectElement) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    // read from options, write to state
                    if (!this.multiple) {
                        // if this select is not
                        value.value = this.value;
                        return;
                    }
                    // get the stateful array from the state, if it is not an array, assign it one
                    if (!Array.isArray(value.value)) value.value = [];
                    // this the array that needs to have its items updated
                    /** @type {any} */
                    const output = value.value;

                    // this is the array of options from which we must read
                    // create a multi map to calculate the differences

                    //@ts-expect-error
                    const map = /** @type {Record<string, number>} */ ({ __proto__: null });

                    // subtract for each item in the original array
                    for (let i = 0; i < output.length; i++) {
                        const key = output[i];
                        if (typeof key !== "string" && typeof key !== "number") continue;
                        map[key] = (map[key] || 0) - 1;
                    }

                    // increment for each item in the selected options
                    const options = elem.options;
                    for (let i = 0; i < options.length; i++) {
                        const option = options[i];
                        if (!option.selected) continue;
                        const key = option.value;
                        map[key] = (map[key] || 0) + 1;
                    }

                    // remove the removed
                    for (const key in map) {
                        if (map[key] < 0) {
                            let index = 0;
                            while (true) {
                                index = output.indexOf(key, index);
                                if (index === -1) break;
                                output.splice(index, 1);
                            }
                        }
                    }

                    // add the added
                    for (const key in map) {
                        if (map[key] > 0) output.push(key);
                    }
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            value.do(x => {
                // read from state, write to options
                if (elem.multiple) {
                    const options = elem.options;
                    if (Array.isArray(x)) {
                        for (let i = 0; i < options.length; i++) {
                            const option = options[i];
                            option.selected = x.indexOf(option.value) != -1;
                        }
                    } else if (typeof x === "string" || typeof x === "number") {
                        x = "" + x;
                        for (let i = 0; i < options.length; i++) {
                            let option = options[i];
                            option.selected = x === option.value;
                        }
                    } else {
                        for (let i = 0; i < options.length; i++) {
                            options[i].selected = false;
                        }
                    }
                } else {
                    if (typeof x === "string" || typeof x === "number") {
                        elem.value = "" + x;
                    } else {
                        elem.value = "";
                    }
                }
            });
        } else if (key === "ref") {
            if (typeof value === "function") {
                value.call(elem, elem);
            } else if (typeof value === "object") {
                if (value instanceof State) {
                    /** @type {any} */
                    const state_value = value.value;
                    if (typeof state_value === "object" && state_value !== null && typeof state_value.current === "object") {
                        state_value.current = elem;
                        value.trigger();
                    } else {
                        value.value = elem;
                    }
                } else if (typeof value.current === "object") {
                    value.current = elem;
                } else {
                    throw new Error("jsx: ref passed was an object that is not a State nor a Ref");
                }
            } else {
                throw new Error("jsx: ref passed was a value of type " + typeof value);
            }
        } else if (key.startsWith("on")) {
            elem.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            const name = elem instanceof SVGElement ? key : key.toLowerCase();
            Derived.do(value, value => {
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
        jsx_apply_stateless_class(tokens, prop.value, bucket);
        prop.on(prop => {
            for (const key in bucket) {
                tokens.remove(key);
                bucket[key] = false;
            }
            jsx_apply_stateless_class(tokens, prop, bucket);
        });
    } else {
        for (const key in prop) {
            const item = prop[key];
            if (!item) continue;
            if (item instanceof Derived) {
                if (item.value) tokens.add(key);
                item.on(x => tokens.toggle(key, !!x));
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
 * @param {Symbol} [state_sym_context]
 */
function jsx_apply_children(elem, child, state_sym_context) {
    if (child === null || child === undefined || typeof child === "boolean") {
        // ignore boolean, undefined and null
        // this exists to allow things like `<div>{is_checked && <span>checked!</span>}</div>` to exist
    } else if (typeof child !== "object") {
        child = document.createTextNode("" + child);
        elem.appendChild(child);
    } else if (child instanceof Derived) {
        jsx_apply_stateful_children(elem, child);
    } else if ("view" in child) {
        child = child["view"]();
        elem.appendChild(child);
    } else if (child instanceof Node) {
        elem.appendChild(child);
    } else if (Symbol.iterator in child) {
        if (Array.isArray(child)) {
            for (let i = 0; i < child.length; i++) {
                jsx_apply_children(elem, child[i], state_sym_context);
            }
        } else {
            for (let i of child) {
                jsx_apply_children(elem, i, state_sym_context);
            }
        }
    } else {
        console.error("not a valid jsx node: ", child);
        throw new Error("not a valid jsx node: " + child);
    }
}

/** @param {Node} elem @param {Derived<DeriveableNodes>} state */
function jsx_apply_stateful_children(elem, state) {
    if (sym_jsx in state) {
        if (jsx_get_parent_recursive(/** @type {Output} */(state[sym_jsx])) !== elem) {
            jsx_append_child_recursive(elem, /** @type {Output} */(state[sym_jsx]));
        }
    } else {
        const output = jsx_apply_total_mutation(null, state.value);
        Object.defineProperty(state, sym_jsx, {
            configurable: true, enumerable: false, writable: true, value: output
        });
        jsx_append_child_recursive(elem, output);
        state.on(jsx_mutation_handler);
    }
}

/**
 * @this {Derived<DeriveableNodes>}
 * @param {DeriveableNodes} _
 * @param {Mutation.Of<DeriveableNodes>} mut
 */
function jsx_mutation_handler(_, mut) {
    this[sym_jsx] = jsx_apply_mutation(/** @type {Output} */(this[sym_jsx]), mut);
}

/**
 * @param {Output} output
 * @param {Mutation.Of<DeriveableNodes | DeriveableNodes[]>} mut
 * @returns {Output}
 */
function jsx_apply_mutation(output, mut) {
    if (Array.isArray(output) && Array.isArray(mut.target)) {
        if (mut instanceof Mutation.Splice) {
            if (mut.insert_length === 0) {
                const remove_length = mut.removed ? mut.removed.length : 0;
                if (mut.index === 0 && remove_length === output.length) {
                    return jsx_apply_clear(output);
                } else {
                    jsx_remove_recursive(output.splice(mut.index, remove_length));
                    return output;
                }
            }
            const remove_length = mut.removed ? mut.removed.length : 0;
            const inserted = /** @type {OutputArray} */ (jsx_apply_total_mutation(null, mut.target.slice(mut.index, mut.index + mut.insert_length)));
            if (!Array.isArray(inserted)) debugger;
            if (inserted.length !== mut.insert_length) debugger;
            if (remove_length) {
                const removed = output.splice(mut.index, remove_length, ...inserted);
                const last = jsx_get_last_of_output(removed);
                const parent = last.parentNode;
                if (parent) jsx_insert_before_recursive(inserted, parent, last.nextSibling);
                jsx_remove_recursive(removed);
            } else if (mut.index) {
                const last = jsx_get_last_of_output(output[mut.index - 1]);
                output.splice(mut.index, 0, ...inserted);
                const parent = last.parentNode;
                if (parent) jsx_insert_before_recursive(inserted, parent, last.nextSibling);
            } else {
                const last = jsx_get_last_of_output(output[0]);
                output.unshift(...inserted);
                const parent = last.parentNode;
                if (parent) jsx_insert_before_recursive(inserted, parent, last);
            }
            return output;
        }
        if (mut instanceof Mutation.NestedItem) {
            output[mut.index] = jsx_apply_mutation(output[mut.index], mut.mut);
            return output;
        }
        if (mut instanceof Mutation.Move) {
            if (output.length !== mut.target.length) debugger;
            const from = mut.from;
            const to = mut.to;
            const length = mut.length;
            const last = jsx_get_last_of_output(output[to && to - 1]);
            const parent = last.parentNode;
            const moved = output.slice(from, from + length);
            if (parent) jsx_insert_before_recursive(moved, parent, to ? last.nextSibling : last);
            output.move(from, to, length);
            return output;
        }
        if (mut instanceof Mutation.Purge) {
            if (output.length === mut.dropped_count) {
                return jsx_apply_clear(output);
            }
            const dropped = mut.dropped;
            if (output.length !== dropped.length) debugger;
            for (const key in dropped) {
                jsx_remove_recursive(output[key]);
            }
            output.purge(function (_value, index) { return index in dropped; });
            return output;
        }
        if (mut instanceof Mutation.Shuffle) {
            const last = jsx_get_last_of_output(output);
            const parent = last.parentNode;
            const lastSibling = last.nextSibling;
            const map = mut.map;
            const copy = Array.from(output);
            output.length = map.length;
            for (let i = 0; i < map.length; i++) {
                const source = map[i];
                const item = source !== -1 ? copy[source] : jsx_apply_total_mutation(null, mut.target[i]);
                if (parent) jsx_insert_before_recursive(item, parent, lastSibling);
                output[i] = item;
            }
            for (const i in mut.dropped) {
                jsx_remove_recursive(copy[i]);
            }
            return output;
        }
    }
    /** @type {Mutation<unknown>} */
    let i = mut;
    while (i instanceof Mutation.NestedProperty || i instanceof Mutation.NestedItem) i = i.mut;
    if (i instanceof Mutation.Nested) {
        // ignore changes inside derived or nested inside objects into a derived
        // this is what causes the jsx to ignore changes inside derived objects, unlike the rest of the state rules
        return output;
    }
    return jsx_apply_total_mutation(output, mut.target);
}

/** @param {Output} output @returns {Text} */
function jsx_apply_clear(output) {
    const last = jsx_get_last_of_output(output);
    const parent = last.parentNode;
    const new_output = document.createTextNode("");
    if (parent) parent.insertBefore(new_output, last.nextSibling);
    jsx_remove_recursive(output);
    return new_output;
}

/** @param {Output | null} output  @param {DeriveableNodes} child @returns {Output} */
function jsx_apply_total_mutation(output, child) {
    if (!child || typeof child !== "object") {
        const text = /** @type {string} */ (typeof child === "string" || typeof child === "number" ? "" + child : "");
        if (output instanceof Text) {
            output.nodeValue = text;
            return output;
        }
        child = document.createTextNode(text);
        if (output) {
            jsx_insert_node_after_last(child, output);
            jsx_remove_recursive(output);
        }
        return child;
    }
    if ("view" in child) child = child.view();
    if (child instanceof Node) {
        if (output === child) return output;
        if (child instanceof DocumentFragment) {
            child = Array.from(child.children);
        } else {
            if (output) {
                jsx_insert_node_after_last(child, output);
                jsx_remove_recursive(output);
            }
            return child;
        }
    }
    if (!(Symbol.iterator in child)) {
        console.error("not a valid stateless jsx node: ", child);
        throw new Error("not a valid stateless jsx node: " + child);
    }
    const new_output = [];
    const destination = output && jsx_get_last_of_output(output);
    const destination_parent = destination && destination.parentNode;
    const destination_child = destination && destination.nextSibling;
    if (output) jsx_remove_recursive(output);
    if (destination_parent) {
        for (const i of child) {
            const node = jsx_apply_total_mutation(null, i);
            jsx_insert_before_recursive(node, destination_parent, destination_child);
            new_output.push(node);
        }
        if (new_output.length) return new_output;
        child = document.createTextNode("");
        if (output) destination_parent.insertBefore(child, destination_child)
        return child;
    } else {
        for (const i of child) {
            new_output.push(jsx_apply_total_mutation(null, i));
        }
        if (new_output.length) return new_output;
        return document.createTextNode("");
    }
}

/** @param {Output} output */
function jsx_get_last_of_output(output) {
    while (Array.isArray(output)) output = output[output.length - 1];
    return output;
}
/** @param {Output} output @returns {ParentNode | null} */
function jsx_get_parent_recursive(output) {
    while (Array.isArray(output)) output = output[0];
    return output.parentNode;
}
/** @param {Node} elem @param {Output} output */
function jsx_append_child_recursive(elem, output) {
    if (!Array.isArray(output)) {
        elem.appendChild(output);
    } else {
        for (let i = 0; i < output.length; i++) {
            jsx_append_child_recursive(elem, output[i]);
        }
    }
}
/** @param {Node} elem @param {Output} output */
function jsx_insert_node_after_last(elem, output) {
    while (Array.isArray(output)) output = output[output.length - 1];
    const parent = output.parentNode;
    if (parent) parent.insertBefore(elem, output.nextSibling);
}

/** @param {Output} output */
function jsx_remove_recursive(output) {
    if (!Array.isArray(output)) {
        const parent = output.parentNode;
        if (parent) parent.removeChild(output);
    } else {
        for (let i = 0; i < output.length; i++) {
            jsx_remove_recursive(output[i]);
        }
    }
}
/** @param {Output} output @param {Node} beforeParent @param {Node | null} beforeChild */
function jsx_insert_before_recursive(output, beforeParent, beforeChild) {
    if (!Array.isArray(output)) {
        beforeParent.insertBefore(output, beforeChild);
    } else {
        for (let i = 0; i < output.length; i++) {
            jsx_insert_before_recursive(output[i], beforeParent, beforeChild);
        }
    }
}