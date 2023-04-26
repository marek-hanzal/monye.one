import {createStoreContext}                         from "@leight/context-client";
import {
    type IFormInputs,
    type IFormMapper,
    type IFormSchema,
    type IFormSchemaType,
    type IFormStoreContext,
    type IFormStoreProps,
    type IMantineFormContext
}                                                   from "@leight/form";
import {type IWithTranslation}                      from "@leight/i18n";
import {createFormContext as createCoolFormContext} from "@mantine/form";
import {type ComponentProps}                        from "react";

export interface ICreateFormContextProps {
    name: string;
}

export const createFormContext = <TFormSchemaType extends IFormSchemaType>({name}: ICreateFormContextProps) => {
    return createStoreContext<IFormStoreProps<TFormSchemaType>>({
        state: ({state}) => () => ({
            ...state,
        }),
        name:  `${name}FormStoreContext`,
    });
};

export const createMantineFormContext = <TFormSchemaType extends IFormSchemaType>() => {
    const [FormProvider, useFormContext, useForm] = createCoolFormContext<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>();
    return {
        FormProvider,
        useFormContext,
        useForm,
    };
};

export interface IFormStoreProviderProps<TFormSchemaType extends IFormSchemaType> extends Omit<ComponentProps<IFormStoreContext<TFormSchemaType>["Provider"]>, "state"> {
    MantineContext: IMantineFormContext<TFormSchemaType>;
    schemas?: IFormSchema.of<TFormSchemaType>;
    inputs: IFormInputs<TFormSchemaType>;
    inputsOverride?: Partial<IFormInputs<TFormSchemaType>>;
    FormStoreContext: IFormStoreContext<TFormSchemaType>;
    withTranslation: IWithTranslation;
    defaultValues?: TFormSchemaType["Values"];
}

export const FormStoreProvider = <TFormSchema extends IFormSchemaType>(
    {
        MantineContext,
        schemas,
        inputs,
        inputsOverride,
        FormStoreContext,
        withTranslation,
        defaultValues,
        ...props
    }: IFormStoreProviderProps<TFormSchema>) => {
    return <FormStoreContext.Provider
        state={{
            MantineContext,
            schemas,
            inputs,
            inputsOverride,
            withTranslation,
            defaultValues,
        }}
        {...props}
    />;
};
