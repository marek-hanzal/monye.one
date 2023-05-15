import {
    type IFormDtoSchema,
    type IFormSchemaType,
    withFormSchema
}                                      from "@leight/form";
import {z}                             from "@leight/zod";
import {type ITransactionSourceSchema} from "../sdk";
import {TransactionSourceSchema}       from "./TransactionSourceSchema";

const ValuesSchema = z.object({
    labelIds: z.array(z.string()),
});

export const TransactionLabelFormSchema = withFormSchema<typeof ValuesSchema, ITransactionSourceSchema["ToPatchSchemaProps"], IFormDtoSchema>({
    ValuesSchema,
    RequestSchema: TransactionSourceSchema["ToPatchSchemaProps"],
});
export type ITransactionLabelFormSchemaType = IFormSchemaType.of<typeof TransactionLabelFormSchema>;
