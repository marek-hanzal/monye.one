import {type IStoreProvider} from "@leight/context";
import {createStoreContext}  from "@leight/context-client";
import {
    type IStoreProps,
    type IStorePropsType
}                            from "@leight/zustand";
import {
    useForm,
    type UseFormReturnType
}                            from "@mantine/form";
import {type ComponentProps} from "react";
import {type IFormSchema}    from "../form";

export type IFormStoreProps<TFormSchema extends IFormSchema> = IStoreProps<IStorePropsType, {
    form: UseFormReturnType<TFormSchema["Values"], TFormSchema["Request"]>;
}>;

export interface ICreateFormContextProps {
    name: string;
}

export const createFormContext = <TFormSchema extends IFormSchema>({name}: ICreateFormContextProps) => {
    return createStoreContext<IFormStoreProps<TFormSchema>>({
        state: ({state}) => () => ({
            ...state,
        }),
        name:  `${name}FormStoreContext`,
    });
};

export interface IFormStoreProviderProps<TFormSchema extends IFormSchema> extends Omit<ComponentProps<IStoreProvider<IFormStoreProps<TFormSchema>>>, "state"> {
    FormStoreProvider: IStoreProvider<IFormStoreProps<TFormSchema>>;
}

export const FormStoreProvider = <TFormSchema extends IFormSchema>({FormStoreProvider, ...props}: IFormStoreProviderProps<TFormSchema>) => {
    const form = useForm<TFormSchema["Values"], TFormSchema["Request"]>();
    return <FormStoreProvider
        state={{
            form,
        }}
        {...props}
    />;
};
