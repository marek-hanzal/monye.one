/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {FilterSourceSchema} from "@leight/filter";
import {UseFilterSourceQuery} from "../Trpc/UseFilterSourceQuery";

export const FilterSourceStore = withSourceStore({
    name: "Filter",
    schema: FilterSourceSchema,
    use: UseFilterSourceQuery,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_n3cj1zr4gbxu7wc11g9xc5p6 = true;