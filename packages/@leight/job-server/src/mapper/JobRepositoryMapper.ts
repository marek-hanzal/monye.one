import {type JobSource}          from "@leight/job";
import {Pack}                    from "@leight/utils";
import {BaseJobRepositoryMapper} from "../sdk";

export class JobRepositoryMapper extends BaseJobRepositoryMapper {
    async toDto({
                    params,
                    ...entity
                }: JobSource["Type"]["Entity"]): Promise<JobSource["Type"]["Dto"]> {
        return {
            ...entity,
            params: Pack.unpackIf(params),
        };
    }

    async toCreate({
                       params,
                       ...create
                   }: JobSource["Type"]["ToCreate"]): Promise<JobSource["Type"]["Create"]> {
        return {
            ...create,
            params: await Pack.packIf(params),
        };
    }

    async toPatch({
                      params,
                      ...patch
                  }: JobSource["Type"]["ToPatch"]): Promise<JobSource["Type"]["Patch"]> {
        return {
            ...patch,
            params: await Pack.packIf(params),
        };
    }
}
