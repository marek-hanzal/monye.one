import {createStoreContext} from "@leight/context-client";
import {
    type ISortSchema,
    type ISortStoreProps
}                           from "@leight/sort";

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
            schema,
            sort: {},
            setSort(key, order) {
                console.log(`Setting [${name}] sort`, {
                    sort: {
                        [key as any]: order,
                    }
                });

                set({
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
