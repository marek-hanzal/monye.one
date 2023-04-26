import {
    type ISourceSchemaType,
    type IUseSource,
    type IUseSourceProps
} from "@leight/source";

export const useSource = <TSourceSchemaType extends ISourceSchemaType>(
    {
        cacheTime = 120,
        schema,
        SourceStore,
    }: IUseSourceProps<TSourceSchemaType>): IUseSource<TSourceSchemaType> => {
    const $cacheTime = cacheTime ? cacheTime * 1000 : undefined;
    const {query}    = SourceStore.Query.useState(({query}) => ({query}));
    const result     = SourceStore.use.useQuery(query, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    return {
        result,
        data: result.isSuccess ? result.data.filter(item => schema.safeParse(item).success).filter(item => schema.parse(item)) : [],
    };
};
