export type { JSX } from "./html";
import type { ElemsOf, PropsOf } from ".";

export const jsx: {
    <T extends TagNoProps>(tagname: T): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: PropsOf<T>): ElemOf<T>;
    <T extends Tag>(tagname: T, props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never): ElemOf<T>;
    bind<T extends Tag>(thisArg: any, tagname: T): T extends TagNoProps ? {
        (): ElemOf<T>;
        (props: PropsOf<T>): ElemOf<T>;
        (props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never): ElemOf<T>;
    } : {
        (props: PropsOf<T>): ElemOf<T>;
        (props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never): ElemOf<T>;
    };
};

export const jsxs: typeof jsx;
export const Fragment: "";