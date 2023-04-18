import {withFormSchemas}  from "@leight/form-client";
import {z}                from "@leight/zod";
import {BankSourceSchema} from "@monye.one/bank";

export const BankCreateFormSchema = withFormSchemas({
    ValueSchema:   z.object({
        account: z.string().trim().min(1, {message: "Empty"}),
        balance: z.object({
            value: z.number({invalid_type_error: "Empty"}),
            date:  z.string().trim().min(1, {message: "Empty"}),
        }).optional(),
    }),
    RequestSchema: BankSourceSchema.ToCreateSchema,
});
