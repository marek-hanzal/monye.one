/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type LabelSource} from "@leight/label";

export type ILabelMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<LabelSource["Type"]["Dto"]>>;

export const LabelMultiSelection = createMultiSelectionStore<LabelSource["Type"]["Dto"]>({name: "Label"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_qg7g9zn8lbp3t4jdkgij27vr = true;