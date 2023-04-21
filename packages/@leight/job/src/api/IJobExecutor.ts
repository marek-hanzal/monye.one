import {type ILogger}              from "@leight/winston";
import {type IJobSourceSchemaType} from "../sdk";
import {type IJobProgress}         from "./IJobProgress";

export interface IJobExecutor {
    execute<TJob extends IJobSourceSchemaType["Entity"]>(props: IJobExecutor.ExecuteProps<TJob>): Promise<TJob>;
}

export namespace IJobExecutor {
    export interface ExecuteProps<TJob extends IJobSourceSchemaType["Entity"]> {
        name: string;
        params: any;
        handler: (request: HandlerRequest<TJob>) => Promise<any>;
    }

    export interface HandlerRequest<TJob extends IJobSourceSchemaType["Entity"]> {
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
