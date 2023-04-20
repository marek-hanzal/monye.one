/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type IBankEditFormSchema} from "../api/BankEditFormTypes";
import {type FC} from "react";
import {BankEditFormStoreContext} from "../FormStoreContext/BankEditFormStoreContext";

export const BankEditInput: FC<Omit<IWithInputProps<IBankEditFormSchema>, "FormContext">> = props => {
    return <WithInput
        FormContext={BankEditFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vqtrgt8hygjwqx6rfievlogf = true;