/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	SourceTable,
	type ISourceTableInternalProps
} from "@leight/table-client";
import {
	type ILabelSourceSchemaType,
	LabelSourceSchema
} from "@leight/label";
import {LabelSourceStore} from "../Source/LabelSourceStore";

export interface ILabelSourceTableInternalProps<TColumnKeys extends string> extends Omit<ISourceTableInternalProps<ILabelSourceSchemaType, TColumnKeys>, "SourceStore" | "schema"> {
	sourceCacheTime?: number;
}

export interface ILabelSourceTableProps<TColumnKeys extends string> extends Omit<ILabelSourceTableInternalProps<TColumnKeys>, "columns" | "withTranslation"> {
}

/**
 * Base implementation of a table providing Label data already connected to a source; just extend this table with
 * columns and other props as you wish.
 */
export const LabelSourceTable = <TColumnKeys extends string>(props: ILabelSourceTableInternalProps<TColumnKeys>) => {
    return <SourceTable
        SourceStore={LabelSourceStore}
        schema={LabelSourceSchema["DtoSchema"]}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gb7pkbu7iodvp5ftxkv9xmba = true;