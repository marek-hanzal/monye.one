import {
    type ISourceSchema,
    type ISourceStore,
    type IUseSourceQuery
} from "@leight/source";
import {
    type PropsWithChildren,
    useEffect
} from "react";
import {
    CursorProvider,
    CursorStore
} from "../context";

export type ICursorControlProps<TSourceSchema extends ISourceSchema> = PropsWithChildren<{
    SourceStore: ISourceStore<TSourceSchema>;
    USeSourceQuery: IUseSourceQuery<TSourceSchema>;
    defaultCursor?: TSourceSchema["Cursor"];
}>;

type IInternalCursor<TSourceSchema extends ISourceSchema> = ICursorControlProps<TSourceSchema>;

const InternalCursor = <TSourceSchema extends ISourceSchema>(
    {
        SourceStore,
        USeSourceQuery,
        children,
    }: IInternalCursor<TSourceSchema>) => {
    const {setTotal, setIsLoading} = CursorStore.useState(({setTotal, setIsLoading}) => ({setTotal, setIsLoading}));
    const {filter}                 = SourceStore.Filter.useState(({filter}) => ({filter}));
    const query                    = USeSourceQuery.useCount({
        filter,
    }, {
        staleTime: undefined,
        cacheTime: undefined,
        onSuccess: data => {
            setTotal(data);
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });
    useEffect(() => {
        query.isFetching && setIsLoading(true);
    }, [query.isFetching]);
    return <>{children}</>;
};

export const CursorControl = <TSourceSchema extends ISourceSchema>(
    {
        defaultCursor,
        ...props
    }: ICursorControlProps<TSourceSchema>) => {
    return <CursorProvider
        defaults={defaultCursor}
    >
        <InternalCursor
            {...props}
        />
    </CursorProvider>;
};
