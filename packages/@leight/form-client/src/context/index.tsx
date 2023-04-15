import {type IStoreContext}     from "@leight/context";
import {createStoreContext}     from "@leight/context-client";
import {type IWithTranslation}  from "@leight/i18n";
import {
    type IStoreProps,
    type IStorePropsType
}                               from "@leight/zustand";
import {type UseFormReturnType} from "@mantine/form";
import {type ComponentProps}    from "react";
import {
    type IFormInputs,
    type IFormMapper,
    type IFormSchema,
    type IFormSchemas
}                               from "../api";

export type IFormStoreProps<TFormSchema extends IFormSchema> = IStoreProps<IStorePropsType, {
    schemas?: IFormSchemas<TFormSchema>;
    form: UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;
    inputs: IFormInputs<TFormSchema>;
    inputsOverride?: Partial<IFormInputs<TFormSchema>>;
    withTranslation: IWithTranslation;
}>;

export interface ICreateFormContextProps {
    name: string;
}

export type IFormStoreContext<TFormSchema extends IFormSchema> = IStoreContext<Omit<IFormStoreProps<TFormSchema>, "state">>;

export const createFormContext = <TFormSchema extends IFormSchema>({name}: ICreateFormContextProps) => {
    return createStoreContext<IFormStoreProps<TFormSchema>>({
        state: ({state}) => () => ({
            ...state,
        }),
        name:  `${name}FormStoreContext`,
    });
};

export interface IFormStoreProviderProps<TFormSchema extends IFormSchema> extends Omit<ComponentProps<IFormStoreContext<TFormSchema>["Provider"]>, "state"> {
    schemas?: IFormSchemas<TFormSchema>;
    form: UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;
    inputs: IFormInputs<TFormSchema>;
    inputsOverride?: Partial<IFormInputs<TFormSchema>>;
    FormStoreContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
}

export const FormStoreProvider = <TFormSchema extends IFormSchema>(
    {
        schemas,
        form,
        inputs,
        inputsOverride,
        FormStoreContext,
        withTranslation,
        ...props
    }: IFormStoreProviderProps<TFormSchema>) => {
    return <FormStoreContext.Provider
        state={{
            inputs,
            inputsOverride,
            schemas,
            form,
            withTranslation,
        }}
        {...props}
    />;
};
