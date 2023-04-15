import {type IWithTranslation}  from "@leight/i18n";
import {Translation}            from "@leight/i18n-client";
import {
    Button,
    Group
}                               from "@mantine/core";
import {
    useForm,
    UseFormReturnType
}                               from "@mantine/form";
import {type PropsWithChildren} from "react";
import {
    IFormInputsFactory,
    IFormInputsOverrideFactory,
    type IFormMapper,
    type IFormSchema,
    type IFormSchemas
}                               from "../api";
import {
    FormStoreProvider,
    type IFormStoreContext
}                               from "../context";
import {
    FormRequestSchema,
    FormResponseSchema,
    FormValuesSchema,
    type IFormRequestSchema,
    type IFormResponseSchema,
    type IFormValuesSchema
}                               from "../schema";

export interface IWithFormSchemasProps<
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TResponseSchema extends IFormResponseSchema,
> {
    ValueSchema?: TValuesSchema,
    RequestSchema?: TRequestSchema,
    ResponseSchema?: TResponseSchema,
}

export const withFormSchemas = <
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TResponseSchema extends IFormResponseSchema,
>(
    {
        ValueSchema = FormValuesSchema as TValuesSchema,
        RequestSchema = FormRequestSchema as TRequestSchema,
        ResponseSchema = FormResponseSchema as TResponseSchema,
    }: IWithFormSchemasProps<TValuesSchema, TRequestSchema, TResponseSchema>): IFormSchemas<IFormSchema<TValuesSchema, TRequestSchema, TResponseSchema>> => ({
    ValueSchema,
    RequestSchema,
    ResponseSchema,
});

export type IFormProps<TFormSchema extends IFormSchema = IFormSchema> = PropsWithChildren<{
    schemas?: IFormSchemas<TFormSchema>;
    FormContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
    withMapper: IFormMapper<TFormSchema>;
    /**
     * Create typed form inputs based on the Values schema
     */
    inputs: IFormInputsFactory<TFormSchema>;
    /**
     * This enables end user to replace default fields defined by a base form (for example when generated)
     */
    inputsOverride?: IFormInputsOverrideFactory<TFormSchema>;
    onSubmit?(props: IFormProps.IOnSubmitProps<TFormSchema>): void;
}>;

export namespace IFormProps {
    export interface IOnSubmitProps<TFormSchema extends IFormSchema> {
        request: TFormSchema["Request"];
    }

    export interface IInputsProps<TFormSchema extends IFormSchema> {
        schemas?: IFormSchemas<TFormSchema>;
        FormContext: IFormStoreContext<TFormSchema>;
    }
}

export const Form = <TFormSchema extends IFormSchema = IFormSchema>(
    {
        schemas,
        FormContext,
        withTranslation,
        withMapper,
        inputs,
        inputsOverride,
        ...props
    }: IFormProps<TFormSchema>) => {
    const form = useForm<TFormSchema["Values"], IFormMapper<TFormSchema>>({
        transformValues: withMapper,
    });
    return <FormStoreProvider
        schemas={schemas}
        form={form}
        inputs={inputs({schemas, FormContext})}
        inputsOverride={inputsOverride?.({schemas, FormContext})}
        FormStoreContext={FormContext}
        withTranslation={withTranslation}
    >
        <FormInternal<TFormSchema>
            form={form}
            withTranslation={withTranslation}
            {...props}
        />
    </FormStoreProvider>;
};

interface IFormInternalProps<TFormSchema extends IFormSchema = IFormSchema> extends Omit<IFormProps<TFormSchema>, "FormContext" | "withMapper" | "inputs" | "inputsOverride"> {
    form: UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;
}

const FormInternal = <TFormSchema extends IFormSchema = IFormSchema>(
    {
        form,
        onSubmit,
        withTranslation,
        children,
    }: IFormInternalProps<TFormSchema>) => {
    return <form
        onSubmit={form.onSubmit(request => onSubmit?.({request}))}
    >
        {children}
        <Group
            position={"center"}
            mt={"md"}
        >
            <Button
                type={"submit"}
            >
                <Translation
                    {...withTranslation}
                    label={`${withTranslation.label}.submit.button`}
                />
            </Button>
        </Group>
    </form>;
};
