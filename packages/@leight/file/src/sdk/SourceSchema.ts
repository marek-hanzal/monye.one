/**
	Source code of the common stuff for File which could be shared between server and client side.
 */
import {
	type IWithIdentity,
	type ISourceSchema
} from "@leight/source";
import {type IUseQuery} from "@leight/react-query";
import {
	type IFileCreateSchema,
	type IFileFilterSchema,
	type IFileParamSchema,
	type IFilePatchSchema,
	type IFileSchema,
	type IFileSortSchema
} from "./PrismaSchema";

export type IUseFileQuery = IUseQuery<IFileSourceSchema["Query"] | undefined, IFileSourceSchema["Entity"][]>;
export type IUseFileCountQuery = IUseQuery<IFileSourceSchema["Query"] | undefined, number>;
export type IUseFileFetchQuery = IUseQuery<IFileSourceSchema["Query"], IFileSourceSchema["Entity"]>;
export type IUseFileFindQuery = IUseQuery<IWithIdentity, IFileSourceSchema["Entity"]>;

export interface IFileSourceSchema extends ISourceSchema<
    IFileSchema,
    IFileCreateSchema,
    IFilePatchSchema,
    IFileFilterSchema,
    IFileSortSchema,
    IFileParamSchema
 > {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_jxyuaxzd1jfdg7m6i985x3g0 = true;