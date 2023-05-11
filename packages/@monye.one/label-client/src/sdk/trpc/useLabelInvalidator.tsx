/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {trpc} from "@monye.one/trpc-client";
import {type IUseLabelInvalidator as IUseInvalidator} from "@leight/label";

export const useLabelInvalidator: IUseInvalidator = () => {
    const trpcContext = trpc.useContext();
    return () => {
        trpcContext.label.repository.query.invalidate();
		trpcContext.label.repository.count.invalidate();
    };
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_g0dz9znz6zgy7mdvvi5lqzvg = true;