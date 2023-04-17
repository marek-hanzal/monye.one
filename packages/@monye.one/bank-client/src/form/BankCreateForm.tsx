import {
    NumberInput,
    TextInput
}                from "@leight/form-client";
import {type FC} from "react";
import {
    BankCreateBaseForm,
    BankCreateInput,
    type IBankCreateBaseFormProps
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
            />,
            "balance.date":  ({mandatory, withLabel, withDescription}) => <NumberInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
            />,
        })}
        {...props}
    >
        <BankCreateInput path={"account"}/>
        <BankCreateInput path={"balance.value"}/>
        <BankCreateInput path={"balance.date"}/>
    </BankCreateBaseForm>;
};
