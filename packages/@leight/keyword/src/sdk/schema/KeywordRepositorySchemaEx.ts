/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	KeywordWhereInputSchema,
	KeywordWhereUniqueInputSchema,
	KeywordOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IKeywordRepositorySchemaEx = IRepositorySchemaEx<
    typeof KeywordWhereInputSchema,
    typeof KeywordWhereUniqueInputSchema,
    typeof KeywordOrderByWithRelationInputSchema
>;

export const KeywordRepositorySchemaEx: IKeywordRepositorySchemaEx["Schema"] = {
    WhereSchema:       KeywordWhereInputSchema,
    WhereUniqueSchema: KeywordWhereUniqueInputSchema,
    OrderBySchema:     KeywordOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_y0m1wcp8494odg8fdeyste1c = true;