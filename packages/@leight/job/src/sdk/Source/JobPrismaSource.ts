/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IJobSourceSchema} from "./JobSchema";

export type IUseJobSourceQuery = IUseSourceQuery<IJobSourceSchema>;

export interface IJobSource extends ISource<IJobSourceSchema> {
}

export const $JobSource = Symbol.for("@leight/job/IJobSource");
export const $JobSourceMapper = Symbol.for("@leight/job/IJobSourceMapper");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_frudgud0z7ii56kfbin4um2j = true;