/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {createFilterContext} from "@leight/filter-client";
import {
	type ITransactionSourceSchema,
	TransactionSchema,
	type ITransactionSortSchema,
	TransactionSortSchema,
	type ITransactionFilterSchema,
	TransactionFilterSchema
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
 * Defines Store for Transaction filtering entities.
 */
export const TransactionFilterStore = createFilterContext<ITransactionFilterSchema>({
    name:   "TransactionFilter",
    schema: TransactionFilterSchema,
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
export const $leight_ix2sprs0f8b1ulo70zqrtlc8 = true;