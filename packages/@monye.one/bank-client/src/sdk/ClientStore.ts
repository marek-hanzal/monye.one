/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
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

export const BankSourceStore = createSourceContext<IBankSourceSchema>({
    name:   "Bank",
    schema: BankSchema,
});
export const BankSortStore = createSortContext<IBankSortSchema>({
    name:   "BankSort",
    schema: BankSortSchema,
});