import {type BindKey}       from "@leight/container";
import {
    type ISource,
    type ISourceSchema,
    type IWithIdentity,
    WithIdentitySchema
}                           from "@leight/source";
import {type ISourceMapper} from "@leight/source-server";
import {withHandler}        from "@leight/trpc-server";

export interface IWithSourceProcedureProps<TSourceSchema extends ISourceSchema> {
    source: BindKey;
    mapper: symbol;
    schema: {
        create: TSourceSchema["ToCreateSchema"];
        patch: TSourceSchema["ToPatchSchema"];
        query: TSourceSchema["QuerySchema"];
    };
}

export const withSourceProcedure = <TSourceSchema extends ISourceSchema>(
    {
        source,
        mapper,
        schema,
    }: IWithSourceProcedureProps<TSourceSchema>) => {
    return {
        QuerySchema:         schema.query,
        QueryOptionalSchema: schema.query.optional(),
        CreateSchema:        schema.create,
        PatchSchema:         schema.patch,
        IdentitySchema:      WithIdentitySchema,
        Create:              withHandler<TSourceSchema["ToCreate"], TSourceSchema["Dto"]>({
            handler: async ({container, request}) => {
                const $mapper = container.resolve<ISourceMapper<TSourceSchema>>(mapper);
                return $mapper.toDto(
                    container.resolve<ISource<TSourceSchema>>(source).create(
                        await $mapper.toCreate(request)
                    )
                );
            },
        }),
        Patch:               withHandler<TSourceSchema["ToPatch"], TSourceSchema["Dto"]>({
            handler: async ({container, request}) => {
                const $mapper = container.resolve<ISourceMapper<TSourceSchema>>(mapper);
                return $mapper.toDto(
                    container.resolve<ISource<TSourceSchema>>(source).patch(
                        await $mapper.toPatch(request)
                    )
                );
            },
        }),
        Query:               withHandler<TSourceSchema["Query"] | undefined, TSourceSchema["Dto"][]>({
            handler: async ({container, request}) => {
                const $mapper = container.resolve<ISourceMapper<TSourceSchema>>(mapper);
                return Promise.all(
                    (await container.resolve<ISource<TSourceSchema>>(source).query(request)).map(entity => $mapper.toDto(Promise.resolve(entity)))
                );
            },
        }),
        QueryCount:          withHandler<TSourceSchema["Query"] | undefined, number>({
            handler: async ({container, request}) => container.resolve<ISource<TSourceSchema>>(source).count(request),
        }),
        Fetch:               withHandler<TSourceSchema["Query"], TSourceSchema["Dto"]>({
            handler: async ({container, request}) => {
                const $mapper = container.resolve<ISourceMapper<TSourceSchema>>(mapper);
                return $mapper.toDto(
                    container.resolve<ISource<TSourceSchema>>(source).fetch(request)
                );
            },
        }),
        Find:                withHandler<IWithIdentity, TSourceSchema["Dto"]>({
            handler: async ({container, request: {id}}) => {
                const $mapper = container.resolve<ISourceMapper<TSourceSchema>>(mapper);
                return $mapper.toDto(
                    container.resolve<ISource<TSourceSchema>>(source).find(id)
                );
            },
        }),
    };
};

