import {
    DateInput,
    NumberInput,
    TextInput
}                                         from "@leight/form-client";
import {type IBankCreateFormInputFactory} from "@monye.one/bank";

export const BankCreateFormInputFactory: IBankCreateFormInputFactory = () => ({
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
