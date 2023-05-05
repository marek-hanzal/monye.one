import {type IRepository}           from "./IRepository";
import {type IRepositoryMapper}     from "./IRepositoryMapper";
import {type RepositoryServiceType} from "./RepositoryServiceType";

export interface IRepositoryService<TRepositoryServiceType extends RepositoryServiceType> {
    handleCreate(props: TRepositoryServiceType["ToCreate"]): Promise<TRepositoryServiceType["Dto"]>;

    handleSourceCreate(create: TRepositoryServiceType["Create"]): Promise<TRepositoryServiceType["Entity"]>;

    handlePatch(props: TRepositoryServiceType["ToPatchProps"]): Promise<TRepositoryServiceType["Dto"]>;

    handleSourcePatch(patch: TRepositoryServiceType["PatchProps"]): Promise<TRepositoryServiceType["Entity"]>;

    handlePatchBy(props: TRepositoryServiceType["ToPatchByProps"]): Promise<unknown>;

    handleSourcePatchBy(patch: TRepositoryServiceType["PatchByProps"]): Promise<unknown>;

    handleUpsert(props: TRepositoryServiceType["ToUpsertProps"]): Promise<TRepositoryServiceType["Dto"]>;

    handleSourceUpsert(props: TRepositoryServiceType["UpsertProps"]): Promise<TRepositoryServiceType["Dto"]>;

    /**
     * Do something with a DTO; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withDto(dto: TRepositoryServiceType["Dto"]): Promise<TRepositoryServiceType["Dto"]>;

    /**
     * Do something with an Entity; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withEntity(entity: TRepositoryServiceType["Entity"]): Promise<TRepositoryServiceType["Entity"]>;

    /**
     * Get source mapper
     */
    mapper(): IRepositoryMapper<TRepositoryServiceType>;

    /**
     * Get current repository
     */
    repository(): IRepository<TRepositoryServiceType>;
}
