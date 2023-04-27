import {createStoreContext}        from "@leight/context-client";
import {type ISelectionStoreProps} from "@leight/selection";
import {type IWithIdentity}        from "@leight/source";

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
