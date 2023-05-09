import {type IFormSchemaType, withFormCreateSchema} from "@leight/form";
import {z} from "@leight/zod";
import {type LabelSource, LabelSourceSchema} from "./LabelSourceSchema";

const ValuesSchema = z.object({
    label: z.string().trim().min(1, {message: "Empty"}),
});

export const LabelCreateFormSchema = withFormCreateSchema<LabelSource["Schema"], typeof ValuesSchema>({
    schema: LabelSourceSchema,
    ValuesSchema,
});
export type ILabelCreateFormSchemaType = IFormSchemaType.of<typeof LabelCreateFormSchema>;
