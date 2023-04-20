import {
    type ISource,
    type ISourceMapper,
    type ISourceSchema,
    type ISourceService
} from "@leight/source";

export abstract class AbstractSourceService<TSourceSchema extends ISourceSchema> implements ISourceService<TSourceSchema> {
    async handleCreate({toCreate}: ISourceService.IHandleCreateProps<TSourceSchema>): Promise<TSourceSchema["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.handleSourceCreate(
                        await this.toCreate(toCreate)
                    ))
            )
        );
    }

    async handleSourceCreate(create: TSourceSchema["Create"]): Promise<TSourceSchema["Entity"]> {
        return this.source().create(create);
    }

    async toCreate(toCreate: TSourceSchema["ToCreate"]): Promise<TSourceSchema["Create"]> {
        return this.mapper().toCreate(toCreate);
    }

    async handlePatch({toPatch}: ISourceService.IHandlePatchProps<TSourceSchema>): Promise<TSourceSchema["Dto"]> {
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

    async handleSourcePatch(patch: TSourceSchema["Patch"]): Promise<TSourceSchema["Entity"]> {
        return this.source().patch(patch);
    }

    async toPatch(toPatch: TSourceSchema["ToPatch"]): Promise<TSourceSchema["Patch"]> {
        return this.mapper().toPatch(toPatch);
    }

    async toDto(entity: TSourceSchema["Entity"]): Promise<TSourceSchema["Dto"]> {
        return this.mapper().toDto(entity);
    }

    async withDto(dto: TSourceSchema["Dto"]): Promise<TSourceSchema["Dto"]> {
        return dto;
    }

    async withEntity(entity: TSourceSchema["Entity"]): Promise<TSourceSchema["Entity"]> {
        return entity;
    }

    abstract mapper(): ISourceMapper<TSourceSchema>;

    abstract source(): ISource<TSourceSchema>;
}
