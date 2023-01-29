import {$JobExecutor, $JobProgressService, IJobExecutor, type IJobProgressService} from "@leight/job";
import {type IContainer} from "@leight/container";
import {JobExecutor, JobProgressService} from "./service";

export interface IJobContainer {
    JobProgressService: IJobProgressService;
    JobExecutor: IJobExecutor;
}

export const JobContainer = (container: IContainer): IJobContainer => {
    container.register<IJobProgressService>($JobProgressService, {
        useClass: JobProgressService,
    });
    container.register<IJobExecutor>($JobExecutor, {
        useClass: JobExecutor,
    });

    return {
        get JobProgressService() {
            return container.resolve<IJobProgressService>($JobProgressService);
        },
        get JobExecutor() {
            return container.resolve<IJobExecutor>($JobExecutor);
        },
    }
}
