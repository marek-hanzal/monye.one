import {withFormSchema}   from "@leight/form-client";
import {z}                from "@leight/zod";
import {BankSourceSchema} from "@monye.one/bank";

export const BankCreateFormSchema = withFormSchema({
    ValuesSchema:   z.object({
        account:     z.string().trim().min(1, {message: "Empty"}),
        description: z.string().optional(),
        balance:     z.object({
            value: z.number({invalid_type_error: "Empty"}),
            date:  z.string().trim().min(1, {message: "Empty"}),
        }).optional(),
    }),
    RequestSchema: BankSourceSchema.ToCreateSchema,
    DtoSchema:     BankSourceSchema.DtoSchema,
});

/**
 * Edit requires full DTO object to be provided
 */
export const BankEditFormSchema = withFormSchema({
    ValuesSchema:   z.object({
        account:     z.string().trim().min(1, {message: "Empty"}),
        description: z.string().optional(),
        balance:      z.object({
            value: z.number({invalid_type_error: "Empty"}),
            date:  z.string().trim().min(1, {message: "Empty"}),
        }).optional(),
    }),
    RequestSchema: BankSourceSchema.ToPatchSchema,
    DtoSchema:     BankSourceSchema.DtoSchema,
});

/**
 * Patch does not require all values to be provided
 */
export const BankPatchFormSchema = withFormSchema({
    ValuesSchema:   z.object({
        account:     z.string().trim().optional(),
        description: z.string().optional(),
        balance:     z.object({
            value: z.number({invalid_type_error: "Empty"}),
            date:  z.string().trim().min(1, {message: "Empty"}),
        }).optional(),
    }),
    RequestSchema: BankSourceSchema.ToPatchSchema,
    DtoSchema:     BankSourceSchema.DtoSchema,
});
