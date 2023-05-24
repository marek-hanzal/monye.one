import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";
import {type RepositoryMapperType}    from "./RepositoryMapperType";

export interface IRepositoryMapper<
    TRepositoryMapperSchema extends IRepositoryMapperSchema,
    TRepositoryMapperType extends RepositoryMapperType<TRepositoryMapperSchema> = RepositoryMapperType<TRepositoryMapperSchema>
> {
    toCreate(create: TRepositoryMapperType["ToCreate"]): Promise<TRepositoryMapperType["Create"]>;

    toPatch(patch: TRepositoryMapperType["ToPatch"]): Promise<TRepositoryMapperType["Patch"]>;

    toDto(entity: TRepositoryMapperType["Entity"]): Promise<TRepositoryMapperType["Dto"]>;

    /**
     * Map patch props to repository; usually not necessary to implement
     */
    toPatchProps(patch: TRepositoryMapperType["ToPatchProps"]): Promise<TRepositoryMapperType["PatchProps"]>;

    /**
     * Map patch props to repository; usually not necessary to implement
     */
    toPatchByProps(patch: TRepositoryMapperType["ToPatchByProps"]): Promise<TRepositoryMapperType["PatchByProps"]>;

    /**
     * Map upsert props to repository; usually not necessary to implement
     */
    toUpsertProps(patch: TRepositoryMapperType["ToUpsertProps"]): Promise<TRepositoryMapperType["UpsertProps"]>;
}
