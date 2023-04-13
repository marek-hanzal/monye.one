import {type IFormSchema} from "@leight/form-client";
import {
    type IBankCreateFormCreateSchema,
    type IBankCreateFormValueSchema
}                         from "../schema";

export interface IBankCreateFormSchema extends IFormSchema<
    IBankCreateFormValueSchema,
    IBankCreateFormCreateSchema
> {
}
