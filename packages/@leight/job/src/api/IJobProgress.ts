import { type IJobStatus } from "./IJobStatus";

export interface IJobProgress {
    readonly jobId: string;

    result(): IJobStatus | undefined;

    success(): number;

    failure(): number;

    skip(): number;

    setTotal(total: number): Promise<any>;

    setStatus(status: IJobStatus): Promise<any>;

    onSuccess(): Promise<any>;

    onFailure(): Promise<any>;

    onSkip(): Promise<any>;

    setResult(result: IJobStatus): void;

    isReview(): boolean;
}
