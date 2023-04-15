import {withFormSchemas}  from "@leight/form-client";
import {z}                from "@leight/zod";
import {BankCreateSchema} from "@monye.one/bank";

export const BankCreateFormSchemas = withFormSchemas({
    ValueSchema:   z.object({
        account: z.string().min(1),
    }),
    RequestSchema: BankCreateSchema,
});
