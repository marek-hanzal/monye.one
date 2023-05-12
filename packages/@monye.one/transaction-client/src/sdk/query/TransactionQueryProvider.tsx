/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/source-client";
import {type ITransactionSourceSchema as SourceSchema} from "@monye.one/transaction";
import {type FC} from "react";
import {TransactionSource as Source} from "../source/TransactionSource";

export interface ITransactionQueryProviderProps extends Omit<IQueryProviderProps<SourceSchema>, "QueryContext"> {
}

/**
 * Provides all Query parts for Transaction used in fetching and sorting its data. 
 */
export const TransactionQueryProvider: FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider<SourceSchema>
        QueryContext={Source.query}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_arwzuv1b0z9hqvr6c2v6358f = true;