import {type ISourceSchema} from "@leight/source";

export interface ISourceMapper<TSourceSchema extends ISourceSchema> {
    toCreate(create: TSourceSchema["ToCreate"]): Promise<TSourceSchema["Create"]>;

    toPatch(patch: TSourceSchema["ToPatch"]): Promise<TSourceSchema["Patch"]>;

    toDto(entity: Promise<TSourceSchema["Entity"]>): Promise<TSourceSchema["Dto"]>;
}

export class AbstractSourceMapper<TSourceSchema extends ISourceSchema> implements ISourceMapper<TSourceSchema> {
    async toCreate(create: TSourceSchema["ToCreate"]): Promise<TSourceSchema["Create"]> {
        return create;
    }

    async toDto(entity: Promise<TSourceSchema["Entity"]>): Promise<TSourceSchema["Dto"]> {
        return entity;
    }

    async toPatch(patch: TSourceSchema["ToPatch"]): Promise<TSourceSchema["Patch"]> {
        return patch;
    }
}
