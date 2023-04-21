import {
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

export const JobParamsSchema = z.object({});
export type IJobParamsSchema = typeof JobParamsSchema;
export type IJobParams = z.infer<IJobParamsSchema>;

export const JobSchemaEx = z.object({
    params: JsonValue.nullable(),
});

export {JobStatusSchema} from "@leight/prisma";
