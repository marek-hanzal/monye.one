/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withFormSchema,
	type IFormSchemaType
} from "@leight/form";
import {
	BankPatchFormValueSchema,
	BankPatchFormRequestSchema,
	BankPatchFormDtoSchema
} from "../../schema";

export type IBankPatchFormSchema = IFormSchemaType.of<typeof BankPatchFormSchema>;

export const BankPatchFormSchema = withFormSchema({
    ValuesSchema:  BankPatchFormValueSchema,
    RequestSchema: BankPatchFormRequestSchema,
    DtoSchema:     BankPatchFormDtoSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o246s0qhsujrz9e8o2fz3tf8 = true;