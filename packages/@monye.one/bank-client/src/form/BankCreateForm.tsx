import {
    TextInput,
    WithInput
}                from "@leight/form-client";
import {type FC} from "react";
import {
    BankCreateBaseForm,
    BankCreateFormStoreContext,
    type IBankCreateBaseFormProps,
    IBankCreateFormSchema
}                from "../sdk";

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
        <WithInput<IBankCreateFormSchema>
            FormContext={BankCreateFormStoreContext}
            path={"account"}
        />
    </BankCreateBaseForm>;
};
