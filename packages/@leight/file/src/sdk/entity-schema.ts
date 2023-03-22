// Generated file
import {PrismaSchema} from "@leight/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "zod";

export type IFileSchema = typeof FileSchema;
export type IFile = z.infer<IFileSchema>;
export type IFileCreateSchema = typeof FileCreateSchema;
export type IFileCreate = z.infer<IFileCreateSchema>;
export type IFilePatchSchema = typeof FilePatchSchema;
export type IFilePatch = z.infer<IFilePatchSchema>;
export type IFileFilterSchema = typeof FileFilterSchema;
export type IFileFilter = z.infer<IFileFilterSchema>;
export type IFileParamSchema = typeof FileParamSchema;
export type IFileParam = z.infer<IFileParamSchema>;
export type IFileSortSchema = typeof FileSortSchema;
export type IFileSort = z.infer<IFileSortSchema>;
export type IFileQuerySchema = typeof FileQuerySchema;
export type IFileQuery = z.infer<IFileQuerySchema>;

export const FileSchema = PrismaSchema.FileSchema;
export const FileCreateSchema = PrismaSchema.FileOptionalDefaultsSchema;
export const FilePatchSchema = PrismaSchema.FilePartialSchema.merge(WithIdentitySchema);
export const FileFilterSchema = z.union([
    PrismaSchema.FileWhereInputSchema,
    PrismaSchema.FileWhereUniqueInputSchema,
    FilterSchema,
]);
export const FileParamSchema = ParamsSchema;
export const FileSortSchema = z.object({
    
});
export const FileQuerySchema = QuerySchema({
    filterSchema: FileFilterSchema,
    sortSchema:   FileSortSchema,
    paramsSchema: FileParamSchema,
});