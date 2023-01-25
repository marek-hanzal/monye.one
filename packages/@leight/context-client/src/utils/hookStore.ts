import { useContext } from "./useContext";
import { useStore } from "zustand";
import { type Context } from "react";
import { type IStoreApi } from "@leight/zustand";
import { useOptionalContext } from "./useOptionalContext";

export type IHookStoreFactory<TProps> = () => TProps;

export const hookStore = <TProps>(
    Context: Context<IStoreApi<TProps> | null>,
    name: string,
    hint?: string
): IHookStoreFactory<TProps> => {
    return () => {
        const { store } = useContext(Context, name, hint);
        return useStore(store);
    };
};

export const hookOptionalStore = <TProps>(
    Context: Context<IStoreApi<TProps> | null>
): IHookStoreFactory<TProps | null> => {
    return () => {
        const { store } = useOptionalContext(Context) || {};
        if (store) {
            return useStore(store);
        }
        return null;
    };
};
