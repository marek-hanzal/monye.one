import {
    $Container,
    type IContainer
}                         from "@leight/container";
import {
    $JobProgressService,
    $JobSource,
    $JobSourceMapper,
    type IJobExecutor,
    type IJobProgressService,
    type IJobService,
    type IJobSource,
    type IJobSourceSchemaType,
}                         from "@leight/job";
import {
    $UserService,
    type IUserService
}                         from "@leight/user";
import {Pack}             from "@leight/utils";
import {Logger}           from "@leight/winston";
import delay              from "delay";
import {IJobSourceMapper} from "../sdk";

export class JobExecutor implements IJobExecutor {
    static inject = [
        $JobProgressService,
        $UserService,
        $JobSource,
        $JobSourceMapper,
        $Container,
    ];

    constructor(
        protected jobProgressService: IJobProgressService,
        protected userService: IUserService,
        protected jobSource: IJobSource,
        protected jobSourceMapper: IJobSourceMapper,
        protected container: IContainer,
    ) {
    }

    async execute<TSourceSchemaType extends IJobSourceSchemaType>(
        {
            service,
            params
        }: IJobExecutor.IExecuteProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]> {
        const name        = service.toString();
        let logger        = Logger(name);
        const job         = await this.jobSourceMapper.toDto(
            await this.jobSource.create({
                created: new Date(),
                name,
                userId:  this.userService.required(),
                params:  await Pack.pack(params),
            })
        );
        const labels      = {name, jobId: job.id};
        logger            = logger.child({labels, jobId: labels.jobId, name});
        const jobProgress = this.jobProgressService.create(job.id);
        setTimeout(() => {
            (async () => {
                try {
                    const jobService = this.container.resolve<IJobService<TSourceSchemaType>>(name);
                    await this.jobSource.find(job.id);
                    await jobProgress.setStatus("RUNNING");
                    await jobService.handle({
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
