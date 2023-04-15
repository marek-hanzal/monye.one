import {TextInput} from "@leight/form-client";
import {type FC}   from "react";
import {
    BankCreateBaseForm,
    type IBankCreateBaseFormProps
}                  from "../sdk";

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
            /**
             *
             * Pass typed props, infer from FC
             *
             * label={"account"}
             *                                       placeholder={"account.placeholder"}
             *                                       withAsterisk
             *
             *
             */
            "account":            TextInput,
            "inner.foo":          null,
            "inner":              null,
            "inner.bar":          null,
            "inner.bar.innerBar": null,
        })}
        {...props}
    >
    </BankCreateBaseForm>;
};
