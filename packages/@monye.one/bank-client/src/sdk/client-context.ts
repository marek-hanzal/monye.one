import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {
	type IBankSourceSchema,
	BankSchema,
	type IBankSortSchema,
	BankSortSchema
} from "@monye.one/bank";

export type IBankSource = ISourceProps<IBankSourceSchema>;

const StoreSourceContext = createSourceContext<IBankSourceSchema>({
    name:   "Bank",
    schema: BankSchema,
});
 const StoreSortContext = createSortContext<IBankSortSchema>({
    name:   "BankSort",
    schema: BankSortSchema,
});
export const BankProvider = StoreSourceContext.Provider;
export const useBankSource = StoreSourceContext.useState;
export const useOptionalBankSource = StoreSourceContext.useOptionalState;
export const useBankStore = StoreSourceContext.useStore;
export const useOptionalBankStore = StoreSourceContext.useOptionalStore;
export const BankSortProvider = StoreSortContext.Provider;
export const useBankSort = StoreSortContext.useState;
export const useOptionalBankSort = StoreSortContext.useOptionalState;
export const useBankSortStore = StoreSortContext.useStore;
export const useOptionalBankSortStore = StoreSortContext.useOptionalStore;