import {z} from "@leight/zod";

export const ImportParamsSchema = z.object({
    service: z.string().optional(),
    fileId:  z.string(),
});
export type IImportParamsSchema = typeof ImportParamsSchema;
export type IImportParams = z.infer<IImportParamsSchema>;
