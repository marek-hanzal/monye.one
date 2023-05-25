import {type ISelectionStoreProps} from "@leight/selection";
import {type IWithIdentity}        from "@leight/source";
import {createStore}               from "@leight/store-client";

export interface ICreateSelectionStoreProps {
    name: string;
}

export const createSelectionStore = <TItem extends IWithIdentity>(
    {
        name,
    }: ICreateSelectionStoreProps
) => {
    return createStore<ISelectionStoreProps<TItem>>({
        state: () => (set, get) => ({
            item:      undefined,
            selection: undefined,
            clear() {
                set({
                    item:      undefined,
                    selection: undefined
                });
            },
            commit() {
                set(state => ({
                    item: state.selection,
                }));
            },
            cancel() {
                set({selection: undefined});
            },
            select(selection) {
                set({selection});
            },
            isSelected(item) {
                return get().selection?.id === item.id;
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
