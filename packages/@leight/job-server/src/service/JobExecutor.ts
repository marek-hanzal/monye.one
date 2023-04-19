import {
    $JobProgressService,
    $JobSource,
    type IJobExecutor,
    type IJobProgressService,
    type IJobSource,
    type IJobSourceSchema,
}               from "@leight/job";
import {
    $UserService,
    type IUserService
}               from "@leight/user";
import {Pack}   from "@leight/utils";
import {Logger} from "@leight/winston";
import delay    from "delay";

export class JobExecutor implements IJobExecutor {
    static inject = [
        $JobProgressService,
        $UserService,
        $JobSource,
    ];

    constructor(
        protected jobProgressService: IJobProgressService,
        protected userService: IUserService,
        protected jobSource: IJobSource,
    ) {
    }

    async execute<TJob extends IJobSourceSchema["Entity"]>(
        {
            name,
            handler,
            params
        }: IJobExecutor.ExecuteProps<TJob>): Promise<TJob> {
        let logger        = Logger(name);
        const job         = await this.jobSource.create({
            created: new Date(),
            name,
            userId:  this.userService.required(),
            params:  await Pack.pack(params),
        }) as TJob;
        const labels      = {name, jobId: job.id};
        logger            = logger.child({labels, jobId: labels.jobId, name});
        const jobProgress = this.jobProgressService.create(job.id);
        setTimeout(() => {
            (async () => {
                try {
                    await this.jobSource.find(job.id);
                    await jobProgress.setStatus("RUNNING");
                    await handler({
                        name,
                        job,
                        params,
                        userId:   this.userService.required(),
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
