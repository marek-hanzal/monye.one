/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {BankSourceSchema} from "@monye.one/bank";

export const BankSourceStore = withSourceStore({
    name: "Bank",
    SourceSchema: BankSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_j6y9vjjxghjksrcb2ook5x4i = true;