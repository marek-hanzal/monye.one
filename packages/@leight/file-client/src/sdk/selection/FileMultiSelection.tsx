/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/store";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type IFileSourceType as SourceType} from "@leight/file";

export type IFileMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<SourceType["Dto"]>>;

export const FileMultiSelection = createMultiSelectionStore<SourceType["Dto"]>({name: "File"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_juciub9pb58rxci4esm3e72w = true;