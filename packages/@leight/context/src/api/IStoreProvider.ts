import {type IStoreProps}         from "@leight/zustand";
import {type FC}                  from "react";
import {type IStoreProviderProps} from "./IStoreProviderProps";

export type IStoreProviderComponent<TStoreProps extends IStoreProps> = FC<IStoreProviderProps<TStoreProps>>;
