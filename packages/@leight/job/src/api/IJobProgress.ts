import {IJobStatus} from "../schema";

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
