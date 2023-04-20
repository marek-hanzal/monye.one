/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {JobSourceSchema} from "@leight/job";

export const JobSourceStore = withSourceStore({
    name: "Job",
    SourceSchema: JobSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u6lcf4sjpsnt5aa1oxyg8u0d = true;