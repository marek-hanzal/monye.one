/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type IBankSourceType as SourceType} from "@monye.one/bank";

export type IBankMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<SourceType["Dto"]>>;

export const BankMultiSelection = createMultiSelectionStore<SourceType["Dto"]>({name: "Bank"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_x68gpjmfz2wy4mosu2gb3aob = true;