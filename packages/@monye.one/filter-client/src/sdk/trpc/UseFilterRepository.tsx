/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withUseRepository} from "@leight/source-client";
import {
	type UseFilterRepository as UseRepository,
	type IFilterSourceSchema as SourceSchema
} from "@leight/filter";
import {trpc} from "@monye.one/trpc-client";

export const UseFilterRepository: UseRepository = withUseRepository<SourceSchema>(trpc.filter.repository);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_qg5rsyptni9q8h1l1csd9emq = true;