import {createStoreContext} from "@leight/context-client";
import {
    type IQueryStoreProps,
    type ISourceSchema,
    type ISourceSchemaType
}                           from "@leight/source";

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
        state: () => set => ({
            schema,
            query:  {},
            filter: undefined,
            sort:   {},
            page:   0,
            pages:  0,
            size:   30,
            setFilter(filter) {
                set(state => ({
                    filter,
                    query: {
                        filter,
                        sort:   state.sort,
                        cursor: {
                            page: state.page,
                            size: state.size,
                        },
                    },
                }));
            },
            setShallowFilter(filter) {
                set(state => ({
                    filter: {
                        ...state.filter,
                        ...filter,
                    },
                    query:  {
                        filter: {
                            ...state.filter,
                            ...filter,
                        },
                        sort:   state.sort,
                        cursor: {
                            page: state.page,
                            size: state.size,
                        },
                    },
                }));
            },
            setSort(key, order) {
                set(state => ({
                    sort:  {
                        [key as any]: order,
                    },
                    query: {
                        filter: state.filter,
                        sort:   {
                            [key as any]: order,
                        },
                        cursor: {
                            page: state.page,
                            size: state.size,
                        },
                    },
                }));
            },
            setSize(size, total) {
                set(state => ({
                    size,
                    pages: Math.ceil(total / size),
                    query: {
                        filter: state.filter,
                        sort:   state.sort,
                        cursor: {
                            page: state.page,
                            size,
                        },
                    },
                }));
            },
            setPage(page) {
                set(state => ({
                    page,
                    query: {
                        filter: state.filter,
                        sort:   state.sort,
                        cursor: {
                            page,
                            size: state.size,
                        },
                    },
                }));
            },
        }),
        name,
    });
};
