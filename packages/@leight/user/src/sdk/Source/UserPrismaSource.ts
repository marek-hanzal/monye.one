/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IUserSourceSchemaType} from "../../schema/UserSourceSchema";

export type IUseUserSourceQuery = IUseSourceQuery<IUserSourceSchemaType>;

export interface IUserSource extends ISource<IUserSourceSchemaType> {
}

export const $UserSource = Symbol.for("@leight/user/IUserSource");
export const $UserSourceMapper = Symbol.for("@leight/user/IUserSourceMapper");
export const $UserSourceService = Symbol.for("@leight/user/IUserSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_tadm6kb1saxtf205peor65oq = true;