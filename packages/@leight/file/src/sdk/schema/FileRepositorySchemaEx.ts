/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	FileWhereInputSchema,
	FileWhereUniqueInputSchema,
	FileOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IFileRepositorySchemaEx = IRepositorySchemaEx<
    typeof FileWhereInputSchema,
    typeof FileWhereUniqueInputSchema,
    typeof FileOrderByWithRelationInputSchema
>;
export type IFileRepositoryExType = IFileRepositorySchemaEx["Type"];
export type IFileRepositoryExSchema = IFileRepositorySchemaEx["Schema"];

export const FileRepositorySchemaEx: IFileRepositoryExSchema = {
    WhereSchema:       FileWhereInputSchema,
    WhereUniqueSchema: FileWhereUniqueInputSchema,
    OrderBySchema:     FileOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ysdzv2uz8ygvg6prabyb4aei = true;