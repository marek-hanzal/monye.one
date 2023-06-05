import {
    type IFormSchemaType,
    withFormPatchSchema
}          from "@leight/form";
import {z} from "@leight/utils";
import {
    type LabelSource,
    LabelSourceSchema
}          from "./LabelSourceSchema";

const ValuesSchema = z.object({
    label: z.string().trim().optional(),
});

export const LabelPatchFormSchema = withFormPatchSchema<LabelSource["Schema"], typeof ValuesSchema>({
    schema: LabelSourceSchema,
    ValuesSchema,
});
export type ILabelPatchFormSchemaType = IFormSchemaType.of<typeof LabelPatchFormSchema>;
