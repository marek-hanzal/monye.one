/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {AbstractRepositoryService} from "@leight/source-server";
import {
	type IRepositoryService,
	type IRepositoryMapper,
	type IRepository
} from "@leight/source";
import {
	$JobRepository,
	$JobRepositoryMapper,
	type JobSource
} from "@leight/job";

export interface IJobRepositoryService extends IRepositoryService<JobSource["Schema"]["Service"]> {
}

export class BaseJobRepositoryService<
    TServiceSchema extends JobSource["Schema"]["Service"] = JobSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements IJobRepositoryService {
	static inject = [
        $JobRepository,
        $JobRepositoryMapper,
    ];
    
    constructor(
        protected $repository: IRepository<TServiceSchema>,
        protected $mapper: IRepositoryMapper<TServiceSchema>,
    ) {
        super();
    }

    mapper(): IRepositoryMapper<TServiceSchema> {
        return this.$mapper;
    }
    
    repository(): IRepository<TServiceSchema> {
        return this.$repository;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ytru9uknt35zaat3b9s286st = true;