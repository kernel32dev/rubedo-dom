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
export interface Effects {
    (): () => void;
    /** true if the effects was called and the teardown was not yet called */
    readonly active: boolean;
    readonly effects: Set<() => (void | (() => void))>,
    /** adds the callback to be called when the effects is called, the most basic form of an effect
     *
     * another effects object can be added to this one using this method
     */
    use(callback: () => (void | (() => void))): this;
    /** adds a callback to be called when the timeout runs out, if teardown is called before the time runs out then the callback is never called */
    timeout(timeout: number, callback: () => void): this;
    /** calls callback aproximately every timeout milliseconds, if teardown is called the cicle stops */
    interval(timeout: number, callback: () => void): this;
    /** calls callback when the effects object is called, and will rerun the dependencies until teardown is called */
    affect(callback: () => void): this;
}

// TODO! add asyncInterval

export const Effects: {
    new (): Effects;
    (): Effects;
    prototype: Effects;
};
