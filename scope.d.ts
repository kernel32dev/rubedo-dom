import type { Signal, Effect } from "rubedo";

/** a function that can hold multiple effects, meant to be passed to the `scope` attribute
 *
 * an effect is a setup function that possibly returns a teardown function
 *
 * when called it runs all the setup functions passed to it and returns a teardown function that calls all teardown functions returned
 *
 * it also has helpers to define other common effects, such as `timeout`, `interval` and `affect`
 *
 * errors are intercepted and logged with `console.error`
 *
 * the effects has the right signature to be passed to the `scope` attribute, making it simple to have multiple side effects that only run while the component is mounted
 */
export interface Scope<in out T> {
    (target: T): () => void;
    /** true if the effects were called but the teardown has not yet been called */
    readonly active: boolean;
    /** the target that was used to call this scope, or undefined if it has never been called or if teardown has already been called */
    readonly target?: T;
    /** the set of effect functions that will be called when this scope is called, don't change this directly */
    readonly effects: Set<(target: T) => (void | (() => void))>,
    /** adds the callback to be called when the effects is called, the most basic form of an effect
     *
     * another effects object can be added to this one using this method
     */
    use(callback: (target: T) => (void | (() => void))): this;
    /** adds a callback to be called when the timeout runs out, if teardown is called before the time runs out then the callback is never called */
    timeout(timeout: number, callback: (target: T) => void): this;
    /** calls callback approximately every timeout milliseconds, if teardown is called the cycle stops */
    interval(timeout: number, callback: (target: T) => void): this;
    /** calls callback when the effects object is called, and will rerun the dependencies until teardown is called */
    affect(callback: (effect: Effect) => void): this;
    /** attaches the callback to the signal until teardown is called */
    signal<T extends (...args: any[]) => void>(signal: Signal<T>, handler: Signal.Handler<T>): this;
}

// TODO! add asyncInterval

export const Scope: {
    new <T>(): Scope<T>;
    prototype: Scope<any>;
};
