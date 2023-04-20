/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$TransactionSourceMapper,
	$TransactionSource,
	TransactionSourceSchema,
	type ITransactionSourceSchema
} from "@monye.one/transaction";

export const TransactionSourceProcedure = withSourceProcedure<ITransactionSourceSchema>({
    mapper: $TransactionSourceMapper,
    source: $TransactionSource,
    schema: {
        create: TransactionSourceSchema["ToCreateSchema"],
        patch: TransactionSourceSchema["ToPatchSchema"],
        query: TransactionSourceSchema["QuerySchema"],
    },
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u8n50hpm1wdinz9l4h90jsxc = true;