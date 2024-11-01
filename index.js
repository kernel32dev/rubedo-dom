export * from "leviathan-state";
export * from "./ref";
export * from "./signal";
export * from "./scope";

export function css(code) {
    const style = document.createElement("style");
    style.innerHTML = typeof code == "string" ? code : String.raw(code);
    document.head.appendChild(style);
    return style;
}
