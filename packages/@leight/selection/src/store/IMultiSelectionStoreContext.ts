import {type IStoreContext}             from "@leight/context";
import {type IWithIdentity}             from "@leight/source";
import {type IMultiSelectionStoreProps} from "./IMultiSelectionStoreProps";

export type IMultiSelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<IMultiSelectionStoreProps<TItem>>;
