import {type IStoreProvider}       from "@leight/context";
import {CursorControl}             from "@leight/cursor-client";
import {type IUseCursorCountQuery} from "@leight/query";
import {type ISortStoreProps}      from "@leight/sort";
import {type ISourceSchema}        from "@leight/source";
import {type PropsWithChildren}    from "react";

export type IQueryProviderInternalProps<TSourceSchema extends ISourceSchema> = PropsWithChildren<{
    SortProvider: IStoreProvider<ISortStoreProps<TSourceSchema["SortSchema"]>>;
    useCountQuery: IUseCursorCountQuery<TSourceSchema["QuerySchema"]>;
    defaultSort?: TSourceSchema["Sort"];
    defaultCursor?: TSourceSchema["Cursor"];
}>;
export type IQueryProviderProps<TSourceSchema extends ISourceSchema> = Omit<IQueryProviderInternalProps<TSourceSchema>, "useCountQuery" | "SortProvider">;

export const QueryProvider = <TSourceSchema extends ISourceSchema>(
    {
        SortProvider,
        defaultSort,
        defaultCursor,
        useCountQuery,
        children,
    }: IQueryProviderInternalProps<TSourceSchema>) => {
    return <SortProvider
        defaults={{sort: defaultSort}}
    >
        <CursorControl
            useCountQuery={useCountQuery}
            defaultCursor={defaultCursor}
        >
            {children}
        </CursorControl>
    </SortProvider>;
};
