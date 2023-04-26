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
	$TransactionSource,
	$TransactionSourceMapper,
	type ITransactionSourceSchemaType
} from "@monye.one/transaction";

export interface ITransactionSourceService extends ISourceService<ITransactionSourceSchemaType> {
}

export class TransactionBaseSourceService extends AbstractSourceService<ITransactionSourceSchemaType> implements ITransactionSourceService {
	static inject = [
        $TransactionSource,
        $TransactionSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<ITransactionSourceSchemaType>,
        protected $mapper: ISourceMapper<ITransactionSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<ITransactionSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<ITransactionSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_mb4cfgpfdur172vbnxzugot5 = true;