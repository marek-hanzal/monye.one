import {
    type BindKey,
    type IContainer
}                    from "@leight/container";
import {
    type ISourceSchema,
    type ISourceSchemaType,
    type ISourceService,
    type IWithIdentity,
    type IWithOptionalIdentity,
    withCreateSchema,
    WithIdentitySchema,
    WithOptionalIdentitySchema,
    withPatchSchema,
    withUpsertSchema
}                    from "@leight/source";
import {withHandler} from "@leight/trpc-server";

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
        CreateSchema:        withCreateSchema<TSourceSchemaType>(schema),
        handleCreate:        withHandler<ISourceService.IHandleCreateProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleCreate(request),
        }),
        PatchSchema:         withPatchSchema<TSourceSchemaType>(schema),
        handlePatch:         withHandler<ISourceService.IHandlePatchProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handlePatch(request),
        }),
        UpsertSchema:        withUpsertSchema<TSourceSchemaType>(schema),
        handleUpsert:        withHandler<ISourceService.IHandleUpsertProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleUpsert(request),
        }),
        DeleteSchema:        WithIdentitySchema,
        handleDelete:        withHandler<IWithIdentity, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().delete(request)
                );
            },
        }),
        DeleteWithSchema:    schema.QuerySchema,
        handleDeleteWith:    withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().deleteWith(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        QuerySchema:         schema.QueryOptionalSchema,
        handleQuery:         withHandler<TSourceSchemaType["QueryOptional"], TSourceSchemaType["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().query(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        CountSchema:         schema.QueryOptionalSchema,
        handleCount:         withHandler<TSourceSchemaType["QueryOptional"], number>({
            handler: async ({container, request}) => withSourceService(container).source().count(request),
        }),
        FetchSchema:         schema.QuerySchema,
        handleFetch:         withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().fetch(request)
                );
            },
        }),
        handleFetchOptional: withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"] | null>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                const entity         = await $sourceService.source().fetchOptional(request);
                return entity ? $sourceService.toDto(
                    entity
                ) : null;
            },
        }),
        FindSchema:          WithIdentitySchema,
        handleFind:          withHandler<IWithIdentity, TSourceSchemaType["Dto"]>({
            handler: async ({container, request: {id}}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().find(id)
                );
            },
        }),
        FindOptionalSchema:  WithOptionalIdentitySchema,
        handleFindOptional:  withHandler<IWithOptionalIdentity, TSourceSchemaType["Dto"] | null>({
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

