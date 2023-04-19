import {
    type ISourceSchema,
    type IUseSourceQuery
} from "@leight/source";

export type IWithSourceQueryProps<TSourceSchema extends ISourceSchema> = {
    query: { useQuery: IUseSourceQuery<TSourceSchema>["useQuery"] };
    count: { useQuery: IUseSourceQuery<TSourceSchema>["useCount"] };
    fetch: { useQuery: IUseSourceQuery<TSourceSchema>["useFetch"] };
    find: { useQuery: IUseSourceQuery<TSourceSchema>["useFind"] };
}

export const withSourceQuery = <TSourceSchema extends ISourceSchema>(
    {
        query: {useQuery},
        count: {useQuery: useCount},
        fetch: {useQuery: useFetch},
        find:  {useQuery: useFind},
    }: IWithSourceQueryProps<TSourceSchema>
): IUseSourceQuery<TSourceSchema> => ({
    useQuery,
    useCount,
    useFetch,
    useFind,
});
