/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$BankSource,
	BankQuerySchema,
	type IBankSourceSchema
} from "@monye.one/bank";

export const BankSourceProcedure = withSourceProcedure<IBankSourceSchema>({
    source: $BankSource,
    schema: BankQuerySchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_l5urmxya7uf136zbjar8mt5m = true;