import {type IStoreContext}   from "@leight/context";
import {type IFormSchemaType} from "./IFormSchemaType";
import {type IFormStoreProps} from "./IFormStoreProps";

export type IFormStoreContext<TFormSchemaType extends IFormSchemaType> = IStoreContext<Omit<IFormStoreProps<TFormSchemaType>, "state">>;
