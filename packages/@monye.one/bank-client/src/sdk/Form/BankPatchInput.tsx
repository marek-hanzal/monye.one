/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type IBankPatchFormSchema} from "../api/BankPatchFormTypes";
import {type FC} from "react";
import {BankPatchFormStoreContext} from "../FormStoreContext/BankPatchFormStoreContext";

export const BankPatchInput: FC<Omit<IWithInputProps<IBankPatchFormSchema>, "FormContext">> = props => {
    return <WithInput
        FormContext={BankPatchFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lzyz82nmrm3nx9bt4e24v372 = true;