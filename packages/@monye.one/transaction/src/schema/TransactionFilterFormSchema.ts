import {
    type IFormSchemaType,
    withFormSchema
}                                from "@leight/form";
import {z}                       from "@leight/zod";
import {TransactionSourceSchema} from "./TransactionSourceSchema";

export const TransactionFilterFormSchema = withFormSchema({
    ValuesSchema:  z.object({
        bankIds: z.array(z.string()).optional(),
    }),
    RequestSchema: TransactionSourceSchema.FilterSchema,
});
export type ITransactionFilterFormSchemaType = IFormSchemaType.of<typeof TransactionFilterFormSchema>;
