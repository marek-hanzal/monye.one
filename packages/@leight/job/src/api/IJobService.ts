import {type IContainer}         from "@leight/container";
import {type ILogger}            from "@leight/logger";
import {z}                       from "@leight/utils";
import {type IJobParamsSchema}   from "../schema/JobSchema";
import {type IJobParamValidator} from "./IJobParamValidator";
import {type IJobProgress}       from "./IJobProgress";
import {type IJobWithParams}     from "./IJobWithParams";

export interface IJobService<TParamsSchema extends IJobParamsSchema, TResult = any> {
    name: IContainer.Key;

    async(props: IJobService.IAsyncProps<TParamsSchema>): Promise<IJobWithParams<TParamsSchema>>;

    handle(props: IJobService.IHandleProps<TParamsSchema>): Promise<TResult>;

    validator(): IJobParamValidator;
}

export namespace IJobService {
    export interface IAsyncProps<TParamsSchema extends IJobParamsSchema> {
        params: z.infer<TParamsSchema>;
    }

    export interface IHandleProps<TParamsSchema extends IJobParamsSchema> {
        name: string;
        job: IJobWithParams<TParamsSchema>;
        params: z.infer<TParamsSchema>;
        userId?: string | null;
        jobProgress: IJobProgress;
        logger: ILogger;

        progress<TResult>(callback: () => Promise<TResult>, sleep?: number): Promise<TResult>;
    }
}
