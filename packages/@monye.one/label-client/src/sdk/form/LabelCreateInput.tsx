/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type ILabelCreateFormSchemaType} from "@leight/label";
import {type FC} from "react";
import {LabelCreateFormStoreContext} from "../context/LabelCreateFormStoreContext";

export const LabelCreateInput: FC<Omit<IWithInputProps<ILabelCreateFormSchemaType>, "FormContext">> = props => {
    return <WithInput
        FormContext={LabelCreateFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_y19atx6rhwzx2kfjcq58b29z = true;