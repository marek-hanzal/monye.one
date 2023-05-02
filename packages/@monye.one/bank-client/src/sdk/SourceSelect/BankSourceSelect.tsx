/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceSelectProps,
	SourceSelect
} from "@leight/form-client";
import {BankSelection} from "../Selection/BankSelection";
import {BankSourceStore} from "../Source/BankSourceStore";
import {type IBankSourceSchemaType} from "@monye.one/bank";

export interface IBankSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceSelectProps<TFormSchemaType, IBankSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const BankSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: IBankSourceSelect<TFormSchemaType>) => {
    return <SourceSelect<TFormSchemaType, IBankSourceSchemaType>
        SelectionContext={BankSelection}
        SourceStore={BankSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_s8l2qgobfv0v23nouvsggud8 = true;