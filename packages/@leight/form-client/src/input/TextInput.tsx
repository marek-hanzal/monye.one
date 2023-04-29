import {
    type IFormInputs,
    type IFormSchemaType
}                                   from "@leight/form";
import {useTranslation}             from "@leight/i18n-client";
import {TextInput as CoolTextInput} from "@mantine/core";
import {type ComponentProps}        from "react";
import {withDefaultInputProps}      from "../utils";

export interface ITextInputProps<TFormSchema extends IFormSchemaType> extends ComponentProps<typeof CoolTextInput>, IFormInputs.IInputProps<TFormSchema> {
}

export const TextInput = <TFormSchema extends IFormSchemaType>(
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
