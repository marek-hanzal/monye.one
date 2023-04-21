import {
    type ISourceSchemaType,
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

export type ICursorControlProps<TSourceSchemaType extends ISourceSchemaType> = PropsWithChildren<{
    SourceStore: ISourceStore<TSourceSchemaType>;
    UseSourceQuery: IUseSourceQuery<TSourceSchemaType>;
    defaultCursor?: TSourceSchemaType["Cursor"];
}>;

type IInternalCursor<TSourceSchemaType extends ISourceSchemaType> = ICursorControlProps<TSourceSchemaType>;

const InternalCursor = <TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        UseSourceQuery,
        children,
    }: IInternalCursor<TSourceSchemaType>) => {
    const {setTotal, setIsLoading} = CursorStore.useState(({setTotal, setIsLoading}) => ({setTotal, setIsLoading}));
    const {filter}                 = SourceStore.Filter.useState(({filter}) => ({filter}));
    const query                    = UseSourceQuery.useCount({
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

export const CursorControl = <TSourceSchemaType extends ISourceSchemaType>(
    {
        defaultCursor,
        ...props
    }: ICursorControlProps<TSourceSchemaType>) => {
    console.log("CursorControl");
    return <CursorProvider
        defaults={defaultCursor}
    >
        <InternalCursor
            {...props}
        />
    </CursorProvider>;
};
