import {
    createFormContext,
    Form,
    type IFormProps,
    type InferFormSchemas,
    type IWithInputProps,
    WithInput
}                              from "@leight/form-client";
import {type FC}               from "react";
import {BankCreateFormSchemas} from "../schema";

export type IBankCreateFormSchema = InferFormSchemas<typeof BankCreateFormSchemas>;

export const BankCreateFormStoreContext = createFormContext<IBankCreateFormSchema>({
    name: "BankCreateForm",
});

export interface IBankCreateBaseFormProps extends Omit<IFormProps<IBankCreateFormSchema>, "FormContext" | "withTranslation"> {
}

export const BankCreateBaseForm: FC<IBankCreateBaseFormProps> = props => {
    return <Form<IBankCreateFormSchema>
        schemas={BankCreateFormSchemas}
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
