import {FilterPartialSchema, FilterSchema as PrismaFilterSchema, InputJsonValue, JsonValue} from "@leight/prisma";
import {
    FilterSchema,
    type ISourceSchemaType,
    ParamsSchema,
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
} from "@leight/source";
import {z} from "@leight/zod";

export const FilterSourceSchema = withSourceSchema({
    EntitySchema: PrismaFilterSchema.merge(z.object({
        filter: InputJsonValue.nullable(),
        dto: JsonValue.nullable().optional(),
    })),
    DtoSchema: PrismaFilterSchema.merge(z.object({
        filter: InputJsonValue.nullable(),
        dto: JsonValue.nullable().optional(),
    })),
    ToCreateSchema: z.object({
        name: z.string(),
        type: z.string(),
        filter: InputJsonValue.nullable(),
        dto: JsonValue.nullable().optional(),
    }),
    CreateSchema: PrismaFilterSchema,
    ToPatchSchema: FilterPartialSchema.merge(PatchSchema).merge(z.object({
        filter: InputJsonValue.nullable(),
        dto: JsonValue.nullable().optional(),
    })),
    PatchSchema: FilterPartialSchema.merge(PatchSchema),
    FilterSchema: FilterSchema.merge(z.object({
        type: z.string().optional(),
    })),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
export type IFilterSourceSchemaType = ISourceSchemaType.of<typeof FilterSourceSchema>;
