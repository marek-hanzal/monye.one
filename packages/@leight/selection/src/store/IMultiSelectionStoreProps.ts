import {type IWithIdentity} from "@leight/source";
import {type IStoreProps}   from "@leight/zustand";

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
