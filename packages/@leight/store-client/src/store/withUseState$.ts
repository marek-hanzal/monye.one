import {useContext$}  from "@leight/context-client";
import {
    type IStoreApi,
    type IStoreProps,
    type IUseState$
}                     from "@leight/store";
import {type Context} from "react";
import {useStore}     from "zustand";

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
