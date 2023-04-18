import {
    NumberInput,
    TextInput
}                         from "@leight/form-client";
import {type FC}          from "react";
import {
    BankCreateBaseForm,
    type IBankCreateBaseFormProps
}                         from "../sdk";
import {BankCreateFields} from "./BankCreateFields";

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
        inputs={() => ({
            "account":       ({mandatory, withLabel, withDescription}) => <TextInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
                withAsterisk
            />,
            "balance.value": ({mandatory, withLabel, withDescription}) => <NumberInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
                withAsterisk
            />,
            "balance.date":  ({mandatory, withLabel, withDescription}) => <TextInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
                withAsterisk
            />,
        })}
        defaultValues={{
            account: "",
            balance: {
                value: undefined,
                date:  undefined,
            },
        }}
        {...props}
    >
        <BankCreateFields/>
    </BankCreateBaseForm>;
};
