import {type IUseFilterState}      from "@leight/filter";
import {type IUseCursorCountQuery} from "@leight/query";
import {type ISourceSchema}        from "@leight/source";
import {
    type PropsWithChildren,
    useEffect
}                                  from "react";
import {
    CursorProvider,
    CursorStore
}                                  from "../context";

export type ICursorControlProps<TSourceSchema extends ISourceSchema> = PropsWithChildren<{
    useCountQuery: IUseCursorCountQuery<TSourceSchema["QuerySchema"]>;
    useFilterState: IUseFilterState<TSourceSchema["FilterSchema"]>;
    defaultCursor?: TSourceSchema["Cursor"];
}>;

type IInternalCursor<TSourceSchema extends ISourceSchema> = ICursorControlProps<TSourceSchema>;

const InternalCursor = <TSourceSchema extends ISourceSchema>(
    {
        useCountQuery,
        useFilterState,
        children,
    }: IInternalCursor<TSourceSchema>) => {
    const {setTotal, setIsLoading} = CursorStore.useState(({setTotal, setIsLoading}) => ({setTotal, setIsLoading}));
    const {filter}                 = useFilterState(({filter}) => ({filter}));
    const query                    = useCountQuery({
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
