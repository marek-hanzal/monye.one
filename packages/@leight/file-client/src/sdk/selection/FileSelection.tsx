/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type ISelectionStoreProps} from "@leight/selection";
import {type FileSource} from "@leight/file";

export type IFileSelectionStore = IStoreContext<ISelectionStoreProps<FileSource["Type"]["Dto"]>>;

export const FileSelection = createSelectionStore<FileSource["Type"]["Dto"]>({name: "File"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_n19vs9s6sjk9iv1hwjv8s9i4 = true;