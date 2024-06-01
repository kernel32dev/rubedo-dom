export type { JSX } from "./html";
import type { Elems, Nodes } from ".";
export function jsx(tagname: string | ((props: any) => Elems), props?: Record<string, unknown> | null | undefined): Nodes;
export function jsxs(tagname: string | ((props: any) => Elems), props?: Record<string, unknown> | null | undefined): Nodes;
export const Fragment: "";