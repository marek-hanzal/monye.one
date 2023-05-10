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
	$UserRepository,
	$UserRepositoryMapper,
	type UserSource
} from "@leight/user";

export interface IUserRepositoryService extends IRepositoryService<UserSource["Schema"]["Service"]> {
}

export class BaseUserRepositoryService<
    TServiceSchema extends UserSource["Schema"]["Service"] = UserSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements IUserRepositoryService {
	static inject = [
        $UserRepository,
        $UserRepositoryMapper,
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
export const $leight_vtl168fdoaoxtxccpfzz8473 = true;