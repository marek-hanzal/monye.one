/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form-client";
import {BlockStore} from "@leight/utils-client";
import {type IBankEditFormSchema} from "../api/BankEditFormTypes";
import {type FC} from "react";
import {
	type IBankEditBaseFormProps,
	BankEditBaseForm
} from "../Form/BankEditBaseForm";
import {useBankQueryInvalidator} from "./useBankQueryInvalidator";
import {UseBankSourceQuery} from "./UseBankSourceQuery";

export interface IBankEditTrpcFormProps extends IBankEditBaseFormProps, ITrpcFormProps<IBankEditFormSchema> {
}

export const BankEditTrpcForm: FC<IBankEditTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.useOptionalState() || {block: () => null};
    const mutation = UseBankSourceQuery.usePatch();
    const invalidator = useBankQueryInvalidator();
    return <BankEditBaseForm
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
export const $leight_diavonetbi0yuxhmmuyl5af0 = true;