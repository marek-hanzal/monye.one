/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ISource} from "@leight/source";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {type IFileSourceSchema} from "./SourceSchema";

export interface IFileSource extends ISource<IFileSourceSchema> {
}

export const $FileSource = Symbol.for("@leight/file/IFileSource");
export const FileSourceContext = (container: IContainer) => new ServiceContext<IFileSource>(container, $FileSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_xpa8ny9umatu0sdwrp0tf4jc = true;