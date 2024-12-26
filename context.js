
export function Context(name, defaultValue) {
    if (!new.target) throw new TypeError("Context constructor requires 'new'");
    if (typeof name != "string") throw new TypeError("Context name must be a string");
    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "sym", { value: Symbol(name), enumerable: true });
    Object.defineProperty(this, "default", { value: defaultValue, enumerable: true });
}

const props = {
    of(node) {
        assertNode(node);
        while (true) {
            node = node.parentNode;
            if (!node) return this.default;
            if (this.sym in node) return node[this.sym];
        }
    },
    by(node) {
        assertNode(node);
        return this.sym in node ? node[this.sym] : this.default;
    },
    providedBy(node) {
        assertNode(node);
        return this.sym in node;
    },
    set(value, node) {
        const sym = this.sym;
        if (node === undefined) return function set(node) {
            assertNode(node);
            if (sym in node) return false;
            Object.defineProperty(node, sym, { value });
            return true;
        };
        assertNode(node);
        if (sym in node) return false;
        Object.defineProperty(node, sym, { value });
        return true;
    },
};

for (const key in props) Object.defineProperty(Context.prototype, key, { value: props[key], writable: true, configurable: true });

function assertNode(node) {
    if (!(node instanceof Node)) throw new TypeError("Parameter must be a node");
}
