/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withUseRepository} from "@leight/source-client";
import {
	type UseBankRepository as UseRepository,
	type IBankSourceSchema as SourceSchema
} from "@monye.one/bank";
import {trpc} from "@monye.one/trpc-client";

export const UseBankRepository: UseRepository = withUseRepository<SourceSchema>(trpc.bank.repository);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oj36wtrijdevorrptlq834cm = true;