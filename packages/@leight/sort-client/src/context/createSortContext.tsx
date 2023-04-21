import {createStoreContext} from "@leight/context-client";
import {
    type ISortSchema,
    type ISortStoreProps
}                           from "@leight/sort";
import {generateId}         from "@leight/utils";

export interface ICreateSortContextProps<TSortSchema extends ISortSchema> {
    readonly name: string;
    readonly schema: TSortSchema;
}

export const createSortContext = <TSortSchema extends ISortSchema>(
    {
        name,
        schema,
    }: ICreateSortContextProps<TSortSchema>) => {
    return createStoreContext<ISortStoreProps<TSortSchema>>({
        state: () => set => ({
            id:   generateId(),
            schema,
            sort: {},
            setSort(key, order) {
                set({
                    id:   generateId(),
                    sort: {
                        [key as any]: order,
                    }
                });
            },
        }),
        name:  `[${name}] SortContext`,
        hint:  `Add [${name}] SortProvider`,
    });
};
