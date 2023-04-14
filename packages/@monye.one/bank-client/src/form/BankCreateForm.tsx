import {TextInput} from "@leight/form-client";
import {type FC}   from "react";
import {
    BankCreateBaseForm,
    BankCreateFormStoreContext,
    type IBankCreateBaseFormProps
}                  from "../sdk";

export interface IBankCreateForm extends Omit<IBankCreateBaseFormProps, "withMapper"> {
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
        {...props}
    >
        <TextInput
            FormContext={BankCreateFormStoreContext}
            path={"account"}
            label={"account"}
            placeholder={"account.placeholder"}
            withAsterisk
        />
    </BankCreateBaseForm>;
};
