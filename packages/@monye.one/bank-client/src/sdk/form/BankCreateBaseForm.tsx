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
	type IBankCreateFormSchemaType,
	BankCreateFormSchema
} from "@monye.one/bank";
import {BankCreateFormStoreContext} from "../context/BankCreateFormStoreContext";
import {BankCreateMantineFormContext} from "../context/BankCreateMantineFormContext";

export interface IBankCreateBaseFormProps extends Omit<IBaseFormProps<IBankCreateFormSchemaType>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankCreateBaseForm: FC<IBankCreateBaseFormProps> = props => {
    return <BaseForm<IBankCreateFormSchemaType>
        MantineContext={BankCreateMantineFormContext}
        schemas={BankCreateFormSchema}
        FormContext={BankCreateFormStoreContext}
        withTranslation={{
            namespace: "bank",
            label:     "BankCreateBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_de6lmg7wncs5wchktkne064m = true;