import {type IFormSchemaType} from "./IFormSchemaType";

export interface ITrpcFormProps<TFormSchemaType extends IFormSchemaType> {
    onSuccess?(props: ITrpcFormProps.IOnSuccess<TFormSchemaType>): void;

    onError?(props: ITrpcFormProps.IOnError): void;

    onSettled?(props: ITrpcFormProps.IOnSettled): void;
}

export namespace ITrpcFormProps {
    export interface IOnSuccess<TFormSchemaType extends IFormSchemaType> {
        dto: TFormSchemaType["Dto"];
    }

    export interface IOnError {
        error: any;
    }

    export interface IOnSettled {
    }
}
