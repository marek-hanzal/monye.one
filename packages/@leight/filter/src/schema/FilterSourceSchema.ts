import {
    FilterPartialSchema,
    FilterSchema as PrismaFilterSchema
}                   from "@leight/prisma";
import {
    FilterSchema,
    type ISourceSchemaType,
    ParamsSchema,
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
}                   from "@leight/source";
import {JsonSchema} from "@leight/utils";
import {z}          from "@leight/zod";

export const FilterSourceSchema = withSourceSchema({
    EntitySchema:   PrismaFilterSchema,
    DtoSchema:      PrismaFilterSchema.merge(z.object({
        filter: JsonSchema,
        dto:    JsonSchema.nullish(),
    })),
    ToCreateSchema: z.object({
        name:   z.string(),
        type:   z.string(),
        filter: JsonSchema,
        dto:    JsonSchema.nullish(),
    }),
    CreateSchema:   z.object({
        name:   z.string(),
        type:   z.string(),
        filter: z.string(),
        dto:    z.string().nullish(),
        userId: z.string(),
    }),
    ToPatchSchema:  FilterPartialSchema.merge(PatchSchema).merge(z.object({
        filter: JsonSchema,
        dto:    JsonSchema.nullish(),
    })),
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
