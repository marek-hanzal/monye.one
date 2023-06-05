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

export const LabelEditFormSchema = withFormPatchSchema<LabelSource["Schema"], typeof ValuesSchema>({
    schema: LabelSourceSchema,
    ValuesSchema,
});
export type ILabelEditFormSchemaType = IFormSchemaType.of<typeof LabelEditFormSchema>;
