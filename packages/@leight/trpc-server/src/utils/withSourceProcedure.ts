import {BindKey} from "@leight/container";
import {
    type ISource,
    type ISourceSchema,
    WithIdentitySchema
}                from "@leight/source";
import {
    withFetchHandler,
    withFindHandler,
    withSourceCountHandler,
    withSourceHandler
}                from "./withHandler";

export interface IWithSourceProcedureProps<TSourceSchema extends ISourceSchema, TSchema extends TSourceSchema["QuerySchema"]> {
    source: BindKey;
    schema: TSchema;
}

export const withSourceProcedure = <TSourceSchema extends ISourceSchema, TSchema extends TSourceSchema["QuerySchema"] = TSourceSchema["QuerySchema"]>({source, schema}: IWithSourceProcedureProps<TSourceSchema, TSchema>) => {
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
