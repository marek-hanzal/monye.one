/**
	Source code of the common stuff for Transaction which could be shared between server and client side.
 */
import {
	type IWithIdentity,
	type ISourceSchema
} from "@leight/source";
import {type IUseQuery} from "@leight/react-query";
import {
	type ITransactionCreateSchema,
	type ITransactionFilterSchema,
	type ITransactionParamSchema,
	type ITransactionPatchSchema,
	type ITransactionSchema,
	type ITransactionSortSchema
} from "./PrismaSchema";

export type IUseTransactionQuery = IUseQuery<ITransactionSourceSchema["Query"] | undefined, ITransactionSourceSchema["Entity"][]>;
export type IUseTransactionCountQuery = IUseQuery<ITransactionSourceSchema["Query"] | undefined, number>;
export type IUseTransactionFetchQuery = IUseQuery<ITransactionSourceSchema["Query"], ITransactionSourceSchema["Entity"]>;
export type IUseTransactionFindQuery = IUseQuery<IWithIdentity, ITransactionSourceSchema["Entity"]>;

export interface ITransactionSourceSchema extends ISourceSchema<
    ITransactionSchema,
    ITransactionCreateSchema,
    ITransactionPatchSchema,
    ITransactionFilterSchema,
    ITransactionSortSchema,
    ITransactionParamSchema
 > {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_awjzrbwgcvpwse05qo7fh7wr = true;