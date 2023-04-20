/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	UserWhereInputSchema,
	UserWhereUniqueInputSchema,
	UserSchema as $EntitySchema,
	UserOptionalDefaultsSchema,
	UserPartialSchema
} from "@leight/prisma";
import {SortOrderSchema} from "@leight/sort";
import {
	withSourceSchema,
	type InferSourceSchema,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {FilterSchema} from "@leight/filter";
import {ParamsSchema} from "@leight/query";

export type IUserSourceSchema = InferSourceSchema<typeof UserSourceSchema>;

const $UserSchema = $EntitySchema;
const $UserCreateSchema = UserOptionalDefaultsSchema;
const $UserPatchSchema = UserPartialSchema.merge(PatchSchema);
export const UserSourceSchema = withSourceSchema({
    EntitySchema: $UserSchema,
    DtoSchema: $UserSchema,
    ToCreateSchema: $UserCreateSchema,
    CreateSchema: $UserCreateSchema,
    ToPatchSchema: $UserPatchSchema,
    PatchSchema: $UserPatchSchema,
    FilterSchema: z.union([
        UserWhereInputSchema,
        UserWhereUniqueInputSchema,
        FilterSchema,
    ]),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vuv1m2e7l33wtxzj2yskfwsb = true;