import {type IStoreContext} from "@leight/context";
import {type IWithIdentity} from "@leight/source";
import {type IStoreProps}   from "@leight/zustand";

export type ISelectionStoreProps<TItem extends IWithIdentity> = IStoreProps<{
    item?: TItem;
    /**
     * Set currently selected item
     */
    select(item?: TItem): void;
    /**
     * Checks if the given item is selected (by an ID)
     */
    isSelected(item: TItem): boolean;
    /**
     * Gets an item or throw an exception if nothing is selected
     */
    required(): TItem;
}>;

export type ISelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<ISelectionStoreProps<TItem>>;

export type IMultiSelectionStoreProps<TItem extends IWithIdentity> = IStoreProps<{
    items: Record<string, TItem>;
    /**
     * Set currently selected item
     */
    select(item: TItem): void;
    deselect(item: TItem): void;
    toggle(item: TItem): void;
    /**
     * Checks if the given item is selected (by an ID)
     */
    isSelected(item: TItem): boolean;
}>;

export type IMultiSelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<IMultiSelectionStoreProps<TItem>>;
