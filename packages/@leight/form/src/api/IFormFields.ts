import {type KeysOf}          from "@leight/utils";
import {type IFormSchemaType} from "./IFormSchemaType";

export type IFormFields<TFormSchemaType extends IFormSchemaType> = KeysOf.Leaves<TFormSchemaType["Values"]>;
