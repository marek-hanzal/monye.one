/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	UserWhereInputSchema,
	UserWhereUniqueInputSchema,
	UserOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IUserPrismaSchemaType = ISourceSchemaExType.of<typeof UserPrismaSchema>;

export const UserPrismaSchema = withSourceSchemaEx({
    WhereSchema:       UserWhereInputSchema,
    WhereUniqueSchema: UserWhereUniqueInputSchema,
    OrderBySchema:     UserOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_hw4a4rjg5n5kc19ga505t3qd = true;