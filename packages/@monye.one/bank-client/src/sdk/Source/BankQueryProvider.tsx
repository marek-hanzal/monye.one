/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/source-client";
import {type IBankSourceSchemaType} from "@monye.one/bank";
import {type FC} from "react";
import {BankSourceStore} from "./BankSourceStore";

export interface IBankQueryProviderProps extends IQueryProviderProps<IBankSourceSchemaType> {
}

/**
 * Provides all Query parts for Bank used in fetching and sorting its data. 
 */
export const BankQueryProvider: FC<IBankQueryProviderProps> = props => {
    return <QueryProvider<IBankSourceSchemaType>
        SourceStore={BankSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_fxpsszzpmq77lnptl84g9ujz = true;