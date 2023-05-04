import {type RepositoryMapperType} from "./RepositoryMapperType";

export interface IRepositoryMapper<TRepositoryMapperType extends RepositoryMapperType> {
    toCreate(create: TRepositoryMapperType["ToCreate"]): Promise<TRepositoryMapperType["Create"]>;

    toPatch(patch: TRepositoryMapperType["ToPatch"]): Promise<TRepositoryMapperType["Patch"]>;

    toDto(entity: TRepositoryMapperType["Entity"]): Promise<TRepositoryMapperType["Dto"]>;
}
