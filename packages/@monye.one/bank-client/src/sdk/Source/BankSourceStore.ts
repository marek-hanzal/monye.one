/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {BankSourceSchema} from "@monye.one/bank";
import {UseBankSourceQuery} from "../Trpc/UseBankSourceQuery";
import {useBankQueryInvalidator} from "../Trpc/useBankQueryInvalidator";

export const BankSourceStore = withSourceStore({
    name: "Bank",
    schema: BankSourceSchema,
    use: UseBankSourceQuery,
    useInvalidator: useBankQueryInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lui3oqg2fai19c8mte9ad7dg = true;