import {
    FilterOptionalDefaultsSchema,
    FilterPartialSchema,
    FilterSchema as PrismaFilterSchema,
    InputJsonValue,
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

export const FilterSourceSchema = withSourceSchema({
    EntitySchema:   PrismaFilterSchema.merge(z.object({
        filter: InputJsonValue.nullable(),
        dto:    JsonValue.nullable().optional(),
    })),
    DtoSchema:      PrismaFilterSchema.merge(z.object({
        filter: InputJsonValue.nullable(),
        dto:    JsonValue.nullable().optional(),
    })),
    ToCreateSchema: FilterOptionalDefaultsSchema,
    CreateSchema:   FilterOptionalDefaultsSchema,
    ToPatchSchema:  FilterPartialSchema.merge(PatchSchema),
    PatchSchema:    FilterPartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        type: z.string().optional(),
    })),
    ParamsSchema:   ParamsSchema,
    SortSchema:     z.object({
        id: SortOrderSchema
    }),
});
export type IFilterSourceSchemaType = ISourceSchemaType.of<typeof FilterSourceSchema>;
