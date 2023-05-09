import {type Source} from "@leight/source";
import {createQueryStore} from "../query";
import {useSource} from "../source";

export interface IWithSourceStoreProps<TSource extends Source> {
    name: string;
    schema: TSource["Schema"];
    use: TSource["Type"]["UseRepository"];
    useInvalidator: TSource["Type"]["UseInvalidator"];
}

export const withSourceStore = <TSource extends Source>(
    {
        name,
        schema,
        use,
        useInvalidator,
    }: IWithSourceStoreProps<TSource>): ISourceStore<ISourceSchemaType.of<TSourceSchema>> => {
    const $store: ISourceStore<ISourceSchemaType.of<TSourceSchema>> = {
        name,
        useSource: ({cacheTime} = {cacheTime: undefined}) => {
            return useSource<TSource>({
                SourceStore: $store,
                schema: schema.DtoSchema,
                cacheTime,
            });
        },
        use,
        useInvalidator,
        Query: createQueryStore<TSource>({
            name,
            schema,
        }),
    };
    return $store;
};
