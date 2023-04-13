import {JobSchema} from "@leight/job";
import {z}         from "@leight/zod";

export const ImportJobParamsSchema = z.object({
    fileId: z.string(),
});
export type IImportJobParamsSchema = typeof ImportJobParamsSchema;
export type IImportJobParams = z.infer<IImportJobParamsSchema>;

export const ImportJobSchema = JobSchema.merge(z.object({
    params: ImportJobParamsSchema,
}));
export type IImportJobSchema = typeof ImportJobSchema;
export type IImportJob = z.infer<IImportJobSchema>;
