/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	BankSourceSchema as SourceSchema,
	type IBankSourceSchema as ISourceSchema
} from "@monye.one/bank";
import {UseBankRepository as UseRepository} from "../trpc/UseBankRepository";
import {useBankInvalidator as useInvalidator} from "../trpc/useBankInvalidator";

export const BankSource = withSource<ISourceSchema>({
    name: "Bank",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vreazj2s4dgcjjsgwv55fi00 = true;