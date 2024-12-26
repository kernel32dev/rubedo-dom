import type { Derived } from "rubedo";
import type { HTML, JSX } from "./html";

import elems from "./elements";
export { elems };

export * from "./context";
export * from "./ref";
export * from "./scope";

//#region Types

/** the inputs to a jsx element, not to be confused with the native type `Node`, consists of:
 *
 * 1. string, number and bigint (render text nodes)
 * 2. undefined, null and boolean (render nothing)
 * 3. Node (added to the tree)
 * 4. View (the view method is called)
 * 5. Iterable (iterated and each item is added)
 * 6. Derived (will be updated automatically, nested derives are not allowed)
 */
export type Nodes = SimpleNodes | Derived<SimpleNodes>;

/** the inputs to a jsx element, excluding `Derived`
 *
 * 1. string, number and bigint (render text nodes)
 * 2. undefined, null and boolean (render nothing)
 * 3. Node (added to the tree)
 * 4. View (the view method is called)
 * 5. Iterable (iterated and each item is added)
 */
export type SimpleNodes =
    | string | number | bigint | boolean
    | Node | View
    | Iterable<Nodes> | ArrayLike<Nodes> | Nodes[]
    | null | undefined;

/** the output of a jsx element
 *
 * can be called to cast things into nodes
 *
 * 1. string, number and bigint (text node)
 * 2. undefined, null and boolean (render nothing)
 * 3. Node (returned)
 * 4. View (the view method is called)
 * 5. Iterable (iterated and each item is added, a document fragment is returned)
 * 6. Derived (a document fragment is returned)
 *
 * if the input produces multiple nodes, returns them in a document fragment
 *
 * if the input produces no nodes, returns an empty text node
 */
export type Elems = Node;

/** the type of an element or component, by tag name or function signature */
export type ElemsOf<T> = T extends "" ? DocumentFragment : T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : T extends ((props: any) => infer U) | (() => infer U) ? U : never;

/** the view interface, objects that implement this interface can be used as inputs to jsx
 *
 * the view function creates and returns a new view of the object everytime its called,
 * this view consists simply of html elements,
 *
 * this is how all of rubedo-dom works, components (functions that return html elements) also work this way */
export interface View {
    view(): Elems;
}

/** all the properties of HTMLElement */
export type PropsElem = HTML.HTMLAttributes<HTMLElement>;

/** all the properties of SVGElement, not the `<svg>` element itself, but the base of all svg related elements */
export type PropsSVG = HTML.SVGProps<SVGElement>;

/** all the properties of an element or component, by tag name or function signature */
export type PropsOf<T extends "" | keyof JSX.IntrinsicElements | ((props: {}) => unknown) | (() => unknown)> =
    T extends "" ? { children: Nodes } :
    T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] :
    T extends (props: infer U) => unknown ? U :
    T extends () => unknown ? {} : never;

/** the types that can be used as a css class */
export type Classes = HTML.ClassList;

/** the properties that can be used as an inline style */
export type Style = HTML.CSSProperties;

/** an interface you can augment to add your own css properties */
export interface StyleAugmentations {}

/** a tag is either the name of a html element or a function that returns `Elems` */
export type Tag = TagNoProps | ((props: unknown) => Elems);

/** a tag is either the name of a html element or a function that returns `Elems`, this type alias is every tag that can be built without any props */
export type TagNoProps = "" | (keyof JSX.IntrinsicElements & (keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap)) | ((props: {}) => Elems) | (() => Elems);

//#endregion

export function Elems(...nodes: Nodes[]): Elems;

/** creates an element */
export const createElement: {
    <T extends TagNoProps>(tagname: T, props?: {} | null | undefined, ...children:
        PropsOf<T> extends { children?: infer U } ? U extends any[] ? U : [] : []
    ): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: PropsOf<T>): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: Omit<PropsOf<T>, "children">, ...children:
        PropsOf<T> extends { children?: infer U } ? U extends any[] ? U : [] : []
    ): ElemsOf<T>;
    bind<T extends Tag>(thisArg: any, tagname: T): T extends TagNoProps ? {
        (props?: {} | null | undefined, ...children:
            PropsOf<T> extends { children?: infer U } ? U extends any[] ? U : [] : []
        ): ElemsOf<T>;
        (props: PropsOf<T>): ElemsOf<T>;
        (props: Omit<PropsOf<T>, "children">, ...children:
            PropsOf<T> extends { children?: infer U } ? U extends any[] ? U : [] : []
        ): ElemsOf<T>;
    } : {
        (props: PropsOf<T>): ElemsOf<T>;
        (props: Omit<PropsOf<T>, "children">, ...children:
            PropsOf<T> extends { children?: infer U } ? U extends any[] ? U : [] : []
        ): ElemsOf<T>;
    };
};

/** the tag name that can be passed to `createElement` and `jsx` to create a document fragment, it is the empty string */
export const Fragment: "";

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
