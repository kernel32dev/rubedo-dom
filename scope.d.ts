import type { Signal, SignalHandler } from "./signal";

/** a function that can hold multiple effects, mean to be passed to the `useMount` attribute
 *
 * an effect is a setup function that possibly returns a teardown function
 *
 * when called it runs all the setup functions passed to it and returns a teardown function that calls all teardown functions returned
 *
 * it also has helpers to define other common effects, such as `timeout`, `interval` and `affect`
 *
 * errors are intercepted and logged with `console.error`
 *
 * the effects has the right signature to be passed to the `useMount` attribute, making it simple to have multiple side effects that only run while the component is mounted
 */
export interface Scope {
    (): () => void;
    /** true if the effects was called and the teardown has not yet been called */
    readonly active: boolean;
    readonly effects: Set<() => (void | (() => void))>,
    /** adds the callback to be called when the effects is called, the most basic form of an effect
     *
     * another effects object can be added to this one using this method
     */
    use(callback: () => (void | (() => void))): this;
    /** adds a callback to be called when the timeout runs out, if teardown is called before the time runs out then the callback is never called */
    timeout(timeout: number, callback: () => void): this;
    /** calls callback approximately every timeout milliseconds, if teardown is called the cycle stops */
    interval(timeout: number, callback: () => void): this;
    /** calls callback when the effects object is called, and will rerun the dependencies until teardown is called */
    affect(callback: () => void): this;
    /** attaches the callback to the signal until teardown is called */
    signal<Args extends any[], This>(signal: Signal<Args, This>, handler: SignalHandler<Args, This>): this;
}

// TODO! add asyncInterval

export const Scope: {
    new (): Scope;
    (): Scope;
    prototype: Scope;
};
