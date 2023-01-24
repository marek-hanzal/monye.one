import { LoopContext } from "./LoopContext";
import { useStore } from "zustand";
import { useContext } from "../hook";
import { type ILoopStoreProps } from "./createLoopStore";

export const useLoopStore = (): ILoopStoreProps => {
    const { store } = useContext(
        LoopContext,
        "LoopContext",
        "Add LoopProvider."
    );
    return useStore(store);
};
