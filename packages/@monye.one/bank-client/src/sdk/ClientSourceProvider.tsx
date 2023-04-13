/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {
	type IBankSourceSchema,
	BankSchema
} from "@monye.one/bank";
import {type FC} from "react";
import {
	BankSourceStore,
	BankFilterStore,
	BankSortStore
} from "./ClientStore";
import {trpc} from "@monye.one/trpc-client";

export interface IBankSourceProps extends ISourceProps<IBankSourceSchema> {
}

export interface IBankQueryProviderProps extends IQueryProviderProps<IBankSourceSchema> {
}

/**
 * Provides access to Bank data with a connection to filtering and sorting. 
 */
export const BankSource:FC<IBankSourceProps> = props => {
    return <Source<IBankSourceSchema>
        schema={BankSchema}
        SourceProvider={BankSourceStore.Provider}
        useFilterState={BankFilterStore.useState}
        useSortState={BankSortStore.useState}
        useSourceQuery={trpc.bank.source.query.useQuery}
		{...props}
    />;
};
/**
 * Provides all Query parts for Bank used in fetching and sorting its data. 
 */
export const BankQueryProvider:FC<IBankQueryProviderProps> = props => {
    return <QueryProvider<IBankSourceSchema>
        FilterProvider={BankFilterStore.Provider}
        useFilterState={BankFilterStore.useState}
        SortProvider={BankSortStore.Provider}
        useCountQuery={trpc.bank.source.count.useQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gtkl12kvifbpkddc5oljhld6 = true;