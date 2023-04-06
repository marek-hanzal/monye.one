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

export const TransactionSourceStore = createSourceContext<ITransactionSourceSchema>({
    name:   "Transaction",
    schema: TransactionSchema,
});
export const TransactionSortStore = createSortContext<ITransactionSortSchema>({
    name:   "TransactionSort",
    schema: TransactionSortSchema,
});