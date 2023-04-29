import {
    $JobSource,
    type IJobProgress,
    type IJobProgressService,
    IJobSource,
    type IJobStatus
}                  from "@leight/job";
import {toPercent} from "@leight/utils";

export class JobProgressService implements IJobProgressService {
    static inject = [
        $JobSource,
    ];

    constructor(
        protected jobSource: IJobSource,
    ) {
    }

    create(jobId: string): IJobProgress {
        let $result: IJobStatus | undefined;
        let $total     = 0;
        let $processed = 0;
        let $success   = 0;
        let $failure   = 0;
        let $skip      = 0;

        return {
            jobId,
            result:    () => $result,
            success:   () => $success,
            failure:   () => $failure,
            skip:      () => $skip,
            setTotal:  total => this.jobSource.patch({
                id:    jobId,
                total: ($total = total),
            }),
            setStatus: status => this.jobSource.patch({
                id:       jobId,
                status,
                started:  ["RUNNING"].includes(status) ? new Date() : undefined,
                finished: [
                              "REVIEW",
                              "SUCCESS",
                              "FAILURE"
                          ].includes(status) ? new Date() : (["RUNNING"].includes(status) ? null : undefined),
            }),
            onSuccess: () => this.jobSource.patch({
                id:           jobId,
                success:      ++$success,
                successRatio: toPercent($success, $total),
                progress:     toPercent(++$processed, $total),
            }),
            onFailure: () => this.jobSource.patch({
                id:           jobId,
                failure:      ++$failure,
                failureRatio: toPercent($failure, $total),
                progress:     toPercent(++$processed, $total),
            }),
            onSkip:    () => this.jobSource.patch({
                id:        jobId,
                skip:      ++$skip,
                skipRatio: toPercent($skip, $total),
                progress:  toPercent(++$processed, $total),
            }),
            setResult: result => {
                $result = result;
            },
            isReview:  () => $failure > 0 || $skip > 0,
        };
    }
}
