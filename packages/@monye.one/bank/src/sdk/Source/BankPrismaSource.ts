/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IBankSourceSchema} from "./BankSchema";

export type IUseBankSourceQuery = IUseSourceQuery<IBankSourceSchema>;

export interface IBankSource extends ISource<IBankSourceSchema> {
}

export const $BankSource = Symbol.for("@monye.one/bank/IBankSource");
export const $BankSourceMapper = Symbol.for("@monye.one/bank/IBankSourceMapper");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ge2o81n18ezrbsrws7lv4nn0 = true;