import {createStoreContext} from "@leight/context-client";
import {
    type IQueryStoreProps,
    type ISourceSchema,
    type ISourceSchemaType
}                           from "@leight/source";
import {
    cleanOf,
    generateId,
    isEmpty
}                           from "@leight/utils";

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
        state: ({defaults}) => (set, get) => ({
            $id:          generateId(),
            $schema:      schema,
            $filter:      defaults?.$query?.filter as TSourceSchemaType["Filter"],
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
                set(({$query}) => ({
                    $id:          generateId(),
                    $applyFilter: filter,
                    $filter:      filter,
                    $query:       {
                        ...$query,
                        filter: filter,
                    },
                }));
            },
            applyShallowFilter(filter) {
                set(({$query, $applyFilter}) => ({
                    $id:          generateId(),
                    $applyFilter: {
                        ...$applyFilter,
                        ...filter,
                    },
                    $filter:      {
                        ...$query.filter,
                        ...$applyFilter,
                        ...filter,
                    },
                    $query:       {
                        ...$query,
                        filter: {
                            ...$query.filter,
                            ...$applyFilter,
                            ...filter,
                        },
                    },
                }));
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
            hasFilter() {
                return !isEmpty(cleanOf(get().$filter));
            },
            hasApplyFilter() {
                return !isEmpty(get().$applyFilter);
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
