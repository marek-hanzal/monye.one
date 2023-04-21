import {CursorControl}          from "@leight/cursor-client";
import {
    type ISourceSchemaType,
    type ISourceStore,
    type IUseSourceQuery
}                               from "@leight/source";
import {type PropsWithChildren} from "react";

export type IQueryProviderInternalProps<TSourceSchemaType extends ISourceSchemaType> = PropsWithChildren<{
    SourceStore: ISourceStore<TSourceSchemaType>;
    UseSourceQuery: IUseSourceQuery<TSourceSchemaType>;
    /**
     * The default filter could be replaced or merged, but it's not applied all the times
     */
    defaultFilter?: TSourceSchemaType["Filter"];
    /**
     * Default sorting could be replaced or merged, but it's not forced
     */
    defaultSort?: TSourceSchemaType["Sort"];
    defaultCursor?: TSourceSchemaType["Cursor"];
}>;
export type IQueryProviderProps<TSourceSchemaType extends ISourceSchemaType> = Omit<IQueryProviderInternalProps<TSourceSchemaType>, "SourceStore" | "UseSourceQuery">;

export const QueryProvider = <TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        UseSourceQuery,
        defaultFilter,
        defaultSort,
        defaultCursor,
        children,
    }: IQueryProviderInternalProps<TSourceSchemaType>) => {
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
