import {
    type IStoreApi,
    type IStoreProps,
    type IUseState$
}                     from "@leight/viv";
import {type Context} from "react";
import {useStore}     from "zustand";
import {useContext$}  from "../context";

export const withUseState$ = <TStoreProps extends IStoreProps>(
    Context: Context<IStoreApi<TStoreProps> | null>
): IUseState$<TStoreProps> => {
    return <T>(selector?: (state: TStoreProps["StoreProps"] | null) => T | null) => {
        const {store} = useContext$(Context) || {};
        if (store) {
            return selector ? useStore(store, selector) : useStore(store);
        }
        return null;
    };
};
