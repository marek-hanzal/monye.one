/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type ISelectionStoreProps} from "@leight/selection";
import {type IFilterSourceSchemaType} from "@leight/filter";

export type IFilterSelectionStore = IStoreContext<ISelectionStoreProps<IFilterSourceSchemaType["Dto"]>>;

export const FilterSelection = createSelectionStore<IFilterSourceSchemaType["Dto"]>({name: "Filter"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_csdvehh7novudltgac3qjji2 = true;