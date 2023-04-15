import {
    type IFormFields,
    type IFormSchema
}                               from "../api";
import {type IFormStoreContext} from "../context";

export interface IWithInputProps<TFormSchema extends IFormSchema> {
    FormContext: IFormStoreContext<TFormSchema>;
    path: IFormFields<TFormSchema>;
}

export const WithInput = <TFormSchema extends IFormSchema>({FormContext, path}: IWithInputProps<TFormSchema>) => {
    const {inputs, inputOverrides} = FormContext.useState(({inputs, inputOverrides}) => ({inputs, inputOverrides}));
    return inputOverrides?.[path] || inputs[path];
};
