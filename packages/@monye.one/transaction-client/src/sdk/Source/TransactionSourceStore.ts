/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {TransactionSourceSchema} from "@monye.one/transaction";
import {UseTransactionSourceQuery} from "../Trpc/UseTransactionSourceQuery";

export const TransactionSourceStore = withSourceStore({
    name: "Transaction",
    schema: TransactionSourceSchema,
    use: UseTransactionSourceQuery,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_zcb8gahm6zx41y8umr20mvmv = true;