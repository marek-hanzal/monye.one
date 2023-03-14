import {type IStoreProvider}    from "@leight/context-client";
import {type IQuerySchema}      from "@leight/query";
import {
    type IEntitySchema,
    type IUseQuery
}                               from "@leight/source";
import {type IStoreApi}         from "@leight/zustand";
import {type PropsWithChildren} from "react";
import {z}                      from "zod";
import {type ISourceStoreProps} from "../hook";

export type ISourceProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> = PropsWithChildren<{
    schema: TSchema;
    useQuery: IUseQuery<z.infer<TQuerySchema> | undefined, z.infer<TSchema>[]>;
    SourceProvider: IStoreProvider<ISourceStoreProps<TSchema>>;

    onSuccess?(entities: z.infer<TSchema>[]): void;
}>;

type ISourceInternalProps<
    TQuerySchema extends IQuerySchema,
    TSchema extends IEntitySchema,
> = PropsWithChildren<Pick<ISourceProps<TQuerySchema, TSchema>, "schema" | "useQuery" | "onSuccess" | "children"> & {
    sourceContext: IStoreApi<ISourceStoreProps<TSchema>>;
}>

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
    /**
     * @TODO useFilter and so on
     */

    useQuery({}, {
        onSuccess: data => {
            const $data = data.filter(item => schema.safeParse(item).success);
            onSuccess?.($data);
            sourceContext.state.setEntities($data);
        },
    });

    return <>{children}</>;
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
