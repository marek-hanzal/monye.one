import { type StoreApi } from "zustand";
import { type IStoreContext } from "@leight/zustand";
import { Context, FC } from "react";
import { type IProviderChildren } from "../api";
import { withConsumer } from "./withConsumer";

export interface ICreateProviderProps<TStoreProps> {
    createStore: () => StoreApi<TStoreProps>;
    Context: Context<IStoreContext<StoreApi<TStoreProps>> | null>;
}

export const createProvider = <TStoreProps,>({
    createStore,
    Context,
}: ICreateProviderProps<TStoreProps>): FC<{
    children: IProviderChildren<IStoreContext<StoreApi<TStoreProps>>>;
}> => {
    return ({ children }) => {
        const store = createStore();
        return (
            <Context.Provider value={{ state: store.getState(), store }}>
                {withConsumer(children, Context)}
            </Context.Provider>
        );
    };
};
