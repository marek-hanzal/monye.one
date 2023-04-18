import {useTranslation}             from "@leight/i18n-client";
import {TextInput as CoolTextInput} from "@mantine/core";
import {type ComponentProps}        from "react";
import {
    type IFormInputs,
    type IFormSchema
}                                   from "../api";
import {withDefaultInputProps}      from "../utils";

export interface ITextInputProps<TFormSchema extends IFormSchema> extends ComponentProps<typeof CoolTextInput>, IFormInputs.IInputProps<TFormSchema> {
}

export const TextInput = <TFormSchema extends IFormSchema>(
    {
        FormContext,
        path,
        label,
        placeholder,
        description,
        ...props
    }: ITextInputProps<TFormSchema>) => {
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {t}                                                 = useTranslation(withTranslation.namespace);
    return <CoolTextInput
        {...withDefaultInputProps<TFormSchema>({
            t,
            form: useFormContext(),
            withTranslation,
            label,
            placeholder,
            description,
            path,
        })}
        {...props}
    />;
};
