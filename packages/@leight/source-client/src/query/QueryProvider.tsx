import {
    type ISource,
    type ISourceSchema,
    type SourceType
}                               from "@leight/source";
import {type PropsWithChildren} from "react";

export type IQueryProviderInternalProps<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>,
> = PropsWithChildren<{
    /**
     * Typed query context used to provide Query; this should be usually generated
     * by SDK or you can use `createQueryStore`.
     */
    QueryContext: ISource.IQueryContext<TSourceSchema>;
    /**
     * The default filter could be replaced or merged, but it's not applied all the times
     */
    defaultFilter?: TSourceType["Filter"];
    /**
     * Filter applied all the times (for example when you need to fix filters on clientId or
     * whatever).
     */
    applyFilter?: TSourceType["Filter"];
    /**
     * Default sorting could be replaced or merged, but it's not forced
     */
    defaultSort?: TSourceType["Sort"];
    defaultCursor?: TSourceType["Cursor"];
}>;
export type IQueryProviderProps<TSourceSchema extends ISourceSchema> = IQueryProviderInternalProps<TSourceSchema>;

export const QueryProvider = <TSourceSchema extends ISourceSchema>(
    {
        QueryContext,
        defaultFilter,
        applyFilter,
        defaultSort,
        defaultCursor,
        children,
    }: IQueryProviderInternalProps<TSourceSchema>) => {
    return <QueryContext.Provider
        defaults={{
            filter:      defaultFilter,
            applyFilter: applyFilter,
            sort:        defaultSort,
            page:        defaultCursor?.page || 0,
            size:        defaultCursor?.size || 30,
        }}
    >
        {children}
    </QueryContext.Provider>;
};
