import { State, StatefulArray, ArrayMutation, Derived } from "levi-state";

const svg_tag_names = function () {
    const l = "animate,animateMotion,animateTransform,circle,clipPath,defs,desc,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,switch,symbol,text,textPath,tspan,use,view".split(',')
    const o = { __proto__: null };
    for (let i = 0; i < l.length; i++) o[l[i]] = true;
    return o;
}();

const sym_fences = Symbol("StatefulArray fence");

export const Fragment = "";
// jsxs is called instead of jsx when props.children is an array
export const jsxs = jsx;
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
    let elem;
    if (typeof tag === "function") {
        let ref = undefined;
        if ("ref" in props) {
            ref = props.ref;
            delete props.ref;
        }
        // if (tag.prototype instanceof CustomHTMLElement) {
        //     elem = new tag(props);
        // } else { ... }
        elem = tag(props);
        if (ref !== undefined) {
            if (typeof ref === "object") {
                if (ref instanceof State) {
                    const state_value = ref.value;
                    if (typeof state_value === "object" && state_value !== null && typeof state_value.current === "object") {
                        state_value.current = elem;
                        ref.trigger();
                    } else {
                        ref.value = elem;
                    }
                } else if (typeof ref.current === "object") {
                    ref.current = elem;
                } else {
                    throw new Error("jsx: ref passed was an object that is not a State nor a Ref");
                }
            } else if (typeof ref === "function") {
                ref.call(elem, elem);
            } else {
                throw new TypeError("jsx: unsupported ref attribute type: " + typeof ref);
            }
        }
    } else {
        if (tag === "") {
            elem = document.createDocumentFragment();
        } else {
            elem = !svg_tag_names[tag] ? document.createElement(tag) : document.createElementNS("http://www.w3.org/2000/svg", tag);
        }
        jsx_apply_props(elem, props);
    }
    return elem;
}

