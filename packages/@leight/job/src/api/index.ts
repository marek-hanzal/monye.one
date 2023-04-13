import {type ILogger}    from "@leight/winston";
import {type IJobStatus} from "../schema";
import {type IJob,}      from "../sdk";

export interface IJobProgress {
    readonly jobId: string;

    result(): IJobStatus | undefined;

    success(): number;

    failure(): number;

    skip(): number;

    setTotal(total: number): Promise<unknown>;

    setStatus(status: IJobStatus): Promise<unknown>;

    onSuccess(): Promise<unknown>;

    onFailure(): Promise<unknown>;

    onSkip(): Promise<unknown>;

    setResult(result: IJobStatus): void;

    isReview(): boolean;
}

export interface IJobProgressService {
    create(jobId: string): IJobProgress;
}

export const $JobProgressService = Symbol.for(
    "@leight/job/IJobProgressService"
);

export interface IJobExecutor {
    execute<TJob extends IJob>(props: IJobExecutor.ExecuteProps<TJob>): Promise<TJob>;
}

export namespace IJobExecutor {
    export interface ExecuteProps<TJob extends IJob> {
        name: string;
        params: any;
        handler: (request: HandlerRequest<TJob>) => Promise<any>;
    }

    export interface HandlerRequest<TJob extends IJob> {
        name: string;
        job: TJob;
        params: TJob["params"];
        userId?: string | null;
        jobProgress: IJobProgress;
        logger: ILogger;

        progress<TResult>(callback: () => Promise<TResult>, sleep?: number): Promise<TResult | void>;
    }
}

export const $JobExecutor = Symbol.for(
    "@leight/job/IJobExecutor"
);
