/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {
	type IFilterRepository,
	type IFilterRepositoryService,
	type IFilterRepositoryMapper,
	$FilterRepository,
	$FilterRepositoryMapper,
	$FilterRepositoryService
} from "@leight/filter";

export const withFilterRepository = (container: IContainer) => new ServiceContext<IFilterRepository>(container, $FilterRepository).resolve();
export const withFilterRepositoryMapper = (container: IContainer) => new ServiceContext<IFilterRepositoryMapper>(container, $FilterRepositoryMapper).resolve();
export const withFilterRepositoryService = (container: IContainer) => new ServiceContext<IFilterRepositoryService>(container, $FilterRepositoryService).resolve();
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lx9v0cgdyd38t2x74a6rv0gw = true;