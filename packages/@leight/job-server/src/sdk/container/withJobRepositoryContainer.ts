/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseJobRepositoryEx} from "../repository/BaseJobRepositoryEx";
import {BaseJobRepositoryMapper} from "../mapper/BaseJobRepositoryMapper";
import {BaseJobRepositoryService} from "../service/BaseJobRepositoryService";
import {
	$JobRepository,
	$JobRepositoryMapper,
	$JobRepositoryService
} from "@leight/job";

export const withJobRepositoryContainer = (container: IContainer) => {
    container.bindClass($JobRepository, BaseJobRepositoryEx);
    container.bindClass($JobRepositoryMapper, BaseJobRepositoryMapper);
    container.bindClass($JobRepositoryService, BaseJobRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dpw9wjajnkxk78scfavhjqc6 = true;