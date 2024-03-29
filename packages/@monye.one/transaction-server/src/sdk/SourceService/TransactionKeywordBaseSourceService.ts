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
	$TransactionKeywordSource,
	$TransactionKeywordSourceMapper,
	type ITransactionKeywordSourceSchemaType
} from "@monye.one/transaction";

export interface ITransactionKeywordSourceService extends ISourceService<ITransactionKeywordSourceSchemaType> {
}

export class TransactionKeywordBaseSourceService extends AbstractSourceService<ITransactionKeywordSourceSchemaType> implements ITransactionKeywordSourceService {
	static inject = [
        $TransactionKeywordSource,
        $TransactionKeywordSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<ITransactionKeywordSourceSchemaType>,
        protected $mapper: ISourceMapper<ITransactionKeywordSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<ITransactionKeywordSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<ITransactionKeywordSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_i97lsq1qsrtdqlgus26g8x9u = true;