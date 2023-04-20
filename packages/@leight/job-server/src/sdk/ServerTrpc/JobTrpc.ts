/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$JobSourceMapper,
	$JobSource,
	JobSourceSchema,
	type IJobSourceSchema
} from "@leight/job";

export const JobSourceProcedure = withSourceProcedure<IJobSourceSchema>({
    mapper: $JobSourceMapper,
    source: $JobSource,
    schema: {
        create: JobSourceSchema["ToCreateSchema"],
        patch: JobSourceSchema["ToPatchSchema"],
        query: JobSourceSchema["QuerySchema"],
    },
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_akwrzpn7x7t9e7t9vaacdoo0 = true;