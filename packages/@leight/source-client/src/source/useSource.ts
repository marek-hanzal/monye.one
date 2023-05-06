import {Source} from "@leight/source";

export const useSource = <TSource extends Source>(
    {
        cacheTime = 120,
        schema,
        SourceStore,
    }: TSource['']): IUseSource<TSource> => {
    const $cacheTime = cacheTime ? cacheTime * 1000 : undefined;
    const {query}    = SourceStore.Query.useState(({$query}) => ({query: $query}));
    const result     = SourceStore.use.useQuery(query, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    return {
        result,
        data: result.isSuccess ? result.data.filter(item => schema.safeParse(item).success).filter(item => schema.parse(item)) : [],
    };
};
