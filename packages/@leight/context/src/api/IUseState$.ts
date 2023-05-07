import {type IStoreProps} from "@leight/zustand";

export interface IUseState$<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"] | null) => U): U;

    (): TStoreProps["StoreProps"] | null;
}
