
type RefValidTargets = object | "" | keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap

type RefWithCurrent<T> = T & { current: T | null };

/** a special type of object which can be referenced first and initialized later, created by the function `ref`
 *
 * you can also use the name of the element to specify the type of the element you want to track
 *
 * for example `Ref<"div">` is the same as `Ref<HTMLDivElement>`
 */
export type Ref<T extends RefValidTargets = object> = RefWithCurrent<
    T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T] :
    T extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[T] :
    T extends ""
    ? DocumentFragment :
    T
>;

/** creates a ref, which is a special type of object which can be referenced first and initialized later
 *
 * you can initialize it by setting its current property
 *
 * when it is not initialized, most operations on it will throw a TypeError
 */
export function ref<T extends RefValidTargets = object>(init?: T | null | undefined): Ref<T>;
