/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ISource} from "@leight/source";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {type IBankSourceSchema} from "./SourceSchema";

export interface IBankSource extends ISource<IBankSourceSchema> {
}

export const $BankSource = Symbol.for("@monye.one/bank/IBankSource");
export const BankSourceContext = (container: IContainer) => new ServiceContext<IBankSource>(container, $BankSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_eccn0yfrs5ausn9mwhheqgzw = true;