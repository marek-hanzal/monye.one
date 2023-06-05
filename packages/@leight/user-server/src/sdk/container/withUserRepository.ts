/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {
	IUserRepositoryEx,
	type IUserRepositoryService,
	type IUserRepositoryMapper,
	$UserRepository,
	$UserRepositoryMapper,
	$UserRepositoryService
} from "@leight/user";

export const withUserRepository = (container: IContainer) => new ServiceContext<IUserRepositoryEx>(container, $UserRepository).resolve();
export const withUserRepositoryMapper = (container: IContainer) => new ServiceContext<IUserRepositoryMapper>(container, $UserRepositoryMapper).resolve();
export const withUserRepositoryService = (container: IContainer) => new ServiceContext<IUserRepositoryService>(container, $UserRepositoryService).resolve();
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_igwdy6il2dbrx4gd6mngi5do = true;