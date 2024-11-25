import type { JSX } from "./html";

declare const elems: {
    [T in keyof JSX.IntrinsicElements & (keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap) as Capitalize<T>]: {
        (props?: JSX.IntrinsicElements[T] | null | undefined, ...children: JSX.IntrinsicElements[T] extends {children?: infer U} ? U extends any[] ? U : [] : []): T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : never;
    }
}

export = elems;