import {JobStatusSchema} from "@leight/prisma";
import {z}               from "@leight/zod";

export {JobStatusSchema} from "@leight/prisma";

export type IJobStatusSchema = typeof JobStatusSchema;
export type IJobStatus = z.infer<IJobStatusSchema>;

export const JobDoneStatus: IJobStatus[] = [
    "DONE",
    "FAILURE",
    "REVIEW",
    "SUCCESS"
];

export const JobSchemaEx = z.object({
    params: z.any().optional(),
});
