import {
    type BindKey,
    IContainer
}                    from "@leight/container";
import {
    type ISourceSchema,
    type ISourceService,
    type IWithIdentity,
    WithIdentitySchema
}                    from "@leight/source";
import {withHandler} from "@leight/trpc-server";

export interface IWithSourceProcedureProps<TSourceSchema extends ISourceSchema> {
    sourceService: BindKey;
    schema: {
        create: TSourceSchema["ToCreateSchema"];
        patch: TSourceSchema["ToPatchSchema"];
        query: TSourceSchema["QuerySchema"];
    };
}

export const withSourceProcedure = <TSourceSchema extends ISourceSchema>(
    {
        sourceService,
        schema,
    }: IWithSourceProcedureProps<TSourceSchema>) => {

    const withSourceService = (container: IContainer) => {
        return container.resolve<ISourceService<TSourceSchema>>(sourceService);
    };

    return {
        QuerySchema:         schema.query,
        QueryOptionalSchema: schema.query.optional(),
        CreateSchema:        schema.create,
        PatchSchema:         schema.patch,
        IdentitySchema:      WithIdentitySchema,
        Create:              withHandler<TSourceSchema["ToCreate"], TSourceSchema["Dto"]>({
            handler: async ({container, request: toCreate}) => withSourceService(container).handleCreate({toCreate}),
        }),
        Patch:               withHandler<TSourceSchema["ToPatch"], TSourceSchema["Dto"]>({
            handler: async ({container, request: toPatch}) => withSourceService(container).handlePatch({toPatch}),
        }),
        Delete:              withHandler<IWithIdentity, TSourceSchema["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().delete(request)
                );
            },
        }),
        DeleteWith:          withHandler<TSourceSchema["Query"], TSourceSchema["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().deleteWith(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        Query:               withHandler<TSourceSchema["Query"] | undefined, TSourceSchema["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().query(request)).map(item =>  $sourceService.toDto(item))
                );
            },
        }),
        QueryCount:          withHandler<TSourceSchema["Query"] | undefined, number>({
            handler: async ({container, request}) => withSourceService(container).source().count(request),
        }),
        Fetch:               withHandler<TSourceSchema["Query"], TSourceSchema["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().fetch(request)
                );
            },
        }),
        Find:                withHandler<IWithIdentity, TSourceSchema["Dto"]>({
            handler: async ({container, request: {id}}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().find(id)
                );
            },
        }),
    };
};

