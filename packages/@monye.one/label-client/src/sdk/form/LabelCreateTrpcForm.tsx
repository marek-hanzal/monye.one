/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form";
import {BlockStore} from "@leight/utils-client";
import {type ILabelCreateFormSchemaType} from "@leight/label";
import {type FC} from "react";
import {
	type ILabelCreateBaseFormProps,
	LabelCreateBaseForm
} from "./LabelCreateBaseForm";
import {useLabelInvalidator} from "../trpc/useLabelInvalidator";
import {LabelSource} from "../source/LabelSource";

export interface ILabelCreateTrpcFormProps extends ILabelCreateBaseFormProps, ITrpcFormProps<ILabelCreateFormSchemaType> {
}

export const LabelCreateTrpcForm: FC<ILabelCreateTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.use$() || {block: () => null};
    const mutation = LabelSource.repository.useCreate();
    const invalidator = useLabelInvalidator();
    return <LabelCreateBaseForm
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
export const $leight_dg6u5oloep8giv3zg2xl32j1 = true;