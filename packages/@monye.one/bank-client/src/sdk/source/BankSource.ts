/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	BankSourceSchema as SourceSchema,
	type BankSource as Source
} from "@monye.one/bank";
import {UseBankRepository as UseRepository} from "../trpc/UseBankRepository";
import {useBankInvalidator as useInvalidator} from "../trpc/useBankInvalidator";

export const BankSource = withSource<Source>({
    name: "Bank",
    schema: SourceSchema,
    UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bqyq9ur8xnib6ib1qj2zvj25 = true;