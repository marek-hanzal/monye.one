import {type IStoreApi}     from "@leight/zustand";
import {
    createStore,
    type StateCreator,
    StoreApi
}                           from "zustand";
import {createContext}      from "./createContext";
import {
    createProvider,
    type IStoreProviderFactory
}                           from "./createProvider";
import {
    hookOptionalState,
    hookState,
    type IHookStateFactory,
}                           from "./hookState";
import {useContext}         from "./useContext";
import {useOptionalContext} from "./useOptionalContext";

export interface ICrateStoreContext<TProps> {
    Provider: IStoreProviderFactory<TProps>;
    useState: IHookStateFactory<TProps>;
    useOptionalState: IHookStateFactory<TProps | null>;
    useStore: () => StoreApi<TProps>;
    useOptionalStore: () => StoreApi<TProps> | null;
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
        Provider:         createProvider({
            Context,
            createStore: (defaults) => {
                const $store = createStore<TProps>(store);
                defaults && $store.setState(defaults);
                return $store;
            },
        }),
        useState:         hookState(Context, name, hint),
        useOptionalState: hookOptionalState(Context),
        useStore:         () => useContext(Context, name, hint).store,
        useOptionalStore: () => useOptionalContext(Context)?.store || null,
    };
};
