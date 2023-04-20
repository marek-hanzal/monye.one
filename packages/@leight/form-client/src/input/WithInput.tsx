import {type FC} from "react";
import {
    type IFormInputs,
    type IFormSchemaType
}                from "../api";

export interface IWithInputProps<TFormSchema extends IFormSchemaType> extends IFormInputs.IInputProps<TFormSchema> {
}

export const WithInput = <TFormSchema extends IFormSchemaType>({FormContext, path}: IWithInputProps<TFormSchema>) => {
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
