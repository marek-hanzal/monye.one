import {
    type ICreateStore,
    type IStoreApi,
    type IStoreContext,
}                               from "@leight/zustand";
import {
    type FC,
    useMemo
}                               from "react";
import {type IProviderChildren} from "../api";
import {withConsumer}           from "./withConsumer";

export interface IStoreProviderFactoryProps<TProps> {
    children: IProviderChildren<IStoreApi<TProps>>;
    defaults?: Partial<TProps>;
}

export type IStoreProviderFactory<TProps> = FC<IStoreProviderFactoryProps<TProps>>;

export interface ICreateProviderProps<TStoreProps> {
    createStore: ICreateStore<TStoreProps>;
    Context: IStoreContext<TStoreProps>;
}

export const createProvider = <TStoreProps, >(
    {
        createStore,
        Context,
    }: ICreateProviderProps<TStoreProps>): IStoreProviderFactory<TStoreProps> => {
    return function StoreProvider({children, defaults}) {
        const store = createStore(defaults);
        const memo  = useMemo(() => ({state: store.getState(), store}), []);
        return (
            <Context.Provider value={memo}>
                {withConsumer(children, Context)}
            </Context.Provider>
        );
    };
};
