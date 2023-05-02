import {
    FilterPartialSchema,
    FilterSchema as PrismaFilterSchema
}          from "@leight/prisma";
import {
    FilterSchema,
    type ISourceSchemaType,
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";

export const FilterSourceSchema = withSourceSchema({
    EntitySchema:   PrismaFilterSchema,
    DtoSchema:      PrismaFilterSchema.merge(z.object({
        filter: z.record(z.any()),
        dto:    z.record(z.any()).nullish(),
    })),
    ToCreateSchema: z.object({
        name:   z.string(),
        type:   z.string(),
        filter: z.record(z.any()),
        dto:    z.record(z.any()).nullish(),
    }),
    CreateSchema:   z.object({
        name:   z.string(),
        type:   z.string(),
        filter: z.string(),
        dto:    z.string().nullish(),
        userId: z.string(),
    }),
    ToPatchSchema:  FilterPartialSchema.merge(PatchSchema).merge(z.object({
        filter: z.record(z.any()),
        dto:    z.record(z.any()).nullish(),
    })),
    PatchSchema:    FilterPartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        type:      z.string().optional(),
        type_name: z.object({
            type: z.string(),
            name: z.string(),
        }).optional(),
    })),
    SortSchema:     z.object({
        id: SortOrderSchema
    }),
});
export type IFilterSourceSchemaType = ISourceSchemaType.of<typeof FilterSourceSchema>;
