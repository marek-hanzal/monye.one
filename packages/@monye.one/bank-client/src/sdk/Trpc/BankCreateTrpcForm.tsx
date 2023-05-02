/**
 This is a file generated by MCP (managed code pattern) approach.

 So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps}            from "@leight/form";
import {BlockStore}                     from "@leight/utils-client";
import {type IBankCreateFormSchemaType} from "@monye.one/bank";
import {type FC}                        from "react";
import {
    BankCreateBaseForm,
    type IBankCreateBaseFormProps
}                                       from "../Form/BankCreateBaseForm";
import {useBankQueryInvalidator}        from "./useBankQueryInvalidator";
import {UseBankSourceQuery}             from "./UseBankSourceQuery";

export interface IBankCreateTrpcFormProps extends IBankCreateBaseFormProps, ITrpcFormProps<IBankCreateFormSchemaType> {
}

export const BankCreateTrpcForm: FC<IBankCreateTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block}     = BlockStore.useOptionalState() || {block: () => null};
    const mutation    = UseBankSourceQuery.useCreate();
    const invalidator = useBankQueryInvalidator();
    return <BankCreateBaseForm
        onSubmit={({request: toCreate, onDefaultSubmit}) => {
            block(true);
            mutation.mutate({toCreate}, {
                onSuccess: dto => {
                    onDefaultSubmit();
                    invalidator();
                    onSuccess?.({dto});
                },
                onError:   error => {
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
export const $leight_pjdry7ticppab6kvbdmdbbge                 = true;
