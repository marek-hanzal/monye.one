import {type IStoreProvider}    from "@leight/context-client";
import {type IQuerySchema}      from "@leight/query";
import {type IUseQueryStore}    from "@leight/query-client";
import {
    type IEntitySchema,
    type IUseQuery
}                               from "@leight/source";
import {type IStoreApi}         from "@leight/zustand";
import {
    type PropsWithChildren,
    useEffect
}                               from "react";
import {z}                      from "zod";
import {type ISourceStoreProps} from "../hook";

export type ISourceProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> = PropsWithChildren<{
    readonly schema: TSchema;
    readonly useQuery: IUseQuery<z.infer<TQuerySchema> | undefined, z.infer<TSchema>[]>;
    readonly useQueryStore: IUseQueryStore<TQuerySchema>;
    readonly SourceProvider: IStoreProvider<ISourceStoreProps<TSchema>>;

    onSuccess?(entities: z.infer<TSchema>[]): void;
}>;

type ISourceInternalProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> = PropsWithChildren<Pick<ISourceProps<TQuerySchema, TSchema>, "schema" | "useQuery" | "useQueryStore" | "onSuccess" | "children"> & {
    readonly sourceContext: IStoreApi<ISourceStoreProps<TSchema>>;
}>

const SourceInternal = <
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
>({
      sourceContext,
      schema,
      useQuery,
      useQueryStore,
      onSuccess,
      children,
  }: ISourceInternalProps<TQuerySchema, TSchema>) => {
    const getQuery = useQueryStore(({getQuery}) => getQuery);
    const result   = useQuery(getQuery(), {
        onSuccess,
    });
    useEffect(() => {
        if (result.isSuccess) {
            const $data = result.data.filter(item => schema.safeParse(item).success);
            onSuccess?.($data);
            sourceContext.state.setEntities($data);
        }
    }, [result.isSuccess]);
    useEffect(() => {
        sourceContext.state.setIsLoading(result.isLoading);
    }, [result.isLoading]);
    useEffect(() => {
        sourceContext.state.setIsFetching(result.isFetching);
    }, [result.isFetching]);

    return <>{children}</>;
};

export const Source = <
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
>(
    {
        schema,
        useQuery,
        useQueryStore,
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
            useQueryStore={useQueryStore}
            onSuccess={onSuccess}
        >
            {children}
        </SourceInternal>}
    </SourceProvider>;
};
