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
    type IFormDtoSchema,
    type IFormRequestSchema,
    type IFormValuesSchema
}                               from "../schema";

/**
 * Defines form schema - all internal data are separated by a purpose
 */
export type IFormSchema<
    TValuesSchema extends IFormValuesSchema = IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema = IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema = IFormDtoSchema,
> = {
    ValuesSchema: TValuesSchema;
    Values: z.infer<TValuesSchema>;
    OptionalValues: DeepPartial<z.infer<TValuesSchema>>;
    RequestSchema: TRequestSchema;
    Request: z.infer<TRequestSchema>;
    DtoSchema: TDtoSchema;
    Dto: z.infer<TDtoSchema>;
}

export type IFormFields<TFormSchema extends IFormSchema> = KeysOf.Leaves<TFormSchema["Values"]>;
export type IFormToRequest<TFormSchema extends IFormSchema> = (props: IFormMapper.TToRequestProps<TFormSchema>) => TFormSchema["Request"];
export type IFormToValues<TFormSchema extends IFormSchema> = (props: IFormMapper.TToDtoProps<TFormSchema>) => TFormSchema["Values"];
export type IFormToRequestWithDto<TFormSchema extends IFormSchema> = (props: IFormMapper.TToRequestWithEntityProps<TFormSchema>) => TFormSchema["Request"];
export type IFormMapper<TFormSchema extends IFormSchema> = (value: TFormSchema["Values"]) => TFormSchema["Request"];

export namespace IFormMapper {
    export interface TToRequestProps<TFormSchema extends IFormSchema> {
        values: TFormSchema["Values"];
    }

    export interface TToDtoProps<TFormSchema extends IFormSchema> {
        dto: TFormSchema["Dto"];
    }

    export interface TToRequestWithEntityProps<TFormSchema extends IFormSchema> {
        values: TFormSchema["Values"];
        dto: TFormSchema["Dto"];
    }
}

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
    DtoSchema: TFormSchema["DtoSchema"];
}

export type InferFormSchemas<TFormSchemas extends IFormSchemas> = IFormSchema<
    TFormSchemas["ValueSchema"],
    TFormSchemas["RequestSchema"],
    TFormSchemas["DtoSchema"]
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
        dto: TFormSchema["Dto"];
    }

    export interface IOnError<TFormSchema extends IFormSchema> {
        error: any;
    }

    export interface IOnSettled<TFormSchema extends IFormSchema> {
    }
}
