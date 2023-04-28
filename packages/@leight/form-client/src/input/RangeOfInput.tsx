import {
    type IFormInputs,
    type IFormSchemaType,
    type IUseForm
}                            from "@leight/form";
import {
    type IRangeOf,
    rangeOf,
    RangeOfList
}                            from "@leight/i18n";
import {Translation}         from "@leight/i18n-client";
import {SegmentedControl}    from "@mantine/core";
import {type ComponentProps} from "react";

export interface IRangeOfInputProps<TFormSchemaType extends IFormSchemaType> extends Omit<ComponentProps<typeof SegmentedControl>, "data">, IFormInputs.IInputProps<TFormSchemaType> {
    onRange?(props: IRangeOfInputProps.IOnRangeProps<TFormSchemaType>): void;
}

export namespace IRangeOfInputProps {
    export interface IOnRangeProps<TFormSchemaType extends IFormSchemaType> {
        range?: IRangeOf;
        form: IUseForm<TFormSchemaType>;
    }
}

export const RangeOfInput = <TFormSchemaType extends IFormSchemaType>(
    {
        FormContext,
        path,
        onRange,
        ...props
    }: IRangeOfInputProps<TFormSchemaType>) => {
    const {MantineContext: {useFormContext}} = FormContext.useState(({MantineContext}) => ({MantineContext}));
    const form                               = useFormContext();
    const {onChange, value}                  = form.getInputProps(path);
    return <SegmentedControl
        fullWidth
        value={value}
        onChange={item => {
            onChange(item);
            onRange?.({
                range: rangeOf({range: item}),
                form,
            });
        }}
        mt={"sm"}
        data={RangeOfList.map(label => ({label: <Translation namespace={"common"} label={"range-of"} withLabel={label}/>, value: label}))}
        {...props}
    />;
};
