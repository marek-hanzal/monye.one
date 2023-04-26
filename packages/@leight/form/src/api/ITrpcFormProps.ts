import {type IFormSchemaType} from "./IFormSchemaType";

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
