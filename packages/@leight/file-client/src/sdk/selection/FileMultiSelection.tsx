/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type FileSource} from "@leight/file";

export type IFileMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<FileSource["Type"]["Dto"]>>;

export const FileMultiSelection = createMultiSelectionStore<FileSource["Type"]["Dto"]>({name: "File"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_tk4t9eoajcrge8qydg1avd5b = true;