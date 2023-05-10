/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseFileRepositoryEx} from "../repository/BaseFileRepositoryEx";
import {BaseFileRepositoryMapper} from "../mapper/BaseFileRepositoryMapper";
import {BaseFileRepositoryService} from "../service/BaseFileRepositoryService";
import {
	$FileRepository,
	$FileRepositoryMapper,
	$FileRepositoryService
} from "@leight/file";

export const withFileRepositoryContainer = (container: IContainer) => {
    container.bindClass($FileRepository, BaseFileRepositoryEx);
    container.bindClass($FileRepositoryMapper, BaseFileRepositoryMapper);
    container.bindClass($FileRepositoryService, BaseFileRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ksympca0su87pipa2zom0els = true;