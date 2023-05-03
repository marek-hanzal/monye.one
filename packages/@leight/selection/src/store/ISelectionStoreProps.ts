import {type IStoreContext} from "@leight/context";
import {type IWithIdentity} from "@leight/source";
import {type IStoreProps}   from "@leight/zustand";

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

export type ISelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<ISelectionStoreProps<TItem>>;

export type IMultiSelectionStoreProps<TItem extends IWithIdentity> = IStoreProps<{
    items: Record<string, TItem>;
    selection: Record<string, TItem>;
    /**
     * Set currently selected item
     */
    commit(): void;
    cancel(): void;
    select(item: TItem): void;
    deselect(item: TItem): void;
    toggle(item: TItem): void;
    clear(): void;
    /**
     * Checks if the given item is selected (by an ID)
     */
    isSelected(item: TItem): boolean;
    isSelection(): boolean;
}>;

export type IMultiSelectionStoreContext<TItem extends IWithIdentity> = IStoreContext<IMultiSelectionStoreProps<TItem>>;
