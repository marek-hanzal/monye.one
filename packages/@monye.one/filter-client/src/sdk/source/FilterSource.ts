/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	FilterSourceSchema as SourceSchema,
	type FilterSource as Source
} from "@leight/filter";
import {UseFilterRepository as UseRepository} from "../trpc/UseFilterRepository";
import {useFilterInvalidator as useInvalidator} from "../trpc/useFilterInvalidator";

export const FilterSource = withSource<Source>({
    name: "Filter",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_yiraw9qrji0wns8s2azlkajd = true;