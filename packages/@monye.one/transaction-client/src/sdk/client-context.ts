// Generated file
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

const StoreSourceContext = createSourceContext<ITransactionSourceSchema>({
    name:   "Transaction",
    schema: TransactionSchema,
});
 const StoreSortContext = createSortContext<ITransactionSortSchema>({
    name:   "TransactionSort",
    schema: TransactionSortSchema,
});
export const TransactionProvider = StoreSourceContext.Provider;
export const useTransactionSource = StoreSourceContext.useState;
export const useOptionalTransactionSource = StoreSourceContext.useOptionalState;
export const useTransactionStore = StoreSourceContext.useStore;
export const useOptionalTransactionStore = StoreSourceContext.useOptionalStore;
export const TransactionSortProvider = StoreSortContext.Provider;
export const useTransactionSort = StoreSortContext.useState;
export const useOptionalTransactionSort = StoreSortContext.useOptionalState;
export const useTransactionSortStore = StoreSortContext.useStore;
export const useOptionalTransactionSortStore = StoreSortContext.useOptionalStore;