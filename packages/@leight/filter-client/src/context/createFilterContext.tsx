import {createStoreContext} from "@leight/context-client";
import {
    type IFilterSchema,
    type IFilterStoreProps
}                           from "@leight/filter";

export interface ICreateFilterContextProps<TFilterSchema extends IFilterSchema> {
    readonly name: string;
    readonly schema: TFilterSchema;
}

export const createFilterContext = <TFilterSchema extends IFilterSchema>(
    {
        name,
        schema,
    }: ICreateFilterContextProps<TFilterSchema>) => {
    return createStoreContext<IFilterStoreProps<TFilterSchema>>({
        state: () => (set) => ({
            schema,
            filter: undefined,
            setFilter(filter) {
                set({
                    filter,
                });
            },
        }),
        name:  `[${name}] FilterContext`,
        hint:  `Add [${name}] FilterProvider`,
    });
};
