/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	FileSchema as $EntitySchema,
	FileOptionalDefaultsSchema,
	FilePartialSchema
} from "@leight/prisma";
import {SortOrderSchema} from "@leight/sort";
import {FilterSchema} from "@leight/filter";
import {
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {FileFilterSchemaEx} from "../../schema";
import {ParamsSchema} from "@leight/query";

export type IFileSourceSchemaType = ISourceSchemaType.of<typeof FileSourceSchema>;

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
    FilterSchema: FilterSchema.merge(FileFilterSchemaEx),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_m42ns0wf59rmz6um9doneskw = true;