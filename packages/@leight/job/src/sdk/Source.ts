/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ISource} from "@leight/source";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {type IJobSourceSchema} from "./SourceSchema";

export interface IJobSource extends ISource<IJobSourceSchema> {
}

export const $JobSource = Symbol.for("@leight/job/IJobSource");
export const JobSourceContext = (container: IContainer) => new ServiceContext<IJobSource>(container, $JobSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_iip35iqo8ym4ud8j3e2cqrvt = true;