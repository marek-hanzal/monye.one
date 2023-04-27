import {createStoreContext} from "@leight/context-client";
import {
    IMultiSelectionStoreProps,
    type ISelectionStoreProps
}                           from "@leight/selection";
import {type IWithIdentity} from "@leight/source";

export interface ICreateSelectionStoreProps {
    name: string;
}

export const createSelectionStore = <TItem extends IWithIdentity>(
    {
        name,
    }: ICreateSelectionStoreProps
) => {
    return createStoreContext<ISelectionStoreProps<TItem>>({
        state: () => (set, get) => ({
            item: undefined,
            select(item) {
                set({item});
            },
            isSelected(item) {
                return get().item?.id === item.id;
            },
            required() {
                const item = get().item;
                if (!item) {
                    throw new Error(`Selection [${name}] has no selected item.`);
                }
                return item;
            },
        }),
        name,
    });
};

export interface ICreateMultiSelectionStoreProps {
    name: string;
}

export const createMultiSelectionStore = <TItem extends IWithIdentity>(
    {
        name,
    }: ICreateMultiSelectionStoreProps
) => {
    return createStoreContext<IMultiSelectionStoreProps<TItem>>({
        state: () => (set, get) => ({
            items: {},
            select(item): void {
                set(state => ({
                    items: {
                        ...state.items,
                        [item.id]: item,
                    },
                }));
            },
            deselect(item): void {
                set(state => {
                    const items = state.items;
                    delete items[item.id];
                    return {items};
                });
            },
            isSelected(item): boolean {
                return !!get().items[item.id];
            },
            toggle(item): void {
                const $items    = get().items;
                const $item     = $items[item.id];
                $items[item.id] = item;
                if ($item) {
                    delete $items[item.id];
                }
                set({items: $items});
            },
            clear() {
                set({items: {}});
            },
        }),
        name,
    });
};
