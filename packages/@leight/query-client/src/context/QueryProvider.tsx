import {CursorControl}          from "@leight/cursor-client";
import {
    type ISourceSchema,
    type ISourceStore,
    type IUseSourceQuery
}                               from "@leight/source";
import {type PropsWithChildren} from "react";

export type IQueryProviderInternalProps<TSourceSchema extends ISourceSchema> = PropsWithChildren<{
    SourceStore: ISourceStore<TSourceSchema>;
    UseSourceQuery: IUseSourceQuery<TSourceSchema>;
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
export type IQueryProviderProps<TSourceSchema extends ISourceSchema> = Omit<IQueryProviderInternalProps<TSourceSchema>, "SourceStore" | "UseSourceQuery">;

export const QueryProvider = <TSourceSchema extends ISourceSchema>(
    {
        SourceStore,
        UseSourceQuery,
        defaultFilter,
        defaultSort,
        defaultCursor,
        children,
    }: IQueryProviderInternalProps<TSourceSchema>) => {
    return <SourceStore.Filter.Provider
        defaults={{filter: defaultFilter}}
    >
        <SourceStore.Sort.Provider
            defaults={{sort: defaultSort}}
        >
            <CursorControl
                USeSourceQuery={UseSourceQuery}
                SourceStore={SourceStore}
                defaultCursor={defaultCursor}
            >
                {children}
            </CursorControl>
        </SourceStore.Sort.Provider>
    </SourceStore.Filter.Provider>;
};
