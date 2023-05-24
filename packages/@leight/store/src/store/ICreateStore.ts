import {type StoreApi}           from "zustand";
import {type IStateCreatorProps} from "./IStateCreatorProps";
import {type IStoreProps}        from "./IStoreProps";

export type ICreateStore<TStoreProps extends IStoreProps> = (props: IStateCreatorProps<TStoreProps>) => StoreApi<TStoreProps["StoreProps"]>;
