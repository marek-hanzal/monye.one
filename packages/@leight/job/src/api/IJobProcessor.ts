import { type IJob } from "./IJob";
import { QueueAddOptions } from "p-queue";

export interface IJobProcessor<TParams = any> {
    request(): Promise<IJob<TParams>>;

    async(
        params: TParams,
        userId?: string | null,
        queue?: QueueAddOptions
    ): Promise<IJob<TParams>>;

    handler(request: IJobProcessor.HandlerProps<TParams>): Promise<any>;
}

export namespace IJobProcessor {
    export interface HandlerProps<TParams> {}
}
