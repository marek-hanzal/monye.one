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
    readonly schema: TSourceSchema["DtoSchema"];
    readonly dtos?: TSourceSchema["Dto"][];
}

export const createSourceContext = <TSourceSchema extends ISourceSchema>(
    {
        name,
        schema,
        dtos = [],
    }: ICreateSourceContextProps<TSourceSchema>) => {
    return createStoreContext<ISourceStoreProps<TSourceSchema>>({
        state: () => (set) => ({
            schema,
            dtos:       dtos,
            isLoading:  false,
            isFetching: false,
            setDtos(dtos) {
                set({dtos});
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
