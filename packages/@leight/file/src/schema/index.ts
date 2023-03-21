import {FilterSchema} from "@leight/filter";
import {PrismaSchema} from "@leight/prisma";
import {
    ISourceSchema,
    WithIdentitySchema
}                     from "@leight/source";
import {z}            from "zod";

export const FileSchema = PrismaSchema.FileSchema;
export type IFileSchema = typeof FileSchema;
export type IFile = z.infer<IFileSchema>;

export const FileCreateSchema = PrismaSchema.FileOptionalDefaultsSchema;
export type IFileCreateSchema = typeof FileCreateSchema;
export type IFileCreate = z.infer<IFileCreateSchema>;

export const FilePatchSchema = PrismaSchema.FilePartialSchema.merge(WithIdentitySchema);
export type IFilePatchSchema = typeof FilePatchSchema;
export type IFilePatch = z.infer<IFilePatchSchema>;

export const FileFilterSchema = z.union([
    PrismaSchema.FileWhereInputSchema,
    PrismaSchema.FileWhereUniqueInputSchema,
    FilterSchema,
]);
export type IFileFilterSchema = typeof FileFilterSchema;
export type IFileFilter = z.infer<IFileFilterSchema>;

export interface IFileSourceSchema extends ISourceSchema<
    IFileSchema,
    IFileCreateSchema,
    IFilePatchSchema,
    IFileFilterSchema
> {
}
