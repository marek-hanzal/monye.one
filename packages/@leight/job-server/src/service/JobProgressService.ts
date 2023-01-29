import "reflect-metadata";
import {type IJobProgress, type IJobProgressService, type IJobStatus} from "@leight/job";
import {inject, injectable} from "tsyringe";
import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import {toPercent} from "@leight/utils";

@injectable()
export class JobProgressService implements IJobProgressService {
    constructor(
        @inject($PrismaClient) protected prismaClient: PrismaClient,
    ) {
    }

    create(jobId: string): IJobProgress {
        let $result: IJobStatus | undefined;
        let $total = 0;
        let $processed = 0;
        let $success = 0;
        let $failure = 0;
        let $skip = 0;

        return {
            jobId,
            result: () => $result,
            success: () => $success,
            failure: () => $failure,
            skip: () => $skip,
            setTotal: total => this.prismaClient.job.update({
                data: {
                    total: ($total = total),
                },
                where: {
                    id: jobId,
                }
            }),
            setStatus: status => this.prismaClient.job.update({
                data: {
                    status,
                    started: ["RUNNING"].includes(status) ? new Date() : undefined,
                    finished: ["REVIEW", "SUCCESS", "FAILURE"].includes(status) ? new Date() : (["RUNNING"].includes(status) ? null : undefined),
                },
                where: {
                    id: jobId,
                },
            }),
            onSuccess: () => this.prismaClient.job.update({
                data: {
                    success: ++$success,
                    successRatio: toPercent($success, $total),
                    progress: toPercent(++$processed, $total),
                },
                where: {
                    id: jobId,
                }
            }),
            onFailure: () => this.prismaClient.job.update({
                data: {
                    failure: ++$failure,
                    failureRatio: toPercent($failure, $total),
                    progress: toPercent(++$processed, $total),
                },
                where: {
                    id: jobId,
                }
            }),
            onSkip: () => this.prismaClient.job.update({
                data: {
                    skip: ++$skip,
                    skipRatio: toPercent($skip, $total),
                    progress: toPercent(++$processed, $total),
                },
                where: {
                    id: jobId,
                }
            }),
            setResult: result => {
                $result = result;
            },
            isReview: () => $failure > 0 || $skip > 0,
        };
    }
}
