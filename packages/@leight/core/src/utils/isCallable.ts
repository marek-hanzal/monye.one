import { default as isCoolCallable } from "is-callable";

export const isCallable = <T extends (...arg: any[]) => unknown>(
    val: unknown
): val is T => isCoolCallable(val);
