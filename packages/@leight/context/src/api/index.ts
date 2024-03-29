import {
    type IStateCreatorProps,
    type IStoreApi,
    type IStoreProps,
    type StoreApi
} from "@leight/zustand";
import {
    type FC,
    type ReactNode
} from "react";

export type IProviderChildren<TContext> =
    ReactNode
    | FC<TContext>;

export type IStoreProviderProps<TStoreProps extends IStoreProps> =
    {
        children: IProviderChildren<IStoreApi<TStoreProps>>;
    }
    & IStateCreatorProps<TStoreProps>;

export type IStoreProvider<TStoreProps extends IStoreProps> = FC<IStoreProviderProps<TStoreProps>>;

/**
 * Use state of a store with an optional state selector
 */
export interface IUseState<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"]) => U): U;

    (): TStoreProps["StoreProps"];
}

export interface IUseOptionalState<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"] | null) => U): U;

    (): TStoreProps["StoreProps"] | null;
}

/**
 * Typed set of generated components used for working with Store; Provider, states and the others otherwise
 * boilerplate code.
 */
export interface IStoreContext<TStoreProps extends IStoreProps> {
    name: string;
    Provider: IStoreProvider<TStoreProps>;
    useState: IUseState<TStoreProps>;
    useOptionalState: IUseOptionalState<TStoreProps>;
    useStore: () => StoreApi<TStoreProps["StoreProps"]>;
    useOptionalStore: () => StoreApi<TStoreProps["StoreProps"]> | null;
}
