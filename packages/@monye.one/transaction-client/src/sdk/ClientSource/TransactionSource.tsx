/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type ITransactionSourceSchemaType,
	TransactionSourceSchema
} from "@monye.one/transaction";
import {type FC} from "react";
import {TransactionSourceStore} from "./TransactionSourceStore";
import {UseTransactionSourceQuery} from "../ClientTrpc/UseTransactionSourceQuery";

export interface ITransactionSourceProps extends ISourceProps<ITransactionSourceSchemaType> {
}

/**
 * Provides access to Transaction data with a connection to filtering and sorting. 
 */
export const TransactionSource: FC<ITransactionSourceProps> = props => {
    return <Source<ITransactionSourceSchemaType>
        schema={TransactionSourceSchema["EntitySchema"]}
        SourceStore={TransactionSourceStore}
        UseSourceQuery={UseTransactionSourceQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u9tfgwpr9tyfhwc61j1uxld5 = true;