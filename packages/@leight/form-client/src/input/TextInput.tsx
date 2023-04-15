import {
    Translation,
    useTranslation
}                                   from "@leight/i18n-client";
import {TextInput as CoolTextInput} from "@mantine/core";
import {type ComponentProps}        from "react";
import {
    type IFormFields,
    type IFormSchema
}                                   from "../api";
import {type IFormStoreContext}     from "../context";

export interface ITextInputProps<TFormSchema extends IFormSchema> extends ComponentProps<typeof CoolTextInput> {
    FormContext: IFormStoreContext<TFormSchema>;
    path: IFormFields<TFormSchema>;
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
