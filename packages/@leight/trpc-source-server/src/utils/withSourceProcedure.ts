import {
    type BindKey,
    type IContainer
}                    from "@leight/container";
import {
    ISourceSchema,
    type ISourceSchemaType,
    type ISourceService,
    type IWithIdentity,
    type IWithOptionalIdentity,
    WithIdentitySchema,
    WithOptionalIdentitySchema
}                    from "@leight/source";
import {withHandler} from "@leight/trpc-server";
import {z}           from "@leight/zod";

export interface IWithSourceProcedureProps<TSourceSchemaType extends ISourceSchemaType> {
    sourceService: BindKey;
    schema: ISourceSchema.of<TSourceSchemaType>;
}

export const withSourceProcedure = <TSourceSchemaType extends ISourceSchemaType>(
    {
        sourceService,
        schema,
    }: IWithSourceProcedureProps<TSourceSchemaType>) => {

    const withSourceService = (container: IContainer) => {
        return container.resolve<ISourceService<TSourceSchemaType>>(sourceService);
    };

    return {
        CreateSchema:       z.object({
            toCreate: schema.ToCreateSchema,
        }),
        handleCreate:       withHandler<ISourceService.IHandleCreateProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleCreate(request),
        }),
        PatchSchema:        z.object({
            toPatch: schema.ToPatchSchema,
            filter:  schema.FilterSchema,
        }),
        handlePatch:        withHandler<ISourceService.IHandlePatchProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handlePatch(request),
        }),
        UpsertSchema:       z.object({
            toCreate: schema.ToCreateSchema,
            toPatch:  schema.ToPatchSchema,
            filter:   schema.FilterSchema,
        }),
        handleUpsert:       withHandler<ISourceService.IHandleUpsertProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleUpsert(request),
        }),
        DeleteSchema:       WithIdentitySchema,
        handleDelete:       withHandler<IWithIdentity, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().delete(request)
                );
            },
        }),
        DeleteWithSchema:   schema.QuerySchema,
        handleDeleteWith:   withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().deleteWith(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        QuerySchema:        schema.QueryOptionalSchema,
        handleQuery:        withHandler<TSourceSchemaType["QueryOptional"], TSourceSchemaType["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().query(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        CountSchema:        schema.QueryOptionalSchema,
        handleCount:        withHandler<TSourceSchemaType["QueryOptional"], number>({
            handler: async ({container, request}) => withSourceService(container).source().count(request),
        }),
        FetchSchema:        schema.QuerySchema,
        handleFetch:        withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().fetch(request)
                );
            },
        }),
        FindSchema:         WithIdentitySchema,
        handleFind:         withHandler<IWithIdentity, TSourceSchemaType["Dto"]>({
            handler: async ({container, request: {id}}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().find(id)
                );
            },
        }),
        FindOptionalSchema: WithOptionalIdentitySchema,
        handleFindOptional: withHandler<IWithOptionalIdentity, TSourceSchemaType["Dto"] | null>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                const entity         = await $sourceService.source().findOptional(request?.id);
                return entity ? $sourceService.toDto(
                    entity
                ) : null;
            },
        }),
    };
};

