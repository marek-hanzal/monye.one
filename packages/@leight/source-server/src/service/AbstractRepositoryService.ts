import {type IRepositoryServiceSchema} from "@leight/source";
import {
    type IRepository,
    type IRepositoryMapper,
    type RepositoryServiceType
}                                      from "@leight/source/lib/repository";

export abstract class AbstractRepositoryService<
    TRepositoryServiceSchema extends IRepositoryServiceSchema,
    TRepositoryServiceType extends RepositoryServiceType<TRepositoryServiceSchema> = RepositoryServiceType<TRepositoryServiceSchema>
> {
    async handleCreate(props: TRepositoryServiceType["ToCreate"]): Promise<TRepositoryServiceType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.handleSourceCreate(
                        await this.toCreate(props)
                    )
                )
            )
        );
    }

    async handleSourceCreate(create: TRepositoryServiceType["Create"]): Promise<TRepositoryServiceType["Entity"]> {
        return this.repository().create(create);
    }

    async toCreate(toCreate: TRepositoryServiceType["ToCreate"]): Promise<TRepositoryServiceType["Create"]> {
        return this.mapper().toCreate(toCreate);
    }

    async handlePatch(props: TRepositoryServiceType["ToPatchProps"]): Promise<TRepositoryServiceType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.handleSourcePatch(await this.mapper().toPatchProps(props))
                )
            )
        );
    }

    async handleSourcePatch(patch: TRepositoryServiceType["PatchProps"]): Promise<TRepositoryServiceType["Entity"]> {
        return this.repository().patch(patch);
    }

    async handlePatchBy(props: TRepositoryServiceType["ToPatchByProps"]): Promise<unknown> {
        return this.handleSourcePatchBy(await this.mapper().toPatchByProps(props));
    }

    async handleSourcePatchBy(patch: TRepositoryServiceType["PatchByProps"]): Promise<unknown> {
        return this.repository().patchBy(patch);
    }

    async handleUpsert({create, patch, filter}: TRepositoryServiceType["ToUpsertProps"]): Promise<TRepositoryServiceType["Dto"]> {
        return this.withDto(
            await this.toDto(
                await this.withEntity(
                    await this.repository().upsert({
                        create: await this.toCreate(create),
                        patch:  await this.toPatch(patch),
                        filter,
                    })
                )
            )
        );
    }

    async toPatch(toPatch: TRepositoryServiceType["ToPatch"]): Promise<TRepositoryServiceType["Patch"]> {
        return this.mapper().toPatch(toPatch);
    }

    async handleSourceUpsert(props: TRepositoryServiceType["UpsertProps"]): Promise<TRepositoryServiceType["Dto"]> {
        return this.repository().upsert(props);
    }

    async toDto(entity: TRepositoryServiceType["Entity"]): Promise<TRepositoryServiceType["Dto"]> {
        return this.mapper().toDto(entity);
    }

    async withDto(dto: TRepositoryServiceType["Dto"]): Promise<TRepositoryServiceType["Dto"]> {
        return dto;
    }

    async withEntity(entity: TRepositoryServiceType["Entity"]): Promise<TRepositoryServiceType["Entity"]> {
        return entity;
    }

    abstract mapper(): IRepositoryMapper<TRepositoryServiceSchema>;

    abstract repository(): IRepository<TRepositoryServiceSchema>;
}
