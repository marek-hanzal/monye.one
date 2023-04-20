/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {TransactionSourceSchema} from "@monye.one/transaction";

export const TransactionSourceStore = withSourceStore({
    name: "Transaction",
    SourceSchema: TransactionSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_c8noe3ptlz519dvk02x467uv = true;