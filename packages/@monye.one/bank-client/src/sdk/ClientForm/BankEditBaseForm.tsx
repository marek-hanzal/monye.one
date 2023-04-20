/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	DtoForm as Form,
	type IDtoFormProps as IFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {type IBankEditFormSchema} from "../api/BankEditFormTypes";
import {BankEditFormStoreContext} from "../FormStoreContext/BankEditFormStoreContext";
import {BankEditMantineFormContext} from "../FormStoreContext/BankEditMantineFormContext";
import {BankEditFormSchema} from "../../schema";

export interface IBankEditBaseFormProps extends Omit<IFormProps<IBankEditFormSchema>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankEditBaseForm: FC<IBankEditBaseFormProps> = props => {
    return <Form<IBankEditFormSchema>
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
export const $leight_m9np7l5xv516ggrlldvp793l = true;