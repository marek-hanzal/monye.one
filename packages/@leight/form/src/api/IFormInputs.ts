import {type IWithTranslation}  from "@leight/i18n";
import {type FC}                from "react";
import {type IFormFields}       from "./IFormFields";
import {type IFormSchemaType}   from "./IFormSchemaType";
import {type IFormStoreContext} from "./IFormStoreContext";

export type IFormInputs<TFormSchemaType extends IFormSchemaType> = Record<IFormFields<TFormSchemaType>, FC<IFormInputs.IInputRenderProps<TFormSchemaType>>>;

export namespace IFormInputs {
    export interface IInputRenderProps<TFormSchemaType extends IFormSchemaType> {
        mandatory: IInputProps<TFormSchemaType>;
        withLabel: {
            label: string;
        };
        withLabelPlaceholder: {
            label: string;
            placeholder: string;
        };
        withDescription: {
            description: string;
        };
        withTranslation: IWithTranslation;
    }

    export interface IInputProps<TFormSchemaType extends IFormSchemaType> {
        FormContext: IFormStoreContext<TFormSchemaType>;
        path: IFormFields<TFormSchemaType>;
    }
}
