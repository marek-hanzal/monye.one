/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type ITransactionKeywordSourceSchemaType} from "../../schema/TransactionKeywordSourceSchema";

export type IUseTransactionKeywordSourceQuery = IUseSourceQuery<ITransactionKeywordSourceSchemaType>;

export interface ITransactionKeywordSource extends ISource<ITransactionKeywordSourceSchemaType> {
}

export const $TransactionKeywordSource = Symbol.for("@monye.one/transaction/ITransactionKeywordSource");
export const $TransactionKeywordSourceMapper = Symbol.for("@monye.one/transaction/ITransactionKeywordSourceMapper");
export const $TransactionKeywordSourceService = Symbol.for("@monye.one/transaction/ITransactionKeywordSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gw0ee3xdtablhnktdwadsakr = true;