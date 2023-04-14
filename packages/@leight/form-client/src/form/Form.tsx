import {z}                      from "@leight/zod";
import {Button}                 from "@mantine/core";
import {type PropsWithChildren} from "react";
import {
    FormStoreProvider,
    type IFormStoreContext
}                               from "../context";
import {
    type IFormRequestSchema,
    type IFormResponseSchema,
    type IFormValuesSchema
}                               from "../schema";

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

export type IFormFields<TFormSchema extends IFormSchema> = keyof TFormSchema["Values"];
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

export type IFormProps<TFormSchema extends IFormSchema = IFormSchema> = PropsWithChildren<{
    schema?: IFormSchemas<TFormSchema>;
    FormContext: IFormStoreContext<TFormSchema>;
}>;

export const Form = <TFormSchema extends IFormSchema = IFormSchema>(
    {
        schema,
        FormContext,
        ...props
    }: IFormProps<TFormSchema>) => {
    return <FormStoreProvider
        FormStoreContext={FormContext}
    >
        <FormInternal<TFormSchema>
            FormContext={FormContext}
            {...props}
        />
    </FormStoreProvider>;
};

interface IFormInternalProps<TFormSchema extends IFormSchema = IFormSchema> extends IFormProps<TFormSchema> {
}

const FormInternal = <TFormSchema extends IFormSchema = IFormSchema>(
    {
        FormContext,
        children,
    }: IFormInternalProps<TFormSchema>) => {
    const {form} = FormContext.useState(({form}) => ({form}));
    return <form
        onSubmit={form.onSubmit(values => {
            console.log(values);
        })}
    >
        {children}
        <Button
            type={"submit"}
        >
            Submit
        </Button>
    </form>;
};
