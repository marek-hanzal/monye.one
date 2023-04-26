import {type IWithTranslation}    from "@leight/i18n";
import {
    type IStoreProps,
    type IStorePropsType
}                                 from "@leight/zustand";
import {type IFormInputs}         from "./IFormInputs";
import {type IFormSchema}         from "./IFormSchema";
import {type IFormSchemaType}     from "./IFormSchemaType";
import {type IMantineFormContext} from "./IMantineFormContext";

export type IFormStoreProps<TFormSchemaType extends IFormSchemaType> = IStoreProps<IStorePropsType, {
    MantineContext: IMantineFormContext<TFormSchemaType>;
    schemas?: IFormSchema.of<TFormSchemaType>;
    inputs: IFormInputs<TFormSchemaType>;
    inputsOverride?: Partial<IFormInputs<TFormSchemaType>>;
    withTranslation: IWithTranslation;
    defaultValues?: TFormSchemaType["Values"];
}>;
