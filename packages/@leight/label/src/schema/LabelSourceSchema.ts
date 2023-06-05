import {
    SortOrderSchema,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/utils";

export const LabelSourceSchema = withSourceSchema({
    // EntitySchema:   LabelSchema,
    // DtoSchema:      LabelSchema,
    ToCreateSchema: z.object({
        label: z.string(),
        type:  z.string(),
    }),
    CreateSchema:   z.object({
        label:  z.string(),
        type:   z.string(),
        userId: z.string(),
    }),
    // ToPatchSchema:  LabelPartialSchema.merge(PatchSchema).merge(z.object({
    //     label: z.string(),
    //     type:  z.string(),
    // })),
    // PatchSchema:    LabelPartialSchema.merge(PatchSchema),
    // FilterSchema:   FilterSchema.merge(z.object({
    //     type: z.string().optional(),
    // })),
    SortSchema:     z.object({
        id: SortOrderSchema
    }),
});
