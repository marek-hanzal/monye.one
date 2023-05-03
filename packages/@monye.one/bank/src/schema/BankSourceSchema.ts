import {
    DtoSchema,
    FilterSchema,
    type ISourceSchemaType,
    ParamsSchema,
    PatchSchema,
    SortOrderSchema,
    ToCreateSchema,
    ToPatchSchema,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";
import {
    BankOptionalDefaultsSchema,
    BankPartialSchema,
    BankSchema
}          from "@monye.one/prisma";

export const BankSourceSchema = withSourceSchema({
    EntitySchema:   BankSchema,
    DtoSchema:      DtoSchema.merge(z.object({
        account:     z.string(),
        description: z.string().optional(),
        balance:     z.object({
            value: z.number(),
            date:  z.string(),
        }).optional(),
    })),
    ToCreateSchema: ToCreateSchema.merge(z.object({
        account:     z.string({required_error: "account.required"}),
        description: z.string().optional(),
        balance:     z.object({
            value: z.number(),
            date:  z.string(),
        }).optional(),
    })),
    CreateSchema:   BankOptionalDefaultsSchema,
    ToPatchSchema:  ToPatchSchema.merge(z.object({
        account:     z.string().optional(),
        description: z.string().optional(),
        balance:     z.object({
            value: z.number(),
            date:  z.string(),
        }).nullish(),
    })),
    PatchSchema:    BankPartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        userId_account: z.object({
            userId:  z.string(),
            account: z.string(),
        }).optional(),
        account:        z.string().optional(),
    })),
    ParamsSchema:   ParamsSchema,
    SortSchema:     z.object({
        account: SortOrderSchema,
    }),
});
export type IBankSourceSchemaType = ISourceSchemaType.of<typeof BankSourceSchema>;
