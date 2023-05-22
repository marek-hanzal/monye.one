import {type FC}                  from "react";
import {type IStoreProps}         from "./IStoreProps";
import {type IStoreProviderProps} from "./IStoreProviderProps";

export type IStoreProvider<TStoreProps extends IStoreProps> = FC<IStoreProviderProps<TStoreProps>>;
