/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type ISelectionStoreProps} from "@leight/selection";
import {type LabelSource} from "@leight/label";

export type ILabelSelectionStore = IStoreContext<ISelectionStoreProps<LabelSource["Type"]["Dto"]>>;

export const LabelSelection = createSelectionStore<LabelSource["Type"]["Dto"]>({name: "Label"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_t6d5v00lx9u0ccptgoccbusf = true;