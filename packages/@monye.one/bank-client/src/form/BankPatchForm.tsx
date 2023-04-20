import {
    DateInput,
    NumberInput,
    TextInput
}                 from "@leight/form-client";
import {type FC}  from "react";
import {IconBank} from "../icon";
import {
    BankPatchTrpcForm,
    type IBankPatchBaseFormProps
}                 from "../sdk";

export interface IBankPatchFormProps extends Omit<IBankPatchBaseFormProps, "toRequest" | "toValues" | "inputs"> {
}

export const BankPatchForm: FC<IBankPatchFormProps> = props => {
    return <BankPatchTrpcForm
        toRequest={({values, dto}) => ({
            id: dto.id,
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
    />;
};
