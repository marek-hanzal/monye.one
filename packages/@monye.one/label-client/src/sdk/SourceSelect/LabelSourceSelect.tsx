/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceSelectProps,
	SourceSelect
} from "@leight/form-client";
import {LabelSelection} from "../Selection/LabelSelection";
import {LabelSourceStore} from "../Source/LabelSourceStore";
import {type ILabelSourceSchemaType} from "@leight/label";

export interface ILabelSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceSelectProps<TFormSchemaType, ILabelSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const LabelSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: ILabelSourceSelect<TFormSchemaType>) => {
    return <SourceSelect<TFormSchemaType, ILabelSourceSchemaType>
        SelectionContext={LabelSelection}
        SourceStore={LabelSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_mfbzqv4okmvrvlkyht48dxid = true;