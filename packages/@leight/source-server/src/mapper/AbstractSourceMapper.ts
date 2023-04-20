import {
    type ISourceMapper,
    type ISourceSchema
} from "@leight/source";

export class AbstractSourceMapper<TSourceSchema extends ISourceSchema> implements ISourceMapper<TSourceSchema> {
    async toCreate(create: TSourceSchema["ToCreate"]): Promise<TSourceSchema["Create"]> {
        return create;
    }

    async toDto(entity: TSourceSchema["Entity"]): Promise<TSourceSchema["Dto"]> {
        return entity;
    }

    async toPatch(patch: TSourceSchema["ToPatch"]): Promise<TSourceSchema["Patch"]> {
        return patch;
    }
}
