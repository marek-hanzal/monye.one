/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withRepositoryHandler} from "@leight/trpc-source-server";
import {
	$FilterRepositoryService,
	type FilterSource
} from "@leight/filter";

export const FilterRepositoryHandler = withRepositoryHandler<FilterSource["Schema"]["Service"]>({
    service: $FilterRepositoryService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_wzzughxvj1ynvmpy3x2rv38o = true;