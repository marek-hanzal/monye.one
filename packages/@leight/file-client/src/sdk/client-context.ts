// Generated file
import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {
	type IFileSourceSchema,
	FileSchema,
	type IFileSortSchema,
	FileSortSchema
} from "@leight/file";

export type IFileSource = ISourceProps<IFileSourceSchema>;

const StoreSourceContext = createSourceContext<IFileSourceSchema>({
    name:   "File",
    schema: FileSchema,
});
 const StoreSortContext = createSortContext<IFileSortSchema>({
    name:   "FileSort",
    schema: FileSortSchema,
});
export const FileProvider = StoreSourceContext.Provider;
export const useFileSource = StoreSourceContext.useState;
export const useOptionalFileSource = StoreSourceContext.useOptionalState;
export const useFileStore = StoreSourceContext.useStore;
export const useOptionalFileStore = StoreSourceContext.useOptionalStore;
export const FileSortProvider = StoreSortContext.Provider;
export const useFileSort = StoreSortContext.useState;
export const useOptionalFileSort = StoreSortContext.useOptionalState;
export const useFileSortStore = StoreSortContext.useStore;
export const useOptionalFileSortStore = StoreSortContext.useOptionalStore;