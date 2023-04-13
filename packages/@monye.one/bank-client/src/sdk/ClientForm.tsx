import {
    createFormContext,
    Form,
    type IFormProps,
    type IFormSchema
}                from "@leight/form-client";
import {type FC} from "react";
import {
    type IBankCreateFormCreateSchema,
    type IBankCreateFormValueSchema
}                from "../schema";

export interface IBankCreateFormSchema extends IFormSchema<
    IBankCreateFormValueSchema,
    IBankCreateFormCreateSchema
> {
}

export const BankCreateFormStoreContext = createFormContext<IBankCreateFormSchema>({
    name: "BankCreateForm",
});

export interface IBankCreateBaseFormProps extends Omit<IFormProps<IBankCreateFormSchema>, "FormContext"> {
}

export const BankCreateBaseForm: FC<IBankCreateBaseFormProps> = props => {
    return <Form<IBankCreateFormSchema>
        FormContext={BankCreateFormStoreContext}
        {...props}
    />;
};
