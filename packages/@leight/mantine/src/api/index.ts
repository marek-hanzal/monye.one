export type InferSelectors<T extends (...args: any) => {
    classes: Record<string, any>;
    cx: (...cx: any) => string;
}> = ReturnType<T>["classes"];
