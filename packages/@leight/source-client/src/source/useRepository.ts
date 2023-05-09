import {type Source} from "@leight/source";

export interface IUseRepositoryProps<TSource extends Source> extends Pick<TSource["Type"], "UseRepository" | "QueryContext"> {
    cacheTime?: number;
    schema: TSource["Schema"];
}

export const useRepository = <TSource extends Source>(
    {
        cacheTime = 120,
        schema,
        UseRepository,
        QueryContext,
    }: IUseRepositoryProps<TSource>): TSource["Type"]["UseRepositoryResult"] => {
    const $cacheTime = cacheTime ? cacheTime * 1000 : undefined;
    const {query} = QueryContext.use(({$query}) => ({query: $query}));
    const result = UseRepository.useQuery(query, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    return {
        result,
        data: result.isSuccess ? result.data.filter(item => schema.DtoSchema.safeParse(item).success).filter(item => schema.DtoSchema.parse(item)) : [],
    };
};
