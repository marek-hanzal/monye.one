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
	$JobSource,
	$JobSourceMapper,
	type IJobSourceSchemaType
} from "@leight/job";

export interface IJobSourceService extends ISourceService<IJobSourceSchemaType> {
}

export class JobBaseSourceService extends AbstractSourceService<IJobSourceSchemaType> implements IJobSourceService {
	static inject = [
        $JobSource,
        $JobSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<IJobSourceSchemaType>,
        protected $mapper: ISourceMapper<IJobSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<IJobSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<IJobSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_qgosalcyibe1jgxedfrob00z = true;