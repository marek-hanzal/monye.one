/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {BankSourceSchema} from "@monye.one/bank";
import {UseBankSourceQuery} from "../Trpc/UseBankSourceQuery";

export const BankSourceStore = withSourceStore({
    name: "Bank",
    schema: BankSourceSchema,
    use: UseBankSourceQuery,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_wgpff1o2gmcu1hf2dew47uij = true;