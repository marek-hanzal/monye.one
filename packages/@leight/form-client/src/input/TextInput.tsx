import {TextInput as CoolTextInput} from "@mantine/core";
import {type ComponentProps}        from "react";
import {type IFormStoreContext}     from "../context";
import {
    type IFormFields,
    type IFormSchema
}                                   from "../form";

export interface ITextInputProps<TFormSchema extends IFormSchema> extends ComponentProps<typeof CoolTextInput> {
    FormContext: IFormStoreContext<TFormSchema>;
    path: IFormFields<TFormSchema>;
}

export const TextInput = <TFormSchema extends IFormSchema>({FormContext, path, ...props}: ITextInputProps<TFormSchema>) => {
    const {form} = FormContext.useState(({form}) => ({form}));
    return <CoolTextInput
        {...form.getInputProps(path)}
        {...props}
    />;
};
