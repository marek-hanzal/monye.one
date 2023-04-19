/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form-client";
import {BlockStore} from "@leight/utils-client";
import {type IBankCreateFormSchema} from "../api";
import {type FC} from "react";
import {
	type IBankCreateBaseFormProps,
	BankCreateBaseForm
} from "./BankCreateBaseForm";
import {UseBankSourceQuery} from "../ClientTrpc/UseBankSourceQuery";

export interface IBankCreateTrpcFormProps extends IBankCreateBaseFormProps, ITrpcFormProps<IBankCreateFormSchema> {
}

export const BankCreateTrpcForm: FC<IBankCreateTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.useOptionalState() || {block: () => null};
    const mutation = UseBankSourceQuery.useCreate();
    return <BankCreateBaseForm
        onSubmit={({request}) => {
            block(true);
            mutation.mutate(request, {
                onSuccess: dto => {
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
export const $leight_ig8cc71xqt5wnadx0zf2aiz6 = true;