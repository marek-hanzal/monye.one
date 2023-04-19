/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {type IFileSourceSchema} from "@leight/file";
import {type FC} from "react";
import {FileSourceStore} from "./FileSourceStore";
import {type IUseSourceQuery} from "@leight/source";

export interface IFileQueryProviderProps extends IQueryProviderProps<IFileSourceSchema> {
	UseSourceQuery: IUseSourceQuery<IFileSourceSchema>;
}

/**
 * Provides all Query parts for File used in fetching and sorting its data. 
 */
export const FileQueryProvider: FC<IFileQueryProviderProps> = props => {
    return <QueryProvider<IFileSourceSchema>
        SourceStore={FileSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_r7mcaxnovyff0jvumx720yto = true;