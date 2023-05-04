import {
    type ISource,
    type ISourceMapper,
    type ISourceSchemaType,
    type ISourceService
} from "@leight/source";

export abstract class AbstractSourceService<TSourceSchemaType extends ISourceSchemaType> implements ISourceService<TSourceSchemaType> {
    async handleCreate({toCreate}: ISourceService.IHandleCreateProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.handleSourceCreate(
                        await this.toCreate(toCreate)
                    ))
            )
        );
    }

    async handleSourceCreate(create: TSourceSchemaType["Create"]): Promise<TSourceSchemaType["Entity"]> {
        return this.source().create(create);
    }

    async toCreate(toCreate: TSourceSchemaType["ToCreate"]): Promise<TSourceSchemaType["Create"]> {
        return this.mapper().toCreate(toCreate);
    }

    async handlePatch({toPatch, filter}: ISourceService.IHandlePatchProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.handleSourcePatch({
                        patch: await this.toPatch(toPatch),
                        filter,
                    })
                )
            )
        );
    }

    async handlePatchBy({toPatch, filter}: ISourceService.IHandlePatchByProps<TSourceSchemaType>): Promise<unknown> {
        return this.handleSourcePatchBy({
            patch: await this.toPatch(toPatch),
            filter,
        });
    }

    async handleSourcePatch(patch: ISource.IPatch<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]> {
        return this.source().patch(patch);
    }

    async handleSourcePatchBy(patch: ISource.IPatchBy<TSourceSchemaType>): Promise<unknown> {
        return this.source().patchBy(patch);
    }

    async toPatch(toPatch: TSourceSchemaType["ToPatch"]): Promise<TSourceSchemaType["Patch"]> {
        return this.mapper().toPatch(toPatch);
    }

    async handleUpsert({toCreate, toPatch, filter}: ISourceService.IHandleUpsertProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.source().upsert({
                        create: await this.toCreate(toCreate),
                        patch:  await this.toPatch(toPatch),
                        filter,
                    })
                )
            )
        );
    }

    async toDto(entity: TSourceSchemaType["Entity"]): Promise<TSourceSchemaType["Dto"]> {
        return this.mapper().toDto(entity);
    }

    async withDto(dto: TSourceSchemaType["Dto"]): Promise<TSourceSchemaType["Dto"]> {
        return dto;
    }

    async withEntity(entity: TSourceSchemaType["Entity"]): Promise<TSourceSchemaType["Entity"]> {
        return entity;
    }

    abstract mapper(): ISourceMapper<TSourceSchemaType>;

    abstract source(): ISource<TSourceSchemaType>;
}
