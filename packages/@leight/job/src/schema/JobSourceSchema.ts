import {
    JobOptionalDefaultsSchema,
    JobPartialSchema,
    JobSchema
}          from "@leight/prisma";
import {
    FilterSchema,
    type ISourceSchemaType,
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";

export const JobSourceSchema = withSourceSchema({
    EntitySchema:   JobSchema,
    DtoSchema:      JobSchema.merge(z.object({
        params: z.object({}).nullish(),
    })),
    ToCreateSchema: JobOptionalDefaultsSchema.merge(z.object({
        params: z.object({}).nullish(),
    })),
    CreateSchema:   JobOptionalDefaultsSchema,
    ToPatchSchema:  JobPartialSchema.merge(PatchSchema).merge(z.object({
        params: z.object({}).nullish(),
    })),
    FilterSchema:   FilterSchema,
    PatchSchema:    JobPartialSchema.merge(PatchSchema),
    SortSchema:     z.object({
        started: SortOrderSchema,
    }),
});
export type IJobSourceSchemaType = ISourceSchemaType.of<typeof JobSourceSchema>;
