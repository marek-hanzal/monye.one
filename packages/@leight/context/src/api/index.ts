import {
    type IStoreApi,
    type IStoreProps
} from "@leight/zustand";
import {
    FC,
    type ReactNode
} from "react";

export type IContextRender<TContext> = (context: TContext) => ReactNode;

export type IProviderChildren<TContext> =
    ReactNode
    | IContextRender<TContext>;

export interface IStoreProviderProps<TStoreProps extends IStoreProps> {
    children: IProviderChildren<IStoreApi<TStoreProps>>;
    defaults?: Partial<TStoreProps>;
}

export type IStoreProvider<TStoreProps extends IStoreProps> = FC<IStoreProviderProps<TStoreProps>>;

export interface IUseState<TStoreProps extends IStoreProps | null> {
    <U>(selector: (state: TStoreProps) => U): U;

    (): TStoreProps;
}
