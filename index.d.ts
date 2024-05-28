export * from "levi-state";
import type { OrDerived } from "levi-state";
import type { HTML, JSX } from "./html";

// support for custom elements will come later
//
// export class CustomHTMLElement extends HTMLElement {
//     constructor();
// }

/** the inputs to a jsx element
 * consists of:
 * 1. string and number (render text nodes)
 * 2. undefined, null and boolean (render nothing)
 * 3. Node (added to the tree)
 * 4. View (the view method is called)
 * 5. Iterable (iterated and added)
 * 6. Derived (will be updated automatically)
 */
export type Nodes = OrDerived<StatelessNodes>;
type StatelessNodes = Node | string | number | Iterable<StatelessNodes> | boolean | null | undefined | View;

/** the output of a jsx element */
export type Elems = HTMLElement | SVGElement | DocumentFragment;

/** the view interface, objects that implement this interface can be used as inputs to jsx
 *
 * the view function creates and returns a new view of the object everytime its called,
 * this view consists simply of html elements,
 *
 * this is how all of levi works, function components (functions that return html elements) also work this way */
export interface View {
    view(): Elems;
}

/** all the properties of HTMLElement */
export type PropsElem = HTML.HTMLAttributes<HTMLElement>;
/** all the properties of SVGElement, not the `<svg>` element itself, but the base of all svg related elements */
export type PropsSVG = HTML.SVGProps<SVGElement>;
/** all the properties of HTMLElement but with the specifed type in the place of this, useful for defining custom elements */
export type PropsAs<T> = HTML.HTMLAttributes<T>;
/** all the properties of an element, by tag name */
export type PropsOf<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];
/** all the properties of a class element */
export type PropsOfClass<T extends abstract new (props: any) => any> = T extends abstract new (props: infer P) => any ? P : never;

/** the types that can be used as a css class */
export type Classes = HTML.ClassList;
/** the properties that can be used as an inline style */
export type Style = HTML.CSSProperties;

// CSS //

/** write css in your javascript files
 *
 * example:
 * ```jsx
 * const RedHeader = () => (
 *     <h1 class="red">Some red text</h1>
 * );
 * 
 * css`
 * .red {
 *     text: red;
 * }
 * `
 * ```
 *
 * this allows you to write css code in your javascript files
 *
 * they are meant to be used on the root of your files,
 * do not use inside functions unless you have a good reason
 *
 * this works by creating a style tag on the head of your document with the contents passed in
 *
 * to make vscode properly understand it as css you can use
 * [Divlo's style syntax extension](https://marketplace.visualstudio.com/items?itemName=Divlo.vscode-styled-jsx-syntax) and
 * [Divlo's style language server](https://marketplace.visualstudio.com/items?itemName=Divlo.vscode-styled-jsx-languageserver),
 * use them at your own risk
 *
 * also note that those extensions highlight other things that this jsx implementation does not support, only this plain css function is supported
 */
export function css(code: string | { raw: readonly string[] | ArrayLike<string> }): HTMLStyleElement;

// REF //

/** a special type of object which can be referenced first and initialized later, created by function `ref` */
export type Ref<T> = T & { current: T | null };

/** creates a ref, whic is a special type of object which can be referenced first and initialized later
 *
 * you can initialize it by setting its current property
 *
 * when it is not initialized, most operations on it fail */
export function ref<T extends keyof HTMLElementTagNameMap>(): Ref<HTMLElementTagNameMap[T]>;
export function ref<T>(): Ref<T>;

// #region Globals

declare global {
    interface Element {
        /** method added by levi-dom
         *
         * finds the first ancestor of an element that passes a filter
         *
         * this element is included in the search */
        findParent(filter: (x: Element) => boolean): Element | null;
        /** method added by levi-dom
         *
         * traverses the tree forward and returns the first element that passes a filter
         *
         * this element is not included in the search
         *
         * if root is not undefined, the search will only occour inside the children of root, defaults to this element */
        findForward(filter: (x: Element) => boolean, root?: Element | null): Element | null;
        /** method added by levi-dom
         *
         * traverses the tree forward and focuses on the first element that can get focus
         *
         * this element is not included in the search
         *
         * if root is not undefined, the search will only occour inside the children of root, defaults to this element
         *
         * @param includeNonTabbable - when set to true elements that cannot be reached via the tab key will also be elligible to be focused, defaults to false */
        focusForward(includeNonTabbable?: boolean, root?: Element | null): HTMLElement | null;
    }
    // support for custom elements will come later
    //
    // interface CustomElementRegistry {
    //     /** method added by levi-dom
    //      *
    //      * registers custom element constructors as autonomous custom elements
    //      *
    //      * the name for the element is derived from key on the object, this way of registering allows minification of the name of the class without affecting the name that will be registered
    //      *
    //      * names are expected to be in `CamelCase` which will be converted to `kebab-case`
    //      *
    //      * if the resulting kebab case name has no hyphen, the prefix `"custom-"` will be added, this is done because it is required that custom elements have at least one hyphen in their name */
    //     register(classes: Record<string, CustomElementConstructor>): void;
    // }
}

// #endregion