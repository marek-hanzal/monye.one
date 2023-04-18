import {
    type IWithTranslation,
    type IWithTranslator
}                    from "@leight/i18n";
import {Translation} from "@leight/i18n-client";
import {ReactNode}   from "react";
import {
    type IFormSchema,
    type IUseForm
}                    from "../api";

export interface IWithDefaultInputProps<TFormSchema extends IFormSchema> {
    t: IWithTranslator;
    form: IUseForm<TFormSchema>;
    path: string;
    label?: ReactNode;
    placeholder?: string;
    description?: ReactNode;
    withTranslation: IWithTranslation;
}

export const withDefaultInputProps = <TFormSchema extends IFormSchema>(
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
