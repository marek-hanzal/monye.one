import {
    type ISourceSchemaType,
    type ISourceStore
}                               from "@leight/source";
import {type PropsWithChildren} from "react";

export type IQueryProviderInternalProps<TSourceSchemaType extends ISourceSchemaType> = PropsWithChildren<{
    SourceStore: ISourceStore<TSourceSchemaType>;
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
        defaultFilter,
        defaultSort,
        defaultCursor,
        children,
    }: IQueryProviderInternalProps<TSourceSchemaType>) => {
    return <SourceStore.Query.Provider
        defaults={{
            filter: defaultFilter,
            sort:   defaultSort,
            page:   defaultCursor?.page || 0,
            size:   defaultCursor?.size || 30,
        }}
    >
        {children}
    </SourceStore.Query.Provider>;
};
