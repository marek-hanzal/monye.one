import {createStoreContext}  from "@leight/context-client";
import {createFilterContext} from "@leight/filter-client";
import {createSortContext}   from "@leight/sort-client";
import {
    type ISourceSchema,
    type ISourceSchemas,
    type ISourceStore,
    type ISourceStoreProps
}                            from "@leight/source";

export interface ICreateSourceContextProps<TSourceSchema extends ISourceSchema> {
    readonly name: string;
    readonly schema: TSourceSchema["EntitySchema"];
    readonly entities?: TSourceSchema["Entity"][];
}

export const createSourceContext = <TSourceSchema extends ISourceSchema>(
    {
        name,
        schema,
        entities = [],
    }: ICreateSourceContextProps<TSourceSchema>) => {
    return createStoreContext<ISourceStoreProps<TSourceSchema>>({
        state: () => (set) => ({
            schema,
            entities,
            isLoading:  false,
            isFetching: false,
            setEntities(entities) {
                set({entities});
            },
            setIsLoading(isLoading) {
                set({isLoading});
            },
            setIsFetching(isFetching) {
                set({isFetching});
            },
        }),
        name:  `[${name}] SourceContext`,
        hint:  `Add [${name}] SourceProvider`,
    });
};

export interface IWithSourceStoreProps<TSourceSchema extends ISourceSchema> {
    name: string;
    SourceSchema: ISourceSchemas<TSourceSchema>;
}

export const withSourceStore = <TSourceSchema extends ISourceSchema>(
    {
        name,
        SourceSchema: {
                          EntitySchema,
                          FilterSchema,
                          SortSchema,
                      },
    }: IWithSourceStoreProps<TSourceSchema>): ISourceStore<TSourceSchema> => {
    return {
        Source: createSourceContext<TSourceSchema>({
            name,
            schema: EntitySchema,
        }),
        Filter: createFilterContext<TSourceSchema["FilterSchema"]>({
            name:   `${name}Filter`,
            schema: FilterSchema,
        }),
        Sort:   createSortContext<TSourceSchema["SortSchema"]>({
            name:   `${name}Sort`,
            schema: SortSchema,
        }),
    };
};
