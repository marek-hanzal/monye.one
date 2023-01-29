import {type IJobProgress} from "./IJobProgress";

export interface IJobProgressService {
    create(jobId: string): IJobProgress;
}

export const $JobProgressService = Symbol.for(
    "@leight/job-server/JobProgressService"
);
