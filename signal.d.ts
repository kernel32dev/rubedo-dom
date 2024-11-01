type SignalHandler<Args extends any[], This> = (this: This, ...args: Args) => void;

/** a function that can be declared first, and defined later
 *
 * it can contain multiple handlers to be called when the signal is invoked
 */
export interface Signal<Args extends any[], This> extends SignalHandler<Args, This> {
    /** adds a handler that will only stop being called when it is removed with the off method */
    on(handler: SignalHandler<Args, This>): this;
    /** adds a handler that will stop when garbage collected
     *
     * but that will not be garbage collected while the objects passed are alive (the affected)
     */
    weak(args: [...WeakKey[], SignalHandler<Args, This>]): this;
    /** stops a handler from being called, works on handler added with both the `on` and `weak` methods */
    off(handler: SignalHandler<Args, This>): this;
}

export const Signal: {
    new <Args extends any[], This>(): Signal<Args, This>;
    prototype: Signal<any[], void, any>;
};
