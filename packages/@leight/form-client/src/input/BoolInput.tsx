import {
    type IFormInputs,
    type IFormSchemaType
}                              from "@leight/form";
import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {SegmentedControl}      from "@mantine/core";
import {type ComponentProps}   from "react";

const MapToValue = {
    "none":  undefined,
    "true":  true,
    "false": false,
} as const;
type IMapToValueKeys = keyof typeof MapToValue;

export interface IBoolInputProps<TFormSchema extends IFormSchemaType> extends Omit<ComponentProps<typeof SegmentedControl>, "data">, IFormInputs.IInputProps<TFormSchema> {
    withTranslation: IWithTranslation;
}

export const BoolInput = <TFormSchema extends IFormSchemaType>(
    {
        FormContext,
        path,
        withTranslation,
        ...props
    }: IBoolInputProps<TFormSchema>) => {
    const {MantineContext: {useFormContext}} = FormContext.use(({MantineContext}) => ({MantineContext}));
    const form = useFormContext();
    const {
        onChange,
        value
    } = form.getInputProps(path);
    return <SegmentedControl
        fullWidth
        value={((value) => {
            switch (value) {
                case undefined:
                    return "none";
                case true:
                    return "true";
                case false:
                    return "false";
            }
            return "none";
        })(value)}
        onChange={value => {
            onChange(MapToValue[value as IMapToValueKeys]);
        }}
        data={[
            {
                label: <Translation {...withTranslation} withLabel={"none"}/>,
                value: "none",
            },
            {
                label: <Translation {...withTranslation} withLabel={"false"}/>,
                value: "false",
            },
            {
                label: <Translation {...withTranslation} withLabel={"true"}/>,
                value: "true",
            },
        ]}
        {...props}
    />;
};
