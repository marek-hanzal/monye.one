import {
    type IQueryStoreProps,
    type ISourceSchema,
    type SourceType
}                    from "@leight/source";
import {createStore} from "@leight/store-client";
import {
    cleanOf,
    generateId,
    isEmpty
}                    from "@leight/utils";

export interface ICreateQueryStoreProps {
    name: string;
}

export const createQueryStore = <
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>,
>(
    {
        name,
    }: ICreateQueryStoreProps) => {
    return createStore<IQueryStoreProps<TSourceSchema>>({
        state: ({defaults}) => (set, get) => ({
            id:          generateId(),
            filter:      defaults?.query?.filter as TSourceType["Filter"],
            applyFilter: undefined,
            filterDto:   undefined,
            sort:        defaults?.query?.sort || {},
            page:        defaults?.query?.cursor?.page || 0,
            size:        defaults?.query?.cursor?.size || 30,
            query:       defaults?.query || {
                cursor: {
                    page: 0,
                    size: 30,
                },
            },
            withFilter(filter) {
                set(({
                         query,
                         applyFilter
                     }) => ({
                    id:     generateId(),
                    filter: {
                        ...filter,
                        ...applyFilter,
                    },
                    query:  {
                        ...query,
                        filter: {
                            ...filter,
                            ...applyFilter,
                        },
                    },
                }));
            },
            withApplyFilter(filter) {
                set(({query}) => ({
                    id:          generateId(),
                    applyFilter: filter,
                    filter:      filter,
                    query:       {
                        ...query,
                        filter,
                    },
                }));
            },
            withApplyShallowFilter(filter) {
                set(({
                         query,
                         applyFilter
                     }) => ({
                    id:          generateId(),
                    applyFilter: {
                        ...applyFilter,
                        ...filter,
                    },
                    filter:      {
                        ...query.filter,
                        ...applyFilter,
                        ...filter,
                    },
                    query:       {
                        ...query,
                        filter: {
                            ...query.filter,
                            ...applyFilter,
                            ...filter,
                        },
                    },
                }));
            },
            withShallowFilter(filter) {
                set(({
                         query,
                         applyFilter
                     }) => ({
                    id:     generateId(),
                    filter: {
                        ...query.filter,
                        ...filter,
                        ...applyFilter,
                    },
                    query:  {
                        ...query,
                        filter: {
                            ...query.filter,
                            ...filter,
                            ...applyFilter,
                        },
                    },
                }));
            },
            withFilterDto(dto) {
                set({
                    id:        generateId(),
                    filterDto: dto,
                });
            },
            withShallowFilterDto(dto) {
                set(state => ({
                    id:        generateId(),
                    filterDto: {
                        ...state.filterDto,
                        ...dto,
                    },
                }));
            },
            hasFilter() {
                return !isEmpty(cleanOf(get().filter));
            },
            hasApplyFilter() {
                return !isEmpty(get().applyFilter);
            },
            withSort(key, order) {
                set(({query}) => ({
                    id:    generateId(),
                    sort:  {
                        [key as any]: order,
                    },
                    query: {
                        ...query,
                        sort: {
                            [key as any]: order,
                        },
                    },
                }));
            },
            withSize(size) {
                set(({query}) => ({
                    id:    generateId(),
                    size:  size,
                    query: {
                        ...query,
                        cursor: {
                            ...query.cursor,
                            size,
                        },
                    },
                }));
            },
            withPage(page) {
                set(({query}) => ({
                    id:    generateId(),
                    page:  page,
                    query: {
                        ...query,
                        cursor: {
                            ...query.cursor,
                            page,
                        },
                    },
                }));
            },
        }),
        name,
    });
};
