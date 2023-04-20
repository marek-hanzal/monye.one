import {
    DtoSchema,
    ToCreateSchema,
    ToPatchSchema
}          from "@leight/source";
import {z} from "@leight/zod";

export const BankToCreateSchemaEx = ToCreateSchema.merge(z.object({
    account:     z.string({required_error: "account.required"}),
    description: z.string().nullable().optional(),
    balance:     z.object({
        value: z.number(),
        date:  z.string(),
    }).optional(),
}));

export const BankToPatchSchemaEx = ToPatchSchema.merge(z.object({
    account:     z.string().optional(),
    description: z.string().nullable().optional(),
    balance:     z.object({
        value: z.number(),
        date:  z.string(),
    }).optional(),
}));

export const BankSchemaEx = DtoSchema.merge(z.object({
    account:     z.string(),
    description: z.string().nullable().optional(),
    balance:     z.object({
        value: z.number(),
        date:  z.string(),
    }).optional(),
}));
