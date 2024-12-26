export interface Context<in out T> {
    readonly name: string;
    readonly sym: symbol;
    readonly default: T;

    /** returns the value of the context available to this node
     *
     * it searches all the parents of this node and returns the first that provides this context
     *
     * if no parents provide this context, the default is returned
     */
    of(node: Node): T;
    /** returns the value provided by the node, or the default value */
    by(node: Node): T;
    /** returns true if the node passed provides this context */
    providedBy(node: Node): boolean;
    /** turns a node into a provider, returns false if it already was a provider, can be curried */
    set(value: T, node: Node): boolean;
    set(value: T): (node: Node) => boolean;
}

export const Context: {
    new<T>(name: string, defaultValue: T): Context<T>;
    new<T>(name: string): Context<T | undefined>;
    prototype: Context<any>;
};
