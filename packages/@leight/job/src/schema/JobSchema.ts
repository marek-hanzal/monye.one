import {
    JobSchema,
    JobStatusSchema,
    JsonValue
}          from "@leight/prisma";
import {z} from "@leight/zod";

export type IJobStatusSchema = typeof JobStatusSchema;
export type IJobStatus = z.infer<IJobStatusSchema>;

export const JobDoneStatus: IJobStatus[] = [
    "DONE",
    "FAILURE",
    "REVIEW",
    "SUCCESS"
];

export const JobSchemaEx = z.object({
    params: JsonValue.nullable(),
});
export const JobDtoEx    = JobSchema.merge(z.object({
    params: z.any().optional(),
}));

export {JobStatusSchema} from "@leight/prisma";
