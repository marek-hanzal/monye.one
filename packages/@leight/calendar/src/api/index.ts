import {FilterSchema} from "@leight/filter";
import {DateTime}     from "@leight/i18n";
import {EntitySchema} from "@leight/source";
import {z}            from "@leight/zod";

/**
 * Defines an individual calendar item being rendered/handled in a particular day.
 */
export const CalendarEventSchema = EntitySchema.merge(z.object({
    date: z.string().transform(input => DateTime.fromISO(input)),
    prev: z.string().optional().transform(input => input ? DateTime.fromISO(input) : undefined),
    next: z.string().optional().transform(input => input ? DateTime.fromISO(input) : undefined),
}));
export type ICalendarEventSchema = typeof CalendarEventSchema;
export type ICalendarEvent = z.infer<ICalendarEventSchema>;

export const CalendarFilterQuery = FilterSchema.merge(z.object({
    from: z.string().transform(input => DateTime.fromISO(input)),
    to:   z.string().transform(input => DateTime.fromISO(input)),
}));
export type ICalendarFilterQuery = typeof CalendarFilterQuery;
export type ICalendarFilter = z.infer<ICalendarFilterQuery>;

export * from "./months";
export * from "./weeks";
export * from "./years";
