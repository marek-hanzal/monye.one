/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {trpc} from "@monye.one/trpc-client";
import {type IUseTransactionInvalidator as IUseInvalidator} from "@monye.one/transaction";

export const useTransactionInvalidator: IUseInvalidator = () => {
    const trpcContext = trpc.useContext();
    return () => {
        trpcContext.transaction.repository.query.invalidate();
		trpcContext.transaction.repository.count.invalidate();
    };
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_i5s9yd8cb5isgtru02pxprb5 = true;