/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	Form,
	type IFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {type IBankCreateFormSchema} from "../api/BankCreateFormTypes";
import {BankCreateFormStoreContext} from "../FormStoreContext/BankCreateFormStoreContext";
import {BankCreateMantineFormContext} from "../FormStoreContext/BankCreateMantineFormContext";
import {BankCreateFormSchema} from "../../schema";

export interface IBankCreateBaseFormProps extends Omit<IFormProps<IBankCreateFormSchema>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankCreateBaseForm: FC<IBankCreateBaseFormProps> = props => {
    return <Form<IBankCreateFormSchema>
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
export const $leight_pl61gokslpy1tasekhy2qvrh = true;