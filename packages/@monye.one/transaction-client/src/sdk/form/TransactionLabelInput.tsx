/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type ITransactionLabelFormSchemaType} from "@monye.one/transaction";
import {type FC} from "react";
import {TransactionLabelFormStoreContext} from "../context/TransactionLabelFormStoreContext";

export const TransactionLabelInput: FC<Omit<IWithInputProps<ITransactionLabelFormSchemaType>, "FormContext">> = props => {
    return <WithInput
        FormContext={TransactionLabelFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_yv5ddwldq0i3ky3j9m1mff89 = true;