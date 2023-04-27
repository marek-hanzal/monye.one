/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	BaseForm,
	type IBaseFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {
	type ITransactionFilterFormSchema,
	TransactionFilterFormSchema
} from "@monye.one/transaction";
import {TransactionFilterFormStoreContext} from "../FormStoreContext/TransactionFilterFormStoreContext";
import {TransactionFilterMantineFormContext} from "../FormStoreContext/TransactionFilterMantineFormContext";

export interface ITransactionFilterBaseFormProps extends Omit<IBaseFormProps<ITransactionFilterFormSchema>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const TransactionFilterBaseForm: FC<ITransactionFilterBaseFormProps> = props => {
    return <BaseForm<ITransactionFilterFormSchema>
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
export const $leight_v1cys5c739x3izer0gzrcu15 = true;