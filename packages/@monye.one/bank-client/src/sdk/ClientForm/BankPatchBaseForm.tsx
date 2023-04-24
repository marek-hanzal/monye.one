/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	DtoForm as Form,
	type IDtoFormProps as IFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {type IBankPatchFormSchema} from "../api/BankPatchFormTypes";
import {BankPatchFormStoreContext} from "../FormStoreContext/BankPatchFormStoreContext";
import {BankPatchMantineFormContext} from "../FormStoreContext/BankPatchMantineFormContext";
import {BankPatchFormSchema} from "../../schema";

export interface IBankPatchBaseFormProps extends Omit<IFormProps<IBankPatchFormSchema>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankPatchBaseForm: FC<IBankPatchBaseFormProps> = props => {
    return <Form<IBankPatchFormSchema>
        MantineContext={BankPatchMantineFormContext}
        schemas={BankPatchFormSchema}
        FormContext={BankPatchFormStoreContext}
        withTranslation={{
            namespace: "bank",
            label:     "BankPatchBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_md9hkmp9nvoiq6hxpcf64fjp = true;