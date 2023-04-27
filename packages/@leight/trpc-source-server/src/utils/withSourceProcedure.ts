import {
    type BindKey,
    type IContainer
}                    from "@leight/container";
import {
    type ISourceSchemaType,
    type ISourceService,
    type IWithIdentity,
    IWithOptionalIdentity
}                    from "@leight/source";
import {withHandler} from "@leight/trpc-server";

export interface IWithSourceProcedureProps {
    sourceService: BindKey;
}

export const withSourceProcedure = <TSourceSchemaType extends ISourceSchemaType>(
    {
        sourceService,
    }: IWithSourceProcedureProps) => {

    const withSourceService = (container: IContainer) => {
        return container.resolve<ISourceService<TSourceSchemaType>>(sourceService);
    };

    return {
        handleCreate:       withHandler<TSourceSchemaType["ToCreate"], TSourceSchemaType["Dto"]>({
            handler: async ({container, request: toCreate}) => withSourceService(container).handleCreate({toCreate}),
        }),
        handlePatch:        withHandler<TSourceSchemaType["ToPatch"], TSourceSchemaType["Dto"]>({
            handler: async ({container, request: toPatch}) => withSourceService(container).handlePatch({toPatch}),
        }),
        handleDelete:       withHandler<IWithIdentity, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().delete(request)
                );
            },
        }),
        handleDeleteWith:   withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().deleteWith(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        handleQuery:        withHandler<TSourceSchemaType["QueryOptional"], TSourceSchemaType["Dto"][]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return Promise.all(
                    (await $sourceService.source().query(request)).map(item => $sourceService.toDto(item))
                );
            },
        }),
        handleCount:        withHandler<TSourceSchemaType["QueryOptional"], number>({
            handler: async ({container, request}) => withSourceService(container).source().count(request),
        }),
        handleFetch:        withHandler<TSourceSchemaType["Query"], TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().fetch(request)
                );
            },
        }),
        handleFind:         withHandler<IWithIdentity, TSourceSchemaType["Dto"]>({
            handler: async ({container, request: {id}}) => {
                const $sourceService = withSourceService(container);
                return $sourceService.toDto(
                    await $sourceService.source().find(id)
                );
            },
        }),
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

