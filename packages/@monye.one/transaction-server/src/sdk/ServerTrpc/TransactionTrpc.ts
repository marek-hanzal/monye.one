/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$TransactionSourceService,
	TransactionSourceSchema,
	type ITransactionSourceSchemaType
} from "@monye.one/transaction";

export const TransactionSourceProcedure = withSourceProcedure<ITransactionSourceSchemaType>({
    sourceService: $TransactionSourceService,
    schema: TransactionSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_c1m858has5czqcdfjv3oawgx = true;