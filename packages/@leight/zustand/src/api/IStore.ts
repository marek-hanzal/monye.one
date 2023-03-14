import {type Context}  from "react";
import {type StoreApi} from "zustand";

export interface IStore<TStore extends StoreApi<unknown>> {
    state: InferStore.State<TStore>;
    store: TStore;
}

export type IStoreApi<TProps> = IStore<StoreApi<TProps>>;

export type ICreateStore<TProps> = (defaults?: Partial<TProps>) => StoreApi<TProps>;

export type IStoreContext<TProps> = Context<IStoreApi<TProps> | null>;

export namespace InferStore {
    export type State<T> = T extends StoreApi<infer U> ? U : T;
}
