export type { JSX } from "./html";
import { ElemsOf, PropsOf } from ".";

export const jsxDEV: {
    <T extends TagNoProps>(tagname: T): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: PropsOf<T>): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never, staticChildren?: boolean, source?: { fileName: string, lineNumber: number, columnNumber: number }): ElemsOf<T>;
    <T extends Tag>(tagname: T, props: PropsOf<T>, key: undefined, staticChildren?: boolean, source?: { fileName: string, lineNumber: number, columnNumber: number }): ElemsOf<T>;
    bind<T extends Tag>(thisArg: any, tagname: T): T extends TagNoProps ? {
        (): ElemsOf<T>;
        (props: PropsOf<T>): ElemsOf<T>;
        (props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never, staticChildren?: boolean, source?: { fileName: string, lineNumber: number, columnNumber: number }): ElemsOf<T>;
        (props: PropsOf<T>, key: undefined, staticChildren?: boolean, source?: { fileName: string, lineNumber: number, columnNumber: number }): ElemsOf<T>;
    } : {
        (props: PropsOf<T>): ElemsOf<T>;
        (props: Omit<PropsOf<T>, "key">, key: PropsOf<T> extends { key: infer U } ? U : never, staticChildren?: boolean, source?: { fileName: string, lineNumber: number, columnNumber: number }): ElemsOf<T>;
        (props: PropsOf<T>, key: undefined, staticChildren?: boolean, source?: { fileName: string, lineNumber: number, columnNumber: number }): ElemsOf<T>;
    };
};

export const Fragment: "";
