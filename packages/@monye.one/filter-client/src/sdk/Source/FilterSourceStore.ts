/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {FilterSourceSchema} from "@leight/filter";
import {UseFilterSourceQuery} from "../Trpc/UseFilterSourceQuery";
import {useFilterQueryInvalidator} from "../Trpc/useFilterQueryInvalidator";

export const FilterSourceStore = withSourceStore({
    name: "Filter",
    schema: FilterSourceSchema,
    use: UseFilterSourceQuery,
    useInvalidator: useFilterQueryInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_k6i6jxkjfvvhuhl1kv1nn4lo = true;