/** @param {HTMLElement | SVGElement} elem @param {PropsElem} props  */
function jsx_apply_props(elem, props) {
    if (props === null) return;
    for (const key in props) {
        if (key === "__source") {
            // let source = (props as any)["__source"] as { fileName: string, lineNumber: number, columnNumber: number };
            continue;
        } else if (key === "__self") {
            continue;
        } else if (key === "children") {
            if (Array.isArray(props.children)) {
                for (let child of props.children) {
                    jsx_apply_children(elem, child);
                }
            } else {
                jsx_apply_children(elem, props.children);
            }
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
            value.do(x => elem.value = String(x));
        } else if (key === "checked" && value instanceof Derived && elem instanceof HTMLInputElement) {
            if (value instanceof State) {
                elem.addEventListener("input", function () {
                    if (this.type !== "checkbox" && this.type !== "radio") return;
                    value.value = !!this.checked;
                });
            } else if (!("disabled" in props)) {
                elem.disabled = true;
            }
            value.do(x => elem.checked = !!x);
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
                    const output = value.value;

                    // this is the array of options from which we must read
                    // create a multi map to calculate the differences
                    /** @type {Record<string, number>} */
                    const map = { __proto__: null };

                    // subtract for each item in the original array
                    for (let i = 0; i < output.length; i++) {
                        const key = output[i];
                        if (typeof key !== "string" && typeof key !== "number") continue;
                        map[key] = (map[key] || 0) - 1;
                    }

                    // increment for each item in the selected options
                    const options = elem.options;
                    for (let i = 0; i < options.length; i++) {
                        if (!options.selected) continue;
                        const key = options.value;
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
                        x = String(x);
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
                        elem.value = String(x);
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
                    elem.setAttribute(name, String(value));
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
                            elem.style.setProperty(kebab, String(value[key]));
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
        const bucket = { __proto__: null };
        jsx_apply_stateless_class(tokens, prop, bucket);
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
            const item = prop[i];
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

function jsx_apply_node(elem, child) {
    elem.appendChild(child);
    return child;
}

function jsx_apply_children(elem, child) {
    if (child === null || typeof child === "undefined" || typeof child === "boolean") {
        // ignore boolean, undefined and null
        // this exists to allow things like `<div>{is_checked && <span>checked!</span>}</div>` to exist
    } else if (typeof child !== "object") {
        child = document.createTextNode(String(child));
        jsx_apply_node(elem, child);
    } else if (child instanceof Derived) {
        jsx_apply_stateful_children(elem, child);
    } else if ("view" in child) {
        child = child["view"]();
        jsx_apply_node(elem, child);
    } else if (child instanceof Node) {
        if (child.parentNode !== null && child.getRootNode() == document) {
            // if the child we are trying to apply already is in the document, take it an leave behind its clone
            // this is useful for closing popups or other "fading away", that can break if new ui need the elements they were using
            // without cloning, they would become empty as soon as their nodes are used somewhere else
            // TODO! if any custom elements are found in child, this will throw an exception
            const clone = child.cloneNode(true);
            child.parentNode.replaceChild(clone, child);
        }
        jsx_apply_node(elem, child);
    } else if (Symbol.iterator in child) {
        if (child instanceof StatefulArray) {
            // NOTE: this only adds the fences, it does not add handlers
            let fences;
            if (child.length == 0) {
                fences = [jsx_apply_node(elem, document.createComment(""))];
            } else {
                fences = Array(child.length + 1);
                fences[0] = document.createComment("");
                fences[fences.length - 1] = document.createComment("");
                jsx_apply_node(elem, fences[0]);
                for (let i = 0; i < child.length; i++) {
                    if (i != 0) {
                        fences[i] = jsx_apply_node(elem, document.createComment(""));
                    }
                    jsx_apply_children(elem, child[i]);
                }
                jsx_apply_node(elem, fences[fences.length - 1]);
            }
            if (child[sym_fences]) {
                child[sym_fences] = fences;
            } else {
                State.silentDefineProperty(child, sym_fences, { configurable: true, enumerable: false, writable: true, value: fences });
            }
        } else if (Array.isArray(child)) {
            for (let i = 0; i < child.length; i++) {
                jsx_apply_children(elem, child[i]);
            }
        } else {
            for (let i of child) {
                jsx_apply_children(elem, i);
            }
        }
    } else {
        console.error("not a valid jsx node: ", child);
        throw new Error("not a valid jsx node: " + String(child));
        // child = document.createTextNode(String(child));
        // jsx_apply_node(elem, child);
    }
}

/** @param {Derived<any>} state */
function jsx_apply_stateful_children(elem, state) {
    let frag = document.createDocumentFragment();
    let fence_left = document.createComment("");
    let fence_right = document.createComment("");
    frag.appendChild(fence_left);
    jsx_apply_children(frag, state.value);
    frag.appendChild(fence_right);
    state.on((child, mut) => {
        assert_fence_continuity(fence_left, fence_right);
        let parent = fence_left.parentNode;

        if (false && mut instanceof ArrayMutation && sym_fences in mut.target) {
            // TODO! EVERYTHING HERE HAS TO BE COMPLETELY REWRITTEEEEEEEN
            // this code is critical for a performant implementation of stateful jsx
            // with this branch invalidated, state changes will always redo all of their children
            /** @type {[Comment, ...Comment[]]} */
            let fences = mut.target[sym_fences];
            let update_len = Math.min(mut.remove.length, mut.insert.length);
            // UPDATE: overwrite slots that were updated
            for (let i = mut.index; i < mut.index + update_len; i++) {
                let update_fence_left = fences[i];
                let update_fence_right = fences[i + 1];
                assert_fence_continuity(update_fence_left, update_fence_right);
                // remove everything in this slot
                while (update_fence_left.nextSibling != update_fence_right) {
                    update_fence_left.nextSibling.remove();
                }
                // add new value to slot
                let frag = document.createDocumentFragment();
                jsx_apply_children(frag, mut.insert[i - mut.index]);
                update_fence_right.parentNode.insertBefore(frag, update_fence_right);
            }
            if (mut.remove.length > mut.insert.length) {
                // REMOVE: remove slots that were not updated
                let remove_fence_left = fences[mut.index + mut.insert.length];
                let remove_fence_right = fences[mut.index + mut.remove.length];
                assert_fence_continuity(remove_fence_left, remove_fence_right);
                // remove everything in this slot
                while (remove_fence_left.nextSibling != remove_fence_right) {
                    remove_fence_left.nextSibling.remove();
                }
                remove_fence_right.remove();
                // remove fences from fence array
                fences.splice(mut.index + mut.insert.length + 1, mut.remove.length - mut.insert.length);
            } else if (mut.remove.length < mut.insert.length) {
                // INSERT: add slots that were not updated
                // create the frag with the items and the array of newly created fences
                let frag = document.createDocumentFragment();
                let new_fences = [];
                for (let i = mut.remove.length; i < mut.insert.length; i++) {
                    jsx_apply_children(frag, mut.insert[i]);
                    new_fences.push(jsx_apply_node(frag, document.createComment("")));
                }
                // insert the frag into the dom
                let insert_fence_left = fences[mut.index + mut.remove.length];
                insert_fence_left.parentNode.insertBefore(frag, insert_fence_left.nextSibling)
                // insert fences into fence array
                fences.splice(mut.index + mut.remove.length + 1, 0, ...new_fences);
            }
            /*
            } else if (child instanceof StatefulArray && mut.path.length != 0 && typeof mut.path[0] === "number" && FENCES in child) {
                // the mutation happened in one slot of this element
                // i can forward the mutation to be only happen inside the mutated slot
                let fences = child[FENCES] as [Comment, ...Comment[]];
                let index = mut.path[0];
                let update_fence_left = fences[index];
                let update_fence_right = fences[index + 1];
                assert_fence_continuity(update_fence_left, update_fence_right);
                // remove everything in this slot
                while (update_fence_left.nextSibling != update_fence_right) {
                    update_fence_left.nextSibling!.remove();
                }
                let frag = document.createDocumentFragment();
                jsx_apply_children(frag, mut.insert[i - mut.index] as Nodes);
                update_fence_right.parentNode!.insertBefore(frag, update_fence_right);
                throw new Error("");
            */
        } else {
            // remove all elements are replace with a complete new render
            while (fence_left.nextSibling != fence_right) {
                fence_left.nextSibling.remove();
            }
            let frag = document.createDocumentFragment();
            jsx_apply_children(frag, child);
            parent.insertBefore(frag, fence_right);
        }
    });
    jsx_apply_node(elem, frag);
}

/**
 * @param {Node} left 
 * @param {Node} right 
 */
function assert_fence_continuity(left, right) {
    if (left.parentNode === null) throw new Error("Stateful jsx mutation handler assertion failed: begin fence was removed");
    if (right.parentNode === null) throw new Error("Stateful jsx mutation handler assertion failed: end fence was removed");
    if (left.parentNode != right.parentNode) throw new Error("Stateful jsx mutation handler assertion failed: fence comments not children of the same parent");
    for (let i = left; i != right; i = i.nextSibling) {
        if (!i.nextSibling) throw new Error("Stateful jsx mutation handler assertion failed: fence comments in incorrect order");
    }
}
