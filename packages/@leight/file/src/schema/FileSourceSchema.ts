import {
    FileOptionalDefaultsSchema,
    FilePartialSchema,
    FileSchema
}          from "@leight/prisma";
import {
    FilterSchema,
    PatchSchema,
    SortOrderSchema,
    type Source,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/utils";

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
    SortSchema:     z.object({
        id: SortOrderSchema
    }),
});
export type FileSource = Source<typeof FileSourceSchema>;
