/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type ILabelEditFormSchemaType} from "@leight/label";
import {type FC} from "react";
import {LabelEditFormStoreContext} from "../FormStoreContext/LabelEditFormStoreContext";

export const LabelEditInput: FC<Omit<IWithInputProps<ILabelEditFormSchemaType>, "FormContext">> = props => {
    return <WithInput
        FormContext={LabelEditFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vdkv783eo3z7l5cgp7dvrjki = true;