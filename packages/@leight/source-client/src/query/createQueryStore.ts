import {createStoreContext} from "@leight/context-client";
import {
    type IQueryStoreProps,
    type ISourceSchema,
    type ISourceSchemaType
}                           from "@leight/source";
import {generateId}         from "@leight/utils";

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
        state: ({defaults}) => set => ({
            $id:          generateId(),
            $schema:      schema,
            $filter:      defaults?.$query?.filter,
            $applyFilter: undefined,
            $filterDto:   undefined,
            $sort:        defaults?.$query?.sort || {},
            $page:        defaults?.$query?.cursor?.page || 0,
            $size:        defaults?.$query?.cursor?.size || 30,
            $query:       defaults?.$query || {
                cursor: {
                    page: 0,
                    size: 30,
                },
            },
            setFilter(filter) {
                set(({$query, $applyFilter}) => ({
                    $id:     generateId(),
                    $filter: {
                        ...filter,
                        ...$applyFilter,
                    },
                    $query:  {
                        ...$query,
                        filter: {
                            ...filter,
                            ...$applyFilter,
                        },
                    },
                }));
            },
            applyFilter(filter) {
                set({$applyFilter: filter});
            },
            setShallowFilter(filter) {
                set(({$query, $applyFilter}) => ({
                    $id:     generateId(),
                    $filter: {
                        ...$query.filter,
                        ...filter,
                        ...$applyFilter,
                    },
                    $query:  {
                        ...$query,
                        filter: {
                            ...$query.filter,
                            ...filter,
                            ...$applyFilter,
                        },
                    },
                }));
            },
            setFilterDto(dto) {
                set({$filterDto: dto});
            },
            setSort(key, order) {
                set(({$query}) => ({
                    $id:    generateId(),
                    $sort:  {
                        [key as any]: order,
                    },
                    $query: {
                        ...$query,
                        sort: {
                            [key as any]: order,
                        },
                    },
                }));
            },
            setSize(size) {
                set(({$query}) => ({
                    $id:    generateId(),
                    $size:  size,
                    $query: {
                        ...$query,
                        cursor: {
                            ...$query.cursor,
                            size,
                        },
                    },
                }));
            },
            setPage(page) {
                set(({$query}) => ({
                    $id:    generateId(),
                    $page:  page,
                    $query: {
                        ...$query,
                        cursor: {
                            ...$query.cursor,
                            page,
                        },
                    },
                }));
            },
        }),
        name,
    });
};
