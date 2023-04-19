/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {type IJobSourceSchema} from "@leight/job";
import {type FC} from "react";
import {JobSourceStore} from "./JobSourceStore";
import {type IUseSourceQuery} from "@leight/source";

export interface IJobQueryProviderProps extends IQueryProviderProps<IJobSourceSchema> {
	UseSourceQuery: IUseSourceQuery<IJobSourceSchema>;
}

/**
 * Provides all Query parts for Job used in fetching and sorting its data. 
 */
export const JobQueryProvider: FC<IJobQueryProviderProps> = props => {
    return <QueryProvider<IJobSourceSchema>
        SourceStore={JobSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_f3w7ve2ur931flqms45egynd = true;