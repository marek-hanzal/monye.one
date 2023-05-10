/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseTransactionRepositoryEx} from "../repository/BaseTransactionRepositoryEx";
import {BaseTransactionRepositoryMapper} from "../mapper/BaseTransactionRepositoryMapper";
import {BaseTransactionRepositoryService} from "../service/BaseTransactionRepositoryService";
import {
	$TransactionRepository,
	$TransactionRepositoryMapper,
	$TransactionRepositoryService
} from "@monye.one/transaction";

export const withTransactionRepositoryContainer = (container: IContainer) => {
    container.bindClass($TransactionRepository, BaseTransactionRepositoryEx);
    container.bindClass($TransactionRepositoryMapper, BaseTransactionRepositoryMapper);
    container.bindClass($TransactionRepositoryService, BaseTransactionRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_g4m661zbsl78ep1z7bs1gy0l = true;