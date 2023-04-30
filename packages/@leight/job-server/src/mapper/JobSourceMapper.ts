import {type IJobSourceSchemaType} from "@leight/job";
import {Pack}                      from "@leight/utils";
import {JobBaseSourceMapper}       from "../sdk";

export class JobSourceMapper extends JobBaseSourceMapper {
    async toDto({params, ...entity}: IJobSourceSchemaType["Entity"]): Promise<IJobSourceSchemaType["Dto"]> {
        return {
            ...entity,
            params: Pack.unpackIf(params),
        };
    }

    async toCreate({params, ...create}: IJobSourceSchemaType["ToCreate"]): Promise<IJobSourceSchemaType["Create"]> {
        return {
            ...create,
            params: await Pack.packIf(params),
        };
    }

    async toPatch({params, ...patch}: IJobSourceSchemaType["ToPatch"]): Promise<IJobSourceSchemaType["Patch"]> {
        return {
            ...patch,
            params: await Pack.packIf(params),
        };
    }
}
