/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$BankSourceService,
	type IBankSourceSchemaType
} from "@monye.one/bank";

export const BankSourceProcedure = withSourceProcedure<IBankSourceSchemaType>({
    sourceService: $BankSourceService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_f5g5t6ysee3cjeqbf6yam788 = true;