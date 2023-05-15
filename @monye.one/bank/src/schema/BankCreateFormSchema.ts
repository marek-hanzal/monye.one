import {type IFormSchemaType, withFormCreateSchema} from "@leight/form";
import {z} from "@leight/zod";
import {type BankSource, BankSourceSchema} from "./BankSourceSchema";

const ValuesSchema = z.object({
    account: z.string().trim().min(1, {message: "Empty"}),
    description: z.string().optional(),
    balance: z.object({
        value: z.number({invalid_type_error: "Empty"}),
        date: z.string().trim().min(1, {message: "Empty"}),
    }).optional(),
});

export const BankCreateFormSchema = withFormCreateSchema<BankSource["Schema"], typeof ValuesSchema>({
    schema: BankSourceSchema,
    ValuesSchema,
});
export type IBankCreateFormSchemaType = IFormSchemaType.of<typeof BankCreateFormSchema>;
