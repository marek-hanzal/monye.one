/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceSelectProps,
	SourceSelect
} from "@leight/form-client";
import {TransactionSelection} from "../Selection/TransactionSelection";
import {TransactionSourceStore} from "../Source/TransactionSourceStore";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";

export interface ITransactionSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceSelectProps<TFormSchemaType, ITransactionSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const TransactionSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: ITransactionSourceSelect<TFormSchemaType>) => {
    return <SourceSelect<TFormSchemaType, ITransactionSourceSchemaType>
        SelectionContext={TransactionSelection}
        SourceStore={TransactionSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vnjliv8veowpe3itm97te4v1 = true;