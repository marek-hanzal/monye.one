/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type ISelectionStoreProps} from "@leight/selection";
import {type IBankSourceSchemaType} from "@monye.one/bank";

export type IBankSelectionStore = IStoreContext<ISelectionStoreProps<IBankSourceSchemaType["Dto"]>>;

export const BankSelection = createSelectionStore<IBankSourceSchemaType["Dto"]>({name: "Bank"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_pt0zyvofl6pqm23u86en9vlh = true;