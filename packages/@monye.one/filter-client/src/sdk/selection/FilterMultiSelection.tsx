/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type IFilterSourceType as SourceType} from "@leight/filter";

export type IFilterMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<SourceType["Dto"]>>;

export const FilterMultiSelection = createMultiSelectionStore<SourceType["Dto"]>({name: "Filter"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_yfwgu10lorg11cscrvj4ocso = true;