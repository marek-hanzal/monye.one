/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	FileWhereInputSchema,
	FileWhereUniqueInputSchema,
	FileSchema as $EntitySchema,
	FileOptionalDefaultsSchema,
	FilePartialSchema
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

export type IFileSourceSchema = InferSourceSchema<typeof FileSourceSchema>;

const $FileSchema = $EntitySchema;
const $FileCreateSchema = FileOptionalDefaultsSchema;
const $FilePatchSchema = FilePartialSchema.merge(PatchSchema);
export const FileSourceSchema = withSourceSchema({
    EntitySchema: $FileSchema,
    DtoSchema: $FileSchema,
    ToCreateSchema: $FileCreateSchema,
    CreateSchema: $FileCreateSchema,
    ToPatchSchema: $FilePatchSchema,
    PatchSchema: $FilePatchSchema,
    FilterSchema: z.union([
        FileWhereInputSchema,
        FileWhereUniqueInputSchema,
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
export const $leight_rf5tb5p2ojcu8zn7m5e10tor = true;