import {type BindKey} from "@leight/container";
import {
    type ISource,
    type ISourceSchema,
    type IWithIdentity,
    WithIdentitySchema
}                     from "@leight/source";
import {
    type IWithHandlerProps,
    withHandler
}                     from "@leight/trpc-server";

export const withSourceHandler      = <TSourceSchema extends ISourceSchema>(props: IWithHandlerProps<TSourceSchema["Query"] | undefined, TSourceSchema["Entity"][]>) => withHandler<TSourceSchema["Query"] | undefined, TSourceSchema["Entity"][]>(props);
export const withSourceCountHandler = <TSourceSchema extends ISourceSchema>(props: IWithHandlerProps<TSourceSchema["Query"] | undefined, number>) => withHandler<TSourceSchema["Query"] | undefined, number>(props);
export const withFetchHandler       = <TSourceSchema extends ISourceSchema>(props: IWithHandlerProps<TSourceSchema["Query"], TSourceSchema["Entity"]>) => withHandler<TSourceSchema["Query"], TSourceSchema["Entity"]>(props);
export const withFindHandler        = <TSourceSchema extends ISourceSchema>(props: IWithHandlerProps<IWithIdentity, TSourceSchema["Entity"]>) => withHandler<IWithIdentity, TSourceSchema["Entity"]>(props);

export interface IWithSourceProcedureProps<TSourceSchema extends ISourceSchema> {
    source: BindKey;
    schema: TSourceSchema["QuerySchema"];
}

export const withSourceProcedure = <TSourceSchema extends ISourceSchema>({source, schema}: IWithSourceProcedureProps<TSourceSchema>) => {
    return {
        QuerySchema:         schema,
        QueryOptionalSchema: schema.optional(),
        IdentitySchema:      WithIdentitySchema,
        Query:               withSourceHandler<TSourceSchema>({
            handler: async ({container, request}) => container.resolve<ISource<TSourceSchema>>(source).query(request),
        }),
        QueryCount:          withSourceCountHandler<TSourceSchema>({
            handler: async ({container, request}) => container.resolve<ISource<TSourceSchema>>(source).count(request),
        }),
        Fetch:               withFetchHandler<TSourceSchema>({
            handler: async ({container, request}) => container.resolve<ISource<TSourceSchema>>(source).fetch(request),
        }),
        Find:                withFindHandler<TSourceSchema>({
            handler: async ({container, request: {id}}) => container.resolve<ISource<TSourceSchema>>(source).find(id),
        }),
    };
};

