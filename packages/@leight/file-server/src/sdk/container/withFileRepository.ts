/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {
	type IFileRepository,
	type IFileRepositoryService,
	type IFileRepositoryMapper,
	$FileRepository,
	$FileRepositoryMapper,
	$FileRepositoryService
} from "@leight/file";

export const withFileRepository = (container: IContainer) => new ServiceContext<IFileRepository>(container, $FileRepository).resolve();
export const withFileRepositoryMapper = (container: IContainer) => new ServiceContext<IFileRepositoryMapper>(container, $FileRepositoryMapper).resolve();
export const withFileRepositoryService = (container: IContainer) => new ServiceContext<IFileRepositoryService>(container, $FileRepositoryService).resolve();
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_h6hj7nb55su6fycnlyv47rht = true;