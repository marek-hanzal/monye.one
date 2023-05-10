/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseTransactionKeywordRepositoryEx} from "../repository/BaseTransactionKeywordRepositoryEx";
import {BaseTransactionKeywordRepositoryMapper} from "../mapper/BaseTransactionKeywordRepositoryMapper";
import {BaseTransactionKeywordRepositoryService} from "../service/BaseTransactionKeywordRepositoryService";
import {
	$TransactionKeywordRepository,
	$TransactionKeywordRepositoryMapper,
	$TransactionKeywordRepositoryService
} from "@monye.one/transaction";

export const withTransactionKeywordRepositoryContainer = (container: IContainer) => {
    container.bindClass($TransactionKeywordRepository, BaseTransactionKeywordRepositoryEx);
    container.bindClass($TransactionKeywordRepositoryMapper, BaseTransactionKeywordRepositoryMapper);
    container.bindClass($TransactionKeywordRepositoryService, BaseTransactionKeywordRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_z8kv9cd7rtzb72kavq73pesk = true;