import {Logger} from "winston";
import {type IJob} from "./IJob";
import {type IJobProgress} from "./IJobProgress";
import {type InferJob} from "./InferJob";

export interface IJobExecutor {
    execute<TJob extends IJob>(props: IJobExecutor.ExecuteProps<TJob>): Promise<TJob>;
}

export namespace IJobExecutor {
    export interface ExecuteProps<TJob extends IJob> {
        name: string;
        params: InferJob.Params<TJob>;
        handler: (request: HandlerRequest<TJob>) => Promise<any>;
    }

    export interface HandlerRequest<TJob extends IJob> {
        name: string;
        job: TJob;
        params: InferJob.Params<TJob>;
        userId?: string | null;
        jobProgress: IJobProgress;
        logger: Logger;

        progress<TResult>(callback: () => Promise<TResult>, sleep?: number): Promise<TResult | void>;
    }
}

export const $JobExecutor = Symbol.for(
    "@leight/job-server/JobExecutor"
);
