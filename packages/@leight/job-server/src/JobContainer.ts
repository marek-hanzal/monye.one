import {type IContainer} from "@leight/container";
import {$JobExecutor, $JobProgressService, $JobRepository, $JobRepositoryMapper} from "@leight/job";
import {JobRepositoryMapper} from "./mapper";
import {JobRepository} from "./repository";
import {withJobRepositoryContainer} from "./sdk";
import {JobExecutor, JobProgressService} from "./service";

export const JobContainer = (container: IContainer) => {
    withJobRepositoryContainer(container);
    container
        .bindClass($JobProgressService, JobProgressService)
        .bindClass($JobExecutor, JobExecutor)
        .bindClass($JobRepository, JobRepository)
        .bindClass($JobRepositoryMapper, JobRepositoryMapper);
};
