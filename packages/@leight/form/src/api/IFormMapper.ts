import {type IFormSchemaType} from "./IFormSchemaType";

export type IFormMapper<TFormSchemaType extends IFormSchemaType> = (value: TFormSchemaType["Values"]) => IFormMapper.IResult<TFormSchemaType>;

export namespace IFormMapper {
    export interface TToRequestProps<TFormSchemaType extends IFormSchemaType> {
        values: TFormSchemaType["Values"];
    }

    export interface TToDtoProps<TFormSchemaType extends IFormSchemaType> {
        dto: TFormSchemaType["Dto"];
    }

    export interface IResult<TFormSchemaType extends IFormSchemaType> {
        request: TFormSchemaType["Request"];
        values: TFormSchemaType["Values"];
    }

    export interface TToRequestWithEntityProps<TFormSchemaType extends IFormSchemaType> {
        values: TFormSchemaType["Values"];
        dto: TFormSchemaType["Dto"];
    }
}
