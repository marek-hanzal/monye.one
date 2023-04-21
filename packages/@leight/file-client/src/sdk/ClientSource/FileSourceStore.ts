/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {FileSourceSchema} from "@leight/file";

export const FileSourceStore = withSourceStore({
    name: "File",
    SourceSchema: FileSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vm9p8tagjzg9206p5g3gs6ux = true;