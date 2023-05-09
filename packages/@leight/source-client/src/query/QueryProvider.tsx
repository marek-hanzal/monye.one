import {type IStoreContext} from "@leight/context";
import {type IQueryStoreProps, type Source} from "@leight/source";
import {type PropsWithChildren} from "react";

export type IQueryProviderInternalProps<TSource extends Source> = PropsWithChildren<{
    /**
     * Typed query context used to provide Query; this should be usually generated
     * by SDK or you can use `createQueryStore`.
     */
    QueryContext: IStoreContext<IQueryStoreProps<TSource["Schema"]["Mapper"]>>;
    /**
     * The default filter could be replaced or merged, but it's not applied all the times
     */
    defaultFilter?: TSource["Type"]["Mapper"]["Filter"];
    /**
     * Filter applied all the times (for example when you need to fix filters on clientId or
     * whatever).
     */
    applyFilter?: TSource["Type"]["Mapper"]["Filter"];
    /**
     * Default sorting could be replaced or merged, but it's not forced
     */
    defaultSort?: TSource["Type"]["Mapper"]["Sort"];
    defaultCursor?: TSource["Type"]["Mapper"]["Cursor"];
}>;
export type IQueryProviderProps<TSource extends Source> = Omit<IQueryProviderInternalProps<TSource>, "SourceStore" | "UseSourceQuery">;

export const QueryProvider = <TSource extends Source>(
    {
        QueryContext,
        defaultFilter,
        applyFilter,
        defaultSort,
        defaultCursor,
        children,
    }: IQueryProviderInternalProps<TSource>) => {
    return <QueryContext.Provider
        defaults={{
            $filter: defaultFilter,
            $applyFilter: applyFilter,
            $sort: defaultSort,
            $page: defaultCursor?.page || 0,
            $size: defaultCursor?.size || 30,
        }}
    >
        {children}
    </QueryContext.Provider>;
};
