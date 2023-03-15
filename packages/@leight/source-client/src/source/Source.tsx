import {type IStoreProvider}    from "@leight/context-client";
import {type IQuerySchema}      from "@leight/query";
import {type IUseQueryStore}    from "@leight/query-client";
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
    readonly useQueryStore: IUseQueryStore<TQuerySchema>;
    readonly SourceProvider: IStoreProvider<ISourceStoreProps<TSchema>>;
    readonly children?: ((store: IStoreApi<ISourceStoreProps<TSchema>>) => ReactNode) | ReactNode;

    onSuccess?(entities: z.infer<TSchema>[]): void;
}

interface ISourceInternalProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> extends Pick<ISourceProps<TQuerySchema, TSchema>, "schema" | "useQuery" | "useQueryStore" | "onSuccess" | "children"> {
    readonly sourceContext: IStoreApi<ISourceStoreProps<TSchema>>;
}

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

    /**
     * @TODO Change getQuery to just query and update query state directly (that means store would have final query shape).
     */

    console.log("SourceInternal: See todo here");

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

    return <>{isCallable(children) ? children(sourceContext) : children}</>;
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
