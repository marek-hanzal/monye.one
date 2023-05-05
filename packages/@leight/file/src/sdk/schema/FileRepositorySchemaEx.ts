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

export const FileRepositorySchemaEx: IFileRepositorySchemaEx["Schema"] = {
    WhereSchema:       FileWhereInputSchema,
    WhereUniqueSchema: FileWhereUniqueInputSchema,
    OrderBySchema:     FileOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dluqpr16huuhmiwu6k94uzlu = true;