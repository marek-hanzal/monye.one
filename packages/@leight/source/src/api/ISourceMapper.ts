import {type ISourceSchemaType} from "./ISourceSchemaType";

export interface ISourceMapper<TSourceSchemaType extends ISourceSchemaType> {
    toCreate(create: TSourceSchemaType["ToCreate"]): Promise<TSourceSchemaType["Create"]>;

    toPatch(patch: TSourceSchemaType["ToPatch"]): Promise<TSourceSchemaType["Patch"]>;

    toDto(entity: TSourceSchemaType["Entity"]): Promise<TSourceSchemaType["Dto"]>;
}
