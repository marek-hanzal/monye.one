/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceExSchema,
	type InferSourceExSchema
} from "@leight/source";
import {
	FileWhereInputSchema,
	FileWhereUniqueInputSchema,
	FileOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IFilePrismaSchema = InferSourceExSchema<typeof FilePrismaSchema>;

export const FilePrismaSchema = withSourceExSchema({
    WhereSchema:       FileWhereInputSchema,
    WhereUniqueSchema: FileWhereUniqueInputSchema,
    OrderBySchema:     FileOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_cxlyd9ib9g45new6moni9b7s = true;