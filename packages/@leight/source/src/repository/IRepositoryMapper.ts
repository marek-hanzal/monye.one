import {type RepositoryMapperType} from "./RepositoryMapperType";

export interface IRepositoryMapper<TRepositoryMapperType extends RepositoryMapperType> {
    toCreate(create: TRepositoryMapperType["ToCreate"]): Promise<TRepositoryMapperType["Create"]>;

    toPatch(patch: TRepositoryMapperType["ToPatch"]): Promise<TRepositoryMapperType["Patch"]>;

    toDto(entity: TRepositoryMapperType["Entity"]): Promise<TRepositoryMapperType["Dto"]>;

    toPatchProps(patch: TRepositoryMapperType["ToPatchProps"]): Promise<TRepositoryMapperType["PatchProps"]>;

    toPatchByProps(patch: TRepositoryMapperType["ToPatchByProps"]): Promise<TRepositoryMapperType["PatchByProps"]>;

    toUpsertProps(patch: TRepositoryMapperType["ToUpsertProps"]): Promise<TRepositoryMapperType["UpsertProps"]>;
}
