import { Elems } from ".";

export default new Proxy({ __proto__: null }, {
    get(target, p) {
        return typeof p == "string" ? (target[p] || (target[p] = Elems.bind(null, p))) : undefined;
    }
});