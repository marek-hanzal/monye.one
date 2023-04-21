import {type IJobService}            from "@leight/job";
import {type IBankStatsParamsSchema} from "./BankStatsParamsSchema";

export interface IBankStatsService extends IJobService<IBankStatsParamsSchema, void> {
}

export const $BankStatsService = Symbol.for("@monye.one/bank/IBankStatsService");
