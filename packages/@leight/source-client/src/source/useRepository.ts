import {
    type ISource,
    type ISourceSchema
} from "@leight/source";

export interface IUseRepositoryProps<TSourceSchema extends ISourceSchema> {
    cacheTime?: number;
    schema: TSourceSchema;
    UseRepository: ISource.IUseRepository<TSourceSchema>;
    QueryContext: ISource.IQueryContext<TSourceSchema>;
}

export const useRepository = <TSourceSchema extends ISourceSchema>(
    {
        cacheTime = 120,
        schema,
        UseRepository,
        QueryContext,
    }: IUseRepositoryProps<TSourceSchema>): ISource.IUseResult<TSourceSchema> => {
    const $cacheTime = cacheTime ? cacheTime * 1000 : undefined;
    const {query} = QueryContext.use(({query}) => ({query}));
    const result = UseRepository.useQuery(query, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    return {
        result,
        data: result.isSuccess ? result.data.filter(item => schema.DtoSchema.safeParse(item).success).filter(item => schema.DtoSchema.parse(item)) : [],
    };
};
