/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ITrpcFormProps} from "@leight/form";
import {BlockStore} from "@leight/utils-client";
import {type IBankPatchFormSchemaType} from "@monye.one/bank";
import {type FC} from "react";
import {
	type IBankPatchBaseFormProps,
	BankPatchBaseForm
} from "./BankPatchBaseForm";
import {useBankInvalidator} from "../trpc/useBankInvalidator";
import {BankSource} from "../source/BankSource";

export interface IBankPatchTrpcFormProps extends IBankPatchBaseFormProps, ITrpcFormProps<IBankPatchFormSchemaType> {
}

export const BankPatchTrpcForm: FC<IBankPatchTrpcFormProps> = ({onSuccess, onError, onSettled, ...props}) => {
    const {block} = BlockStore.use$() || {block: () => null};
    const mutation = BankSource.repository.usePatch();
    const invalidator = useBankInvalidator();
    return <BankPatchBaseForm
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
export const $leight_sav3gwst8kjqkay3l590sbm7 = true;