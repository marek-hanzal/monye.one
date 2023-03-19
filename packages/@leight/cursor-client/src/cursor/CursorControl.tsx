import {
    type IQuerySchema,
    type IUseCursorCountQuery
}          from "@leight/query";
import {
    PropsWithChildren,
    useEffect
}          from "react";
import {z} from "zod";
import {
    CursorProvider,
    useCursorState
}          from "../context";

export type ICursorControlProps<TQuerySchema extends IQuerySchema> = PropsWithChildren<{
    useCountQuery: IUseCursorCountQuery<TQuerySchema>;
    defaultCursor?: z.infer<TQuerySchema>["cursor"];
}>;

type IInternalCursor<TQuerySchema extends IQuerySchema> = ICursorControlProps<TQuerySchema>;

const InternalCursor = <TQuerySchema extends IQuerySchema>({useCountQuery, children}: IInternalCursor<TQuerySchema>) => {
    const {setTotal, setIsLoading} = useCursorState(({setTotal, setIsLoading}) => ({setTotal, setIsLoading}));
    const result                   = useCountQuery({});
    useEffect(() => {
        if (result.isSuccess) {
            setTotal(result.data);
        }
        setIsLoading(!result.isSuccess || result.isError);
    }, [
        result.isSuccess,
        result.isError,
        result.isLoading,
        result.isFetching
    ]);
    return <>{children}</>;
};

export const CursorControl = <TQuerySchema extends IQuerySchema>(
    {
        defaultCursor,
        ...props
    }: ICursorControlProps<TQuerySchema>) => {
    return <CursorProvider
        defaults={defaultCursor}
    >
        <InternalCursor
            {...props}
        />
    </CursorProvider>;
};
