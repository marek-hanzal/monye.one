/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {createFilterContext} from "@leight/filter-client";
import {
	type IFileSourceSchema,
	FileSchema,
	type IFileSortSchema,
	FileSortSchema,
	type IFileFilterSchema,
	FileFilterSchema
} from "@leight/file";

export type IFileSource = ISourceProps<IFileSourceSchema>;

/**
 * Defines Store for File, so you can access it's data.
 */
export const FileSourceStore = createSourceContext<IFileSourceSchema>({
    name:   "File",
    schema: FileSchema,
});
/**
 * Defines Store for File filtering entities.
 */
export const FileFilterStore = createFilterContext<IFileFilterSchema>({
    name:   "FileFilter",
    schema: FileFilterSchema,
});
/**
 * Defines Store for File sorting data.
 */
export const FileSortStore = createSortContext<IFileSortSchema>({
    name:   "FileSort",
    schema: FileSortSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u5orbo5ipqap16x4ouj3uaud = true;