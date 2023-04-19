/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	JobSchema as $EntitySchema,
	JobOptionalDefaultsSchema,
	JobPartialSchema,
	JobWhereInputSchema,
	JobWhereUniqueInputSchema,
	JobOrderByWithRelationInputSchema
} from "@leight/prisma";
import {FilterSchema} from "@leight/filter";
import {SortOrderSchema} from "@leight/sort";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {
	withSourceExSchema,
	type InferSourceExSchema,
	type IUseSourceQuery,
	type ISource,
	type InferSourceSchema,
	withSourceSchema,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {JobSchemaEx} from "../schema";
import {ParamsSchema} from "@leight/query";

export type IJobSourceSchema = InferSourceSchema<typeof JobSourceSchema>;
export type IJobPrismaSchema = InferSourceExSchema<typeof JobPrismaSchema>;
export type IUseJobSourceQuery = IUseSourceQuery<IJobSourceSchema>;

export interface IJobSource extends ISource<IJobSourceSchema> {
}

export const JobPrismaSchema = withSourceExSchema({
    WhereSchema:       JobWhereInputSchema,
    WhereUniqueSchema: JobWhereUniqueInputSchema,
    OrderBySchema:     JobOrderByWithRelationInputSchema,
});
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
    FilterSchema: z.union([
        JobWhereInputSchema,
        JobWhereUniqueInputSchema,
        FilterSchema,
    ]),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        started: SortOrderSchema
    }),
});
export const $JobSource = Symbol.for("@leight/job/IJobSource");
export const $JobSourceMapper = Symbol.for("@leight/job/IJobSourceMapper");
export const JobSourceContext = (container: IContainer) => new ServiceContext<IJobSource>(container, $JobSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_t6owtbjrj6hdmjhgjiwgr97r = true;