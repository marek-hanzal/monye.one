/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseBankRepositoryEx} from "../repository/BaseBankRepositoryEx";
import {BaseBankRepositoryMapper} from "../mapper/BaseBankRepositoryMapper";
import {BaseBankRepositoryService} from "../service/BaseBankRepositoryService";
import {
	$BankRepository,
	$BankRepositoryMapper,
	$BankRepositoryService
} from "@monye.one/bank";

export const withBankRepositoryContainer = (container: IContainer) => {
    container.bindClass($BankRepository, BaseBankRepositoryEx);
    container.bindClass($BankRepositoryMapper, BaseBankRepositoryMapper);
    container.bindClass($BankRepositoryService, BaseBankRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vjyrfnn29dqie66w6zk6ybyz = true;