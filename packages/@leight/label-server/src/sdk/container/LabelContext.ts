/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {ServiceContext} from "@leight/container-server";
import {
	type ILabelRepository,
	type ILabelRepositoryService,
	type ILabelRepositoryMapper,
	$LabelRepository,
	$LabelRepositoryMapper,
	$LabelRepositoryService
} from "@leight/label";

export const LabelRepositoryContext = (container: IContainer) => new ServiceContext<ILabelRepository>(container, $LabelRepository);
export const LabelRepositoryMapperContext = (container: IContainer) => new ServiceContext<ILabelRepositoryMapper>(container, $LabelRepositoryMapper);
export const LabelRepositoryServiceContext = (container: IContainer) => new ServiceContext<ILabelRepositoryService>(container, $LabelRepositoryService);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ltlkz7wt4w9gwsb4klrcllhm = true;