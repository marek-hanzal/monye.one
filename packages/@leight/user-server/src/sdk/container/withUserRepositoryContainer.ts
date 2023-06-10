/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseUserRepositoryEx} from "../repository/BaseUserRepositoryEx";
import {BaseUserRepositoryMapper} from "../mapper/BaseUserRepositoryMapper";
import {BaseUserRepositoryService} from "../service/BaseUserRepositoryService";
import {
	$UserRepository,
	$UserRepositoryMapper,
	$UserRepositoryService
} from "@leight/user";

export const withUserRepositoryContainer = (container: IContainer) => {
    container.bindClass($UserRepository, BaseUserRepositoryEx);
    container.bindClass($UserRepositoryMapper, BaseUserRepositoryMapper);
    container.bindClass($UserRepositoryService, BaseUserRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_qgxbfxcw25d98qnkl5brzbbz = true;