export type { JSX } from "./html";
export function jsx(tagname: string | Function, props: Record<string, unknown>): import("./html").JSX.Element;
export function jsxs(tagname: string | Function, props: Record<string, unknown>): import("./html").JSX.Element;
export const Fragment: "";