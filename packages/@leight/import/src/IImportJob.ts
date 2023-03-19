import {JobSchema} from "@leight/job";
import {z}         from "zod";

export const ImportJobSchema = JobSchema.merge(z.object({
    params: z.object({
        fileId: z.string(),
    }),
}));

export type IImportJobSchema = typeof ImportJobSchema;

export type IImportJob = z.infer<IImportJobSchema>;
