import {type IFormSchemaType} from "./IFormSchemaType";
import {type IUseForm}        from "./IUseForm";

export interface ITrpcFormProps<TFormSchemaType extends IFormSchemaType> {
    onSuccess?(props: ITrpcFormProps.IOnSuccess<TFormSchemaType>): void;

    onError?(props: ITrpcFormProps.IOnError<TFormSchemaType>): void;

    onSettled?(props: ITrpcFormProps.IOnSettled<TFormSchemaType>): void;
}

export namespace ITrpcFormProps {
    export interface IOnSuccess<TFormSchemaType extends IFormSchemaType> {
        dto: TFormSchemaType["Dto"];
        values: TFormSchemaType["Values"];
        form: IUseForm<TFormSchemaType>;
    }

    export interface IOnError<TFormSchemaType extends IFormSchemaType> {
        error: any;
        values: TFormSchemaType["Values"];
        form: IUseForm<TFormSchemaType>;
    }

    export interface IOnSettled<TFormSchemaType extends IFormSchemaType> {
        values: TFormSchemaType["Values"];
        form: IUseForm<TFormSchemaType>;
    }
}
