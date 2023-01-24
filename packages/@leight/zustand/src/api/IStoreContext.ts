import { StoreApi } from "zustand";

export interface IStoreContext<TStore extends StoreApi<any>> {
    state: InferStoreState<TStore>;
    store: TStore;
}

export type InferStoreState<T> = T extends StoreApi<infer U> ? U : T;
