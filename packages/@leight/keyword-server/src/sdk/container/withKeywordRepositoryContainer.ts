/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseKeywordRepositoryEx} from "../repository/BaseKeywordRepositoryEx";
import {BaseKeywordRepositoryMapper} from "../mapper/BaseKeywordRepositoryMapper";
import {BaseKeywordRepositoryService} from "../service/BaseKeywordRepositoryService";
import {
	$KeywordRepository,
	$KeywordRepositoryMapper,
	$KeywordRepositoryService
} from "@leight/keyword";

export const withKeywordRepositoryContainer = (container: IContainer) => {
    container.bindClass($KeywordRepository, BaseKeywordRepositoryEx);
    container.bindClass($KeywordRepositoryMapper, BaseKeywordRepositoryMapper);
    container.bindClass($KeywordRepositoryService, BaseKeywordRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_di1xqtqn5obd2xrjlutugbtx = true;