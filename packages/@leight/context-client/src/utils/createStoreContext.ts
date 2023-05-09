import {type IStoreContext} from "@leight/context";
import {type IStateCreator, type IStoreApi, type IStoreProps} from "@leight/zustand";
import {createStore} from "zustand";
import {createContext} from "./createContext";
import {withProvider} from "./withProvider";
import {withUseState, withUseState$} from "./withUseState";
import {useContext} from "./useContext";
import {useContext$} from "./useContext$";

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
        name,
        Provider: withProvider<TStoreProps>({
            name,
            Context,
            createStore: ({
                              defaults: $defaults,
                              state: $state
                          }) => createStore<TStoreProps["StoreProps"]>(($set, $get, $store) => ({
                ...state({defaults: $defaults, state: $state})($set, $get, $store),
                ...$defaults,
            })),
        }),
        use: withUseState(Context, name, hint),
        use$: withUseState$(Context),
        useStore: () => useContext(Context, name, hint).store,
        useStore$: () => useContext$(Context)?.store || null,
    };
};
