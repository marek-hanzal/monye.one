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
	type ILabelEditFormSchemaType,
	LabelEditFormSchema
} from "@leight/label";
import {LabelEditFormStoreContext} from "../FormStoreContext/LabelEditFormStoreContext";
import {LabelEditMantineFormContext} from "../FormStoreContext/LabelEditMantineFormContext";

export interface ILabelEditBaseFormProps extends Omit<IBaseFormProps<ILabelEditFormSchemaType>, "FormContext" | "MantineContext" | "withTranslation"> {
}

export const LabelEditBaseForm: FC<ILabelEditBaseFormProps> = props => {
    return <BaseForm<ILabelEditFormSchemaType>
        MantineContext={LabelEditMantineFormContext}
        schemas={LabelEditFormSchema}
        FormContext={LabelEditFormStoreContext}
        withTranslation={{
            namespace: "label",
            label:     "LabelEditBaseForm",
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_svlw62gfnazvv6vgym5b3az6 = true;