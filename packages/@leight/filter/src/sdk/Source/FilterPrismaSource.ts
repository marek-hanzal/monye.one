/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IFilterSourceSchemaType} from "../../schema/FilterSourceSchema";

export type IUseFilterSourceQuery = IUseSourceQuery<IFilterSourceSchemaType>;

export interface IFilterSource extends ISource<IFilterSourceSchemaType> {
}

export const $FilterSource = Symbol.for("@leight/filter/IFilterSource");
export const $FilterSourceMapper = Symbol.for("@leight/filter/IFilterSourceMapper");
export const $FilterSourceService = Symbol.for("@leight/filter/IFilterSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dwgm2ay1qqsq3d1suy05fgyy = true;