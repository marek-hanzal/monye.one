/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	LabelSourceSchema as SourceSchema,
	type LabelSource as Source
} from "@leight/label";
import {UseLabelRepository as UseRepository} from "../trpc/UseLabelRepository";
import {useLabelInvalidator as useInvalidator} from "../trpc/useLabelInvalidator";

export const LabelSource = withSource<Source>({
    name: "Label",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_xl72gwpyl58oolx7i36plotr = true;