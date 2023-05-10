/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	SourceTable,
	type ISourceTableInternalProps
} from "@leight/table-client";
import {
	TransactionSourceSchema as SourceSchema,
	type TransactionSource as Source
} from "@monye.one/transaction";
import {TransactionSource} from "../source/TransactionSource";

export interface ITransactionSourceTableInternalProps<TColumnKeys extends string> extends Omit<ISourceTableInternalProps<Source, TColumnKeys>, "Source" | "schema"> {
	sourceCacheTime?: number;
}

export interface ITransactionSourceTableProps<TColumnKeys extends string> extends Omit<ITransactionSourceTableInternalProps<TColumnKeys>, "columns" | "withTranslation"> {
}

/**
 * Base implementation of a table providing Transaction data already connected to a source; just extend this table with
 * columns and other props as you wish.
 */
export const TransactionSourceTable = <TColumnKeys extends string>(props: ITransactionSourceTableInternalProps<TColumnKeys>) => {
    return <SourceTable<Source, TColumnKeys>
        Source={TransactionSource}
        schema={SourceSchema["DtoSchema"]}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ww034s4npcpn5esldvrzbmn1 = true;