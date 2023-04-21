import {createStoreContext} from "@leight/context-client";
import {
    type IFilterSchema,
    type IFilterStoreProps
}                           from "@leight/filter";
import {generateId}         from "@leight/utils";

export interface ICreateFilterContextProps<TFilterSchema extends IFilterSchema> {
    name: string;
    schema: TFilterSchema;
}

export const createFilterContext = <TFilterSchema extends IFilterSchema>(
    {
        name,
        schema,
    }: ICreateFilterContextProps<TFilterSchema>) => {
    return createStoreContext<IFilterStoreProps<TFilterSchema>>({
        state: () => (set) => ({
            id:     generateId(),
            schema,
            filter: undefined,
            setFilter(filter) {
                set({
                    id: generateId(),
                    filter,
                });
            },
        }),
        name:  `[${name}] FilterContext`,
        hint:  `Add [${name}] FilterProvider`,
    });
};
