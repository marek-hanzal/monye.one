import {
    type ICreateStore,
    type IStoreApi,
    type IStoreContext,
    type IStoreProps,
}                               from "@leight/zustand";
import {
    type FC,
    useMemo
}                               from "react";
import {type IProviderChildren} from "../api";
import {withConsumer}           from "./withConsumer";

export interface IStoreProviderProps<TStoreProps extends IStoreProps> {
    children: IProviderChildren<IStoreApi<TStoreProps>>;
    defaults?: Partial<TStoreProps>;
}

export type IStoreProvider<TStoreProps extends IStoreProps> = FC<IStoreProviderProps<TStoreProps>>;

export interface ICreateProviderProps<TStoreProps> {
    createStore: ICreateStore<TStoreProps>;
    Context: IStoreContext<TStoreProps>;
}

export const createProvider = <TStoreProps extends IStoreProps>(
    {
        createStore,
        Context,
    }: ICreateProviderProps<TStoreProps>): IStoreProvider<TStoreProps> => {
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
