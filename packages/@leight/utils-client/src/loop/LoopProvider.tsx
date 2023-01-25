import { createLoopStore, type ILoopStoreProps } from "./createLoopStore";
import { LoopContext } from "./LoopContext";
import { createProvider } from "@leight/context-client";

export const LoopProvider = createProvider<ILoopStoreProps>({
    createStore: createLoopStore,
    Context: LoopContext,
});
