/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	TransactionSourceSchema as SourceSchema,
	type ITransactionSourceSchema as ISourceSchema
} from "@monye.one/transaction";
import {UseTransactionRepository as UseRepository} from "../trpc/UseTransactionRepository";
import {useTransactionInvalidator as useInvalidator} from "../trpc/useTransactionInvalidator";

export const TransactionSource = withSource<ISourceSchema>({
    name: "Transaction",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gfuk8fbykjyrqs3cbcg9rokq = true;