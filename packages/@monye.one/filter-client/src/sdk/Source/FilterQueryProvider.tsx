/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/source-client";
import {type IFilterSourceSchemaType} from "@leight/filter";
import {type FC} from "react";
import {FilterSourceStore} from "./FilterSourceStore";

export interface IFilterQueryProviderProps extends IQueryProviderProps<IFilterSourceSchemaType> {
}

/**
 * Provides all Query parts for Filter used in fetching and sorting its data. 
 */
export const FilterQueryProvider: FC<IFilterQueryProviderProps> = props => {
    return <QueryProvider<IFilterSourceSchemaType>
        SourceStore={FilterSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_zbtcr9yseg48p8kjzn7bkg2h = true;