import {FilterSchema} from "@leight/filter";
import {
    DtoSchema,
    ToCreateSchema,
    ToPatchSchema
}                     from "@leight/source";
import {z}            from "@leight/zod";

export const BankToCreateSchemaEx = ToCreateSchema.merge(z.object({
    account:     z.string({required_error: "account.required"}),
    description: z.string().optional(),
    balance:     z.object({
        value: z.number(),
        date:  z.string(),
    }).optional(),
}));

export const BankToPatchSchemaEx = ToPatchSchema.merge(z.object({
    account:     z.string().optional(),
    description: z.string().optional(),
    balance:     z.union([
        z.object({
            value: z.number(),
            date:  z.string(),
        }).optional(),
        z.null(),
    ]),
}));

export const BankSchemaEx = DtoSchema.merge(z.object({
    account:     z.string(),
    description: z.string().optional(),
    balance:     z.object({
        value: z.number(),
        date:  z.string(),
    }).optional(),
}));

export const BankFilterSchemaEx = FilterSchema.merge(z.object({
    userId_account: z.object({
        userId:  z.string(),
        account: z.string(),
    }).optional(),
}));
