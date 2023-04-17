import {ToCreateSchema} from "@leight/source";
import {z}              from "@leight/zod";

export const BankToCreateSchemaEx = ToCreateSchema.merge(z.object({
    account: z.string({required_error: "account.required"}),
}));
