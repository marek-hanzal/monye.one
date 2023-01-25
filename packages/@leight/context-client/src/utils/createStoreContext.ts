import { createStore, type StateCreator } from "zustand";
import { createContext } from "./createContext";
import { type IStoreApi } from "@leight/zustand";
import { createProvider, type IStoreProviderFactory } from "./createProvider";
import {
    hookOptionalStore,
    hookStore,
    type IHookStoreFactory,
} from "./hookStore";

export interface ICrateStoreContext<TProps> {
    Provider: IStoreProviderFactory<TProps>;
    useStore: IHookStoreFactory<TProps>;
    useOptionalStore: IHookStoreFactory<TProps | null>;
}

/**
 * Creates store hook and provider of Zustand.
 */
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
        useOptionalStore: hookOptionalStore(Context),
    };
};
