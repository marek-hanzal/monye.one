/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {type IBankSourceSchemaType} from "@monye.one/bank";
import {type FC} from "react";
import {BankSourceStore} from "./BankSourceStore";
import {UseBankSourceQuery} from "../ClientTrpc/UseBankSourceQuery";

export interface IBankQueryProviderProps extends IQueryProviderProps<IBankSourceSchemaType> {
}

/**
 * Provides all Query parts for Bank used in fetching and sorting its data. 
 */
export const BankQueryProvider: FC<IBankQueryProviderProps> = props => {
    return <QueryProvider<IBankSourceSchemaType>
        SourceStore={BankSourceStore}
        UseSourceQuery={UseBankSourceQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_a8gz7wqya1kzgtylans24nqo = true;