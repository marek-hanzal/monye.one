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
	$TransactionKeywordRepository,
	$TransactionKeywordRepositoryMapper,
	type TransactionKeywordSource
} from "@monye.one/transaction";

export interface ITransactionKeywordRepositoryService extends IRepositoryService<TransactionKeywordSource["Schema"]["Service"]> {
}

export class BaseTransactionKeywordRepositoryService<
    TServiceSchema extends TransactionKeywordSource["Schema"]["Service"] = TransactionKeywordSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements ITransactionKeywordRepositoryService {
	static inject = [
        $TransactionKeywordRepository,
        $TransactionKeywordRepositoryMapper,
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
export const $leight_oyu81zrd36bf7mndwiu91h0l = true;