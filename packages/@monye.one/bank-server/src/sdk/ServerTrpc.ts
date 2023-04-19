/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$BankSourceMapper,
	$BankSource,
	BankSourceSchema,
	type IBankSourceSchema
} from "@monye.one/bank";

export const BankSourceProcedure = withSourceProcedure<IBankSourceSchema>({
    mapper: $BankSourceMapper,
    source: $BankSource,
    schema: {
        create: BankSourceSchema["ToCreateSchema"],
        patch: BankSourceSchema["ToPatchSchema"],
        query: BankSourceSchema["QuerySchema"],
    },
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rq3n6rqtsem665hl0lcufi5b = true;