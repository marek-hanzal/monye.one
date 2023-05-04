/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IUseQueryInvalidator} from "@leight/source";
import {trpc} from "@monye.one/trpc-client";

export const useTransactionQueryInvalidator: IUseQueryInvalidator = () => {
    const trpcContext = trpc.useContext();
    return () => {
        trpcContext.transaction.source.query.invalidate();
		trpcContext.transaction.source.count.invalidate();
    };
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_y2k22k7up29e315vtvi1wdwm = true;