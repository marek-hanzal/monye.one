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
	$FileSource,
	$FileSourceMapper,
	type IFileSourceSchemaType
} from "@leight/file";

export interface IFileSourceService extends ISourceService<IFileSourceSchemaType> {
}

export class FileBaseSourceService extends AbstractSourceService<IFileSourceSchemaType> implements IFileSourceService {
	static inject = [
        $FileSource,
        $FileSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<IFileSourceSchemaType>,
        protected $mapper: ISourceMapper<IFileSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<IFileSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<IFileSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_avlcxikr62jjztxam47jvbq0 = true;