import {
    type IFormSchemaType,
    withFormCreateSchema
}          from "@leight/form";
import {z} from "@leight/zod";
import {
    type ILabelSourceSchemaType,
    LabelSourceSchema
}          from "./LabelSourceSchema";

const ValuesSchema = z.object({
    label: z.string().trim().min(1, {message: "Empty"}),
});

export const LabelCreateFormSchema = withFormCreateSchema<ILabelSourceSchemaType, typeof ValuesSchema>({
    schema: LabelSourceSchema,
    ValuesSchema,
});
export type ILabelCreateFormSchemaType = IFormSchemaType.of<typeof LabelCreateFormSchema>;
