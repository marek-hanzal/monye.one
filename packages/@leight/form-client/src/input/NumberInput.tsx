import {useTranslation}                 from "@leight/i18n-client";
import {NumberInput as CoolNumberInput} from "@mantine/core";
import {type ComponentProps}            from "react";
import {
    type IFormInputs,
    type IFormSchema
}                                       from "../api";
import {withDefaultInputProps}          from "../utils";

export interface INumberInputProps<TFormSchema extends IFormSchema> extends ComponentProps<typeof CoolNumberInput>, IFormInputs.IInputProps<TFormSchema> {
}

export const NumberInput = <TFormSchema extends IFormSchema>(
    {
        FormContext,
        path,
        label,
        placeholder,
        description,
        ...props
    }: INumberInputProps<TFormSchema>) => {
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {t}                                                 = useTranslation(withTranslation.namespace);
    return <CoolNumberInput
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
