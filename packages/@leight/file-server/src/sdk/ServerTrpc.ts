/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$FileSource,
	FileSourceSchema,
	type IFileSourceSchema
} from "@leight/file";

export const FileSourceProcedure = withSourceProcedure<IFileSourceSchema>({
    source: $FileSource,
    schema: FileSourceSchema['QuerySchema'],
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_mazah8bspskwjrvyh8o9el0s = true;