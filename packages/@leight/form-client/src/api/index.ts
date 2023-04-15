import {type KeysOf}       from "@leight/utils";
import {z}                 from "@leight/zod";
import {type ReactNode}    from "react";
import {IFormStoreContext} from "../context";
import {IFormProps}        from "../form";
import {
    type IFormRequestSchema,
    type IFormResponseSchema,
    type IFormValuesSchema
}                          from "../schema";

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

export type InferFormSchemas<TFormSchemas extends IFormSchemas> = IFormSchema<
    TFormSchemas["ValueSchema"],
    TFormSchemas["RequestSchema"],
    TFormSchemas["ResponseSchema"]
>;

export type IFormInputs<TFormSchema extends IFormSchema> = Record<IFormFields<TFormSchema>, (props: IFormInputs.IInputRenderProps<TFormSchema>) => ReactNode>;
export namespace IFormInputs {
    export interface IInputRenderProps<TFormSchema extends IFormSchema> {
        mandatory: IInputProps<TFormSchema>;
        withLabel: {
            label: string;
        };
        withLabelPlaceholder: {
            label: string;
            placeholder: string;
        };
    }

    export interface IInputProps<TFormSchema extends IFormSchema> {
        FormContext: IFormStoreContext<TFormSchema>;
        path: IFormFields<TFormSchema>;
    }
}

export type IFormInputsFactory<TFormSchema extends IFormSchema> = (props: IFormProps.IInputsProps<TFormSchema>) => IFormInputs<TFormSchema>;
export type IFormInputsOverrideFactory<TFormSchema extends IFormSchema> = (props: IFormProps.IInputsProps<TFormSchema>) => Partial<IFormInputs<TFormSchema>>;
