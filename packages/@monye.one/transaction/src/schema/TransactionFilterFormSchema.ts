import {
    type IFormSchemaType,
    withFormSchema
}                                    from "@leight/form";
import {TransactionFormFilterSchema} from "./TransactionSchema";

export const TransactionFilterFormSchema = withFormSchema({
    ValuesSchema: TransactionFormFilterSchema,
});
export type ITransactionFilterFormSchema = IFormSchemaType.of<typeof TransactionFilterFormSchema>;
