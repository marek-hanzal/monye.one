/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$TransactionSourceService,
	type ITransactionSourceSchemaType
} from "@monye.one/transaction";

export const TransactionSourceProcedure = withSourceProcedure<ITransactionSourceSchemaType>({
    sourceService: $TransactionSourceService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_aw6i959lt5ldo8edbt31jt3v = true;