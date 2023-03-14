import {type IContainer} from "@leight/container";
import {
    $JobExecutor,
    $JobProgressService,
    $JobSource,
    type IJobExecutor,
    type IJobProgressService,
    type IJobSource
}                        from "@leight/job";
import {
    JobExecutor,
    JobProgressService
}                        from "./service";
import {JobSource}       from "./source";

export interface IJobContainer {
    JobProgressService: IJobProgressService;
    JobExecutor: IJobExecutor;
    JobSource: IJobSource;
}

export const JobContainer = (container: IContainer): IJobContainer => {
    container
        .bindClass($JobProgressService, JobProgressService)
        .bindClass($JobExecutor, JobExecutor)
        .bindClass($JobSource, JobSource);

    return {
        get JobProgressService() {
            return container.resolve<IJobProgressService>($JobProgressService);
        },
        get JobExecutor() {
            return container.resolve<IJobExecutor>($JobExecutor);
        },
        get JobSource() {
            return container.resolve<IJobSource>($JobSource);
        },
    };
};
