/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	SourceTable,
	type ISourceTableInternalProps
} from "@leight/table-client";
import {
	type IFilterSourceSchemaType,
	FilterSourceSchema
} from "@leight/filter";
import {FilterSourceStore} from "../Source/FilterSourceStore";

export interface IFilterSourceTableInternalProps<TColumnKeys extends string> extends Omit<ISourceTableInternalProps<IFilterSourceSchemaType, TColumnKeys>, "SourceStore" | "schema"> {
	sourceCacheTime?: number;
}

export interface IFilterSourceTableProps<TColumnKeys extends string> extends Omit<IFilterSourceTableInternalProps<TColumnKeys>, "columns" | "withTranslation"> {
}

/**
 * Base implementation of a table providing Filter data already connected to a source; just extend this table with
 * columns and other props as you wish.
 */
export const FilterSourceTable = <TColumnKeys extends string>(props: IFilterSourceTableInternalProps<TColumnKeys>) => {
    return <SourceTable
        SourceStore={FilterSourceStore}
        schema={FilterSourceSchema["DtoSchema"]}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_hpqzy78uw3tgdvfuemly1anr = true;