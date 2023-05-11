/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form";
import {BlockStore} from "@leight/utils-client";
import {type ITransactionLabelFormSchemaType} from "@monye.one/transaction";
import {type FC} from "react";
import {
	type ITransactionLabelBaseFormProps,
	TransactionLabelBaseForm
} from "./TransactionLabelBaseForm";
import {useTransactionInvalidator} from "../trpc/useTransactionInvalidator";
import {TransactionSource} from "../source/TransactionSource";

export interface ITransactionLabelTrpcFormProps extends ITransactionLabelBaseFormProps, ITrpcFormProps<ITransactionLabelFormSchemaType> {
}

export const TransactionLabelTrpcForm: FC<ITransactionLabelTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.use$() || {block: () => null};
    const mutation = TransactionSource.repository.usePatchBy();
    const invalidator = useTransactionInvalidator();
    return <TransactionLabelBaseForm
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
export const $leight_no49fa7gysu7a44c9h367bcy = true;