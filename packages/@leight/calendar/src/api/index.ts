import {FilterSchema} from "@leight/filter";
import {DateTime}     from "@leight/i18n";
import {
    EntitySchema,
    type InferSourceSchema,
    withSourceSchema
}                     from "@leight/source";
import {z}            from "@leight/zod";

export const CalendarEventSourceSchema = withSourceSchema({
    /**
     * Defines an individual calendar item being rendered/handled in a particular day.
     */
    EntitySchema: EntitySchema.merge(z.object({
        date: z.string().transform(input => DateTime.fromISO(input)),
        prev: z.string().optional().transform(input => input ? DateTime.fromISO(input) : undefined),
        next: z.string().optional().transform(input => input ? DateTime.fromISO(input) : undefined),
    })),
    FilterSchema: FilterSchema.merge(z.object({
        from: z.string().transform(input => DateTime.fromISO(input)),
        to:   z.string().transform(input => DateTime.fromISO(input)),
    })),
});
export type ICalendarEventSourceSchema = InferSourceSchema<typeof CalendarEventSourceSchema>;

export interface IDateRange {
    from: DateTime;
    to: DateTime;
}

export * from "./months";
export * from "./weeks";
export * from "./years";
