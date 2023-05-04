import {
    type IFormDtoSchema,
    type IFormSchemaType,
    withFormSchema
}          from "@leight/form";
import {z} from "@leight/zod";
import {
    type ITransactionSourceSchemaType,
    TransactionSourceSchema
}          from "./TransactionSourceSchema";

const ValuesSchema = z.object({
    labelIds: z.array(z.string()),
});

export const TransactionLabelFormSchema = withFormSchema<typeof ValuesSchema, ITransactionSourceSchemaType["ToPatchSchema"], IFormDtoSchema>({
    ValuesSchema,
    RequestSchema: TransactionSourceSchema["ToPatchSchema"],
});
export type ITransactionLabelFormSchemaType = IFormSchemaType.of<typeof TransactionLabelFormSchema>;
