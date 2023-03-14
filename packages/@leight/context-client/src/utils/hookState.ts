import {type IStoreApi}     from "@leight/zustand";
import {type Context}       from "react";
import {useStore}           from "zustand";
import {useContext}         from "./useContext";
import {useOptionalContext} from "./useOptionalContext";

export interface IHookStateFactory<TProps> {
    <U>(selector: (state: TProps) => U): U;

    (): TProps;
}

export const hookState = <TProps>(
    Context: Context<IStoreApi<TProps> | null>,
    name: string,
    hint?: string
): IHookStateFactory<TProps> => {
    return (selector?: (state: TProps) => any) => {
        const {store} = useContext(Context, name, hint);
        return selector ? useStore(store, selector) : useStore(store);
    };
};

export const hookOptionalState = <TProps>(
    Context: Context<IStoreApi<TProps> | null>
): IHookStateFactory<TProps | null> => {
    return (selector?: (state: TProps | null) => any) => {
        const {store} = useOptionalContext(Context) || {};
        if (store) {
            return selector ? useStore(store, selector) : useStore(store);
        }
        return null;
    };
};
