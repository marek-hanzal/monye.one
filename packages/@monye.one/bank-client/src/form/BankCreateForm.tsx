import {
    DateInput,
    NumberInput,
    TextInput
}                         from "@leight/form-client";
import {type FC}          from "react";
import {IconBank}         from "../icon";
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
            "balance.date":  ({mandatory, withLabelPlaceholder, withDescription}) => <DateInput
                {...mandatory}
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                withAsterisk
                mt={0}
            />,
            "balance.value": ({mandatory, withLabel, withDescription}) => <NumberInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
                withAsterisk
            />,
        })}
        defaultValues={{
            account: "",
            balance: {
                value: 0,
                // date:  DateTime.now().toISODate() || "",
                date:  "",
            },
        }}
        submitProps={{
            leftIcon: <IconBank/>,
        }}
        {...props}
    >
        <BankCreateFields/>
    </BankCreateBaseForm>;
};
