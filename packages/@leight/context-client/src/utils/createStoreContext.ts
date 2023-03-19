import {
    type IStoreProvider,
    type IUseState
}                           from "@leight/context";
import {
    type IStoreApi,
    type IStoreProps
}                           from "@leight/zustand";
import {
    createStore,
    type StateCreator,
    StoreApi
}                           from "zustand";
import {createContext}      from "./createContext";
import {createProvider}     from "./createProvider";
import {
    createOptionalUseState,
    createUseState
}                           from "./createUseState";
import {useContext}         from "./useContext";
import {useOptionalContext} from "./useOptionalContext";

export interface ICrateStoreContext<TStoreProps extends IStoreProps> {
    Provider: IStoreProvider<TStoreProps>;
    useState: IUseState<TStoreProps>;
    useOptionalState: IUseState<TStoreProps | null>;
    useStore: () => StoreApi<TStoreProps>;
    useOptionalStore: () => StoreApi<TStoreProps> | null;
}

/**
 * Creates store hook and provider of Zustand.
 */
export const createStoreContext = <TStoreProps extends IStoreProps>(
    store: StateCreator<TStoreProps>,
    name: string,
    hint?: string
): ICrateStoreContext<TStoreProps> => {
    const Context = createContext<IStoreApi<TStoreProps>>();
    return {
        Provider:         createProvider({
            Context,
            createStore: (defaults) => {
                const $store = createStore<TStoreProps>(store);
                defaults && $store.setState(defaults);
                return $store;
            },
        }),
        useState:         createUseState(Context, name, hint),
        useOptionalState: createOptionalUseState(Context),
        useStore:         () => useContext(Context, name, hint).store,
        useOptionalStore: () => useOptionalContext(Context)?.store || null,
    };
};
