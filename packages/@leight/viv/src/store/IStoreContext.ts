import {type Context}     from "react";
import {type IStoreApi}   from "./IStoreApi";
import {type IStoreProps} from "./IStoreProps";

export type IStoreContext<TStoreProps extends IStoreProps> = Context<IStoreApi<TStoreProps> | null>;
