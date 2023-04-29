import {
    type IFormInputs,
    type IFormSchemaType
}                                       from "@leight/form";
import {useTranslation}                 from "@leight/i18n-client";
import {toHumanNumber}                  from "@leight/utils";
import {NumberInput as CoolNumberInput} from "@mantine/core";
import {type ComponentProps}            from "react";
import {withDefaultInputProps}          from "../utils";

export interface INumberInputProps<TFormSchema extends IFormSchemaType> extends ComponentProps<typeof CoolNumberInput>, IFormInputs.IInputProps<TFormSchema> {
}

export const NumberInput = <TFormSchema extends IFormSchemaType>(
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
        formatter={value => !Number.isNaN(parseFloat(value)) ? toHumanNumber({number: parseFloat(value)}) : ""}
        {...props}
    />;
};
