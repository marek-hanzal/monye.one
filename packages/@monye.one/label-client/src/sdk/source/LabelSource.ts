/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	LabelSourceSchema as SourceSchema,
	type ILabelSourceSchema as ISourceSchema
} from "@leight/label";
import {UseLabelRepository as UseRepository} from "../trpc/UseLabelRepository";
import {useLabelInvalidator as useInvalidator} from "../trpc/useLabelInvalidator";

export const LabelSource = withSource<ISourceSchema>({
    name: "Label",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_hws4fbzqedg09gddhlbk1vgc = true;