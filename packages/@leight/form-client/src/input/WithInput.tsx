import {
    type IFormInputs,
    type IFormSchemaType
}            from "@leight/form";
import {Box} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}            from "react";

export interface IWithInputProps<TFormSchemaType extends IFormSchemaType> extends ComponentProps<typeof Box<"div">>, IFormInputs.IInputProps<TFormSchemaType> {
}

export const WithInput = <TFormSchemaType extends IFormSchemaType>({FormContext, path, ...props}: IWithInputProps<TFormSchemaType>) => {
    const {inputs, inputOverrides}                                  = FormContext.useState(({inputs, inputOverrides}) => ({inputs, inputOverrides}));
    const Input: FC<IFormInputs.IInputRenderProps<TFormSchemaType>> = inputOverrides?.[path] || inputs[path];
    return <Box
        {...props}
    >
        <Input
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
        />
    </Box>;
};
