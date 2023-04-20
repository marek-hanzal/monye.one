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

export interface IFormSchema<
    TValuesSchema extends IFormValuesSchema = IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema = IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema = IFormDtoSchema,
> {
    ValuesSchema: TValuesSchema;
    RequestSchema: TRequestSchema;
    DtoSchema: TDtoSchema;
}

/**
 * Defines form schema - all internal data are separated by a purpose
 */
export interface IFormSchemaType<
    TValuesSchema extends IFormValuesSchema = IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema = IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema = IFormDtoSchema,
> extends IFormSchema<
    TValuesSchema,
    TRequestSchema,
    TDtoSchema
> {
    Values: z.infer<TValuesSchema>;
    OptionalValues: DeepPartial<z.infer<TValuesSchema>>;
    Request: z.infer<TRequestSchema>;
    Dto: z.infer<TDtoSchema>;
}

export type IFormFields<TFormSchemaType extends IFormSchemaType> = KeysOf.Leaves<TFormSchemaType["Values"]>;
export type IFormToRequest<TFormSchemaType extends IFormSchemaType> = (props: IFormMapper.TToRequestProps<TFormSchemaType>) => TFormSchemaType["Request"];
export type IFormToValues<TFormSchemaType extends IFormSchemaType> = (props: IFormMapper.TToDtoProps<TFormSchemaType>) => TFormSchemaType["Values"];
export type IFormToRequestWithDto<TFormSchemaType extends IFormSchemaType> = (props: IFormMapper.TToRequestWithEntityProps<TFormSchemaType>) => TFormSchemaType["Request"];
export type IFormMapper<TFormSchemaType extends IFormSchemaType> = (value: TFormSchemaType["Values"]) => TFormSchemaType["Request"];

export namespace IFormMapper {
    export interface TToRequestProps<TFormSchemaType extends IFormSchemaType> {
        values: TFormSchemaType["Values"];
    }

    export interface TToDtoProps<TFormSchemaType extends IFormSchemaType> {
        dto: TFormSchemaType["Dto"];
    }

    export interface TToRequestWithEntityProps<TFormSchemaType extends IFormSchemaType> {
        values: TFormSchemaType["Values"];
        dto: TFormSchemaType["Dto"];
    }
}

export type IFormSchemas<TFormSchemaType extends IFormSchemaType = IFormSchemaType> = {
    /**
     * Value schema validation (internal form structure)
     */
    ValueSchema: TFormSchemaType["ValuesSchema"];
    /**
     * Schema used to validate request data (mapped from Values to Request)
     */
    RequestSchema: TFormSchemaType["RequestSchema"];
    /**
     * When used with a mutation, this is an external result schema
     */
    DtoSchema: TFormSchemaType["DtoSchema"];
}

export type IFormInputs<TFormSchemaType extends IFormSchemaType> = Record<IFormFields<TFormSchemaType>, FC<IFormInputs.IInputRenderProps<TFormSchemaType>>>;
export namespace IFormInputs {
    export interface IInputRenderProps<TFormSchemaType extends IFormSchemaType> {
        mandatory: IInputProps<TFormSchemaType>;
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

    export interface IInputProps<TFormSchemaType extends IFormSchemaType> {
        FormContext: IFormStoreContext<TFormSchemaType>;
        path: IFormFields<TFormSchemaType>;
    }
}

export type IFormInputsFactory<TFormSchemaType extends IFormSchemaType> = (props: IFormProps.IInputsProps<TFormSchemaType>) => IFormInputs<TFormSchemaType>;
export type IFormInputsOverrideFactory<TFormSchemaType extends IFormSchemaType> = (props: IFormProps.IInputsProps<TFormSchemaType>) => Partial<IFormInputs<TFormSchemaType>>;

export type IUseForm<TFormSchemaType extends IFormSchemaType> = UseFormReturnType<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>;

export interface ITrpcFormProps<TFormSchemaType extends IFormSchemaType> {
    onSuccess?(props: ITrpcFormProps.IOnSuccess<TFormSchemaType>): void;

    onError?(props: ITrpcFormProps.IOnError<TFormSchemaType>): void;

    onSettled?(props: ITrpcFormProps.IOnSettled<TFormSchemaType>): void;
}

export namespace ITrpcFormProps {
    export interface IOnSuccess<TFormSchemaType extends IFormSchemaType> {
        dto: TFormSchemaType["Dto"];
    }

    export interface IOnError<TFormSchemaType extends IFormSchemaType> {
        error: any;
    }

    export interface IOnSettled<TFormSchemaType extends IFormSchemaType> {
    }
}
