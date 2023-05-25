import {type IWithIdentity} from "@leight/source";
import {type IStoreProps}   from "@leight/store";

export type ISelectionStoreProps<TItem extends IWithIdentity> = IStoreProps<{
    item?: TItem;
    selection?: TItem;
    commit(): void;
    cancel(): void;
    /**
     * Set currently selected item
     */
    select(item: TItem): void;
    /**
     * Checks if the given item is selected (by an ID)
     */
    isSelected(item: TItem): boolean;
    /**
     * Gets an item or throw an exception if nothing is selected
     */
    required(): TItem;
    clear(): void;
}>;
