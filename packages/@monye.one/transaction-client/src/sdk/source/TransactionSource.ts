/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
    type TransactionSource as Source,
    TransactionSourceSchema
}                   from "@monye.one/transaction";

export const TransactionSource = withSource<Source>({
    name: "Transaction",
    schema: TransactionSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_l14je9nxxp26yde0jzqvlijn = true;
