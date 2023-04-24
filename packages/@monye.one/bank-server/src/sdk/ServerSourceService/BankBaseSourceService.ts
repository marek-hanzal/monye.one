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
	$BankSource,
	$BankSourceMapper,
	type IBankSourceSchemaType
} from "@monye.one/bank";

export interface IBankSourceService extends ISourceService<IBankSourceSchemaType> {
}

export class BankBaseSourceService extends AbstractSourceService<IBankSourceSchemaType> implements IBankSourceService {
	static inject = [
        $BankSource,
        $BankSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<IBankSourceSchemaType>,
        protected $mapper: ISourceMapper<IBankSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<IBankSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<IBankSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dmddvxm3e1vycq8o0ezko8o9 = true;