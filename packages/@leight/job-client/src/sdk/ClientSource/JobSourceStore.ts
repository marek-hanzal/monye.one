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
export const $leight_y1p49c1fp8ysc8e7idkpea3e = true;