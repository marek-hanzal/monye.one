import {type ISourceSchema} from "./ISourceSchema";

export interface ISourceMapper<TSourceSchema extends ISourceSchema> {
    toCreate(create: TSourceSchema["ToCreate"]): Promise<TSourceSchema["Create"]>;

    toPatch(patch: TSourceSchema["ToPatch"]): Promise<TSourceSchema["Patch"]>;

    toDto(entity: TSourceSchema["Entity"]): Promise<TSourceSchema["Dto"]>;
}
