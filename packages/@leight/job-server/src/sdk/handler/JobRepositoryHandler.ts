/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withRepositoryHandler} from "@leight/trpc-source-server";
import {
	$JobRepositoryService,
	type JobSource
} from "@leight/job";

export const JobRepositoryHandler = withRepositoryHandler<JobSource["Schema"]["Service"]>({
    service: $JobRepositoryService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_nvqx3vbn69vt884utijw2gfb = true;