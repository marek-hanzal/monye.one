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
	type IBankSourceSchema,
	BankSchema,
	type IBankSortSchema,
	BankSortSchema,
	type IBankFilterSchema,
	BankFilterSchema
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
 * Defines Store for Bank filtering entities.
 */
export const BankFilterStore = createFilterContext<IBankFilterSchema>({
    name:   "BankFilter",
    schema: BankFilterSchema,
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
export const $leight_tz0286zpru8jv47gyoeqg67w = true;