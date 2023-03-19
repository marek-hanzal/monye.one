import {type IUseState}     from "@leight/context";
import {
    type IStoreApi,
    type IStoreProps
}                           from "@leight/zustand";
import {type Context}       from "react";
import {useStore}           from "zustand";
import {useContext}         from "./useContext";
import {useOptionalContext} from "./useOptionalContext";

export const createUseState = <TStoreProps extends IStoreProps>(
    Context: Context<IStoreApi<TStoreProps> | null>,
    name: string,
    hint?: string
): IUseState<TStoreProps> => {
    return (selector?: (state: TStoreProps) => any) => {
        const {store} = useContext(Context, name, hint);
        return selector ? useStore(store, selector) : useStore(store);
    };
};

export const createOptionalUseState = <TStoreProps extends IStoreProps>(
    Context: Context<IStoreApi<TStoreProps> | null>
): IUseState<TStoreProps | null> => {
    return (selector?: (state: TStoreProps | null) => any) => {
        const {store} = useOptionalContext(Context) || {};
        if (store) {
            return selector ? useStore(store, selector) : useStore(store);
        }
        return null;
    };
};
