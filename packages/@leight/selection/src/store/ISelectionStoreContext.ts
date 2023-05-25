import {type IStoreContext}        from "@leight/context";
import {type IWithIdentity}        from "@leight/source";
import {type ISelectionStoreProps} from "./ISelectionStoreProps";

export type ISelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<ISelectionStoreProps<TItem>>;
