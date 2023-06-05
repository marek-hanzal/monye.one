import {z}                     from "@leight/utils";
import {type IJobParamsSchema} from "../schema/JobSchema";
import {type IJobSourceType}   from "../sdk";

export type IJobWithParams<TParamsSchema extends IJobParamsSchema> =
    IJobSourceType["Dto"]
    & {
        params: z.infer<TParamsSchema>;
    }
