import {type IWithIdentity}        from "@leight/source";
import {type IStoreContext}        from "@leight/store";
import {type ISelectionStoreProps} from "./ISelectionStoreProps";

export type ISelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<ISelectionStoreProps<TItem>>;
