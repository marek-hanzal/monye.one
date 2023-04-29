/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	BaseFilterForm,
	type IBaseFilterFormProps
} from "@leight/filter-client";
import {type FC} from "react";
import {
	type ITransactionFilterFormSchemaType,
	type ITransactionSourceSchemaType,
	TransactionFilterFormSchema
} from "@monye.one/transaction";
import {TransactionFilterFormStoreContext} from "../FormStoreContext/TransactionFilterFormStoreContext";
import {TransactionMantineFilterFormContext} from "../FormStoreContext/TransactionMantineFilterFormContext";
import {TransactionSourceStore} from "../Source/TransactionSourceStore";

export interface ITransactionBaseFilterFormProps extends Omit<IBaseFilterFormProps<ITransactionFilterFormSchemaType, ITransactionSourceSchemaType>, "SourceStore" | "FormContext" | "MantineContext" | "withTranslation"> {
}

export const TransactionBaseFilterForm: FC<ITransactionBaseFilterFormProps> = props => {
    return <BaseFilterForm<ITransactionFilterFormSchemaType, ITransactionSourceSchemaType>
        SourceStore={TransactionSourceStore}
        MantineContext={TransactionMantineFilterFormContext}
        schemas={TransactionFilterFormSchema}
        FormContext={TransactionFilterFormStoreContext}
        withTranslation={{
            namespace: "transaction",
            label:     "TransactionBaseFilterForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_p1ny5otjnmevurla7yoyek1u = true;