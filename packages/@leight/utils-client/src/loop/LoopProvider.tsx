import {
    createContext,
    createProvider,
    useContext,
} from "@leight/context-client";
import { type IStoreApi } from "@leight/zustand";
import { useStore } from "zustand";
import { createLoopStore, type ILoopStoreProps } from "./useLoopStore";

export const LoopContext = createContext<IStoreApi<ILoopStoreProps>>();

export const LoopProvider = createProvider({
    createStore: createLoopStore,
    Context: LoopContext,
});

export const useLoopStore = (): ILoopStoreProps => {
    const { store } = useContext(
        LoopContext,
        "LoopContext",
        "Add LoopProvider."
    );
    return useStore(store);
};
