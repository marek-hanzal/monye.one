/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$FileSourceService,
	type IFileSourceSchemaType
} from "@leight/file";

export const FileSourceProcedure = withSourceProcedure<IFileSourceSchemaType>({
    sourceService: $FileSourceService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dr6kqy2fojzkvj3d4ta8f67e = true;