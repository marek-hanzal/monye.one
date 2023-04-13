import {type IStoreProvider}       from "@leight/context";
import {CursorControl}             from "@leight/cursor-client";
import {
    type IFilterStoreProps,
    type IUseFilterState
}                                  from "@leight/filter";
import {type IUseCursorCountQuery} from "@leight/query";
import {type ISortStoreProps}      from "@leight/sort";
import {type ISourceSchema}        from "@leight/source";
import {type PropsWithChildren}    from "react";

export type IQueryProviderInternalProps<TSourceSchema extends ISourceSchema> = PropsWithChildren<{
    /**
     * Typed filter provider
     */
    FilterProvider: IStoreProvider<IFilterStoreProps<TSourceSchema["FilterSchema"]>>;
    /**
     * Specify query filter state
     */
    useFilterState: IUseFilterState<TSourceSchema["FilterSchema"]>;
    /**
     * Typed sort provider
     */
    SortProvider: IStoreProvider<ISortStoreProps<TSourceSchema["SortSchema"]>>;
    /**
     * Typed query used to get entity count
     */
    useCountQuery: IUseCursorCountQuery<TSourceSchema["QuerySchema"]>;
    /**
     * The default filter could be replaced or merged, but it's not applied all the times
     */
    defaultFilter?: TSourceSchema["Filter"];
    /**
     * Default sorting could be replaced or merged, but it's not forced
     */
    defaultSort?: TSourceSchema["Sort"];
    defaultCursor?: TSourceSchema["Cursor"];
}>;
export type IQueryProviderProps<TSourceSchema extends ISourceSchema> = Omit<IQueryProviderInternalProps<TSourceSchema>, "useCountQuery" | "useFilterState" | "SortProvider" | "FilterProvider">;

export const QueryProvider = <TSourceSchema extends ISourceSchema>(
    {
        FilterProvider,
        useFilterState,
        SortProvider,
        defaultFilter,
        defaultSort,
        defaultCursor,
        useCountQuery,
        children,
    }: IQueryProviderInternalProps<TSourceSchema>) => {
    return <FilterProvider
        defaults={{filter: defaultFilter}}
    >
        <SortProvider
            defaults={{sort: defaultSort}}
        >
            <CursorControl
                useCountQuery={useCountQuery}
                useFilterState={useFilterState}
                defaultCursor={defaultCursor}
            >
                {children}
            </CursorControl>
        </SortProvider>
    </FilterProvider>;
};
