/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type ITransactionFilterFormSchemaType} from "@monye.one/transaction";
import {type FC} from "react";
import {TransactionFilterFormStoreContext} from "../FormStoreContext/TransactionFilterFormStoreContext";

export const TransactionFilterInput: FC<Omit<IWithInputProps<ITransactionFilterFormSchemaType>, "FormContext">> = props => {
    return <WithInput
        FormContext={TransactionFilterFormStoreContext}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_k474f8ewgw1bc8rvgrxpcmqd = true;