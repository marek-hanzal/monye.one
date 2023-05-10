import {DateTime} from "@leight/i18n";
import {CreateSchema, DtoSchema, FilterSchema, type Source, ToCreateSchema, withSourceSchema} from "@leight/source";
import {z} from "@leight/zod";

export const CalendarEventSourceSchema = withSourceSchema({
    CreateSchema: CreateSchema,
    ToCreateSchema: ToCreateSchema,
    /**
     * Defines an individual calendar item being rendered/handled in a particular day.
     */
    DtoSchema: DtoSchema.merge(z.object({
        date: z.date(),
        prev: z.date().optional(),
        next: z.date().optional(),
    })),
    FilterSchema: FilterSchema.merge(z.object({
        withRange: z.object({
            from: z.date(),
            to: z.date(),
        }).optional(),
    })),
});
export type CalendarEventSource = Source<typeof CalendarEventSourceSchema>;

export interface IDateRange {
    from: DateTime;
    to: DateTime;
}

export * from "./months";
export * from "./weeks";
export * from "./years";
