/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type ITransactionSourceSchemaType} from "../../schema/TransactionSourceSchema";

export type IUseTransactionSourceQuery = IUseSourceQuery<ITransactionSourceSchemaType>;

export interface ITransactionSource extends ISource<ITransactionSourceSchemaType> {
}

export const $TransactionSource = Symbol.for("@monye.one/transaction/ITransactionSource");
export const $TransactionSourceMapper = Symbol.for("@monye.one/transaction/ITransactionSourceMapper");
export const $TransactionSourceService = Symbol.for("@monye.one/transaction/ITransactionSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rar28w18awxez05l53kmtnae = true;