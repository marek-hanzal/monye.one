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
	$LabelRepository,
	$LabelRepositoryMapper,
	type LabelSource
} from "@leight/label";

export interface ILabelRepositoryService extends IRepositoryService<LabelSource["Schema"]["Service"]> {
}

export class BaseLabelRepositoryService<
    TServiceSchema extends LabelSource["Schema"]["Service"] = LabelSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements ILabelRepositoryService {
	static inject = [
        $LabelRepository,
        $LabelRepositoryMapper,
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
export const $leight_mmns5x7oglb0cxgjbzgedil7 = true;