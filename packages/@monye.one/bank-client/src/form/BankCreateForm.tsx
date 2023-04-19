import {
    DateInput,
    NumberInput,
    TextInput
}                         from "@leight/form-client";
import {DateTime}         from "@leight/i18n";
import {type FC}          from "react";
import {IconBank}         from "../icon";
import {
    BankCreateTrpcForm,
    type IBankCreateBaseFormProps
}                         from "../sdk";
import {BankCreateFields} from "./BankCreateFields";

export interface IBankCreateForm extends Omit<IBankCreateBaseFormProps, "withMapper" | "inputs"> {
}

export const BankCreateForm: FC<IBankCreateForm> = props => {
    return <BankCreateTrpcForm
        withMapper={values => ({
            ...values,
            id:     "123",
            userId: "123",
        })}
        onSuccess={({dto}) => {
            console.log("Success: BankCreateTrpcForm", dto);
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
                date:  DateTime.now().toISODate() || "",
            },
        }}
        submitProps={{
            leftIcon: <IconBank/>,
        }}
        {...props}
    >
        <BankCreateFields/>
    </BankCreateTrpcForm>;
};
