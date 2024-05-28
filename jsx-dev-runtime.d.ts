export type { JSX } from "./html";
export function jsxDEV(
    tagname: string | Function,
    props: Record<string, unknown>,
    key?: undefined | string | number,
    source?: {
        fileName?: string,
        lineNumber?: number,
        columnNumber?: number
    },
    multipleChildren?: boolean,
    self?: object
): import("./html").JSX.Element;
export const Fragment: "";