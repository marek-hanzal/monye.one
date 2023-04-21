import {type FC} from "react";
import {
    type IFormInputs,
    type IFormSchemaType
}                from "../api";

export interface IWithInputProps<TFormSchemaType extends IFormSchemaType> extends IFormInputs.IInputProps<TFormSchemaType> {
}

export const WithInput = <TFormSchemaType extends IFormSchemaType>({FormContext, path}: IWithInputProps<TFormSchemaType>) => {
    const {inputs, inputOverrides}                                  = FormContext.useState(({inputs, inputOverrides}) => ({inputs, inputOverrides}));
    const Input: FC<IFormInputs.IInputRenderProps<TFormSchemaType>> = inputOverrides?.[path] || inputs[path];
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
