import {type IContainer}      from "@leight/container";
import {
    $JobExecutor,
    $JobProgressService,
    $JobSource,
    $JobSourceMapper,
    $JobSourceService
}                             from "@leight/job";
import {JobSourceMapper}      from "./mapper";
import {JobBaseSourceService} from "./sdk";
import {
    JobExecutor,
    JobProgressService
}                             from "./service";
import {JobSource}            from "./source";

export const JobContainer = (container: IContainer) => {
    container
        .bindClass($JobProgressService, JobProgressService)
        .bindClass($JobExecutor, JobExecutor)
        .bindClass($JobSource, JobSource)
        .bindClass($JobSourceService, JobBaseSourceService)
        .bindClass($JobSourceMapper, JobSourceMapper);
};
