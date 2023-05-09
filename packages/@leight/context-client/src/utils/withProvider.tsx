import {type IStoreProviderComponent} from "@leight/context";
import {isCallable} from "@leight/utils";
import {type ICreateStore, type IStoreContext, type IStoreProps} from "@leight/zustand";
import {useMemo} from "react";

export interface ICreateProviderProps<TStoreProps extends IStoreProps> {
    name: string;
    createStore: ICreateStore<TStoreProps>;
    Context: IStoreContext<TStoreProps>;
}

export const withProvider = <TStoreProps extends IStoreProps>(
    {
        name,
        createStore,
        Context,
    }: ICreateProviderProps<TStoreProps>): IStoreProviderComponent<TStoreProps> => {
    return function StoreProvider(
        {
            children,
            defaults,
            state,
        }) {
        const Children = children;
        const memo = useMemo(() => {
            const store = createStore({defaults, state});
            return {name, state: store.getState(), store};
        }, []);
        return (
            <Context.Provider value={memo}>
                {isCallable(Children) ? <Children {...memo}/> : Children}
            </Context.Provider>
        );
    };
};
