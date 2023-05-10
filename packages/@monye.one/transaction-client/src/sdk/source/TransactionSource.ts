/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	TransactionSourceSchema as SourceSchema,
	type TransactionSource as Source
} from "@monye.one/transaction";
import {UseTransactionSourceQuery} from "../Trpc/UseTransactionSourceQuery";
import {useTransactionQueryInvalidator} from "../Trpc/useTransactionQueryInvalidator";

export const TransactionSource = withSource<Source>({
    name: "Transaction",
    schema: SourceSchema,
    use: UseTransactionSourceQuery,
    useInvalidator: useTransactionQueryInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_snd58xcnjsw9bvadstyikg2s = true;