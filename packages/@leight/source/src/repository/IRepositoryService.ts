import {type IRepository}              from "./IRepository";
import {type IRepositoryMapper}        from "./IRepositoryMapper";
import {type IRepositoryServiceSchema} from "./IRepositoryServiceSchema";
import {type RepositoryServiceType}    from "./RepositoryServiceType";

export interface IRepositoryService<
    TRepositoryServiceSchema extends IRepositoryServiceSchema,
    TRepositoryServiceType extends RepositoryServiceType<TRepositoryServiceSchema> = RepositoryServiceType<TRepositoryServiceSchema>
> {
    handleCreate(props: TRepositoryServiceType["ToCreate"]): Promise<TRepositoryServiceType["Dto"]>;

    handleSourceCreate(create: TRepositoryServiceType["Create"]): Promise<TRepositoryServiceType["Entity"]>;

    handlePatch(props: TRepositoryServiceType["ToPatchProps"]): Promise<TRepositoryServiceType["Dto"]>;

    handleSourcePatch(patch: TRepositoryServiceType["PatchProps"]): Promise<TRepositoryServiceType["Entity"]>;

    handlePatchBy(props: TRepositoryServiceType["ToPatchByProps"]): Promise<unknown>;

    handleSourcePatchBy(patch: TRepositoryServiceType["PatchByProps"]): Promise<unknown>;

    handleUpsert(props: TRepositoryServiceType["ToUpsertProps"]): Promise<TRepositoryServiceType["Dto"]>;

    handleSourceUpsert(props: TRepositoryServiceType["UpsertProps"]): Promise<TRepositoryServiceType["Dto"]>;

    handleDelete(props: TRepositoryServiceType["Delete"]): Promise<TRepositoryServiceType["Dto"]>;

    handleCount(props: TRepositoryServiceType["Count"]): Promise<number>;

    handleQuery(props: TRepositoryServiceType["Query"]): Promise<TRepositoryServiceType["Dto"][]>;

    handleDeleteBy(props: TRepositoryServiceType["DeleteBy"]): Promise<unknown>;

    handleFetch(props: TRepositoryServiceType["Fetch"]): Promise<TRepositoryServiceType["Dto"]>;

    handleFetch$(props: TRepositoryServiceType["Fetch$"]): Promise<TRepositoryServiceType["Dto"] | null>;

    handleGet(id: string): Promise<TRepositoryServiceType["Dto"]>;

    handleGet$(id?: string | null): Promise<TRepositoryServiceType["Dto"] | null>;

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
    mapper(): IRepositoryMapper<TRepositoryServiceSchema>;

    /**
     * Get current repository
     */
    repository(): IRepository<TRepositoryServiceSchema>;
}
