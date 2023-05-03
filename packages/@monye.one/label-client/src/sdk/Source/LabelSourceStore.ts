/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {LabelSourceSchema} from "@leight/label";
import {UseLabelSourceQuery} from "../Trpc/UseLabelSourceQuery";

export const LabelSourceStore = withSourceStore({
    name: "Label",
    schema: LabelSourceSchema,
    use: UseLabelSourceQuery,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ci9w1v51j14c6dpcqqttwkui = true;