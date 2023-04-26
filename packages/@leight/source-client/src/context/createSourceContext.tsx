import {createFilterContext} from "@leight/filter-client";
import {createSortContext}   from "@leight/sort-client";
import {
    type ISourceSchema,
    type ISourceSchemaType,
    type ISourceStore,
    type IUseSourceProps
}                            from "@leight/source";
import {useSource}           from "../source";

export interface IWithSourceStoreProps<TSourceSchema extends ISourceSchema> {
    name: string;
    SourceSchema: TSourceSchema;
    UseSourceQuery: IUseSourceProps<ISourceSchemaType.of<TSourceSchema>>["UseSourceQuery"];
}

export const withSourceStore = <TSourceSchema extends ISourceSchema>(
    {
        name,
        SourceSchema: {
                          DtoSchema,
                          FilterSchema,
                          SortSchema,
                      },
        UseSourceQuery,
    }: IWithSourceStoreProps<TSourceSchema>): ISourceStore<ISourceSchemaType.of<TSourceSchema>> => {
    const $store: ISourceStore<ISourceSchemaType.of<TSourceSchema>> = {
        useSource: ({cacheTime} = {cacheTime: undefined}) => {
            return useSource<ISourceSchemaType.of<TSourceSchema>>({
                SourceStore: $store,
                UseSourceQuery,
                schema:      DtoSchema,
                cacheTime,
            });
        },
        Filter:    createFilterContext<TSourceSchema["FilterSchema"]>({
            name:   `${name}Filter`,
            schema: FilterSchema,
        }),
        Sort:      createSortContext<TSourceSchema["SortSchema"]>({
            name:   `${name}Sort`,
            schema: SortSchema,
        }),
    };
    return $store;
};
