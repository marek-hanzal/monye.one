import {CalendarEventSourceSchema,} from "@leight/calendar";
import {z}                          from "@leight/zod";
import {TransactionSourceSchema}    from "@monye.one/transaction";

export const CalendarEventSchema = CalendarEventSourceSchema.DtoSchema.merge(z.object({
    amount:  z.number(),
    outcome: z.number(),
    income:  z.number(),
}));

export const CalendarEventFilterSchemaEx = CalendarEventSourceSchema.FilterSchema.merge(z.object({
    withTransaction: TransactionSourceSchema.FilterSchema.optional(),
}));
