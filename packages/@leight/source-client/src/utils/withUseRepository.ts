import {
    type ISource,
    type ISourceSchema,
    type IUseRepositoryQuery
} from "@leight/source";

export const withUseRepository = <
    TSourceSchema extends ISourceSchema
>(
    {
        create:   {useMutation: useCreate},
        patch:    {useMutation: usePatch},
        patchBy:  {useMutation: usePatchBy},
        upsert:   {useMutation: useUpsert},
        delete:   {useMutation: useDelete},
        deleteBy: {useMutation: useDeleteBy},
        query:    {useQuery},
        count:    {useQuery: useCount},
        fetch:    {useQuery: useFetch},
        fetch$:   {useQuery: useFetch$},
        get:      {useQuery: useGet},
        get$:     {useQuery: useGet$},
    }: IUseRepositoryQuery<TSourceSchema>
): ISource.IUseRepository<TSourceSchema> => ({
    useCreate,
    usePatch,
    usePatchBy,
    useUpsert,
    useDelete,
    useDeleteBy,
    useQuery,
    useCount,
    useFetch,
    useFetch$,
    useGet,
    useGet$,
});
