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
	$FileRepository,
	$FileRepositoryMapper,
	type FileSource
} from "@leight/file";

export interface IFileRepositoryService extends IRepositoryService<FileSource["Schema"]["Service"]> {
}

export class BaseFileRepositoryService<
    TServiceSchema extends FileSource["Schema"]["Service"] = FileSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements IFileRepositoryService {
	static inject = [
        $FileRepository,
        $FileRepositoryMapper,
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
export const $leight_l2wktr3zmteugaic3w6bsa05 = true;