import {type IJobStatus} from "./IJobStatus";

export interface IJob<TParams = any> {
    readonly id: string;
    readonly name: string;
    readonly status: IJobStatus;
    readonly total: number;
    readonly progress: number;
    readonly success: number;
    readonly successRatio: number;
    readonly failure: number;
    readonly failureRatio: number;
    readonly skip: number;
    readonly skipRatio: number;
    readonly created: Date;
    readonly started?: Date | null;
    readonly finished?: Date | null;
    readonly userId?: string | null;
    readonly params: TParams;
}
