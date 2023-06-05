import {
    type IRepositoryMapper,
    type IRepositoryMapperSchema,
    type RepositoryMapperType
} from "@leight/source";

export class AbstractRepositoryMapper<
    TRepositoryMapperSchema extends IRepositoryMapperSchema,
    TRepositoryMapperType extends RepositoryMapperType<TRepositoryMapperSchema> = RepositoryMapperType<TRepositoryMapperSchema>
> implements IRepositoryMapper<TRepositoryMapperSchema> {
    async toCreate(create: TRepositoryMapperType["ToCreate"]): Promise<TRepositoryMapperType["Create"]> {
        return create;
    }

    async toDto(entity: TRepositoryMapperType["Entity"]): Promise<TRepositoryMapperType["Dto"]> {
        return entity;
    }

    async toPatch(patch: TRepositoryMapperType["ToPatch"]): Promise<TRepositoryMapperType["Patch"]> {
        return patch;
    }

    async toPatchByProps({
                             patch,
                             filter
                         }: TRepositoryMapperType["ToPatchByProps"]): Promise<TRepositoryMapperType["PatchByProps"]> {
        return {
            patch: await this.toPatch(patch),
            filter,
        };
    }

    async toPatchProps({
                           patch,
                           filter
                       }: TRepositoryMapperType["ToPatchProps"]): Promise<TRepositoryMapperType["PatchProps"]> {
        return {
            patch: await this.toPatch(patch),
            filter,
        };
    }

    async toUpsertProps({
                            create,
                            patch,
                            filter
                        }: TRepositoryMapperType["ToUpsertProps"]): Promise<TRepositoryMapperType["UpsertProps"]> {
        return {
            create: await this.toCreate(create),
            patch:  await this.toPatch(patch),
            filter,
        };
    }
}
