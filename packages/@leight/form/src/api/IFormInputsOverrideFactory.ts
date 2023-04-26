import {type IFormInputs}     from "./IFormInputs";
import {type IFormSchemaType} from "./IFormSchemaType";
import {type IInputsProps}    from "./IInputsProps";

export type IFormInputsOverrideFactory<TFormSchemaType extends IFormSchemaType> = (props: IInputsProps<TFormSchemaType>) => Partial<IFormInputs<TFormSchemaType>>;
