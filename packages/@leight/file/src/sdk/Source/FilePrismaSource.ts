/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IFileSourceSchema} from "./FileSchema";

export type IUseFileSourceQuery = IUseSourceQuery<IFileSourceSchema>;

export interface IFileSource extends ISource<IFileSourceSchema> {
}

export const $FileSource = Symbol.for("@leight/file/IFileSource");
export const $FileSourceMapper = Symbol.for("@leight/file/IFileSourceMapper");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bxauvjam0p6k43yguyvf3gdd = true;