/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	FileSchema as $EntitySchema,
	FileOptionalDefaultsSchema,
	FilePartialSchema,
	FileWhereInputSchema,
	FileWhereUniqueInputSchema,
	FileOrderByWithRelationInputSchema
} from "@leight/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "@leight/zod";

export type IFileWhereSchema = typeof FileWhereSchema;
export type IFileWhere = z.infer<IFileWhereSchema>;
export type IFileWhereUniqueSchema = typeof FileWhereUniqueSchema;
export type IFileWhereUnique = z.infer<IFileWhereUniqueSchema>;
export type IFileOrderBySchema = typeof FileOrderBySchema;
export type IFileOrderBy = z.infer<IFileOrderBySchema>;
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

export const FileWhereSchema = FileWhereInputSchema;
export const FileWhereUniqueSchema = FileWhereUniqueInputSchema;
export const FileOrderBySchema = FileOrderByWithRelationInputSchema;
/**
 * Schema definition for File
 */
export const FileSchema = $EntitySchema;
export const FileCreateSchema = FileOptionalDefaultsSchema;
export const FilePatchSchema = FilePartialSchema.merge(WithIdentitySchema);
export const FileFilterSchema = z.union([
    FileWhereSchema,
    FileWhereUniqueSchema,
    FilterSchema,
]);
export const FileParamSchema = ParamsSchema;
export const FileSortSchema = z.object({
    id: SortOrderSchema
});
/**
 * Query definition for File
 */
export const FileQuerySchema = QuerySchema({
    filterSchema: FileFilterSchema,
    sortSchema:   FileSortSchema,
    paramsSchema: FileParamSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_afkcqq05fcmzfl0mdjgfir21 = true;