import {
    FileOptionalDefaultsSchema,
    FilePartialSchema,
    FileSchema
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

export const FileSourceSchema = withSourceSchema({
    EntitySchema:   FileSchema,
    DtoSchema:      FileSchema,
    ToCreateSchema: FileOptionalDefaultsSchema,
    CreateSchema:   FileOptionalDefaultsSchema,
    ToPatchSchema:  FilePartialSchema.merge(PatchSchema),
    PatchSchema:    FilePartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        userId_path_name: z.object({
            name:   z.string(),
            path:   z.string(),
            userId: z.string(),
        }).optional(),
    })),
    ParamsSchema:   ParamsSchema,
    SortSchema:     z.object({
        id: SortOrderSchema
    }),
});
export type IFileSourceSchemaType = ISourceSchemaType.of<typeof FileSourceSchema>;
