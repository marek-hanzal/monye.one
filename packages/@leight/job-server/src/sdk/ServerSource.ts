/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IJobSource,
	type IJobSourceSchema
} from "@leight/job";
import {
	AbstractSourceMapper,
	type ISourceMapper
} from "@leight/source-server";
import {JobBasePrismaSource} from "./ServerPrismaSource";

export type IJobSourceMapper = ISourceMapper<IJobSourceSchema>;

export class JobSource extends JobBasePrismaSource implements IJobSource {
}

export class JobSourceMapper extends AbstractSourceMapper<IJobSourceSchema> implements IJobSourceMapper {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gpznikrbbjlqjdl19u5mslou = true;