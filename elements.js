import { Elem } from ".";

export default new Proxy({ __proto__: null }, {
    get(target, p) {
        return typeof p == "string" ? (target[p] || (target[p] = Elem.bind(null, p))) : undefined;
    }
});