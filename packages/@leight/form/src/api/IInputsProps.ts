import {type IFormSchema}       from "./IFormSchema";
import {type IFormSchemaType}   from "./IFormSchemaType";
import {type IFormStoreContext} from "./IFormStoreContext";

export interface IInputsProps<TFormSchemaType extends IFormSchemaType> {
    schemas?: IFormSchema.of<TFormSchemaType>;
    FormContext: IFormStoreContext<TFormSchemaType>;
}
