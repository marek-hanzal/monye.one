import {type IJobWithParams}    from "@leight/job";
import {type IWithTrpcMutation} from "@leight/trpc";
import {
    type IImportParams,
    type IImportParamsSchema
}                               from "../schema";

export type IWithImportMutation = IWithTrpcMutation<IImportParams, IJobWithParams<IImportParamsSchema>>;
