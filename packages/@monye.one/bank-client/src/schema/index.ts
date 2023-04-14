import {z}                from "@leight/zod";
import {BankCreateSchema} from "@monye.one/bank";

export const BankCreateFormValueSchema = z.object({
    account: z.string().min(1),
});
export type IBankCreateFormValueSchema = typeof BankCreateFormValueSchema;

export const BankCreateFormRequestSchema = BankCreateSchema;
export type IBankCreateFormRequestSchema = typeof BankCreateFormRequestSchema;
