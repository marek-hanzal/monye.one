/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IFileSourceSchema,
	FileSourceSchema
} from "@leight/file";
import {type FC} from "react";
import {FileSourceStore} from "./FileSourceStore";
import {type IUseSourceQuery} from "@leight/source";

export interface IFileSourceProps extends ISourceProps<IFileSourceSchema> {
	UseSourceQuery: IUseSourceQuery<IFileSourceSchema>;
}

/**
 * Provides access to File data with a connection to filtering and sorting. 
 */
export const FileSource: FC<IFileSourceProps> = props => {
    return <Source<IFileSourceSchema>
        schema={FileSourceSchema["EntitySchema"]}
        SourceStore={FileSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_utpgii0r4e3v29nsho8spyxp = true;