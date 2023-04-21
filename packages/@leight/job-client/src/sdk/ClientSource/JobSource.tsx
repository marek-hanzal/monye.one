/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IJobSourceSchemaType,
	JobSourceSchema
} from "@leight/job";
import {type FC} from "react";
import {JobSourceStore} from "./JobSourceStore";
import {type IUseSourceQuery} from "@leight/source";

export interface IJobSourceProps extends ISourceProps<IJobSourceSchemaType> {
	UseSourceQuery: IUseSourceQuery<IJobSourceSchemaType>;
}

/**
 * Provides access to Job data with a connection to filtering and sorting. 
 */
export const JobSource: FC<IJobSourceProps> = props => {
    return <Source<IJobSourceSchemaType>
        schema={JobSourceSchema["EntitySchema"]}
        SourceStore={JobSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_g3gm7u0kdiwndn2sjls3ub3t = true;