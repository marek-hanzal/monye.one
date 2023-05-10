/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	DtoForm as BaseForm,
	type IDtoFormProps as IBaseFormProps
} from "@leight/form-client";
import {type FC} from "react";
import {
	type ILabelCreateFormSchemaType,
	LabelCreateFormSchema
} from "@leight/label";
import {LabelCreateFormStoreContext} from "../context/LabelCreateFormStoreContext";
import {LabelCreateMantineFormContext} from "../context/LabelCreateMantineFormContext";

export interface ILabelCreateBaseFormProps extends Omit<IBaseFormProps<ILabelCreateFormSchemaType>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const LabelCreateBaseForm: FC<ILabelCreateBaseFormProps> = props => {
    return <BaseForm<ILabelCreateFormSchemaType>
        MantineContext={LabelCreateMantineFormContext}
        schemas={LabelCreateFormSchema}
        FormContext={LabelCreateFormStoreContext}
        withTranslation={{
            namespace: "label",
            label:     "LabelCreateBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_yapdsmc35wiu55p5g0co1myj = true;