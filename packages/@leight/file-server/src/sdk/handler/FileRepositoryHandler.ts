/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withRepositoryHandler} from "@leight/trpc-source-server";
import {
	$FileRepositoryService,
	type FileSource
} from "@leight/file";

export const FileRepositoryHandler = withRepositoryHandler<FileSource["Schema"]["Service"]>({
    service: $FileRepositoryService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_jm57ki3kh1wb8xe0yx4s815v = true;