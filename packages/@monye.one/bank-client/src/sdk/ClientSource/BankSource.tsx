/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IBankSourceSchema,
	BankSourceSchema
} from "@monye.one/bank";
import {type FC} from "react";
import {BankSourceStore} from "./BankSourceStore";
import {UseBankSourceQuery} from "../ClientTrpc/UseBankSourceQuery";

export interface IBankSourceProps extends ISourceProps<IBankSourceSchema> {
}

/**
 * Provides access to Bank data with a connection to filtering and sorting. 
 */
export const BankSource: FC<IBankSourceProps> = props => {
    return <Source<IBankSourceSchema>
        schema={BankSourceSchema["EntitySchema"]}
        SourceStore={BankSourceStore}
        UseSourceQuery={UseBankSourceQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_phob4nssfnivhtwr1fgusbsc = true;