export type { JSX } from "./html";
import type { ElemsOf, PropsOf, Tag, TagNoProps } from ".";

export const jsx: {
    <T extends TagNoProps>(tagname: T): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: PropsOf<T>): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never): ElemsOf<T>;
    bind<T extends Tag>(thisArg: any, tagname: T): T extends TagNoProps ? {
        (): ElemsOf<T>;
        (props: PropsOf<T>): ElemsOf<T>;
        (props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never): ElemsOf<T>;
    } : {
        (props: PropsOf<T>): ElemsOf<T>;
        (props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never): ElemsOf<T>;
    };
};

export const jsxs: typeof jsx;
export const Fragment: "";