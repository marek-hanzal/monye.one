import {
    DateInput,
    NumberInput,
    TextInput
}                       from "@leight/form-client";
import {type FC}        from "react";
import {IconBank}       from "../icon";
import {
    BankEditTrpcForm,
    type IBankEditTrpcFormProps
}                       from "../sdk";
import {BankEditFields} from "./BankEditFields";

export interface IBankEditFormProps extends Omit<IBankEditTrpcFormProps, "toRequest" | "toValues" | "inputs"> {
}

export const BankEditForm: FC<IBankEditFormProps> = props => {
    return <BankEditTrpcForm
        toRequest={({values: {balance, ...values}, dto}) => ({
            id: dto.id,
            balance: balance || null,
            ...values,
        })}
        toValues={({dto}) => dto}
        inputs={() => ({
            "account":       ({mandatory, withLabel, withDescription}) => <TextInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
                withAsterisk
            />,
            "description":   ({mandatory, withLabel, withDescription}) => <TextInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
            />,
            "balance.value": ({mandatory, withLabel, withDescription}) => <NumberInput
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
        })}
        submitProps={{
            leftIcon: <IconBank/>,
        }}
        {...props}
    >
        <BankEditFields/>
    </BankEditTrpcForm>;
};
