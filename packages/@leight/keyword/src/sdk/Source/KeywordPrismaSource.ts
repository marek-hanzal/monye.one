/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IKeywordSourceSchemaType} from "../../schema/KeywordSourceSchema";

export type IUseKeywordSourceQuery = IUseSourceQuery<IKeywordSourceSchemaType>;

export interface IKeywordSource extends ISource<IKeywordSourceSchemaType> {
}

export const $KeywordSource = Symbol.for("@leight/keyword/IKeywordSource");
export const $KeywordSourceMapper = Symbol.for("@leight/keyword/IKeywordSourceMapper");
export const $KeywordSourceService = Symbol.for("@leight/keyword/IKeywordSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oocmaerg4s4t5ky9tawkdynt = true;