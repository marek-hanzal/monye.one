/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {trpc} from "@monye.one/trpc-client";

export const useBankQueryInvalidator = () => {
    const trpcContext = trpc.useContext();
    return () => {
        trpcContext.bank.source.query.invalidate();
		trpcContext.bank.source.count.invalidate();
    };
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rx7tpm5nt7wk3v1ivs4sqpd6 = true;