import {z} from "@leight/zod";

export const BankStatsParamsSchema = z.object({
    bankId: z.string().trim().min(1),
});
export type IBankStatsParamsSchema = typeof BankStatsParamsSchema;
export type IBankStatsParams = z.infer<IBankStatsParamsSchema>;
