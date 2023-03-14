import {type Context}  from "react";
import {type StoreApi} from "zustand";

export interface IStore<TStore extends StoreApi<unknown>> {
    state: InferStore.State<TStore>;
    store: TStore;
}

export type IStoreApi<TStoreProps> = IStore<StoreApi<TStoreProps>>;

export type ICreateStore<TStoreProps> = (defaults?: Partial<TStoreProps>) => StoreApi<TStoreProps>;

export type IStoreContext<TStoreProps> = Context<IStoreApi<TStoreProps> | null>;

export namespace InferStore {
    export type State<T> = T extends StoreApi<infer U> ? U : T;
}

export type IStoreProps = Record<string, any>;
