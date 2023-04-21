import {type IStoreContext} from "@leight/context";
import {
    type IStateCreator,
    type IStoreApi,
    type IStoreProps
}                           from "@leight/zustand";
import {createStore}        from "zustand";
import {createContext}      from "./createContext";
import {createProvider}     from "./createProvider";
import {
    createOptionalUseState,
    createUseState
}                           from "./createUseState";
import {useContext}         from "./useContext";
import {useOptionalContext} from "./useOptionalContext";

export interface ICreateStoreContextProps<TStoreProps extends IStoreProps> {
    state: IStateCreator<TStoreProps>,
    name: string,
    hint?: string
}

/**
 * Creates store hook and provider of Zustand.
 */
export const createStoreContext = <TStoreProps extends IStoreProps>(
    {
        state,
        name,
        hint,
    }: ICreateStoreContextProps<TStoreProps>): IStoreContext<TStoreProps> => {
    const Context = createContext<IStoreApi<TStoreProps>>();
    return {
        Provider:         createProvider<TStoreProps>({
            name,
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
