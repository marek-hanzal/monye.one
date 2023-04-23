import {createStoreContext}  from "@leight/context-client";
import {createFilterContext} from "@leight/filter-client";
import {createSortContext}   from "@leight/sort-client";
import {
    type ISourceSchema,
    type ISourceSchemaType,
    type ISourceStore,
    type ISourceStoreProps
}                            from "@leight/source";
import {generateId}          from "@leight/utils";

export interface ICreateSourceContextProps<TSourceSchemaType extends ISourceSchemaType> {
    name: string;
    schema: TSourceSchemaType["DtoSchema"];
    dtos?: TSourceSchemaType["Dto"][];
}

export const createSourceContext = <TSourceSchemaType extends ISourceSchemaType>(
    {
        name,
        schema,
        dtos = [],
    }: ICreateSourceContextProps<TSourceSchemaType>) => {
    return createStoreContext<ISourceStoreProps<TSourceSchemaType>>({
        state: () => (set) => ({
            id:         generateId(),
            name,
            schema,
            dtos:       dtos,
            isLoading:  false,
            isFetching: false,
            setDtos(dtos) {
                set({
                    id: generateId(),
                    dtos,
                });
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
    SourceSchema: TSourceSchema;
}

export const withSourceStore = <TSourceSchema extends ISourceSchema>(
    {
        name,
        SourceSchema: {
                          EntitySchema,
                          FilterSchema,
                          SortSchema,
                      },
    }: IWithSourceStoreProps<TSourceSchema>): ISourceStore<ISourceSchemaType.of<TSourceSchema>> => {
    return {
        Source: createSourceContext<ISourceSchemaType.of<TSourceSchema>>({
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
