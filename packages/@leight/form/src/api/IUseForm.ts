import {type UseFormReturnType} from "@mantine/form";
import {type IFormMapper}       from "./IFormMapper";
import {type IFormSchemaType}   from "./IFormSchemaType";

export type IUseForm<TFormSchemaType extends IFormSchemaType> = UseFormReturnType<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>;
