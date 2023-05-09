import {type IFormSchemaType, withFormPatchSchema} from "@leight/form";
import {z} from "@leight/zod";
import {type BankSource, BankSourceSchema} from "./BankSourceSchema";

const ValuesSchema = z.object({
    account: z.string().trim().optional(),
    description: z.string().optional(),
    balance: z.object({
        value: z.number({invalid_type_error: "Empty"}),
        date: z.string().trim().min(1, {message: "Empty"}),
    }).optional(),
});

export const BankPatchFormSchema = withFormPatchSchema<BankSource["Schema"], typeof ValuesSchema>({
    schema: BankSourceSchema,
    ValuesSchema,
});
export type IBankPatchFormSchemaType = IFormSchemaType.of<typeof BankPatchFormSchema>;
