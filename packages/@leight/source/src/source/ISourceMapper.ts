import {type ISourceSchemaType} from "./ISourceSchemaType";

export interface ISourceMapper<TSourceSchemaType extends ISourceSchemaType> {
    toCreate(create: ISourceMapper.IToCreate<TSourceSchemaType>): Promise<TSourceSchemaType["Create"]>;

    toPatch(patch: ISourceMapper.IToPatch<TSourceSchemaType>): Promise<TSourceSchemaType["Patch"]>;

    toDto(entity: ISourceMapper.IToDto<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;
}

export namespace ISourceMapper {
    export type IToCreate<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["ToCreate"];
    export type IToPatch<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["ToPatch"];
    export type IToDto<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Entity"];
}
