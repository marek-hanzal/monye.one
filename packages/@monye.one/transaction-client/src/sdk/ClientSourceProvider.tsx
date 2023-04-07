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
	type ITransactionSourceSchema,
	TransactionSchema
} from "@monye.one/transaction";
import {type FC} from "react";
import {
	TransactionSourceStore,
	TransactionSortStore
} from "./ClientStore";
import {trpc} from "@monye.one/trpc-client";

export interface ITransactionSourceProps extends ISourceProps<ITransactionSourceSchema> {
}

export interface ITransactionQueryProviderProps extends IQueryProviderProps<ITransactionSourceSchema> {
}

/**
 * Provides access to Transaction data with a connection to filtering and sorting. 
 */
export const TransactionSource:FC<ITransactionSourceProps> = props => {
    return <Source<ITransactionSourceSchema>
        schema={TransactionSchema}
        SourceProvider={TransactionSourceStore.Provider}
        useSortState={TransactionSortStore.useState}
        useSourceQuery={trpc.transaction.source.query.useQuery}
		{...props}
    />;
};
/**
 * Provides all Query parts for Transaction used in fetching and sorting its data. 
 */
export const TransactionQueryProvider:FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider<ITransactionSourceSchema>
        SortProvider={TransactionSortStore.Provider}
        useCountQuery={trpc.transaction.source.count.useQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gl7e9l75239x05loff61qby6 = true;