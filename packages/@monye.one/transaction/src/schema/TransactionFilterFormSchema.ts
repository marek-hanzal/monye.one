import {
    type IFormSchemaType,
    withFormSchema
}                                from "@leight/form";
import {z}                       from "@leight/zod";
import {TransactionSourceSchema} from "./TransactionSourceSchema";

export const TransactionFilterFormSchema = withFormSchema({
    ValuesSchema:  z.object({
        bankIds:    z.array(z.string()).optional(),
        target:     z.string().optional(),
        from:       z.string().optional(),
        to:         z.string().optional(),
        rangeOf:    z.string().optional(),
        amountFrom: z.number().optional(),
        amountTo:   z.number().optional(),
    }),
    RequestSchema: TransactionSourceSchema.FilterSchema,
});
export type ITransactionFilterFormSchemaType = IFormSchemaType.of<typeof TransactionFilterFormSchema>;
