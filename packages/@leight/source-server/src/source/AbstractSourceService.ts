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

    async handlePatch({toPatch}: ISourceService.IHandlePatchProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.handleSourcePatch(
                        await this.toPatch(toPatch)
                    )
                )
            )
        );
    }

    async handleSourcePatch(patch: TSourceSchemaType["Patch"]): Promise<TSourceSchemaType["Entity"]> {
        return this.source().patch(patch);
    }

    async toPatch(toPatch: TSourceSchemaType["ToPatch"]): Promise<TSourceSchemaType["Patch"]> {
        return this.mapper().toPatch(toPatch);
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
