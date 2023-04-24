import {type IContainer} from "@leight/container";
import {
    $JobExecutor,
    $JobProgressService,
    $JobSource,
    $JobSourceMapper,
    $JobSourceService,
    type IJobExecutor,
    type IJobProgressService,
    type IJobSource,
    type IJobSourceMapper
}                        from "@leight/job";
import {
    type IJobSourceService,
    JobSource,
    JobSourceMapper,
    JobSourceService
}                        from "./sdk";
import {
    JobExecutor,
    JobProgressService
}                        from "./service";

export interface IJobContainer {
    JobProgressService: IJobProgressService;
    JobExecutor: IJobExecutor;
    JobSource: IJobSource;
    JobSourceService: IJobSourceService;
    JobSourceMapper: IJobSourceMapper;
}

export const JobContainer = (container: IContainer): IJobContainer => {
    container
        .bindClass($JobProgressService, JobProgressService)
        .bindClass($JobExecutor, JobExecutor)
        .bindClass($JobSource, JobSource)
        .bindClass($JobSourceService, JobSourceService)
        .bindClass($JobSourceMapper, JobSourceMapper);

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
        get JobSourceService() {
            return container.resolve<IJobSourceService>($JobSourceService);
        },
        get JobSourceMapper() {
            return container.resolve<IJobSourceMapper>($JobSourceMapper);
        },
    };
};
