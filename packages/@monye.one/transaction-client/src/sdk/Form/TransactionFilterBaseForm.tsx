/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	Form,
	type IFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {type ITransactionFilterFormSchema} from "../api/TransactionFilterFormTypes";
import {TransactionFilterFormStoreContext} from "../FormStoreContext/TransactionFilterFormStoreContext";
import {TransactionFilterMantineFormContext} from "../FormStoreContext/TransactionFilterMantineFormContext";
import {TransactionFilterFormSchema} from "@monye.one/transaction";

export interface ITransactionFilterBaseFormProps extends Omit<IFormProps<ITransactionFilterFormSchema>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const TransactionFilterBaseForm: FC<ITransactionFilterBaseFormProps> = props => {
    return <Form<ITransactionFilterFormSchema>
        MantineContext={TransactionFilterMantineFormContext}
        schemas={TransactionFilterFormSchema}
        FormContext={TransactionFilterFormStoreContext}
        withTranslation={{
            namespace: "transaction",
            label:     "TransactionFilterBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u51937f8qny7uoxhqn2fwv9s = true;