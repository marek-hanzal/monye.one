import {type IStoreContext}    from "@leight/context";
import {createStoreContext}    from "@leight/context-client";
import {type IWithTranslation} from "@leight/i18n";
import {
    type IStoreProps,
    type IStorePropsType
}                              from "@leight/zustand";
import {
    useForm,
    type UseFormReturnType
}                              from "@mantine/form";
import {type ComponentProps}   from "react";
import {
    type IFormMapper,
    type IFormSchema
}                              from "../form";

export type IFormStoreProps<TFormSchema extends IFormSchema> = IStoreProps<IStorePropsType, {
    form: UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;
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
    FormStoreContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
}

export const FormStoreProvider = <TFormSchema extends IFormSchema>(
    {
        FormStoreContext,
        withTranslation,
        ...props
    }: IFormStoreProviderProps<TFormSchema>) => {
    const form = useForm<TFormSchema["Values"], IFormMapper<TFormSchema>>();
    return <FormStoreContext.Provider
        state={{
            form,
            withTranslation,
        }}
        {...props}
    />;
};
