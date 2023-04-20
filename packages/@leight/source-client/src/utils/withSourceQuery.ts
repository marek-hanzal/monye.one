import {
    type ISourceSchemaType,
    type IUseSourceQuery
} from "@leight/source";

export type IWithSourceQueryProps<TSourceSchemaType extends ISourceSchemaType> = {
    create: { useMutation: IUseSourceQuery<TSourceSchemaType>["useCreate"] };
    patch: { useMutation: IUseSourceQuery<TSourceSchemaType>["usePatch"] };
    delete: { useMutation: IUseSourceQuery<TSourceSchemaType>["useDelete"] };
    deleteWith: { useMutation: IUseSourceQuery<TSourceSchemaType>["useDeleteWith"] };
    query: { useQuery: IUseSourceQuery<TSourceSchemaType>["useQuery"] };
    count: { useQuery: IUseSourceQuery<TSourceSchemaType>["useCount"] };
    fetch: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFetch"] };
    find: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFind"] };
}

export const withSourceQuery = <TSourceSchemaType extends ISourceSchemaType>(
    {
        create:     {useMutation: useCreate},
        patch:      {useMutation: usePatch},
        delete:     {useMutation: useDelete},
        deleteWith: {useMutation: useDeleteWith},
        query:      {useQuery},
        count:      {useQuery: useCount},
        fetch:      {useQuery: useFetch},
        find:       {useQuery: useFind},
    }: IWithSourceQueryProps<TSourceSchemaType>
): IUseSourceQuery<TSourceSchemaType> => ({
    useCreate,
    usePatch,
    useDelete,
    useDeleteWith,
    useQuery,
    useCount,
    useFetch,
    useFind,
});
