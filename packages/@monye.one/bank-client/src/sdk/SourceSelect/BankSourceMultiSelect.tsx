/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceMultiSelectProps,
	SourceMultiSelect
} from "@leight/form-client";
import {BankMultiSelection} from "../Selection/BankMultiSelection";
import {BankSourceStore} from "../Source/BankSourceStore";
import {type IBankSourceSchemaType} from "@monye.one/bank";

export interface IBankMultiSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceMultiSelectProps<TFormSchemaType, IBankSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const BankMultiSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: IBankMultiSourceSelect<TFormSchemaType>) => {
    return <SourceMultiSelect<TFormSchemaType, IBankSourceSchemaType>
        SelectionContext={BankMultiSelection}
        SourceStore={BankSourceStore}
        {...props}
    />
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_kr0udo34cpzsk9vwaskamrea = true;