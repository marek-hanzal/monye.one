// Generated file
import {
	type ISource,
	type ISourceSchema
} from "@leight/source";
import {
	type IJobCreateSchema,
	type IJobFilterSchema,
	type IJobParamSchema,
	type IJobPatchSchema,
	type IJobSchema,
	type IJobSortSchema
} from "./entity-schema";

export interface IJobSource extends ISource<IJobSourceSchema> {
}

export interface IJobSourceSchema extends ISourceSchema<
    IJobSchema,
    IJobCreateSchema,
    IJobPatchSchema,
    IJobFilterSchema,
    IJobSortSchema,
    IJobParamSchema
 > {
}

export const $JobSource = Symbol.for("@leight/job/IJobSource");