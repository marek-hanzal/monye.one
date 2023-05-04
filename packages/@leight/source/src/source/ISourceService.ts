import {type ISource}       from "./ISource";
import {type ISourceMapper} from "./ISourceMapper";
import {type ISourceSchema} from "./ISourceSchema";

export interface ISourceService<TSourceSchema extends ISourceSchema> extends ISourceMapper<TSourceSchema> {
    handleCreate(props: TSourceSchema["Type"]["Mapper"]["ToCreate"]): Promise<TSourceSchema["Type"]["Mapper"]["Dto"]>;

    handleSourceCreate(create: TSourceSchema["Type"]["Source"]["Create"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    handlePatch(props: TSourceSchema["Type"]["Mapper"]["ToPatch"]): Promise<TSourceSchema["Type"]["Mapper"]["Dto"]>;

    handleSourcePatch(patch: TSourceSchema["Type"]["Source"]["Patch"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    handlePatchBy(props: TSourceSchema["Type"]["Source"]["PatchBy"]): Promise<unknown>;

    handleSourcePatchBy(patch: TSourceSchema["Type"]["Source"]["PatchBy"]): Promise<unknown>;

    handleUpsert(props: TSourceSchema["Type"]["Source"]["Upsert"]): Promise<TSourceSchema["Type"]["Mapper"]["Dto"]>;

    /**
     * Do something with a DTO; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withDto(dto: TSourceSchema["Type"]["Mapper"]["Dto"]): Promise<TSourceSchema["Type"]["Mapper"]["Dto"]>;

    /**
     * Do something with an Entity; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withEntity(entity: TSourceSchema["Type"]["Source"]["Entity"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Get source mapper
     */
    mapper(): ISourceMapper<TSourceSchema>;

    /**
     * Get current source
     */
    source(): ISource<TSourceSchema>;
}
