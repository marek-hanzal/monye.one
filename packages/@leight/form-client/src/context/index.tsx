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
    type IFormSchema,
    type IFormSchemaType
}                                                   from "../api";

export type IFormStoreProps<TFormSchemaType extends IFormSchemaType> = IStoreProps<IStorePropsType, {
    MantineContext: IMantineFormContext<TFormSchemaType>;
    schemas?: IFormSchema.of<TFormSchemaType>;
    inputs: IFormInputs<TFormSchemaType>;
    inputsOverride?: Partial<IFormInputs<TFormSchemaType>>;
    withTranslation: IWithTranslation;
    defaultValues?: TFormSchemaType["Values"];
}>;

export type IFormStoreContext<TFormSchemaType extends IFormSchemaType> = IStoreContext<Omit<IFormStoreProps<TFormSchemaType>, "state">>;

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

export type IMantineFormContext<TFormSchemaType extends IFormSchemaType> = ReturnType<typeof createMantineFormContext<TFormSchemaType>>;

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
