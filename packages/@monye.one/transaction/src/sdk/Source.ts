/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ISource} from "@leight/source";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {type ITransactionSourceSchema} from "./SourceSchema";

export interface ITransactionSource extends ISource<ITransactionSourceSchema> {
}

export const $TransactionSource = Symbol.for("@monye.one/transaction/ITransactionSource");
export const TransactionSourceContext = (container: IContainer) => new ServiceContext<ITransactionSource>(container, $TransactionSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oqiysjgugvn8s118tflvimb0 = true;