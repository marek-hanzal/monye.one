/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IUseSourceQuery,
	type ISource
} from "@leight/source";
import {type ILabelSourceSchemaType} from "../../schema/LabelSourceSchema";

export type IUseLabelSourceQuery = IUseSourceQuery<ILabelSourceSchemaType>;

export interface ILabelSource extends ISource<ILabelSourceSchemaType> {
}

export const $LabelSource = Symbol.for("@leight/label/ILabelSource");
export const $LabelSourceMapper = Symbol.for("@leight/label/ILabelSourceMapper");
export const $LabelSourceService = Symbol.for("@leight/label/ILabelSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_p9quzbr54s7oueceognebkax = true;