/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	JobSchema as $EntitySchema,
	JobOptionalDefaultsSchema,
	JobPartialSchema
} from "@leight/prisma";
import {SortOrderSchema} from "@leight/sort";
import {FilterSchema} from "@leight/filter";
import {
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {JobSchemaEx} from "../../schema";
import {ParamsSchema} from "@leight/query";

export type IJobSourceSchemaType = ISourceSchemaType.of<typeof JobSourceSchema>;

const $JobSchema = $EntitySchema.merge(JobSchemaEx);
const $JobCreateSchema = JobOptionalDefaultsSchema;
const $JobPatchSchema = JobPartialSchema.merge(PatchSchema);
export const JobSourceSchema = withSourceSchema({
    EntitySchema: $JobSchema,
    DtoSchema: $JobSchema,
    ToCreateSchema: $JobCreateSchema,
    CreateSchema: $JobCreateSchema,
    ToPatchSchema: $JobPatchSchema,
    PatchSchema: $JobPatchSchema,
    FilterSchema: FilterSchema,
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        started: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_jdpnsvxk9w7jqbfnxvdngevb = true;