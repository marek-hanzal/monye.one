/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	createFormContext,
	createMantineFormContext,
	type IMantineFormContext,
	Form,
	type IFormProps,
	type InferFormSchemas,
	type IWithInputProps,
	WithInput
} from "@leight/form-client";
import {type FC} from "react";
import {BankCreateFormSchema} from "../schema";

export type IBankCreateFormSchema = InferFormSchemas<typeof BankCreateFormSchema>;
export type IBankCreateMantineFormContext = IMantineFormContext<IBankCreateFormSchema>;

export interface IBankCreateBaseFormProps extends Omit<IFormProps<IBankCreateFormSchema>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const BankCreateFormStoreContext = createFormContext<IBankCreateFormSchema>({
    name: "BankCreateForm",
});
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
export const BankCreateInput: FC<Omit<IWithInputProps<IBankCreateFormSchema>, "FormContext">> = props => {
    return <WithInput
        FormContext={BankCreateFormStoreContext}
        {...props}
    />;
};
export const BankCreateMantineFormContext = createMantineFormContext<IBankCreateFormSchema>();
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lors6bmm31epbwkkudqu48ts = true;