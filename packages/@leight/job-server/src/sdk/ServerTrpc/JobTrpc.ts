/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$JobSourceService,
	type IJobSourceSchemaType
} from "@leight/job";

export const JobSourceProcedure = withSourceProcedure<IJobSourceSchemaType>({
    sourceService: $JobSourceService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o3zva3kgtnydxthmk8xnth9n = true;