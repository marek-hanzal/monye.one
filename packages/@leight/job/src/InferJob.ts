import { IJob } from "./IJob";

export namespace InferJob {
    export type Params<T> = T extends IJob<infer TParams> ? TParams : T;
}
