/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IMantineFormContext,
	type InferFormSchemas,
	type IFormInputsFactory
} from "@leight/form-client";
import {BankPatchFormSchema} from "../../schema";

export type IBankPatchFormSchema = InferFormSchemas<typeof BankPatchFormSchema>;
export type IBankPatchMantineFormContext = IMantineFormContext<IBankPatchFormSchema>;
export type IBankPatchFormInputFactory = IFormInputsFactory<IBankPatchFormSchema>;

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u8x0qc1r4blzf77w9ohamxgp = true;