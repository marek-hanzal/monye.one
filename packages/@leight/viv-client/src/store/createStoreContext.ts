import {
    type ICreateStoreContextProps,
    type IStoreApi,
    type IStoreContext,
    type IStoreProps
}                            from "@leight/viv";
import {createStore}         from "zustand";
import {
    createContext,
    useContext,
    useContext$
}                            from "../context";
import {createStoreProvider} from "./createStoreProvider";
import {createUseState}      from "./createUseState";
import {createUseState$}     from "./createUseState$";

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
        name,
        Provider:  createStoreProvider<TStoreProps>({
            name,
            Context,
            createStore: ({
                              defaults: $defaults,
                              state:    $state
                          }) => createStore<TStoreProps["StoreProps"]>(($set, $get, $store) => ({
                ...state({
                    defaults: $defaults,
                    state:    $state
                })($set, $get, $store),
                ...$defaults,
            })),
        }),
        useState:  createUseState(Context, name, hint),
        useState$: createUseState$(Context),
        useStore:  () => useContext(Context, name, hint).store,
        useStore$: () => useContext$(Context)?.store || null,
    };
};
