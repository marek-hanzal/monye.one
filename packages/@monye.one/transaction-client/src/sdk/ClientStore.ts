/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {
	type ITransactionSourceSchema,
	TransactionSchema,
	type ITransactionSortSchema,
	TransactionSortSchema
} from "@monye.one/transaction";

export type ITransactionSource = ISourceProps<ITransactionSourceSchema>;

/**
 * Defines Store for Transaction, so you can access it's data.
 */
export const TransactionSourceStore = createSourceContext<ITransactionSourceSchema>({
    name:   "Transaction",
    schema: TransactionSchema,
});
/**
 * Defines Store for Transaction sorting data.
 */
export const TransactionSortStore = createSortContext<ITransactionSortSchema>({
    name:   "TransactionSort",
    schema: TransactionSortSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_p3b9arfts55inyp9usrgyfni = true;