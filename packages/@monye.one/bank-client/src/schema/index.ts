import {z}                from "@leight/zod";
import {BankCreateSchema} from "@monye.one/bank";

/**
 * @TODO Generate schemas from a typed method (return IFormSchemas and infer IFormSchema type)
 */

export const BankCreateFormValueSchema = z.object({
    account: z.string().min(1),
});
export type IBankCreateFormValueSchema = typeof BankCreateFormValueSchema;

/**
 * @TODO add / change Create of BankCreateSchema (by setting SDK parameter?)
 */
export const BankCreateFormRequestSchema = BankCreateSchema;
export type IBankCreateFormRequestSchema = typeof BankCreateFormRequestSchema;
