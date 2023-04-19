import {
    type ISourceSchema,
    type IUseSourceQuery
} from "@leight/source";

export type IWithSourceQueryProps<TSourceSchema extends ISourceSchema> = {
    create: { useMutation: IUseSourceQuery<TSourceSchema>["useCreate"] };
    patch: { useMutation: IUseSourceQuery<TSourceSchema>["usePatch"] };
    delete: { useMutation: IUseSourceQuery<TSourceSchema>["useDelete"] };
    deleteWith: { useMutation: IUseSourceQuery<TSourceSchema>["useDeleteWith"] };
    query: { useQuery: IUseSourceQuery<TSourceSchema>["useQuery"] };
    count: { useQuery: IUseSourceQuery<TSourceSchema>["useCount"] };
    fetch: { useQuery: IUseSourceQuery<TSourceSchema>["useFetch"] };
    find: { useQuery: IUseSourceQuery<TSourceSchema>["useFind"] };
}

export const withSourceQuery = <TSourceSchema extends ISourceSchema>(
    {
        create:     {useMutation: useCreate},
        patch:      {useMutation: usePatch},
        delete:     {useMutation: useDelete},
        deleteWith: {useMutation: useDeleteWith},
        query:      {useQuery},
        count:      {useQuery: useCount},
        fetch:      {useQuery: useFetch},
        find:       {useQuery: useFind},
    }: IWithSourceQueryProps<TSourceSchema>
): IUseSourceQuery<TSourceSchema> => ({
    useCreate,
    usePatch,
    useDelete,
    useDeleteWith,
    useQuery,
    useCount,
    useFetch,
    useFind,
});
