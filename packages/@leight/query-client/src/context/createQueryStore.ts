import {createStoreContext}    from "@leight/context-client";
import {type IQueryStoreProps} from "@leight/query";
import {
    type ISourceSchema,
    type ISourceSchemaType
}                              from "@leight/source";

export interface ICreateQueryStoreProps<TSourceSchemaType extends ISourceSchemaType> {
    name: string;
    schema: ISourceSchema.of<TSourceSchemaType>;
}

export const createQueryStore = <TSourceSchemaType extends ISourceSchemaType>(
    {
        name,
        schema,
    }: ICreateQueryStoreProps<TSourceSchemaType>) => {
    return createStoreContext<IQueryStoreProps<TSourceSchemaType>>({
        state: () => (set, get) => ({
            schema,
            filter: undefined,
            setFilter(filter) {
                set({filter});
            },
            setShallowFilter(filter) {
                set({
                    filter: {
                        ...get().filter,
                        ...filter,
                    },
                });
            },
        }),
        name,
    });
};
