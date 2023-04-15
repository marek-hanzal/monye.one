import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {type KeysOf}           from "@leight/utils";
import {z}                     from "@leight/zod";
import {
    Button,
    Group
}                              from "@mantine/core";
import {
    useForm,
    UseFormReturnType
}                              from "@mantine/form";
import {
    type PropsWithChildren,
    ReactNode
}                              from "react";
import {
    FormStoreProvider,
    type IFormStoreContext
}                              from "../context";
import {
    FormRequestSchema,
    FormResponseSchema,
    FormValuesSchema,
    type IFormRequestSchema,
    type IFormResponseSchema,
    type IFormValuesSchema
}                              from "../schema";

/**
 * Defines form schema - all internal data are separated by a purpose
 */
export type IFormSchema<
    TValuesSchema extends IFormValuesSchema = IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema = IFormRequestSchema,
    TResponseSchema extends IFormResponseSchema = IFormResponseSchema,
> = {
    ValuesSchema: TValuesSchema;
    Values: z.infer<TValuesSchema>;
    RequestSchema: TRequestSchema;
    Request: z.infer<TRequestSchema>;
    ResponseSchema: TResponseSchema;
    Response: z.infer<TResponseSchema>;
}

export type IFormFields<TFormSchema extends IFormSchema> = KeysOf.Leaves<TFormSchema["Values"]>;
export type IFormMapper<TFormSchema extends IFormSchema> = (values: TFormSchema["Values"]) => TFormSchema["Request"];

export type IFormSchemas<TFormSchema extends IFormSchema = IFormSchema> = {
    /**
     * Value schema validation (internal form structure)
     */
    ValueSchema: TFormSchema["ValuesSchema"];
    /**
     * Schema used to validate request data (mapped from Values to Request)
     */
    RequestSchema: TFormSchema["RequestSchema"];
    /**
     * When used with a mutation, this is an external result schema
     */
    ResponseSchema: TFormSchema["ResponseSchema"];
}

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

export type InferFormSchemas<TFormSchemas extends IFormSchemas> = IFormSchema<
    TFormSchemas["ValueSchema"],
    TFormSchemas["RequestSchema"],
    TFormSchemas["ResponseSchema"]
>;

export type IFormInputProps<TFormSchema extends IFormSchema> = {
    FormContext: IFormStoreContext<TFormSchema>;
    path: IFormFields<TFormSchema>;
}

export type IFormProps<TFormSchema extends IFormSchema = IFormSchema> = PropsWithChildren<{
    schemas?: IFormSchemas<TFormSchema>;
    FormContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
    withMapper: IFormMapper<TFormSchema>;
    /**
     * Create typed form inputs based on the Values schema
     */
    inputs(props: IFormProps.IInputsProps<TFormSchema>): Record<IFormFields<TFormSchema>, ReactNode>;
    /**
     * This enables end user to replace default fields defined by a base form (for example when generated)
     */
    inputsOverride?(props: IFormProps.IInputsProps<TFormSchema>): Partial<Record<IFormFields<TFormSchema>, ReactNode>>;
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
