import {type ISourceSchema} from "./ISourceSchema";

export interface ISourceMapper<TSourceSchema extends ISourceSchema> {
    toCreate(create: TSourceSchema["Type"]["Mapper"]["ToCreate"]): Promise<TSourceSchema["Type"]["Source"]["Create"]>;

    toPatch(patch: TSourceSchema["Type"]["Mapper"]["ToPatch"]): Promise<TSourceSchema["Type"]["Source"]["Patch"]>;

    toDto(entity: TSourceSchema["Type"]["Source"]["Entity"]): Promise<TSourceSchema["Type"]["Mapper"]["Dto"]>;
}
