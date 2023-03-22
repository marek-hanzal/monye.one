// Generated file
import {
	type ISource,
	type ISourceSchema
} from "@leight/source";
import {
	type IFileCreateSchema,
	type IFileFilterSchema,
	type IFileParamSchema,
	type IFilePatchSchema,
	type IFileSchema,
	type IFileSortSchema
} from "./entity-schema";

export interface IFileSource extends ISource<IFileSourceSchema> {
}

export interface IFileSourceSchema extends ISourceSchema<
    IFileSchema,
    IFileCreateSchema,
    IFilePatchSchema,
    IFileFilterSchema,
    IFileSortSchema,
    IFileParamSchema
 > {
}

export const $FileSource = Symbol.for("@leight/file/IFileSource");