/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {trpc} from "@monye.one/trpc-client";

export const useLabelQueryInvalidator = () => {
    const trpcContext = trpc.useContext();
    return () => {
        trpcContext.label.source.query.invalidate();
		trpcContext.label.source.count.invalidate();
    };
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_uogm4gkszxev13ux98hmfig2 = true;