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
	type IBankPatchFormSchemaType,
	BankPatchFormSchema
} from "@monye.one/bank";
import {BankPatchFormStoreContext} from "../FormStoreContext/BankPatchFormStoreContext";
import {BankPatchMantineFormContext} from "../FormStoreContext/BankPatchMantineFormContext";

export interface IBankPatchBaseFormProps extends Omit<IBaseFormProps<IBankPatchFormSchemaType>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankPatchBaseForm: FC<IBankPatchBaseFormProps> = props => {
    return <BaseForm<IBankPatchFormSchemaType>
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
export const $leight_x0511w86f4lig3q20c90tita = true;