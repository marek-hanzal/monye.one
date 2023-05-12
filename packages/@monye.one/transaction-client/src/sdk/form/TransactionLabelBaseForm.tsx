/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	DtoForm as BaseForm,
	type IDtoFormProps as IBaseFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {
	type ITransactionLabelFormSchemaType,
	TransactionLabelFormSchema
} from "@monye.one/transaction";
import {TransactionLabelFormStoreContext} from "../context/TransactionLabelFormStoreContext";
import {TransactionLabelMantineFormContext} from "../context/TransactionLabelMantineFormContext";

export interface ITransactionLabelBaseFormProps extends Omit<IBaseFormProps<ITransactionLabelFormSchemaType>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const TransactionLabelBaseForm: FC<ITransactionLabelBaseFormProps> = props => {
    return <BaseForm<ITransactionLabelFormSchemaType>
        MantineContext={TransactionLabelMantineFormContext}
        schemas={TransactionLabelFormSchema}
        FormContext={TransactionLabelFormStoreContext}
        withTranslation={{
            namespace: "transaction",
            label:     "TransactionLabelBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bd2n3jvcr1p3adbxlbjwqwzd = true;