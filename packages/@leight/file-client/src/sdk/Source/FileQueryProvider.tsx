/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {type IFileSourceSchemaType} from "@leight/file";
import {type FC} from "react";
import {FileSourceStore} from "./FileSourceStore";
import {type IUseSourceQuery} from "@leight/source";

export interface IFileQueryProviderProps extends IQueryProviderProps<IFileSourceSchemaType> {
	UseSourceQuery: IUseSourceQuery<IFileSourceSchemaType>;
}

/**
 * Provides all Query parts for File used in fetching and sorting its data. 
 */
export const FileQueryProvider: FC<IFileQueryProviderProps> = props => {
    return <QueryProvider<IFileSourceSchemaType>
        SourceStore={FileSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_i7kg25hsfmr1yvgadprn92yh = true;