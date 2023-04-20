import {
    DateInput,
    NumberInput,
    TextInput
}                                       from "@leight/form-client";
import {type IBankEditFormInputFactory} from "../sdk";

export const BankEditFormInputFactory: IBankEditFormInputFactory = () => ({
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
});
