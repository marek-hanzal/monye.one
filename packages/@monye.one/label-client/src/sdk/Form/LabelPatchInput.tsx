/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type ILabelPatchFormSchemaType} from "@leight/label";
import {type FC} from "react";
import {LabelPatchFormStoreContext} from "../FormStoreContext/LabelPatchFormStoreContext";

export const LabelPatchInput: FC<Omit<IWithInputProps<ILabelPatchFormSchemaType>, "FormContext">> = props => {
    return <WithInput
        FormContext={LabelPatchFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bw60dqxkpc4rqxlfooty07z8 = true;