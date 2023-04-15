import {
    IFormInputProps,
    IFormSchema,
    IFormStoreContext,
    TextInput
} from "@leight/form-client";
import {type FC}   from "react";
import {
    BankCreateBaseForm,
    type IBankCreateBaseFormProps
}                  from "../sdk";

export type IFormItemFactory<TFormSchema extends IFormSchema, TInputProps extends IFormInputProps<TFormSchema>> = [
    FC<TInputProps>,
    Omit<TInputProps, keyof IFormInputProps<TFormSchema>>,
];

export const withItem = <TFormSchema extends IFormSchema>(): IFormItemFactory => {

}

export interface IBankCreateForm extends Omit<IBankCreateBaseFormProps, "withMapper" | "inputs"> {
}

export const BankCreateForm: FC<IBankCreateForm> = props => {
    return <BankCreateBaseForm
        withMapper={values => ({
            ...values,
            id:     "123",
            userId: "123",
        })}
        onSubmit={({request}) => {
            console.log("BankCreateBaseForm", request);
        }}
        inputs={({FormContext}) => ({
            "account":            <TextInput
                                      FormContext={FormContext}
                                      path={"account"}
                                      label={"account"}
                                      placeholder={"account.placeholder"}
                                      withAsterisk
                                  />,
            "inner.foo":          null,
            "inner.bar.innerBar": null,
        })}
        {...props}
    >
    </BankCreateBaseForm>;
};
