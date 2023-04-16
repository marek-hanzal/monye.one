import {withFormSchemas}  from "@leight/form-client";
import {z}                from "@leight/zod";
import {BankCreateSchema} from "@monye.one/bank";

export const BankCreateFormSchemas = withFormSchemas({
    ValueSchema:   z.object({
        account: z.string().trim().min(1, {message: 'Please provide bank account!'}),
    }),
    RequestSchema: BankCreateSchema,
});
