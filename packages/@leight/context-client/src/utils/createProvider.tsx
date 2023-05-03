import {type IStoreProvider} from "@leight/context";
import {
    isCallable,
    Pack
}                            from "@leight/utils";
import {
    type ICreateStore,
    type IStoreContext,
    type IStoreProps,
}                            from "@leight/zustand";
import {
    useEffect,
    useMemo
}                            from "react";

export interface ICreateProviderProps<TStoreProps extends IStoreProps> {
    name: string;
    createStore: ICreateStore<TStoreProps>;
    Context: IStoreContext<TStoreProps>;
}

export const createProvider = <TStoreProps extends IStoreProps>(
    {
        name,
        createStore,
        Context,
    }: ICreateProviderProps<TStoreProps>): IStoreProvider<TStoreProps> => {
    return function StoreProvider(
        {
            children,
            defaults,
            state,
        }) {
        const Children = children;
        const memo     = useMemo(() => {
            const store = createStore({defaults, state});
            return {name, state: store.getState(), store};
        }, []);
        useEffect(() => {
            defaults && memo.store.setState(defaults);
        }, [Pack.pack(defaults)]);
        return (
            <Context.Provider value={memo}>
                {isCallable(Children) ? <Children {...memo}/> : Children}
            </Context.Provider>
        );
    };
};
