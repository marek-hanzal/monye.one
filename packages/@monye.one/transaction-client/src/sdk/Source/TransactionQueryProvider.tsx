/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/source-client";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";
import {type FC} from "react";
import {TransactionSourceStore} from "./TransactionSourceStore";

export interface ITransactionQueryProviderProps extends IQueryProviderProps<ITransactionSourceSchemaType> {
}

/**
 * Provides all Query parts for Transaction used in fetching and sorting its data. 
 */
export const TransactionQueryProvider: FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider<ITransactionSourceSchemaType>
        SourceStore={TransactionSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_zq8xdby4uljfi79igcpdkt6l = true;