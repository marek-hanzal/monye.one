import {
    type ISourceSchemaType,
    type IUseSourceQuery
} from "@leight/source";

export type IWithSourceQueryProps<TSourceSchemaType extends ISourceSchemaType> = {
    create: { useMutation: IUseSourceQuery<TSourceSchemaType>["useCreate"] };
    patch: { useMutation: IUseSourceQuery<TSourceSchemaType>["usePatch"] };
    patchBy: { useMutation: IUseSourceQuery<TSourceSchemaType>["usePatchBy"] };
    upsert: { useMutation: IUseSourceQuery<TSourceSchemaType>["useUpsert"] };
    delete: { useMutation: IUseSourceQuery<TSourceSchemaType>["useDelete"] };
    deleteWith: { useMutation: IUseSourceQuery<TSourceSchemaType>["useDeleteWith"] };
    query: { useQuery: IUseSourceQuery<TSourceSchemaType>["useQuery"] };
    count: { useQuery: IUseSourceQuery<TSourceSchemaType>["useCount"] };
    fetch: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFetch"] };
    fetch$: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFetchOptional"] };
    get: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFind"] };
    get$: { useQuery: IUseSourceQuery<TSourceSchemaType>["useFindOptional"] };
}

export const withSourceQuery = <TSourceSchemaType extends ISourceSchemaType>(
    {
        create:        {useMutation: useCreate},
        patch:         {useMutation: usePatch},
        patchBy:       {useMutation: usePatchBy},
        upsert:        {useMutation: useUpsert},
        delete:        {useMutation: useDelete},
        deleteWith:    {useMutation: useDeleteWith},
        query:         {useQuery},
        count:         {useQuery: useCount},
        fetch:         {useQuery: useFetch},
        fetch$: {useQuery: useFetchOptional},
        get:          {useQuery: useGet},
        get$:  {useQuery: useGet$},
    }: IWithSourceQueryProps<TSourceSchemaType>
): IUseSourceQuery<TSourceSchemaType> => ({
    useCreate,
    usePatch,
    usePatchBy,
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
