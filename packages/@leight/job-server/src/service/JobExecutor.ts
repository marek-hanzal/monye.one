import {
    $Container,
    type IContainer
}                   from "@leight/container";
import {
    $JobProgressService,
    $JobRepository,
    $JobRepositoryMapper,
    type IJobExecutor,
    type IJobParamsSchema,
    type IJobProgressService,
    type IJobRepository,
    type IJobRepositoryMapper,
    type IJobService,
    type IJobWithParams
}                   from "@leight/job";
import {withLogger} from "@leight/logger-server";
import {
    $UserService,
    type IUserService
}                   from "@leight/user";
import {Pack}       from "@leight/utils";
import delay        from "delay";

export class JobExecutor implements IJobExecutor {
    static inject = [
        $JobProgressService,
        $UserService,
        $JobRepository,
        $JobRepositoryMapper,
        $Container,
    ];

    constructor(
        protected jobProgressService: IJobProgressService,
        protected userService: IUserService,
        protected jobRepository: IJobRepository,
        protected jobRepositoryMapper: IJobRepositoryMapper,
        protected container: IContainer,
    ) {
    }

    async execute<TJobParamsSchema extends IJobParamsSchema>(
        {
            service,
            params,
        }: IJobExecutor.IExecuteProps<TJobParamsSchema>): Promise<IJobWithParams<TJobParamsSchema>> {
        const name = service.toString();
        let logger = withLogger(name);
        const job = await this.jobRepositoryMapper.toDto(
            await this.jobRepository.create({
                created: new Date(),
                name,
                userId:  this.userService.required(),
                params:  await Pack.packIf(params),
            })
        ) as IJobWithParams<TJobParamsSchema>;
        const labels = {
            name,
            jobId: job.id
        };
        logger = logger.child({
            labels,
            jobId: labels.jobId,
            name
        });
        const jobProgress = this.jobProgressService.create(job.id);
        setTimeout(() => {
            (async () => {
                try {
                    const jobService = this.container.resolve<IJobService<TJobParamsSchema>>(service);
                    await this.jobRepository.get(job.id);
                    await jobProgress.setStatus("RUNNING");
                    const $params = jobService.validator()?.parse(params) || params;
                    await jobService.handle({
                        name,
                        job,
                        params:   $params,
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
