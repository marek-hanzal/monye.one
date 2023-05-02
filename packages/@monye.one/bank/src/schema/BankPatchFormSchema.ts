import {
    type IFormSchemaType,
    withFormPatchSchema
}          from "@leight/form";
import {z} from "@leight/zod";
import {
    BankSourceSchema,
    type IBankSourceSchemaType
}          from "./BankSourceSchema";

const ValuesSchema = z.object({
    account:     z.string().trim().optional(),
    description: z.string().optional(),
    balance:     z.object({
        value: z.number({invalid_type_error: "Empty"}),
        date:  z.string().trim().min(1, {message: "Empty"}),
    }).optional(),
});

export const BankPatchFormSchema = withFormPatchSchema<IBankSourceSchemaType, typeof ValuesSchema>({
    schema: BankSourceSchema,
    ValuesSchema,
});
export type IBankPatchFormSchemaType = IFormSchemaType.of<typeof BankPatchFormSchema>;
