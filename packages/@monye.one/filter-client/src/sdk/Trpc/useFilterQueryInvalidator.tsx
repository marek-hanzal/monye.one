/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IUseQueryInvalidator} from "@leight/source";
import {trpc} from "@monye.one/trpc-client";

export const useFilterQueryInvalidator: IUseQueryInvalidator = () => {
    const trpcContext = trpc.useContext();
    return () => {
        trpcContext.filter.source.query.invalidate();
		trpcContext.filter.source.count.invalidate();
    };
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_e2jfhwtc47e9m2u0dp5mji32 = true;