/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IMantineFormContext,
	type InferFormSchemas
} from "@leight/form-client";
import {BankCreateFormSchema} from "../../schema";

export type IBankCreateFormSchema = InferFormSchemas<typeof BankCreateFormSchema>;
export type IBankCreateMantineFormContext = IMantineFormContext<IBankCreateFormSchema>;

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_co2iwufj05cpxo38nqsv0oua = true;