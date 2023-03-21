import {
    type IStateCreatorProps,
    type IStoreApi,
    type IStoreProps
} from "@leight/zustand";
import {
    type FC,
    type ReactNode
} from "react";

export type IContextRender<TContext> = (context: TContext) => ReactNode;

export type IProviderChildren<TContext> =
    ReactNode
    | IContextRender<TContext>;

export type IStoreProviderProps<TStoreProps extends IStoreProps> =
    {
        children: IProviderChildren<IStoreApi<TStoreProps>>;
    }
    & IStateCreatorProps<TStoreProps>;

export type IStoreProvider<TStoreProps extends IStoreProps> = FC<IStoreProviderProps<TStoreProps>>;

export interface IUseState<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"]) => U): U;

    (): TStoreProps["StoreProps"];
}

export interface IUseOptionalState<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"] | null) => U): U;

    (): TStoreProps["StoreProps"] | null;
}
