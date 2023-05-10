/**
 Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
    type TransactionSource as Source,
    TransactionSourceSchema as SourceSchema
}                   from "@monye.one/transaction";

export const TransactionSource = withSource<Source>({
    name:   "Transaction",
    schema: SourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dbunxqhh1l04zcym3esrjl12 = true;
