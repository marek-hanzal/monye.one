/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceQuery} from "@leight/source-client";
import {
	type IBankSourceSchema,
	type IUseBankSourceQuery
} from "@monye.one/bank";
import {trpc} from "@monye.one/trpc-client";

export const UseBankSourceQuery: IUseBankSourceQuery = withSourceQuery<IBankSourceSchema>(trpc.bank.source);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_h869ym01t8vkmhx5bs7rzr0m = true;