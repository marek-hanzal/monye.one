import {type IStoreContext}                         from "@leight/context";
import {createStoreContext}                         from "@leight/context-client";
import {type IWithTranslation}                      from "@leight/i18n";
import {
    type IStoreProps,
    type IStorePropsType
}                                                   from "@leight/zustand";
import {createFormContext as createCoolFormContext} from "@mantine/form";
import {type ComponentProps}                        from "react";
import {
    type IFormInputs,
    type IFormMapper,
    type IFormSchemas,
    type IFormSchemaType
}                                                   from "../api";

export type IFormStoreProps<TFormSchema extends IFormSchemaType> = IStoreProps<IStorePropsType, {
    MantineContext: IMantineFormContext<TFormSchema>;
    schemas?: IFormSchemas<TFormSchema>;
    inputs: IFormInputs<TFormSchema>;
    inputsOverride?: Partial<IFormInputs<TFormSchema>>;
    withTranslation: IWithTranslation;
    defaultValues?: TFormSchema["Values"];
}>;

export type IFormStoreContext<TFormSchema extends IFormSchemaType> = IStoreContext<Omit<IFormStoreProps<TFormSchema>, "state">>;

export interface ICreateFormContextProps {
    name: string;
}

export const createFormContext = <TFormSchema extends IFormSchemaType>({name}: ICreateFormContextProps) => {
    return createStoreContext<IFormStoreProps<TFormSchema>>({
        state: ({state}) => () => ({
            ...state,
        }),
        name:  `${name}FormStoreContext`,
    });
};

export const createMantineFormContext = <TFormSchema extends IFormSchemaType>() => {
    const [FormProvider, useFormContext, useForm] = createCoolFormContext<TFormSchema["Values"], IFormMapper<TFormSchema>>();
    return {
        FormProvider,
        useFormContext,
        useForm,
    };
};

export type IMantineFormContext<TFormSchema extends IFormSchemaType> = ReturnType<typeof createMantineFormContext<TFormSchema>>;

export interface IFormStoreProviderProps<TFormSchema extends IFormSchemaType> extends Omit<ComponentProps<IFormStoreContext<TFormSchema>["Provider"]>, "state"> {
    MantineContext: IMantineFormContext<TFormSchema>;
    schemas?: IFormSchemas<TFormSchema>;
    inputs: IFormInputs<TFormSchema>;
    inputsOverride?: Partial<IFormInputs<TFormSchema>>;
    FormStoreContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
    defaultValues?: TFormSchema["Values"];
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
