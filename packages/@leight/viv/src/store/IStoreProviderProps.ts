import {type PropsWithChildren}  from "react";
import {type IStateCreatorProps} from "./IStateCreatorProps";
import {type IStoreProps}        from "./IStoreProps";

export type IStoreProviderProps<TStoreProps extends IStoreProps> = PropsWithChildren<IStateCreatorProps<TStoreProps>>;
