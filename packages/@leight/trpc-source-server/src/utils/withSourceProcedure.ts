import {
    type BindKey,
    type IContainer
}                    from "@leight/container";
import {
    type ISourceSchemaType,
    type ISourceService,
    type IWithIdentity,
    type IWithOptionalIdentity
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
        handleCreate:       withHandler<ISourceService.IHandleCreateProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleCreate(request),
        }),
        handlePatch:        withHandler<ISourceService.IHandlePatchProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handlePatch(request),
        }),
        handleUpsert:       withHandler<ISourceService.IHandleUpsertProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleUpsert(request),
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

