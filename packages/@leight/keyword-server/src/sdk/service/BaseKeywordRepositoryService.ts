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
	$KeywordRepository,
	$KeywordRepositoryMapper,
	type KeywordSource
} from "@leight/keyword";

export interface IKeywordRepositoryService extends IRepositoryService<KeywordSource["Schema"]["Service"]> {
}

export class BaseKeywordRepositoryService<
    TServiceSchema extends KeywordSource["Schema"]["Service"] = KeywordSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements IKeywordRepositoryService {
	static inject = [
        $KeywordRepository,
        $KeywordRepositoryMapper,
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
export const $leight_mdhj6bovl6qs2w20gat5bt9x = true;