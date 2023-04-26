import {z}                from "@leight/zod";
import {BankSourceSchema} from "../sdk";

export const BankCreateFormValueSchema = z.object({
    account:     z.string().trim().min(1, {message: "Empty"}),
    description: z.string().optional(),
    balance:     z.object({
        value: z.number({invalid_type_error: "Empty"}),
        date:  z.string().trim().min(1, {message: "Empty"}),
    }).optional(),
});

export const BankCreateFormRequestSchema = BankSourceSchema.ToCreateSchema;
export const BankCreateFormDtoSchema     = BankSourceSchema.DtoSchema;

export const BankEditFormValueSchema = z.object({
    account:     z.string().trim().min(1, {message: "Empty"}),
    description: z.string().optional(),
    balance:     z.object({
        value: z.number({invalid_type_error: "Empty"}),
        date:  z.string().trim().min(1, {message: "Empty"}),
    }).optional(),
});

export const BankEditFormRequestSchema = BankSourceSchema.ToPatchSchema;
export const BankEditFormDtoSchema     = BankSourceSchema.DtoSchema;

export const BankPatchFormValueSchema = z.object({
    account:     z.string().trim().optional(),
    description: z.string().optional(),
    balance:     z.object({
        value: z.number({invalid_type_error: "Empty"}),
        date:  z.string().trim().min(1, {message: "Empty"}),
    }).optional(),
});

export const BankPatchFormRequestSchema = BankSourceSchema.ToPatchSchema;
export const BankPatchFormDtoSchema     = BankSourceSchema.DtoSchema;
