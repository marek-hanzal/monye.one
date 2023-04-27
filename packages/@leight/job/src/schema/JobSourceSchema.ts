import {
    JobOptionalDefaultsSchema,
    JobPartialSchema,
    JobSchema,
    JsonValue
}          from "@leight/prisma";
import {
    FilterSchema,
    type ISourceSchemaType,
    ParamsSchema,
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";

export const JobSourceSchema = withSourceSchema({
    EntitySchema:   JobSchema.merge(z.object({
        params: JsonValue.nullable(),
    })),
    DtoSchema:      JobSchema.merge(z.object({
        params: JsonValue.nullable(),
    })),
    ToCreateSchema: JobOptionalDefaultsSchema,
    CreateSchema:   JobOptionalDefaultsSchema,
    ToPatchSchema:  JobPartialSchema.merge(PatchSchema),
    PatchSchema:    JobPartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema,
    ParamsSchema:   ParamsSchema,
    SortSchema:     z.object({
        started: SortOrderSchema,
    }),
});
export type IJobSourceSchemaType = ISourceSchemaType.of<typeof JobSourceSchema>;
