import {type StoreApi}    from "zustand";
import {type IStoreProps} from "./IStoreProps";

export interface IStoreApi<TStoreProps extends IStoreProps> {
    name: string;
    state: TStoreProps["StoreProps"];
    store: StoreApi<TStoreProps["StoreProps"]>;
}
