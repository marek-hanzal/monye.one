import {type IStoreProps} from "@leight/zustand";

/**
 * Use state of a store with an optional state selector
 */
export interface IUseState<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"]) => U): U;

    (): TStoreProps["StoreProps"];
}
