/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";

export type ITransactionMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<ITransactionSourceSchemaType["Dto"]>>;

export const TransactionMultiSelection = createMultiSelectionStore<ITransactionSourceSchemaType["Dto"]>({name: "Transaction"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_a5zjomtqm8rh4v6td88s01iu = true;