/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type ITransactionSourceSchema} from "./TransactionSchema";

export type IUseTransactionSourceQuery = IUseSourceQuery<ITransactionSourceSchema>;

export interface ITransactionSource extends ISource<ITransactionSourceSchema> {
}

export const $TransactionSource = Symbol.for("@monye.one/transaction/ITransactionSource");
export const $TransactionSourceMapper = Symbol.for("@monye.one/transaction/ITransactionSourceMapper");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dpt8tpv13gz4vhtanz1dvgp9 = true;