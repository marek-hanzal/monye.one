import {
    type IStoreApi,
    type IStoreProps,
    type IUseState
}                     from "@leight/viv";
import {type Context} from "react";
import {useStore}     from "zustand";
import {useContext}   from "../context";

export const createUseState = <TStoreProps extends IStoreProps>(
    Context: Context<IStoreApi<TStoreProps> | null>,
    name: string,
    hint?: string
): IUseState<TStoreProps> => {
    return <T>(selector?: (state: TStoreProps["StoreProps"]) => T) => {
        const {store} = useContext(Context, name, hint);
        return selector ? useStore(store, selector) : useStore(store);
    };
};
