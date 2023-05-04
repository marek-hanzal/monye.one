/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form";
import {BlockStore} from "@leight/utils-client";
import {type ILabelEditFormSchemaType} from "@leight/label";
import {type FC} from "react";
import {
	type ILabelEditBaseFormProps,
	LabelEditBaseForm
} from "../Form/LabelEditBaseForm";
import {useLabelQueryInvalidator} from "./useLabelQueryInvalidator";
import {UseLabelSourceQuery} from "./UseLabelSourceQuery";

export interface ILabelEditTrpcFormProps extends ILabelEditBaseFormProps, ITrpcFormProps<ILabelEditFormSchemaType> {
}

export const LabelEditTrpcForm: FC<ILabelEditTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.useOptionalState() || {block: () => null};
    const mutation = UseLabelSourceQuery.usePatch();
    const invalidator = useLabelQueryInvalidator();
    return <LabelEditBaseForm
        onSubmit={({request, form, values, onDefaultSubmit}) => {
            block(true);
            mutation.mutate(request, {
                onSuccess: dto => {
                    onDefaultSubmit();
                    invalidator();
                    onSuccess?.({dto, values, form});
                },
                onError: error => {
                    onError?.({error, values, form});                    
                },
                onSettled: () => {
                    block(false);
                    onSettled?.({values, form});
                },
            });
        }}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_s5x4c0n5spbldjhicmlizc69 = true;