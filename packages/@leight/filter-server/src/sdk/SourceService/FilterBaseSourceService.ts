/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {AbstractSourceService} from "@leight/source-server";
import {
	type ISourceService,
	type ISourceMapper,
	type ISource
} from "@leight/source";
import {
	$FilterSource,
	$FilterSourceMapper,
	type IFilterSourceSchemaType
} from "@leight/filter";

export interface IFilterSourceService extends ISourceService<IFilterSourceSchemaType> {
}

export class FilterBaseSourceService extends AbstractSourceService<IFilterSourceSchemaType> implements IFilterSourceService {
	static inject = [
        $FilterSource,
        $FilterSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<IFilterSourceSchemaType>,
        protected $mapper: ISourceMapper<IFilterSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<IFilterSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<IFilterSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_eaij3m4rtagr3if6hotbrzyt = true;