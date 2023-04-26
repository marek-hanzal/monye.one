import {
    type IFormSchemaType,
    type IUseForm
}                       from "@leight/form";
import {
    type IWithTranslation,
    type IWithTranslator
}                       from "@leight/i18n";
import {Translation}    from "@leight/i18n-client";
import {type ReactNode} from "react";

export type IWithDefaultInputProps<TFormSchema extends IFormSchemaType> = {
    t: IWithTranslator;
    form: IUseForm<TFormSchema>;
    path: string;
    label?: ReactNode;
    placeholder?: string;
    description?: ReactNode;
    withTranslation: IWithTranslation;
}

export const withDefaultInputProps = <TFormSchema extends IFormSchemaType>(
    {
        t,
        form,
        path,
        label,
        placeholder,
        description,
        withTranslation,
    }: IWithDefaultInputProps<TFormSchema>) => {
    return {
        ...form.getInputProps(path),
        mt:          "md",
        size:        "md",
        label:       label ? <Translation {...withTranslation} label={`${withTranslation.label}.${label}`}/> : undefined,
        placeholder: placeholder ? t(`${withTranslation.label}.${placeholder}`, withTranslation.values) : undefined,
        description: description ? <Translation {...withTranslation} label={`${withTranslation.label}.${description}`}/> : description,
    };
};
