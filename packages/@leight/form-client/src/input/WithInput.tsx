import {type FC} from "react";
import {
    type IFormInputs,
    type IFormSchema
}                from "../api";

export interface IWithInputProps<TFormSchema extends IFormSchema> extends IFormInputs.IInputProps<TFormSchema> {
}

export const WithInput = <TFormSchema extends IFormSchema>({FormContext, path}: IWithInputProps<TFormSchema>) => {
    const {inputs, inputOverrides}                              = FormContext.useState(({inputs, inputOverrides}) => ({inputs, inputOverrides}));
    const Input: FC<IFormInputs.IInputRenderProps<TFormSchema>> = inputOverrides?.[path] || inputs[path];
    return <Input
        mandatory={{
            FormContext,
            path,
        }}
        withLabel={{
            label: path,
        }}
        withLabelPlaceholder={{
            label:       path,
            placeholder: `${path}.placeholder`,
        }}
        withDescription={{
            description: `${path}.description`,
        }}
    />;
};
