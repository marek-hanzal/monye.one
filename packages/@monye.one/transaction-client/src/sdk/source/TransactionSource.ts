/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	TransactionSourceSchema as SourceSchema,
	type TransactionSource as Source
} from "@monye.one/transaction";
import {UseTransactionRepository as UseRepository} from "../trpc/UseTransactionRepository";
import {useTransactionInvalidator as useInvalidator} from "../trpc/useTransactionInvalidator";

export const TransactionSource = withSource<Source>({
    name: "Transaction",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o6fscr0yudp3hykprjeu2rzt = true;