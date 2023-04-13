import {z}                      from "@leight/zod";
import {type PropsWithChildren} from "react";
import {
    FormStoreProvider,
    type IFormStoreContext
}                               from "../context";

/**
 * Defines form schema - all internal data are separated by a purpose
 */
export interface IFormSchema<
    TValues extends z.ZodType = z.ZodType,
    TRequest extends z.ZodType = z.ZodType,
    TResponse extends z.ZodType = z.ZodType,
> {
    ValuesSchema: TValues;
    Values: z.infer<TValues>;
    RequestSchema: TRequest;
    Request: z.infer<TRequest>;
    ResponseSchema: TResponse;
    Response: z.infer<TResponse>;
}

export interface IFormSchemas<TFormSchema extends IFormSchema = IFormSchema> {
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
        children,
    }: IFormProps<TFormSchema>) => {
    return <FormStoreProvider
        FormStoreContext={FormContext}
    >
        <form>
            {children}
        </form>
    </FormStoreProvider>;
};
