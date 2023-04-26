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
    cacheTime?: number;
}>;

type IInternalCursor<TSourceSchemaType extends ISourceSchemaType> = ICursorControlProps<TSourceSchemaType>;

const InternalCursor = <TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        UseSourceQuery,
        cacheTime,
        children,
    }: IInternalCursor<TSourceSchemaType>) => {
    const $cacheTime = cacheTime ? cacheTime * 1000 : undefined;

    /**
     * @TODO move the code here to cursor's useState; bind required object there...?
     *
     * Move CursorStore to SourceStore, so it can access everything?
     */

    const {setTotal, setIsLoading} = CursorStore.useState(({setTotal, setIsLoading}) => ({setTotal, setIsLoading}));
    const {filter}                 = SourceStore.Filter.useState(({filter}) => ({filter}));
    const result                   = UseSourceQuery.useCount({
        filter,
    }, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
        onSuccess: setTotal,
        onSettled: () => setIsLoading(false),
    });
    useEffect(
        () => {
            result.isFetching && setIsLoading(true);
        },
        [result.isFetching]
    );

    useEffect(() => {
        if (result.isSuccess) {
            setTotal(result.data);
            setIsLoading(false);
        }
    }, [
        result.dataUpdatedAt,
        result.isSuccess,
    ]);

    return <>{children}</>;
};

export const CursorControl = <TSourceSchemaType extends ISourceSchemaType>(
    {
        defaultCursor,
        ...props
    }: ICursorControlProps<TSourceSchemaType>) => {
    return <CursorProvider
        defaults={defaultCursor}
    >
        <InternalCursor
            {...props}
        />
    </CursorProvider>;
};
