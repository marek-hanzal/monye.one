import {
    createFormContext,
    Form,
    FormResponseSchema,
    type IFormProps,
    type IFormSchema,
    type IFormSchemas
}                from "@leight/form-client";
import {type FC} from "react";
import {
    BankCreateFormRequestSchema,
    BankCreateFormValueSchema,
    type IBankCreateFormRequestSchema,
    type IBankCreateFormValueSchema
}                from "../schema";

export type IBankCreateFormSchema = IFormSchema<
    IBankCreateFormValueSchema,
    IBankCreateFormRequestSchema
>;

export const IBankCreateFormSchemas: IFormSchemas<IBankCreateFormSchema> = {
    ValueSchema:    BankCreateFormValueSchema,
    RequestSchema:  BankCreateFormRequestSchema,
    ResponseSchema: FormResponseSchema,
};

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
