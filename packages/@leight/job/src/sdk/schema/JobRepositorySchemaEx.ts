/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {z} from "@leight/utils";

export type IJobRepositorySchemaEx = IRepositorySchemaEx<
    any,
    any,
    any
>;
export type IJobRepositoryExType = IJobRepositorySchemaEx["Type"];
export type IJobRepositoryExSchema = IJobRepositorySchemaEx["Schema"];

export const JobRepositorySchemaEx: IJobRepositoryExSchema = {
    WhereSchema:       z.object({}),
    WhereUniqueSchema: z.object({}),
    OrderBySchema:     z.object({}),
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_nza8fi4wzgazb4r5tu36ycmx = true;