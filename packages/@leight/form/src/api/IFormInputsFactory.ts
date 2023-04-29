import {type IFormInputs}     from "./IFormInputs";
import {type IFormSchemaType} from "./IFormSchemaType";
import {type IInputsProps}    from "./IInputsProps";

export type IFormInputsFactory<TFormSchemaType extends IFormSchemaType> = (props: IInputsProps<TFormSchemaType>) => IFormInputs<TFormSchemaType>;
