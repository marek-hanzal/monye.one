/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceMultiSelectProps,
	SourceMultiSelect
} from "@leight/form-client";
import {TransactionMultiSelection} from "../Selection/TransactionMultiSelection";
import {TransactionSourceStore} from "../Source/TransactionSourceStore";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";

export interface ITransactionMultiSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceMultiSelectProps<TFormSchemaType, ITransactionSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const TransactionMultiSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: ITransactionMultiSourceSelect<TFormSchemaType>) => {
    return <SourceMultiSelect<TFormSchemaType, ITransactionSourceSchemaType>
        SelectionContext={TransactionMultiSelection}
        SourceStore={TransactionSourceStore}
        {...props}
    />
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_whx2rewpgo2bvj9ptc4nxnqt = true;