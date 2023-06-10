import {type IContainer}       from "@leight/container";
import {z}                     from "@leight/utils";
import {type IJobParamsSchema} from "../schema/JobSchema";
import {type IJobWithParams}   from "./IJobWithParams";

export interface IJobExecutor {
    execute<TParamsSchema extends IJobParamsSchema>(props: IJobExecutor.IExecuteProps<TParamsSchema>): Promise<IJobWithParams<TParamsSchema>>;
}

export namespace IJobExecutor {
    export interface IExecuteProps<TParamsSchema extends IJobParamsSchema> {
        service: IContainer.Key;
        params: z.infer<TParamsSchema>;
    }
}

export const $JobExecutor = Symbol.for("@leight/job/IJobExecutor");