import { useContext } from "./useContext";
import { useStore } from "zustand";
import { type Context } from "react";
import { type IStoreApi } from "@leight/zustand";

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
