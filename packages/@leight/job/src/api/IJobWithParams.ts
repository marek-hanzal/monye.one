import {z} from "@leight/utils";
import {
    type IJobParamsSchema,
    type JobSource
}          from "../schema";

export type IJobWithParams<TParamsSchema extends IJobParamsSchema> =
    JobSource["Type"]["Dto"]
    & {
    params: z.infer<TParamsSchema>;
}
