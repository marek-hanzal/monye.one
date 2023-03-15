import {type IStoreProvider}    from "@leight/context-client";
import {useCursorState}         from "@leight/cursor-client";
import {type IQuerySchema}      from "@leight/query";
import {
    type IEntitySchema,
    type IUseQuery
}                               from "@leight/source";
import {isCallable}             from "@leight/utils";
import {type IStoreApi}         from "@leight/zustand";
import {
    ReactNode,
    useEffect
}                               from "react";
import {z}                      from "zod";
import {type ISourceStoreProps} from "../hook";

export interface ISourceProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> {
    readonly schema: TSchema;
    readonly useQuery: IUseQuery<z.infer<TQuerySchema> | undefined, z.infer<TSchema>[]>;
    readonly SourceProvider: IStoreProvider<ISourceStoreProps<TSchema>>;
    readonly children?: ((store: IStoreApi<ISourceStoreProps<TSchema>>) => ReactNode) | ReactNode;

    onSuccess?(entities: z.infer<TSchema>[]): void;
}

export type ISourceExProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> = Omit<ISourceProps<TQuerySchema, TSchema>, "schema" | "SourceProvider" | "useQuery">;

interface ISourceInternalProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> extends Pick<ISourceProps<TQuerySchema, TSchema>, "schema" | "useQuery" | "onSuccess" | "children"> {
    readonly sourceContext: IStoreApi<ISourceStoreProps<TSchema>>;
}

const SourceInternal = <
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
>({
      sourceContext,
      schema,
      useQuery,
      onSuccess,
      children,
  }: ISourceInternalProps<TQuerySchema, TSchema>) => {
    const {page, size} = useCursorState(({page, size}) => ({page, size}));
    const result       = useQuery({
        cursor: {
            page,
            size,
        }
    }, {
        onSuccess,
    });

    useEffect(() => {
        if (result.isSuccess) {
            const $data = result.data.filter(item => schema.safeParse(item).success);
            onSuccess?.($data);
            sourceContext.state.setEntities($data);
        }
    }, [
        page,
        size,
        result.isSuccess,
        result.isLoading,
        result.isFetching,
    ]);
    useEffect(() => {
        sourceContext.state.setIsLoading(result.isLoading);
    }, [result.isLoading]);
    useEffect(() => {
        sourceContext.state.setIsFetching(result.isFetching);
    }, [result.isFetching]);

    return <>{isCallable(children) ? children(sourceContext) : children}</>;
};

export const Source = <
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
>(
    {
        schema,
        useQuery,
        onSuccess,
        SourceProvider,
        children,
        ...props
    }: ISourceProps<TQuerySchema, TSchema>) => {
    return <SourceProvider
        {...props}
    >
        {(sourceContext) => <SourceInternal
            sourceContext={sourceContext}
            schema={schema}
            useQuery={useQuery}
            onSuccess={onSuccess}
        >
            {children}
        </SourceInternal>}
    </SourceProvider>;
};
