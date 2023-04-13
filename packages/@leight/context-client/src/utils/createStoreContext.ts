import {
    type IStoreProvider,
    type IUseOptionalState,
    type IUseState
}                           from "@leight/context";
import {
    type IStateCreator,
    type IStoreApi,
    type IStoreProps
}                           from "@leight/zustand";
import {
    createStore,
    type StoreApi
}                           from "zustand";
import {createContext}      from "./createContext";
import {createProvider}     from "./createProvider";
import {
    createOptionalUseState,
    createUseState
}                           from "./createUseState";
import {useContext}         from "./useContext";
import {useOptionalContext} from "./useOptionalContext";

/**
 * Typed set of generated components used for working with Store; Provider, states and the others otherwise
 * boilerplate code.
 */
export interface ICrateStoreContext<TStoreProps extends IStoreProps> {
    readonly Provider: IStoreProvider<TStoreProps>;
    readonly useState: IUseState<TStoreProps>;
    readonly useOptionalState: IUseOptionalState<TStoreProps>;
    readonly useStore: () => StoreApi<TStoreProps["StoreProps"]>;
    readonly useOptionalStore: () => StoreApi<TStoreProps["StoreProps"]> | null;
}

export interface ICreateStoreContextProps<TStoreProps extends IStoreProps> {
    readonly state: IStateCreator<TStoreProps>,
    readonly name: string,
    readonly hint?: string
}

/**
 * Creates store hook and provider of Zustand.
 */
export const createStoreContext = <TStoreProps extends IStoreProps>(
    {
        state,
        name,
        hint,
    }: ICreateStoreContextProps<TStoreProps>): ICrateStoreContext<TStoreProps> => {
    const Context = createContext<IStoreApi<TStoreProps>>();
    return {
        Provider: createProvider<TStoreProps>({
            Context,
            createStore: ({defaults: $defaults, state: $state}) => createStore<TStoreProps["StoreProps"]>(($set, $get, $store) => ({
                ...state({defaults: $defaults, state: $state})($set, $get, $store),
                ...$defaults,
            })),
        }),
        useState:         createUseState(Context, name, hint),
        useOptionalState: createOptionalUseState(Context),
        useStore:         () => useContext(Context, name, hint).store,
        useOptionalStore: () => useOptionalContext(Context)?.store || null,
    };
};
