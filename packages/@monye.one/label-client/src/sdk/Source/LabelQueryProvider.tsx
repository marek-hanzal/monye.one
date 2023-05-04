/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/source-client";
import {type ILabelSourceSchemaType} from "@leight/label";
import {type FC} from "react";
import {LabelSourceStore} from "./LabelSourceStore";

export interface ILabelQueryProviderProps extends IQueryProviderProps<ILabelSourceSchemaType> {
}

/**
 * Provides all Query parts for Label used in fetching and sorting its data. 
 */
export const LabelQueryProvider: FC<ILabelQueryProviderProps> = props => {
    return <QueryProvider<ILabelSourceSchemaType>
        SourceStore={LabelSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_sywvka0j3roq5wbrga0t6g95 = true;