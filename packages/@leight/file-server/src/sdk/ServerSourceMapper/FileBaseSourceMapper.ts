/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFileSourceMapper} from "../api";
import {AbstractSourceMapper} from "@leight/source-server";
import {type IFileSourceSchema} from "@leight/file";

export class FileBaseSourceMapper extends AbstractSourceMapper<IFileSourceSchema> implements IFileSourceMapper {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oaf38hy2mwlkqcq9s5egll8r = true;