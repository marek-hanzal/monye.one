import { StoreApi } from "zustand";

export interface IStoreContext<TStore extends StoreApi<any>> {
    state: InferStore.State<TStore>;
    store: TStore;
}

export namespace InferStore {
    export type State<T> = T extends StoreApi<infer U> ? U : T;
}
