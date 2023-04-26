import {CursorStore} from "@leight/cursor-client";
import {
    type ISourceSchemaType,
    type IUseSource,
    type IUseSourceProps
}                    from "@leight/source";

export const useSource = <TSourceSchemaType extends ISourceSchemaType>(
    {
        cacheTime = 120,
        schema,
        SourceStore,
        UseSourceQuery,
    }: IUseSourceProps<TSourceSchemaType>): IUseSource<TSourceSchemaType> => {
    const $cacheTime   = cacheTime ? cacheTime * 1000 : undefined;
    const {page, size} = CursorStore.useState(({page, size}) => ({page, size}));
    const {sort}       = SourceStore.Sort.useState(({sort}) => ({sort}));
    const {filter}     = SourceStore.Filter.useState(({filter}) => ({filter}));
    const result       = UseSourceQuery.useQuery({
        cursor: {
            page,
            size,
        },
        sort,
        filter,
    }, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    return {
        result,
        data: result.isSuccess ? result.data.filter(item => schema.safeParse(item).success).filter(item => schema.parse(item)) : [],
    };
};
