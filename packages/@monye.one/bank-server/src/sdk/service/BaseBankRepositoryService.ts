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
	$BankRepository,
	$BankRepositoryMapper,
	type BankSource
} from "@monye.one/bank";

export interface IBankRepositoryService extends IRepositoryService<BankSource["Schema"]["Service"]> {
}

export class BaseBankRepositoryService<
    TServiceSchema extends BankSource["Schema"]["Service"] = BankSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements IBankRepositoryService {
	static inject = [
        $BankRepository,
        $BankRepositoryMapper,
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
export const $leight_kozgp114am7cpn8byv6tkbyx = true;