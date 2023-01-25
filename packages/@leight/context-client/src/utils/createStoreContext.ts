import { createStore, type StateCreator } from "zustand";
import { createContext } from "./createContext";
import { type IStoreApi } from "@leight/zustand";
import { createProvider, type IStoreProviderFactory } from "./createProvider";
import { hookStore, type IHookStoreFactory } from "./hookStore";

export interface ICrateStoreContext<TProps> {
    Provider: IStoreProviderFactory<TProps>;
    useStore: IHookStoreFactory<TProps>;
}

export const createStoreContext = <TProps>(
    store: StateCreator<TProps>,
    name: string,
    hint?: string
): ICrateStoreContext<TProps> => {
    const Context = createContext<IStoreApi<TProps>>();
    return {
        Provider: createProvider({
            createStore: () => {
                return createStore<TProps>(store);
            },
            Context,
        }),
        useStore: hookStore(Context, name, hint),
    };
};
