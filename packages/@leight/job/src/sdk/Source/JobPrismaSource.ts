/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IJobSourceSchemaType} from "../../schema/JobSourceSchema";

export type IUseJobSourceQuery = IUseSourceQuery<IJobSourceSchemaType>;

export interface IJobSource extends ISource<IJobSourceSchemaType> {
}

export const $JobSource = Symbol.for("@leight/job/IJobSource");
export const $JobSourceMapper = Symbol.for("@leight/job/IJobSourceMapper");
export const $JobSourceService = Symbol.for("@leight/job/IJobSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_g0rlkyagoghn608g09yup6lf = true;