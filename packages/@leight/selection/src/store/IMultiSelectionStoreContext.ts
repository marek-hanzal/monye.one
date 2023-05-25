import {type IWithIdentity}             from "@leight/source";
import {type IStoreContext}             from "@leight/store";
import {type IMultiSelectionStoreProps} from "./IMultiSelectionStoreProps";

export type IMultiSelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<IMultiSelectionStoreProps<TItem>>;
