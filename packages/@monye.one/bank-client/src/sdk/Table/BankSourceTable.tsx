/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	SourceTable,
	type ISourceTableInternalProps
} from "@leight/table-client";
import {
	type IBankSourceSchemaType,
	BankSourceSchema
} from "@monye.one/bank";
import {BankSourceStore} from "../Source/BankSourceStore";

export interface IBankSourceTableInternalProps<TColumnKeys extends string> extends Omit<ISourceTableInternalProps<IBankSourceSchemaType, TColumnKeys>, "SourceStore" | "schema"> {
	sourceCacheTime?: number;
}

export interface IBankSourceTableProps<TColumnKeys extends string> extends Omit<IBankSourceTableInternalProps<TColumnKeys>, "columns" | "withTranslation"> {
}

/**
 * Base implementation of a table providing Bank data already connected to a source; just extend this table with
 * columns and other props as you wish.
 */
export const BankSourceTable = <TColumnKeys extends string>(props: IBankSourceTableInternalProps<TColumnKeys>) => {
    return <SourceTable
        SourceStore={BankSourceStore}
        schema={BankSourceSchema["DtoSchema"]}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ahhzt46ztvk8fkc00a85bgfd = true;