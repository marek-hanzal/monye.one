/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceQuery} from "@leight/source-client";
import {
	type IFilterSourceSchemaType,
	type IUseFilterSourceQuery
} from "@leight/filter";
import {trpc} from "@monye.one/trpc-client";

export const UseFilterSourceQuery: IUseFilterSourceQuery = withSourceQuery<IFilterSourceSchemaType>(trpc.filter.source);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gcqzdyyatx3u8cz1gw9fw21s = true;