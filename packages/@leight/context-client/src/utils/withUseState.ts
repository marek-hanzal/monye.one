import {type IUseState, IUseState$} from "@leight/context";
import {type IStoreApi, type IStoreProps} from "@leight/zustand";
import {type Context} from "react";
import {useStore} from "zustand";
import {useContext} from "./useContext";
import {useContext$} from "./useContext$";

export const withUseState = <TStoreProps extends IStoreProps>(
    Context: Context<IStoreApi<TStoreProps> | null>,
    name: string,
    hint?: string
): IUseState<TStoreProps> => {
    return <T>(selector?: (state: TStoreProps["StoreProps"]) => T) => {
        const {store} = useContext(Context, name, hint);
        return selector ? useStore(store, selector) : useStore(store);
    };
};

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
