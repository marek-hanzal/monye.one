/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withRepositoryHandler} from "@leight/trpc-source-server";
import {
	$TransactionKeywordRepositoryService,
	type TransactionKeywordSource
} from "@monye.one/transaction";

export const TransactionKeywordRepositoryHandler = withRepositoryHandler<TransactionKeywordSource["Schema"]["Service"]>({
    service: $TransactionKeywordRepositoryService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_cn53lny8kcuhrcq81ycmgj6z = true;