import {
    type DeepPartial,
    type KeysOf
}                               from "@leight/utils";
import {z}                      from "@leight/zod";
import {type UseFormReturnType} from "@mantine/form";
import {FC}                     from "react";
import {type IFormStoreContext} from "../context";
import {type IFormProps}        from "../form";
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
    OptionalValues: DeepPartial<z.infer<TValuesSchema>>;
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

export type IFormInputs<TFormSchema extends IFormSchema> = Record<IFormFields<TFormSchema>, FC<IFormInputs.IInputRenderProps<TFormSchema>>>;
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
        withDescription: {
            description: string;
        },
    }

    export interface IInputProps<TFormSchema extends IFormSchema> {
        FormContext: IFormStoreContext<TFormSchema>;
        path: IFormFields<TFormSchema>;
    }
}

export type IFormInputsFactory<TFormSchema extends IFormSchema> = (props: IFormProps.IInputsProps<TFormSchema>) => IFormInputs<TFormSchema>;
export type IFormInputsOverrideFactory<TFormSchema extends IFormSchema> = (props: IFormProps.IInputsProps<TFormSchema>) => Partial<IFormInputs<TFormSchema>>;

export type IUseForm<TFormSchema extends IFormSchema> = UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;

export interface ITrpcFormProps<TFormSchema extends IFormSchema> {
    onSuccess?(props: ITrpcFormProps.IOnSuccess<TFormSchema>): void;

    onError?(props: ITrpcFormProps.IOnError<TFormSchema>): void;

    onSettled?(props: ITrpcFormProps.IOnSettled<TFormSchema>): void;
}

export namespace ITrpcFormProps {
    export interface IOnSuccess<TFormSchema extends IFormSchema> {
        dto: TFormSchema["Response"];
    }

    export interface IOnError<TFormSchema extends IFormSchema> {
        error: any;
    }

    export interface IOnSettled<TFormSchema extends IFormSchema> {
    }
}
