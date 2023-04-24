/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";
import {type FC} from "react";
import {TransactionSourceStore} from "./TransactionSourceStore";
import {UseTransactionSourceQuery} from "../ClientTrpc/UseTransactionSourceQuery";

export interface ITransactionQueryProviderProps extends IQueryProviderProps<ITransactionSourceSchemaType> {
}

/**
 * Provides all Query parts for Transaction used in fetching and sorting its data. 
 */
export const TransactionQueryProvider: FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider<ITransactionSourceSchemaType>
        SourceStore={TransactionSourceStore}
        UseSourceQuery={UseTransactionSourceQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_zb1r4ozg5imfk1jx9jooyu6c = true;