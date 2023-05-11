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
	type ITransactionFilterFormSchemaType as IFilterFormSchemaType,
	type ITransactionSourceSchema as ISourceSchema,
	TransactionFilterFormSchema as FilterFormSchema
} from "@monye.one/transaction";
import {TransactionFilterFormStoreContext as FilterFormStoreContext} from "../context/TransactionFilterFormStoreContext";
import {TransactionMantineFilterFormContext as MantineFilterFormContext} from "../context/TransactionMantineFilterFormContext";
import {TransactionSource as Source} from "../source/TransactionSource";
import {FilterSource} from "@monye.one/filter-client";

export interface IBaseTransactionFilterFormProps extends Omit<IBaseFilterFormProps<IFilterFormSchemaType, ISourceSchema>, "Source" | "FormContext" | "MantineContext" | "withTranslation"> {
	getFilterName?: IBaseFilterFormProps.IWithFilterQuery<IFilterFormSchemaType>["getName"];
}

export const BaseTransactionFilterForm: FC<IBaseTransactionFilterFormProps> = ({getFilterName, ...props}) => {
    return <BaseFilterForm<IFilterFormSchemaType, ISourceSchema>
        Source={Source}
        MantineContext={MantineFilterFormContext}
        schemas={FilterFormSchema}
        FormContext={FilterFormStoreContext}
        withTranslation={{
            namespace: "translation",
            label:     "TransactionBaseFilterForm",
        }}
		withFilterQuery={getFilterName ? {getName: getFilterName, type: "@monye.one/transaction", Source: FilterSource} : undefined}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ppc5dxwyduwu2k8fni7q73ws = true;