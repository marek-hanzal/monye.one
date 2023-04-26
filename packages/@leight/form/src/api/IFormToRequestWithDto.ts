import {type IFormMapper}     from "./IFormMapper";
import {type IFormSchemaType} from "./IFormSchemaType";

export type IFormToRequestWithDto<TFormSchemaType extends IFormSchemaType> = (props: IFormMapper.TToRequestWithEntityProps<TFormSchemaType>) => TFormSchemaType["Request"];
