import {
    Translation,
    useTranslation
}                                   from "@leight/i18n-client";
import {TextInput as CoolTextInput} from "@mantine/core";
import {type ComponentProps}        from "react";
import {
    type IFormInputs,
    type IFormSchema
}                                   from "../api";

export interface ITextInputProps<TFormSchema extends IFormSchema> extends ComponentProps<typeof CoolTextInput>, IFormInputs.IInputProps<TFormSchema> {
}

export const TextInput = <TFormSchema extends IFormSchema>(
    {
        FormContext,
        path,
        label,
        placeholder,
        ...props
    }: ITextInputProps<TFormSchema>) => {
    const {form, withTranslation} = FormContext.useState(({form, withTranslation}) => ({form, withTranslation}));
    const {t}                     = useTranslation(withTranslation.namespace);
    return <CoolTextInput
        {...form.getInputProps(path)}
        label={label ? <Translation {...withTranslation} label={`${withTranslation.label}.${label}`}/> : undefined}
        placeholder={placeholder ? t(`${withTranslation.label}.${placeholder}`, withTranslation.values) : undefined}
        {...props}
    />;
};
