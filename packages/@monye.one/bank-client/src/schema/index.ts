import {
    FormResponseSchema,
    withFormSchemas
}                         from "@leight/form-client";
import {z}                from "@leight/zod";
import {BankCreateSchema} from "@monye.one/bank";

export const BankCreateFormSchemas = withFormSchemas({
    ValueSchema:    z.object({
        account: z.string().min(1),
        inner:   z.object({
            foo: z.string().optional(),
            bar: z.object({
                innerBar: z.string(),
            }),
        }),
    }),
    RequestSchema:  BankCreateSchema,
    ResponseSchema: FormResponseSchema,
});

/**
 * @TODO Add form fields to required schema (keys of) and render them separatly
 */
