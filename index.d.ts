export * from "leviathan-state";
export * from "./ref";
export * from "./scope";
import type { Derived } from "leviathan-state";
import type { HTML, JSX } from "./html";

/** the inputs to a jsx element, consists of:
 *
 * 1. string, number and bigint (render text nodes)
 * 2. undefined, null and boolean (render nothing)
 * 3. Node (added to the tree)
 * 4. View (the view method is called)
 * 5. Iterable (iterated and each item is added)
 * 6. Derived (will be updated automatically)
 */
export type Nodes = BasicNodes | Iterable<Nodes> | Derived<DeriveableNodes>;
type DeriveableNodes = BasicNodes | DeriveableNodes[];
type BasicNodes = Node | string | number | bigint | boolean | null | undefined | View;

/** the output of a jsx element */
export type Elems = HTMLElement | SVGElement | DocumentFragment;

/** the view interface, objects that implement this interface can be used as inputs to jsx
 *
 * the view function creates and returns a new view of the object everytime its called,
 * this view consists simply of html elements,
 *
 * this is how all of levi works, function components (functions that return html elements) also work this way */
export interface View {
    view(): Node;
}

/** all the properties of HTMLElement */
export type PropsElem = HTML.HTMLAttributes<HTMLElement>;
/** all the properties of SVGElement, not the `<svg>` element itself, but the base of all svg related elements */
export type PropsSVG = HTML.SVGProps<SVGElement>;
/** all the properties of an element, by tag name */
export type PropsOf<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];
// support for custom elements will come later
//
// /** all the properties of HTMLElement but with the specifed type in the place of this, useful for defining custom elements */
// export type PropsAs<T> = HTML.HTMLAttributes<T>;
//
// /** all the properties of a class element */
// export type PropsOfClass<T extends abstract new (props: any) => any> = T extends abstract new (props: infer P) => any ? P : never;

/** the types that can be used as a css class */
export type Classes = HTML.ClassList;
/** the properties that can be used as an inline style */
export type Style = HTML.CSSProperties;

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
