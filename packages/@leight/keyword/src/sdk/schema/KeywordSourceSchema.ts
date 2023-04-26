/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	KeywordSchema as $EntitySchema,
	KeywordOptionalDefaultsSchema,
	KeywordPartialSchema
} from "@leight/prisma";
import {
	SortOrderSchema,
	FilterSchema,
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema,
	ParamsSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {KeywordFilterSchema} from "../../schema";

export type IKeywordSourceSchemaType = ISourceSchemaType.of<typeof KeywordSourceSchema>;

const $KeywordSchema = $EntitySchema;
const $KeywordCreateSchema = KeywordOptionalDefaultsSchema;
const $KeywordPatchSchema = KeywordPartialSchema.merge(PatchSchema);
export const KeywordSourceSchema = withSourceSchema({
    EntitySchema: $KeywordSchema,
    DtoSchema: $KeywordSchema,
    ToCreateSchema: $KeywordCreateSchema,
    CreateSchema: $KeywordCreateSchema,
    ToPatchSchema: $KeywordPatchSchema,
    PatchSchema: $KeywordPatchSchema,
    FilterSchema: FilterSchema.merge(KeywordFilterSchema),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ucbqt150uosyi0zsc1y80jtx = true;