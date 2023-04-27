import {
    type IFormSchemaType,
    withFormSchema
}                         from "@leight/form";
import {z}                from "@leight/zod";
import {BankSourceSchema} from "./BankSourceSchema";

export const BankCreateFormSchema = withFormSchema({
    ValuesSchema:  z.object({
        account:     z.string().trim().min(1, {message: "Empty"}),
        description: z.string().optional(),
        balance:     z.object({
            value: z.number({invalid_type_error: "Empty"}),
            date:  z.string().trim().min(1, {message: "Empty"}),
        }).optional(),
    }),
    RequestSchema: BankSourceSchema.ToCreateSchema,
    DtoSchema:     BankSourceSchema.DtoSchema,
});
export type IBankCreateFormSchemaType = IFormSchemaType.of<typeof BankCreateFormSchema>;
