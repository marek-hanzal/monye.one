import {
    IFormInputProps,
    IFormSchema,
    TextInput
} from "@leight/form-client";
import {
    ComponentProps,
    ComponentType,
    type FC
} from "react";
import {
    BankCreateBaseForm,
    type IBankCreateBaseFormProps,
    IBankCreateFormSchema
} from "../sdk";

export type IFormItemFactory<TFormSchema extends IFormSchema, TComponent extends ComponentType<IFormInputProps<TFormSchema>>> = [
    TComponent,
    Omit<ComponentProps<TComponent>, keyof IFormInputProps<TFormSchema>>,
];

export interface IWithItemProps<TFormSchema extends IFormSchema> extends IFormInputProps<TFormSchema> {
}

export const withItem = <TFormSchema extends IFormSchema>(defaultProps: IWithItemProps<TFormSchema>) => {
    return function FormInput<TComponent extends ComponentType<IFormInputProps<TFormSchema>>>([Component, props]: IFormItemFactory<TFormSchema, TComponent>) {
        const $Component = Component as ComponentType<any>;
        return <$Component
            {...defaultProps}
            {...props}
        />;
    };
};

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
            "account":            withItem<IBankCreateFormSchema>({FormContext, path: "account"})([
                TextInput,
                {
                    label:        "account",
                    placeholder:  "account.placeholder",
                    withAsterisk: true,
                }
            ]),
            "inner.foo":          null,
            "inner.bar.innerBar": null,
        })}
        {...props}
    >
    </BankCreateBaseForm>;
};
