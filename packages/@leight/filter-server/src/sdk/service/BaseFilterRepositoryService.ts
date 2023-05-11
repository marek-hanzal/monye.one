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
	$FilterRepository,
	$FilterRepositoryMapper,
	type FilterSource
} from "@leight/filter";

export interface IFilterRepositoryService extends IRepositoryService<FilterSource["Schema"]["Service"]> {
}

export class BaseFilterRepositoryService<
    TServiceSchema extends FilterSource["Schema"]["Service"] = FilterSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements IFilterRepositoryService {
	static inject = [
        $FilterRepository,
        $FilterRepositoryMapper,
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
export const $leight_ox1fw0ymupdxclz5c7xahc7b = true;