import {
    type IFormSchemaType,
    withFormPatchSchema
}          from "@leight/form";
import {z} from "@leight/zod";
import {
    type ILabelSourceSchemaType,
    LabelSourceSchema
}          from "./LabelSourceSchema";

const ValuesSchema = z.object({
    label: z.string().trim().optional(),
});

export const LabelPatchFormSchema = withFormPatchSchema<ILabelSourceSchemaType, typeof ValuesSchema>({
    schema: LabelSourceSchema,
    ValuesSchema,
});
export type ILabelPatchFormSchemaType = IFormSchemaType.of<typeof LabelPatchFormSchema>;
