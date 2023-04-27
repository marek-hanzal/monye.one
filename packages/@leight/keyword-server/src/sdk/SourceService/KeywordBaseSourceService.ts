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
	$KeywordSource,
	$KeywordSourceMapper,
	type IKeywordSourceSchemaType
} from "@leight/keyword";

export interface IKeywordSourceService extends ISourceService<IKeywordSourceSchemaType> {
}

export class KeywordBaseSourceService extends AbstractSourceService<IKeywordSourceSchemaType> implements IKeywordSourceService {
	static inject = [
        $KeywordSource,
        $KeywordSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<IKeywordSourceSchemaType>,
        protected $mapper: ISourceMapper<IKeywordSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<IKeywordSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<IKeywordSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lzj5k5asu2fixbgjhue7g4ed = true;