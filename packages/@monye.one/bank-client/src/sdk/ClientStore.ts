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

/**
 * Defines Store for Bank, so you can access it's data.
 */
export const BankSourceStore = createSourceContext<IBankSourceSchema>({
    name:   "Bank",
    schema: BankSchema,
});
/**
 * Defines Store for Bank sorting data.
 */
export const BankSortStore = createSortContext<IBankSortSchema>({
    name:   "BankSort",
    schema: BankSortSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_y4l444en87rjcngf7qezgnxw = true;