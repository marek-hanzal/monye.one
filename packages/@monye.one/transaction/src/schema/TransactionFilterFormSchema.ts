import {
    type IFormSchemaType,
    withFormSchema
}          from "@leight/form";
import {z} from "@leight/zod";

export const TransactionFilterFormSchema = withFormSchema({
    ValuesSchema: z.object({
        bankId: z.string().optional(),
    }),
});
export type ITransactionFilterFormSchemaType = IFormSchemaType.of<typeof TransactionFilterFormSchema>;
