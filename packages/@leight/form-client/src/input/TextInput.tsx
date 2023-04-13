import {TextInput as CoolTextInput} from "@mantine/core";
import {
    ComponentProps,
    type FC
}                                   from "react";

export interface ITextInputProps extends ComponentProps<typeof CoolTextInput> {
}

export const TextInput: FC<ITextInputProps> = ({...props}) => {
    return <CoolTextInput
        {...props}
    />;
};
