import {type StateCreator}       from "zustand";
import {type IStateCreatorProps} from "./IStateCreatorProps";
import {type IStoreProps}        from "./IStoreProps";

export type IStateCreator<TStoreProps extends IStoreProps> = (props: IStateCreatorProps<TStoreProps>) => StateCreator<TStoreProps["StoreProps"]>;
