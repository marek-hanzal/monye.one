/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IFileSourceSchemaType} from "../../schema/FileSourceSchema";

export type IUseFileSourceQuery = IUseSourceQuery<IFileSourceSchemaType>;

export interface IFileSource extends ISource<IFileSourceSchemaType> {
}

export const $FileSource = Symbol.for("@leight/file/IFileSource");
export const $FileSourceMapper = Symbol.for("@leight/file/IFileSourceMapper");
export const $FileSourceService = Symbol.for("@leight/file/IFileSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_s20a7tvkxt8kyjxhtuaybf40 = true;