import {
    JobOptionalDefaultsSchema,
    JobPartialSchema,
    JobSchema
}          from "@leight/prisma";
import {
    PatchSchema,
    SortOrderSchema,
    type Source,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/utils";

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
    PatchSchema:    JobPartialSchema.merge(PatchSchema),
    SortSchema:     z.object({
        started: SortOrderSchema,
    }),
});
export type JobSource = Source<typeof JobSourceSchema>;
