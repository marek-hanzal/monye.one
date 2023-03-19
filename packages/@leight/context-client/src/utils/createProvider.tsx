import {type IStoreProvider} from "@leight/context";
import {
    type ICreateStore,
    type IStoreContext,
    type IStoreProps,
}                            from "@leight/zustand";
import {useMemo}             from "react";
import {withConsumer}        from "./withConsumer";

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
