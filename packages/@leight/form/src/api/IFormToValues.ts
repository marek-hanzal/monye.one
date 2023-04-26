import {type IFormMapper}     from "./IFormMapper";
import {type IFormSchemaType} from "./IFormSchemaType";

export type IFormToValues<TFormSchemaType extends IFormSchemaType> = (props: IFormMapper.TToDtoProps<TFormSchemaType>) => TFormSchemaType["Values"];
