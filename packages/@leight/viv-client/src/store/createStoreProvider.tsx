import {
    type ICreateStore,
    type IStoreContext,
    type IStoreProps,
    type IStoreProvider,
    Pack
} from "@leight/viv";
import {
    useEffect,
    useMemo
} from "react";

export interface ICreateStoreProviderProps<TStoreProps extends IStoreProps> {
    name: string;
    createStore: ICreateStore<TStoreProps>;
    Context: IStoreContext<TStoreProps>;
}

export const createStoreProvider = <TStoreProps extends IStoreProps>(
    {
        name,
        createStore,
        Context,
    }: ICreateStoreProviderProps<TStoreProps>): IStoreProvider<TStoreProps> => {
    return function StoreProvider(
        {
            children,
            defaults,
            state,
        }) {
        const memo = useMemo(() => {
            const store = createStore({
                defaults,
                state
            });
            return {
                name,
                state: store.getState(),
                store
            };
        }, []);
        useEffect(() => {
            defaults && memo.store.setState(defaults);
        }, [Pack.pack(defaults)]);
        return <Context.Provider value={memo}>
            {children}
        </Context.Provider>;
    };
};
