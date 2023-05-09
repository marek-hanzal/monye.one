import {CalendarEventSourceSchema as CoolCalendarEventSourceSchema} from "@leight/calendar";
import {FilterSchema, SortOrderSchema, type Source, withSourceSchema} from "@leight/source";
import {z} from "@leight/zod";
import {TransactionSourceSchema} from "@monye.one/transaction";

export const CalendarEventSourceSchema = withSourceSchema({
    EntitySchema: CoolCalendarEventSourceSchema.DtoSchema.merge(z.object({
        amount: z.number(),
        outcome: z.number(),
        income: z.number(),
    })),
    DtoSchema: CoolCalendarEventSourceSchema.DtoSchema.merge(z.object({
        amount: z.number(),
        outcome: z.number(),
        income: z.number(),
    })),
    FilterSchema: FilterSchema.merge(CoolCalendarEventSourceSchema.FilterSchema.merge(z.object({
        withTransaction: TransactionSourceSchema.FilterSchema.optional(),
    }))),
    SortSchema: z.object({
        id: SortOrderSchema,
    }),
});
export type CalendarEventSource = Source<typeof CalendarEventSourceSchema>;
