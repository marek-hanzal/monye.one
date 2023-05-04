import {
    type ISourceSchema,
    type ISourceSchemaType,
    type ISourceStore,
    type IUseQueryInvalidator,
    type IUseSourceQuery
}                         from "@leight/source";
import {createQueryStore} from "../query";
import {useSource}        from "../source";

export interface IWithSourceStoreProps<TSourceSchema extends ISourceSchema> {
    name: string;
    schema: TSourceSchema;
    use: IUseSourceQuery<ISourceSchemaType.of<TSourceSchema>>;
    useInvalidator: IUseQueryInvalidator;
}

export const withSourceStore = <TSourceSchema extends ISourceSchema>(
    {
        name,
        schema,
        use,
        useInvalidator,
    }: IWithSourceStoreProps<TSourceSchema>): ISourceStore<ISourceSchemaType.of<TSourceSchema>> => {
    const $store: ISourceStore<ISourceSchemaType.of<TSourceSchema>> = {
        name,
        useSource: ({cacheTime} = {cacheTime: undefined}) => {
            return useSource<ISourceSchemaType.of<TSourceSchema>>({
                SourceStore: $store,
                schema:      schema.DtoSchema,
                cacheTime,
            });
        },
        use,
        useInvalidator,
        Query:     createQueryStore<ISourceSchemaType.of<TSourceSchema>>({
            name,
            schema,
        }),
    };
    return $store;
};
