"use client";
/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/store";
import {type ISelectionStoreProps} from "@leight/selection";
import {type IFileSourceType as SourceType} from "@leight/file";

export type IFileSelectionStore = IStoreContext<ISelectionStoreProps<SourceType["Dto"]>>;

export const FileSelection = createSelectionStore<SourceType["Dto"]>({name: "File"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_blrq2uh7ac8i5bx9yvblkk9l = true;