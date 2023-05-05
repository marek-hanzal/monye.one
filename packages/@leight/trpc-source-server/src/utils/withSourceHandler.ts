import {
    type BindKey,
    type IContainer
}                    from "@leight/container";
import {
    IRepositoryService,
    IRepositoryServiceSchema,
    type RepositoryServiceType
}                    from "@leight/source";
import {withHandler} from "@leight/trpc-server";

export interface IWithSourceHandlerProps<
    TRepositoryServiceSchema extends IRepositoryServiceSchema,
> {
    sourceService: BindKey;
}

export const withSourceHandler = <
    TRepositoryServiceSchema extends IRepositoryServiceSchema,
    TRepositoryServiceType extends RepositoryServiceType<TRepositoryServiceSchema> = RepositoryServiceType<TRepositoryServiceSchema>,
>({sourceService}: IWithSourceHandlerProps<TRepositoryServiceSchema>) => {

    const withSourceService = (container: IContainer) => {
        return container.resolve<IRepositoryService<TRepositoryServiceSchema>>(sourceService);
    };

    return {
        handleCreate:   withHandler<TRepositoryServiceType["ToCreate"], TRepositoryServiceType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleCreate(request),
        }),
        handlePatch:    withHandler<TRepositoryServiceType["ToPatchProps"], TRepositoryServiceType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handlePatch(request),
        }),
        handlePatchBy:  withHandler<TRepositoryServiceType["ToPatchByProps"], unknown>({
            handler: async ({container, request}) => withSourceService(container).handlePatchBy(request),
        }),
        handleUpsert:   withHandler<TRepositoryServiceType["ToUpsertProps"], TRepositoryServiceType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleUpsert(request),
        }),
        handleDelete:   withHandler<TRepositoryServiceType["Delete"], TRepositoryServiceType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleDelete(request),
        }),
        handleDeleteBy: withHandler<TRepositoryServiceType["DeleteBy"], unknown>({
            handler: async ({container, request}) => withSourceService(container).handleDeleteBy(request),
        }),
        handleQuery:    withHandler<TRepositoryServiceType["Query"], TRepositoryServiceType["Dto"][]>({
            handler: async ({container, request}) => withSourceService(container).handleQuery(request),
        }),
        handleCount:    withHandler<TRepositoryServiceType["Count"], number>({
            handler: async ({container, request}) => withSourceService(container).handleCount(request),
        }),
        handleFetch:    withHandler<TRepositoryServiceType["Fetch$"], TRepositoryServiceType["Dto"]>({
            handler: async ({container, request}) => withSourceService(container).handleFetch(request),
        }),
        handleFetch$:   withHandler<TRepositoryServiceType["Fetch$"], TRepositoryServiceType["Dto"] | null>({
            handler: async ({container, request}) => withSourceService(container).handleFetch$(request),
        }),
        handleGet:      withHandler<string, TRepositoryServiceType["Dto"]>({
            handler: async ({container, request: id}) => withSourceService(container).handleGet(id),
        }),
        handleGet$:     withHandler<string | null, TRepositoryServiceType["Dto"] | null>({
            handler: async ({container, request: id}) => withSourceService(container).handleGet$(id),
        }),
    };
};

