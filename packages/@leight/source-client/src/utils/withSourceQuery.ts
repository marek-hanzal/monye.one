import {
    type ISourceSchemaType,
    type IUseSourceQuery
} from "@leight/source";

export type IWithSourceQueryProps<TSourceSchemaType extends ISourceSchemaType> = {
    create: { useMutation: IUseSourceQuery<TSourceSchemaType>["useCreate"] };
    patch: { useMutation: IUseSourceQuery<TSourceSchemaType>["usePatch"] };
    upsert: { useMutation: IUseSourceQuery<TSourceSchemaType>["useUpsert"] };
    delete: { useMutation: IUseSourceQuery<TSourceSchemaType>["useDelete"] };
    deleteWith: { useMutation: IUseSourceQuery<TSourceSchemaType>["useDeleteWith"] };
    query: { useQuery: IUseSourceQuery<TSourceSchemaType>["useQuery"] };
    count: { useQuery: IUseSourceQuery<TSourceSchemaType>["useCount"] };
    fetch: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFetch"] };
    fetchOptional: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFetchOptional"] };
    find: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFind"] };
    findOptional: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFindOptional"] };
}

export const withSourceQuery = <TSourceSchemaType extends ISourceSchemaType>(
    {
        create:        {useMutation: useCreate},
        patch:         {useMutation: usePatch},
        upsert:        {useMutation: useUpsert},
        delete:        {useMutation: useDelete},
        deleteWith:    {useMutation: useDeleteWith},
        query:         {useQuery},
        count:         {useQuery: useCount},
        fetch:         {useQuery: useFetch},
        fetchOptional: {useQuery: useFetchOptional},
        find:          {useQuery: useFind},
        findOptional:  {useQuery: useFindOptional},
    }: IWithSourceQueryProps<TSourceSchemaType>
): IUseSourceQuery<TSourceSchemaType> => ({
    useCreate,
    usePatch,
    useUpsert,
    useDelete,
    useDeleteWith,
    useQuery,
    useCount,
    useFetch,
    useFetchOptional,
    useFind,
    useFindOptional,
});
