/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	UserWhereInputSchema,
	UserWhereUniqueInputSchema,
	UserOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IUserRepositorySchemaEx = IRepositorySchemaEx<
    typeof UserWhereInputSchema,
    typeof UserWhereUniqueInputSchema,
    typeof UserOrderByWithRelationInputSchema
>;
export type IUserRepositoryExType = IUserRepositorySchemaEx["Type"];
export type IUserRepositoryExSchema = IUserRepositorySchemaEx["Schema"];

export const UserRepositorySchemaEx: IUserRepositoryExSchema = {
    WhereSchema:       UserWhereInputSchema,
    WhereUniqueSchema: UserWhereUniqueInputSchema,
    OrderBySchema:     UserOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_qvq1jlhnd62udfaln8vvziqg = true;