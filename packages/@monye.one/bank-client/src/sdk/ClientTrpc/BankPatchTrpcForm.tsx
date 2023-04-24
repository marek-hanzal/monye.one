/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form-client";
import {BlockStore} from "@leight/utils-client";
import {type IBankPatchFormSchema} from "../api/BankPatchFormTypes";
import {type FC} from "react";
import {
	type IBankPatchBaseFormProps,
	BankPatchBaseForm
} from "../ClientForm/BankPatchBaseForm";
import {useBankQueryInvalidator} from "./useBankQueryInvalidator";
import {UseBankSourceQuery} from "./UseBankSourceQuery";

export interface IBankPatchTrpcFormProps extends IBankPatchBaseFormProps, ITrpcFormProps<IBankPatchFormSchema> {
}

export const BankPatchTrpcForm: FC<IBankPatchTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.useOptionalState() || {block: () => null};
    const mutation = UseBankSourceQuery.usePatch();
    const invalidator = useBankQueryInvalidator();
    return <BankPatchBaseForm
        onSubmit={({request, onDefaultSubmit}) => {
            block(true);
            mutation.mutate(request, {
                onSuccess: dto => {
                    onDefaultSubmit();
                    invalidator();
                    onSuccess?.({dto});
                },
                onError: error => {
                    onError?.({error});                    
                },
                onSettled: () => {
                    block(false);
                    onSettled?.({});
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
export const $leight_m56e4imm0vduo4knbsylwo6v = true;