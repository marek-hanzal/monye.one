import {
    type ISourceMapper,
    type ISourceSchemaType
} from "@leight/source";

export class AbstractSourceMapper<TSourceSchemaType extends ISourceSchemaType> implements ISourceMapper<TSourceSchemaType> {
    async toCreate(create: TSourceSchemaType["ToCreate"]): Promise<TSourceSchemaType["Create"]> {
        return create;
    }

    async toDto(entity: TSourceSchemaType["Entity"]): Promise<TSourceSchemaType["Dto"]> {
        return entity;
    }

    async toPatch(patch: TSourceSchemaType["ToPatch"]): Promise<TSourceSchemaType["Patch"]> {
        return patch;
    }
}
