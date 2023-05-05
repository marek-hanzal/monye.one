import {
    type IRepositoryMapper,
    type RepositoryMapperType
} from "@leight/source/lib/repository";

export class AbstractRepositoryMapper<TRepositoryMapperType extends RepositoryMapperType> implements IRepositoryMapper<TRepositoryMapperType> {
    async toCreate(create: TRepositoryMapperType["ToCreate"]): Promise<TRepositoryMapperType["Create"]> {
        return create;
    }

    async toDto(entity: TRepositoryMapperType["Entity"]): Promise<TRepositoryMapperType["Dto"]> {
        return entity;
    }

    async toPatch(patch: TRepositoryMapperType["ToPatch"]): Promise<TRepositoryMapperType["Patch"]> {
        return {
            patch:  patch,
            filter: {},
        };
    }
}
