import {
    type IWithTranslation,
    type IWithTranslator
}                    from "@leight/i18n";
import {Translation} from "@leight/i18n-client";
import {ReactNode}   from "react";
import {
    type IFormSchemaType,
    type IUseForm
}                    from "../api";

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

export type IWithCondition<TFormSchema extends IFormSchemaType> = {
    form: IUseForm<TFormSchema>;
    bool: boolean | null | undefined;
    whenTrue?: TFormSchema["OptionalValues"];
    whenFalse?: TFormSchema["OptionalValues"];
    callback?(): void;
};

export const withCondition = <TFormSchema extends IFormSchemaType>(
    {
        form,
        bool,
        whenTrue = {},
        whenFalse = {},
        callback,
    }: IWithCondition<TFormSchema>) => {
    if (bool) {
        callback?.();
        form.setValues(whenTrue);
    }
    if (!bool) {
        form.setValues(whenFalse);
        callback?.();
    }
};
