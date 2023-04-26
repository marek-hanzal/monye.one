import {type IFormMapper}     from "./IFormMapper";
import {type IFormSchemaType} from "./IFormSchemaType";

export type IFormToRequest<TFormSchemaType extends IFormSchemaType> = (props: IFormMapper.TToRequestProps<TFormSchemaType>) => TFormSchemaType["Request"];
