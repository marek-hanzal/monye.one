/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type IUserSourceSchema} from "./UserSchema";
import {IUserSourceEx} from "../../api";

export type IUseUserSourceQuery = IUseSourceQuery<IUserSourceSchema>;

export interface IUserSource extends ISource<IUserSourceSchema>, IUserSourceEx {
}

export const $UserSource = Symbol.for("@leight/user/IUserSource");
export const $UserSourceMapper = Symbol.for("@leight/user/IUserSourceMapper");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ecqyndehinonfc44yo1sz2lj = true;