/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IBankSourceSchemaType} from "../../schema/BankSourceSchema";

export type IUseBankSourceQuery = IUseSourceQuery<IBankSourceSchemaType>;

export interface IBankSource extends ISource<IBankSourceSchemaType> {
}

export const $BankSource = Symbol.for("@monye.one/bank/IBankSource");
export const $BankSourceMapper = Symbol.for("@monye.one/bank/IBankSourceMapper");
export const $BankSourceService = Symbol.for("@monye.one/bank/IBankSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_hfwcvlxvjplc832ae7v7hohy = true;