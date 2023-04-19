import {type IContainer}       from "@leight/container";
import {
    $JobExecutor,
    $JobProgressService,
    $JobSource,
    $JobSourceMapper,
    type IJobExecutor,
    type IJobProgressService,
    type IJobSource
}                              from "@leight/job";
import {type IJobSourceMapper} from "./sdk/api";
import {JobSource}             from "./sdk/ServerSource/JobServerSource";
import {JobSourceMapper}       from "./sdk/ServerSourceMapper/JobSourceMapper";
import {
    JobExecutor,
    JobProgressService
}                              from "./service";

export interface IJobContainer {
    JobProgressService: IJobProgressService;
    JobExecutor: IJobExecutor;
    JobSource: IJobSource;
    JobSourceMapper: IJobSourceMapper;
}

export const JobContainer = (container: IContainer): IJobContainer => {
    container
        .bindClass($JobProgressService, JobProgressService)
        .bindClass($JobExecutor, JobExecutor)
        .bindClass($JobSource, JobSource)
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
        get JobSourceMapper() {
            return container.resolve<IJobSourceMapper>($JobSourceMapper);
        },
    };
};
