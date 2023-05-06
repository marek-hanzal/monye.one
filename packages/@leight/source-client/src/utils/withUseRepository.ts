import {
    type IRepositoryMapperSchema,
    type IUseRepository,
    type IUseRepositoryQuery
} from "@leight/source";

export const withUseRepository = <
    TRepositoryMapperSchema extends IRepositoryMapperSchema
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
    }: IUseRepositoryQuery<TRepositoryMapperSchema>
): IUseRepository<TRepositoryMapperSchema> => ({
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
