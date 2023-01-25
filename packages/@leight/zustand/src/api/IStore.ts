import { StoreApi } from "zustand";
import { Context } from "react";

export interface IStore<TStore extends StoreApi<any>> {
    state: InferStore.State<TStore>;
    store: TStore;
}

export type IStoreApi<TProps> = IStore<StoreApi<TProps>>;

export type ICreateStore<TProps> = () => StoreApi<TProps>;

export type IStoreContext<TProps> = Context<IStoreApi<TProps> | null>;

export namespace InferStore {
    export type State<T> = T extends StoreApi<infer U> ? U : T;
}
