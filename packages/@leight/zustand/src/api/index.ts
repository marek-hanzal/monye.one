import {
    type CheckIfExtends,
    type IfExtends
}                     from "@leight/utils";
import {type Context} from "react";
import {
    type StateCreator,
    type StoreApi
}                     from "zustand";

/**
 * Basic constraint for actual store implementation (Zustand store).
 */
export type IStorePropsType = Record<string, any>;

/**
 * Actual store with separated mandatory fields defining store values (and actions) needed within creation and (required/optional) values provided
 * when store provider component is created.
 */
export interface IStoreProps<TStoreProps extends IStorePropsType = IStorePropsType, TStoreValueProps extends IStorePropsType | unknown = unknown> {
    Props: TStoreProps;
    OptionalProps: Partial<TStoreProps>;
    State: TStoreValueProps;
    StoreProps: IfExtends<TStoreProps, TStoreValueProps>;
}

export interface IStoreApi<TStoreProps extends IStoreProps> {
    state: TStoreProps["StoreProps"];
    store: StoreApi<TStoreProps["StoreProps"]>;
}

export type IStateCreatorProps<TStoreProps extends IStoreProps> =
    {
        defaults?: Partial<TStoreProps["OptionalProps"]>;
    }
    & CheckIfExtends<TStoreProps["State"], IStorePropsType, {
    state: TStoreProps["State"];
}, {
    state?: never;
}>;

export type ICreateStore<TStoreProps extends IStoreProps> = (props: IStateCreatorProps<TStoreProps>) => StoreApi<TStoreProps["StoreProps"]>;
export type IStateCreator<TStoreProps extends IStoreProps> = (props: IStateCreatorProps<TStoreProps>) => StateCreator<TStoreProps["StoreProps"]>;

export type IStoreContext<TStoreProps extends IStoreProps> = Context<IStoreApi<TStoreProps> | null>;
