/**
	Source code of the common stuff for Bank which could be shared between server and client side.
 */
import {
	type IWithIdentity,
	type ISourceSchema
} from "@leight/source";
import {type IUseQuery} from "@leight/react-query";
import {
	type IBankCreateSchema,
	type IBankFilterSchema,
	type IBankParamSchema,
	type IBankPatchSchema,
	type IBankSchema,
	type IBankSortSchema
} from "./PrismaSchema";

export type IUseBankQuery = IUseQuery<IBankSourceSchema["Query"] | undefined, IBankSourceSchema["Entity"][]>;
export type IUseBankCountQuery = IUseQuery<IBankSourceSchema["Query"] | undefined, number>;
export type IUseBankFetchQuery = IUseQuery<IBankSourceSchema["Query"], IBankSourceSchema["Entity"]>;
export type IUseBankFindQuery = IUseQuery<IWithIdentity, IBankSourceSchema["Entity"]>;

export interface IBankSourceSchema extends ISourceSchema<
    IBankSchema,
    IBankCreateSchema,
    IBankPatchSchema,
    IBankFilterSchema,
    IBankSortSchema,
    IBankParamSchema
 > {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_q93gqqgt5nkrf3yu975b80r7 = true;