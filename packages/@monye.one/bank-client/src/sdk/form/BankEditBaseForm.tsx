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
	type IBankEditFormSchemaType,
	BankEditFormSchema
} from "@monye.one/bank";
import {BankEditFormStoreContext} from "../context/BankEditFormStoreContext";
import {BankEditMantineFormContext} from "../context/BankEditMantineFormContext";

export interface IBankEditBaseFormProps extends Omit<IBaseFormProps<IBankEditFormSchemaType>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankEditBaseForm: FC<IBankEditBaseFormProps> = props => {
    return <BaseForm<IBankEditFormSchemaType>
        MantineContext={BankEditMantineFormContext}
        schemas={BankEditFormSchema}
        FormContext={BankEditFormStoreContext}
        withTranslation={{
            namespace: "bank",
            label:     "BankEditBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lc9pd2yw23tt99r8kw4gpnqk = true;