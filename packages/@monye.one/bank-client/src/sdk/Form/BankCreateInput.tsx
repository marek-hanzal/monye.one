/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type IBankCreateFormSchemaType} from "@monye.one/bank";
import {type FC} from "react";
import {BankCreateFormStoreContext} from "../FormStoreContext/BankCreateFormStoreContext";

export const BankCreateInput: FC<Omit<IWithInputProps<IBankCreateFormSchemaType>, "FormContext">> = props => {
    return <WithInput
        FormContext={BankCreateFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_nmt9ipfhus6s6w2mp8s03l4e = true;