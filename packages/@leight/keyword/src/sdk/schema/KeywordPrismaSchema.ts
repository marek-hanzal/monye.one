/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	KeywordWhereInputSchema,
	KeywordWhereUniqueInputSchema,
	KeywordOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IKeywordPrismaSchemaType = ISourceSchemaExType.of<typeof KeywordPrismaSchema>;

export const KeywordPrismaSchema = withSourceSchemaEx({
    WhereSchema:       KeywordWhereInputSchema,
    WhereUniqueSchema: KeywordWhereUniqueInputSchema,
    OrderBySchema:     KeywordOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_d9obhd2m713xoqndd595459k = true;