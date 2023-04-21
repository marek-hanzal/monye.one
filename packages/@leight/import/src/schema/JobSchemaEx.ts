import {JobSourceSchema} from "@leight/job";
import {z}               from "@leight/zod";

export const ImportParamsSchema = z.object({
    service: z.string().optional(),
    fileId:  z.string(),
});
export const JobSchemaEx        = JobSourceSchema["EntitySchema"];
export const JobDtoEx           = JobSourceSchema["DtoSchema"].merge(z.object({
    params: ImportParamsSchema,
}));
