import "reflect-metadata";
import {$JobProgressService, type IJob, type IJobExecutor, type IJobProgressService} from "@leight/job";
import {inject, injectable} from "tsyringe";
import {$UserService, type IUserService} from "@leight/user";
import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import delay from "delay";
import {Logger} from "@leight/winston";
import {Pack} from "@leight/utils";

@injectable()
export class JobExecutor implements IJobExecutor {
    constructor(
        @inject($JobProgressService) protected jobProgressService: IJobProgressService,
        @inject($UserService) protected userService: IUserService,
        @inject($PrismaClient) protected prismaClient: PrismaClient,
    ) {
    }

    async execute<TJob extends IJob>({name, handler, params}: IJobExecutor.ExecuteProps<TJob>): Promise<TJob> {
        let logger = Logger(name);
        const job = await this.prismaClient.job.create({
            data: {
                created: new Date(),
                name,
                userId: this.userService.required(),
                params: Pack.pack(params),
            }
        }) as TJob;
        const labels = {name, jobId: job.id};
        logger = logger.child({labels, jobId: labels.jobId, name});
        const jobProgress = this.jobProgressService.create(job.id);
        setTimeout(() => {
            (async () => {
                try {
                    await this.prismaClient.job.findUniqueOrThrow({where: {id: job.id}});
                    await jobProgress.setStatus("RUNNING");
                    await handler({
                        name,
                        job,
                        params,
                        userId: this.userService.required(),
                        jobProgress,
                        logger,
                        progress: async (callback, $sleep = 0) => {
                            try {
                                await delay($sleep);
                                const result = await callback();
                                await jobProgress.onSuccess();
                                return result;
                            } catch (e) {
                                await jobProgress.onFailure();
                                if (e instanceof Error) {
                                    logger.error(e.message);
                                    logger.error(e.stack);
                                }
                                throw e;
                            }
                        },
                    });
                    await jobProgress.setStatus(jobProgress.result() || (jobProgress.isReview() ? "REVIEW" : "SUCCESS"));
                } catch (e) {
                    logger.error(`Job [${name}] failed.`);
                    if (e instanceof Error) {
                        logger.error(e.message);
                        logger.error(e.stack);
                    }
                    await jobProgress.setStatus("FAILURE");
                    throw e;
                }
            })();
        }, 0);
        return job;
    }
}
